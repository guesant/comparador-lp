import { File } from "./File"
import { Suite } from "./Suite"

/* eslint-disable */
export enum ComparisonStatus {
  QUEUED = "queued",
  DONE = "done"
}

/* eslint-enable */

export class Comparison {
  id!: string
  status!: ComparisonStatus
  firstFile!: File
  secondFile!: File
  levenshteinDistance!: number | null
  suite!: Suite
}
