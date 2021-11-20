import { createServer, Response } from "miragejs"
import { Server } from "miragejs/server"
import FileReaderService from "../FileReaderService"
import DatabaseService from "./DatabaseService"
import ComparisonService from "./services/ComparisonService"
import FileGroupService from "./services/FileGroupService"
import FileService from "./services/FileService"
import SuiteService from "./services/SuiteService"

class APIServer {
  server: Server | null = null

  async startServer() {
    if (this.server) {
      this.server.shutdown()
      this.server = null
    }

    this.server = createServer({
      routes() {
        this.timing = 0
        this.namespace = "api/"

        this.get("suites", () => SuiteService.list())

        this.get("suites/:id", (_, request) =>
          SuiteService.find(request.params.id)
        )
        this.post("suites", () => SuiteService.create())

        this.delete("suites/:id", (_, request) =>
          SuiteService.delete(request.params.id)
        )

        this.get("suites/:id/files", (_, request) =>
          FileService.listFromSuite(request.params.id)
        )
        this.get("suites/:id/fileGroups", (_, request) =>
          FileGroupService.listFromSuite(request.params.id)
        )

        this.post("suites/:id/fileGroups", (_, request) =>
          FileGroupService.create(request.params.id)
        )

        this.get("suites/:id/comparisons", (_, request) =>
          ComparisonService.listFromSuite(request.params.id)
        )

        this.post("suites/:id/comparisons/sync", (_, request) =>
          SuiteService.syncComparisons(request.params.id)
        )
        this.post("suites/:id/comparisons/run", (_, request) =>
          SuiteService.runComparisons(request.params.id)
        )

        this.get("files", () => FileService.list())

        this.get("files/:id", (_, request) =>
          FileService.find(request.params.id)
        )

        this.delete("files/:id", (_, request) =>
          FileService.remove(request.params.id)
        )

        this.get("files/:id/data", async (_, request) => {
          const { file, blob } = await FileService.data(request.params.id)
          return new Response(
            200,
            {
              "Content-Type": file.mimetype
            },
            await FileReaderService.readAsString(blob)
          )
        })

        this.get("fileGroups/:id", (_, request) =>
          FileGroupService.find(request.params.id)
        )
        this.delete("fileGroups/:id", (_, request) =>
          FileGroupService.remove(request.params.id)
        )

        this.post("fileGroups/:id/files", (_, request) => {
          const formData = request.requestBody as unknown as FormData

          const formDataFiles = Array.from(formData.keys())
            .filter((i) => i.startsWith("file"))
            .map((i) => formData.get(i) as File)

          return FileService.storeFiles(request.params.id, formDataFiles)
        })

        this.get("comparisons/:id", (_, request) =>
          ComparisonService.find(request.params.id)
        )
      }
    })
  }

  async setup() {
    await DatabaseService.setup()
    await this.startServer()
  }
}

export const apiServer = new APIServer()
