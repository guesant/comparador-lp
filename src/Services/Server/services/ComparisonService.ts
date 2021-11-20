import levenshtein from "fast-levenshtein"
import { getRepository, FindManyOptions, FindOneOptions } from "typeorm/browser"
import FileReaderService from "../../FileReaderService"
import { ComparisonStatus } from "../ComparisonStatus"
import { ComparisonEntity } from "../entities/ComparisonEntity"
import { FileEntity } from "../entities/FileEntity"
import FileService from "./FileService"

class ComparisonService {
  get repository() {
    return getRepository(ComparisonEntity)
  }

  listFromSuite(suiteId: string, options?: FindManyOptions<ComparisonEntity>) {
    return this.repository.find({
      ...options,
      where: { suite: { id: suiteId }, ...options?.where },
      order: {
        status: "DESC",
        levenshteinDistance: "ASC"
      },
      relations: ["firstFile", "secondFile"]
    })
  }

  find(id: string, options?: FindOneOptions<ComparisonEntity>) {
    return this.repository.findOne(id, {
      ...options,
      relations: ["firstFile", "secondFile"]
    })
  }

  findWithFile(fileId: FileEntity["id"]) {
    return this.repository.find({
      where: [
        {
          firstFile: { id: fileId }
        },
        {
          secondFile: { id: fileId }
        }
      ]
    })
  }

  findWithFiles(firstFileId: FileEntity["id"], secondFileId: FileEntity["id"]) {
    return this.repository.findOne({
      where: [
        {
          firstFile: { id: firstFileId },
          secondFile: { id: secondFileId }
        },
        {
          firstFile: { id: secondFileId },
          secondFile: { id: firstFileId }
        }
      ]
    })
  }

  async removeWithFile(fileId: FileEntity["id"]) {
    return this.repository.remove(await this.findWithFile(fileId))
  }

  async createComparison(
    suiteId: string,
    firstFileId: string,
    secondFileId: string
  ) {
    return this.repository.save({
      suite: { id: suiteId },
      firstFile: { id: firstFileId },
      secondFile: { id: secondFileId }
    })
  }

  async run(comparisonId: string) {
    const comparison = await this.find(comparisonId)

    if (comparison) {
      const { blob: firstFileBlob } = await FileService.data(
        comparison.firstFile.id
      )
      const { blob: secondFileBlob } = await FileService.data(
        comparison.secondFile.id
      )

      comparison.levenshteinDistance = levenshtein.get(
        await FileReaderService.readAsString(firstFileBlob),
        await FileReaderService.readAsString(secondFileBlob)
      )

      comparison.status = ComparisonStatus.DONE

      await this.repository.save(comparison)
    }
  }
}

export default new ComparisonService()
