import mime from "mime/lite"
import { NotFound } from "throw.js"
import { FindManyOptions, FindOneOptions, getRepository } from "typeorm/browser"
import StorageService from "../../StorageService"
import { FileSchema } from "../entities/FileSchema"
import { File as FileEntity } from "../models/File"
import { FileGroup } from "../models/FileGroup"
import ComparisonService from "./ComparisonService"
import FileGroupService from "./FileGroupService"

class FileService {
  get repository() {
    return getRepository<FileEntity>(FileSchema)
  }

  async list(options?: FindManyOptions<FileEntity>) {
    return this.repository.find(options)
  }

  async listFromSuite(suiteId: string, options?: FindManyOptions<FileEntity>) {
    return this.repository.find({
      where: { suite: { id: suiteId } },
      ...options
    })
  }

  async create(fileGroup: FileGroup, data: File) {
    const filename = data.name
    const mimetype = mime.getType(filename) || "application/octet-stream"

    return this.repository.save({
      filename,
      mimetype,
      fileGroup,
      suite: fileGroup.suite
    })
  }

  async store(fileGroup: FileGroup, data: File) {
    const file = await this.create(fileGroup, data)
    await StorageService.save(file.id, data)
    return file
  }

  async find(id: string, options?: FindOneOptions<FileEntity>) {
    const file = await this.repository.findOne(id, options)
    console.log({ id, file })
    if (!file) {
      throw new NotFound()
    }

    return file
  }

  async data(id: string) {
    const file = await this.find(id)
    const blob = await StorageService.createStream(id)
    return { file, blob }
  }

  async remove(id: string) {
    await ComparisonService.removeWithFile(id)
    const file = await this.find(id)
    await this.repository.remove(file)
    await StorageService.remove(id)
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
