import idbFs from "indexeddb-fs"

class StorageService {
  base = "/data"

  getPath(id: string) {
    return this.base + "/" + id
  }

  async ensureDataDirectory() {
    if (!(await idbFs.exists(this.base))) {
      await idbFs.createDirectory(this.base)
    }
  }

  async save(id: string, file: File) {
    await this.ensureDataDirectory()
    await idbFs.writeFile(this.getPath(id), file)
  }

  async createStream(id: string) {
    return idbFs.readFile<File>(this.getPath(id))
  }

  async remove(id: string) {
    const path = this.getPath(id)
    if (await idbFs.exists(path)) {
      await idbFs.remove(path)
    }
  }
}

export default new StorageService()
