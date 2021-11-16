import { Archive } from "libarchive.js"
import libArchiveWorkerURL from "libarchive.js/dist/worker-bundle.js?url"
import { renameFile } from "./Utils/renameFile"
import { strcmp } from "./Utils/strcmp"

const workerUrl = window.location.origin + libArchiveWorkerURL

Archive.init({ workerUrl })

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

  async findFile(archive: Archive, filename: string) {
    const { file } = await this.find(archive, filename)
    return file
  }

  async extract(file: File, filename: string) {
    const archive = await Archive.open(file)
    const targetArchiveFile = await this.findFile(archive, filename)
    return targetArchiveFile.extract()
  }

  async extractWithPathname(file: File, filename: string) {
    const targetArchiveFile = await this.extract(file, filename)
    return renameFile(targetArchiveFile, filename)
  }
}

export default new LibArchiveService()
