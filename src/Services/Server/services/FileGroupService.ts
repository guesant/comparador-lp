import { getRepository } from "typeorm/browser"
import { FileGroupSchema } from "../entities/FileGroupSchema"
import { FileGroup } from "../models/FileGroup"
import FileService from "./FileService"

class FileGroupService {
  get repository() {
    return getRepository<FileGroup>(FileGroupSchema)
  }

  async listFromSuite(suiteId: string) {
    return this.repository.find({
      where: { suite: { id: suiteId } },
      relations: ["files"]
    })
  }

  async create(suiteId: string) {
    return this.repository.save({ suite: { id: suiteId } })
  }

  async find(id: FileGroup["id"]) {
    return this.repository.findOne(id, { relations: ["suite"] })
  }

  async remove(id: FileGroup["id"]) {
    const fileGroup = await this.repository.findOne(id, {
      relations: ["files"]
    })

    if (fileGroup) {
      for (const file of fileGroup.files) {
        await FileService.remove(file.id)
      }

      return this.repository.remove(fileGroup)
    }

    return {}
  }
}

export default new FileGroupService()
