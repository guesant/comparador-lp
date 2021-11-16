import { NotFound } from "throw.js"
import { FindOneOptions, getRepository } from "typeorm/browser"
import { combineDuo } from "../../Utils/combineDuo"
import { SuiteSchema } from "../entities/SuiteSchema"
import { ComparisonStatus } from "../models/Comparison"
import { Suite } from "../models/Suite"
import ComparisonService from "./ComparisonService"
import FileGroupService from "./FileGroupService"

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

  async syncComparisons(suiteId: string) {
    const fileGroups = await FileGroupService.listFromSuite(suiteId)
    const idCombinations = combineDuo(
      fileGroups.map(({ files }) => files.map(({ id }) => id))
    )

    for (const [firstId, secondId] of idCombinations) {
      const combination = await ComparisonService.findWithFiles(
        firstId,
        secondId
      )

      if (!combination) {
        await ComparisonService.createComparison(suiteId, firstId, secondId)
      }
    }

    return idCombinations
  }

  async runComparisons(suiteId: string) {
    const comparisons = await ComparisonService.listFromSuite(suiteId, {
      where: { status: ComparisonStatus.QUEUED }
    })

    for (const comparison of comparisons) {
      await ComparisonService.run(comparison.id)
    }

    return {}
  }
}

export default new SuiteService()
