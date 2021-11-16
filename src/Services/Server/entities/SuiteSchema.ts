import { EntitySchema } from "typeorm/browser"
import { Suite } from "../models/Suite"

export const SuiteSchema = new EntitySchema<Suite>({
  name: "Suite",
  tableName: "suite",
  columns: {
    id: {
      primary: true,
      type: "varchar",
      length: 36,
      generated: "uuid"
    }
  }
})
