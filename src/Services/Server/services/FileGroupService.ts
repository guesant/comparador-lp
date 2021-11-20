import { getRepository } from "typeorm/browser"
import { FileGroupEntity } from "../entities/FileGroupEntity"
import FileService from "./FileService"

class FileGroupService {
  get repository() {
    return getRepository(FileGroupEntity)
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

  async find(id: string) {
    return this.repository.findOne(id, { relations: ["suite"] })
  }

  async remove(id: string) {
    const fileGroup = await this.repository.findOne(id, {
      relations: ["files"]
    })

    if (fileGroup) {
      for (const file of fileGroup.files) {
        await FileService.remove(file.id)
      }
      await this.repository.remove(fileGroup)
    }

    return {}
  }
}

export default new FileGroupService()
