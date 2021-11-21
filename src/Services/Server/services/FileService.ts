import mime from "mime/lite"
import { NotFound } from "throw.js"
import { FindOneOptions, getRepository } from "typeorm/browser"
import FileReaderService from "../../FileReaderService"
import { FileEntity } from "../entities/FileEntity"
import { FileGroupEntity } from "../entities/FileGroupEntity"
import ComparisonService from "./ComparisonService"
import FileGroupService from "./FileGroupService"

class FileService {
  get repository() {
    return getRepository(FileEntity)
  }

  async list() {
    return this.repository.find()
  }

  async listFromSuite(suiteId: string) {
    return this.repository.find({ where: { suite: { id: suiteId } } })
  }

  async store(fileGroup: FileGroupEntity, blob: File) {
    const filename = blob.name
    const mimetype = mime.getType(filename) || "application/octet-stream"

    const data = await FileReaderService.readAsArrayBuffer(blob)

    const file = await this.repository.save({
      filename,
      mimetype,
      data,
      fileGroup: { id: fileGroup.id },
      suite: { id: fileGroup.suite.id }
    })

    return file
  }

  async find(id: string, options?: FindOneOptions<FileEntity>) {
    const file = await this.repository.findOne(id, {
      ...options,
      select: ["id", "filename", "mimetype", ...(options?.select ?? [])]
    })

    if (!file) {
      throw new NotFound()
    }

    return file
  }

  async data(id: string) {
    const file = await this.find(id, { select: ["data"] })
    const blob = new File([file.data], file.filename, { type: file.mimetype })
    return { file, blob }
  }

  async remove(id: string) {
    await ComparisonService.removeWithFile(id)
    await this.repository.remove(await this.find(id))
  }

  async storeFiles(fileGroupId: string, files: File[]) {
    const fileGroup = await FileGroupService.find(fileGroupId)

    if (fileGroup) {
      for (const file of files) {
        await this.store(fileGroup, file)
      }
    }
  }
}

export default new FileService()
