import { Archive } from "libarchive.js"
import { renameFile } from "./Utils/renameFile"
import { strcmp } from "./Utils/strcmp"

Archive.init({ workerUrl: window.location.origin + "/worker-bundle.js" })

class LibArchiveService {
  async list(file: File): Promise<{ filename: string }[]> {
    const archive = await Archive.open(file)

    const archiveFiles = await (archive.getFilesArray() as Promise<any[]>)

    return archiveFiles
      .map(({ file: { _path } }) => ({ filename: _path }))
      .sort((a, b) => strcmp(a.filename, b.filename))
  }

  async find(archive: Archive, filename: string) {
    const archiveFiles = await (archive.getFilesArray() as Promise<any[]>)
    return archiveFiles.find((i) => i.file._path === filename)!
  }

  async extractFiles(file: File, filenameList: string[]) {
    const archive = await Archive.open(file)
    const archiveFiles = await (archive.getFilesArray() as Promise<any[]>)

    const targetArchiveFiles = archiveFiles.filter((i) =>
      filenameList.includes(i.file._path)
    )

    return Promise.all(targetArchiveFiles.map(({ file }) => file.extract()))
  }

  async extractWithPathNames(file: File, filenameList: string[]) {
    const targetFiles = await this.extractFiles(file, filenameList)
    return targetFiles.map((i, idx) => renameFile(i, filenameList[idx]))
  }
}

export default new LibArchiveService()
