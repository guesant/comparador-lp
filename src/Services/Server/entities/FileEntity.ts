import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm/browser"
import { FileGroupEntity } from "./FileGroupEntity"
import { SuiteEntity } from "./SuiteEntity"

@Entity("file")
export class FileEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  filename: string

  @Column()
  mimetype: string

  @Column({ type: "blob" })
  data: ArrayBuffer

  @ManyToOne(() => FileGroupEntity, (fileGroup) => fileGroup.files)
  fileGroup: FileGroupEntity

  @ManyToOne(() => SuiteEntity, (suite) => suite.files, { onDelete: "CASCADE" })
  suite: SuiteEntity
}
