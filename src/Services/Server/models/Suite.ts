import { Comparison } from "./Comparison"
import { File } from "./File"
import { FileGroup } from "./FileGroup"

export class Suite {
  id!: string
  files!: File[]
  comparisons!: Comparison[]
  fileGroups!: FileGroup[]
}
