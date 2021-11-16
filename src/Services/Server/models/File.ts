import { FileGroup } from "./FileGroup"
import { Suite } from "./Suite"

export class File {
  id!: string
  filename!: string
  mimetype!: string
  fileGroup!: FileGroup
  suite!: Suite
}
