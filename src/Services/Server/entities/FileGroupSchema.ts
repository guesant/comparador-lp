import { EntitySchema } from "typeorm/browser"
import { FileGroup } from "../models/FileGroup"

export const FileGroupSchema = new EntitySchema<FileGroup>({
  name: "FileGroup",
  tableName: "file-group",
  columns: {
    id: {
      primary: true,
      type: "varchar",
      length: 36,
      generated: "uuid"
    }
  },
  relations: {
    files: {
      target: "File",
      type: "one-to-many",
      inverseSide: "fileGroup"
    },
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
