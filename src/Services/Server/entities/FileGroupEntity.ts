import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm/browser"
import { FileEntity } from "./FileEntity"
import { SuiteEntity } from "./SuiteEntity"

@Entity("file-group")
export class FileGroupEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @OneToMany("file", (file) => file.fileGroup)
  @JoinColumn()
  files: FileEntity[]

  @ManyToOne("suite", (suite) => suite.fileGroups, {
    onDelete: "CASCADE",
    cascade: ["remove"]
  })
  @JoinColumn()
  suite: SuiteEntity
}
