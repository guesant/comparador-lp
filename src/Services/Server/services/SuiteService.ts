import { NotFound } from "throw.js"
import { FindOneOptions, getRepository } from "typeorm/browser"
import { SuiteSchema } from "../entities/SuiteSchema"
import { Suite } from "../models/Suite"

class SuiteService {
  get repository() {
    return getRepository(SuiteSchema)
  }

  async create() {
    const suite = new Suite()
    await this.repository.save(suite)
    return suite
  }

  async list() {
    return this.repository.find()
  }

  async find(id: string, options?: FindOneOptions<Suite>) {
    const suite = await this.repository.findOne(id, options)

    if (!suite) {
      throw new NotFound(`suite '${id}' was not found`)
    }

    return suite
  }

  async delete(id: string) {
    await this.repository.remove(await this.find(id))
  }
}

export default new SuiteService()
