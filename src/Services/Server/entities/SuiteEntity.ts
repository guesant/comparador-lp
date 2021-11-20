import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm/browser"
import { ComparisonEntity } from "./ComparisonEntity"
import { FileEntity } from "./FileEntity"
import { FileGroupEntity } from "./FileGroupEntity"

@Entity("suite")
export class SuiteEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @OneToMany(() => FileEntity, (file) => file.suite)
  files: FileEntity[]

  @OneToMany("comparison", (compare) => compare.suite)
  comparisons: ComparisonEntity[]

  @OneToMany(() => FileGroupEntity, (fileGroup) => fileGroup.suite)
  fileGroups: FileGroupEntity[]
}
