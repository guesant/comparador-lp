import { EntitySchema } from "typeorm/browser"
import { Comparison, ComparisonStatus } from "../models/Comparison"

export const ComparisonSchema = new EntitySchema<Comparison>({
  name: "Comparison",
  tableName: "comparison",
  columns: {
    id: {
      primary: true,
      type: "varchar",
      generated: "uuid"
    },
    status: {
      type: "varchar",
      enum: ComparisonStatus,
      default: ComparisonStatus.QUEUED
    },
    levenshteinDistance: {
      type: "int",
      nullable: true
    }
  },
  relations: {
    firstFile: {
      target: "File",
      type: "many-to-one",
      onDelete: "CASCADE",
      cascade: ["remove"]
    },
    secondFile: {
      target: "File",
      type: "many-to-one",
      onDelete: "CASCADE",
      cascade: ["remove"]
    },
    suite: {
      target: "Suite",
      type: "many-to-one",
      cascade: ["remove"],
      onDelete: "CASCADE",
      inverseSide: "suite"
    }
  }
})
