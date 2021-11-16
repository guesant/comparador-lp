import mime from "mime/lite"
import { NotFound } from "throw.js"
import { FindManyOptions, FindOneOptions, getRepository } from "typeorm/browser"
import StorageService from "../../StorageService"
import { FileSchema } from "../entities/FileSchema"
import { File as FileEntity } from "../models/File"
import { FileGroup } from "../models/FileGroup"

class FileService {
  get repository() {
    return getRepository<FileEntity>(FileSchema)
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

  async find(id: string, options?: FindOneOptions<File>) {
    const file = await this.repository.findOne(id)

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
    const file = await this.find(id)
    await this.repository.remove(file)
    await StorageService.remove(id)
  }
}

export default new FileService()
