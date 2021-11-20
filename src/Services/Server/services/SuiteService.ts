import { getRepository } from "typeorm/browser"
import { combineDuo } from "../../Utils/combineDuo"
import { ComparisonStatus } from "../ComparisonStatus"
import { SuiteEntity } from "../entities/SuiteEntity"
import ComparisonService from "./ComparisonService"
import FileGroupService from "./FileGroupService"

class SuiteService {
  get repository() {
    return getRepository(SuiteEntity)
  }

  async create() {
    return this.repository.save({})
  }

  async list() {
    return this.repository.find()
  }

  async find(id: string) {
    return this.repository.findOne(id)
  }

  async delete(id: string) {
    const suite = await this.find(id)
    suite && (await this.repository.remove(suite))
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
      where: { status: ComparisonStatus.QUEUED },
      include: ["files"]
    })

    for (const comparison of comparisons) {
      await ComparisonService.run(comparison.id)
    }

    return {}
  }
}

export default new SuiteService()
