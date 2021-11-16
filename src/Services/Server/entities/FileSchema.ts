import { EntitySchema } from "typeorm/browser"
import { File } from "../models/File"

export const FileSchema = new EntitySchema<File>({
  name: "File",
  tableName: "file",

  columns: {
    id: {
      primary: true,
      type: "varchar",
      length: 36,
      generated: "uuid"
    },
    filename: {
      type: "varchar"
    },
    mimetype: {
      type: "varchar"
    }
  },
  relations: {
    suite: {
      target: "Suite",
      type: "many-to-one",
      cascade: ["remove"],
      onDelete: "CASCADE",
      inverseSide: "suite",
      joinColumn: true
    }
  }
})
