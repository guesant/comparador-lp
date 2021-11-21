import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm/browser"
import { ComparisonStatus } from "../ComparisonStatus"
import { FileEntity } from "./FileEntity"
import { SuiteEntity } from "./SuiteEntity"

@Entity("comparison")
export class ComparisonEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column("varchar", { default: ComparisonStatus.QUEUED })
  status: ComparisonStatus

  @ManyToOne("file", { onDelete: "CASCADE" })
  firstFile: FileEntity

  @ManyToOne("file", { onDelete: "CASCADE" })
  secondFile: FileEntity

  @Column("integer", { nullable: true })
  levenshteinDistance: number | null

  @ManyToOne("suite", (suite) => suite.comparisons, { onDelete: "CASCADE" })
  suite: SuiteEntity
}
