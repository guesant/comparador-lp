import { File } from "./File"
import { Suite } from "./Suite"

export class FileGroup {
  id!: string
  files!: File[]
  suite!: Suite
}
