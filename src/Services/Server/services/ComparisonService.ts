import levenshtein from "fast-levenshtein"
import { FindManyOptions, FindOneOptions, getRepository } from "typeorm"
import { readBlobAsString } from "../../Utils/readBlobAsString"
import { ComparisonSchema } from "../entities/ComparisonSchema"
import { Comparison, ComparisonStatus } from "../models/Comparison"
import { File } from "../models/File"
import FileService from "./FileService"

class ComparisonService {
  get repository() {
    return getRepository<Comparison>(ComparisonSchema as any)
  }

  listFromSuite(suiteId: string, options?: FindManyOptions<Comparison>) {
    return this.repository.find({
      ...options,
      where: { suite: { id: suiteId }, ...(options as any)?.where },
      order: { status: "DESC", levenshteinDistance: "ASC" },
      relations: ["firstFile", "secondFile"]
    })
  }

  find(id: string, options?: FindOneOptions<Comparison>) {
    return this.repository.findOne(id, {
      relations: ["firstFile", "secondFile"],
      ...options
    })
  }

  findWithFile(fileId: File["id"]) {
    return this.repository.find({
      where: [{ firstFile: { id: fileId } }, { secondFile: { id: fileId } }]
    })
  }

  findWithFiles(firstFileId: File["id"], secondFileId: File["id"]) {
    return this.repository.findOne({
      where: [
        { firstFile: { id: firstFileId }, secondFile: { id: secondFileId } },
        { firstFile: { id: secondFileId }, secondFile: { id: firstFileId } }
      ]
    })
  }

  async removeWithFile(fileId: File["id"]) {
    await this.repository.remove(await this.findWithFile(fileId))
  }

  async createComparison(
    suiteId: string,
    firstFileId: string,
    secondFileId: string
  ) {
    const comparison = await this.repository.save({
      firstFile: { id: firstFileId },
      secondFile: { id: secondFileId },
      suite: { id: suiteId }
    })
    return comparison
  }

  async run(comparisonId: string) {
    const comparison = (await this.find(comparisonId, {
      relations: ["firstFile", "secondFile"]
    }))!

    const { blob: firstFileBlob } = await FileService.data(
      comparison.firstFile.id
    )
    const { blob: secondFileBlob } = await FileService.data(
      comparison.secondFile.id
    )

    comparison.levenshteinDistance = levenshtein.get(
      await readBlobAsString(firstFileBlob),
      await readBlobAsString(secondFileBlob)
    )
    comparison.status = ComparisonStatus.DONE

    await this.repository.save(comparison)
  }
}

export default new ComparisonService()
