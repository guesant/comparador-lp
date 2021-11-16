import { createServer } from "miragejs"
import { Server } from "miragejs/server"
import initSql from "sql.js"
import sqlWaswmURL from "sql.js/dist/sql-wasm.wasm?url"
import { createConnection, getConnection } from "typeorm/browser"
import { SuiteSchema } from "./entities/SuiteSchema"
import SuiteService from "./services/SuiteService"

class APIServer {
  server: Server | null = null

  async setupSqlJS() {
    if (!("SQL" in window)) {
      ;(window as any).SQL = await initSql({
        locateFile: () => sqlWaswmURL
      })
    }
  }

  async setupDatabase() {
    try {
      getConnection()
    } catch (e) {
      await this.setupSqlJS()
      await createConnection({
        type: "sqljs",
        autoSave: true,
        synchronize: true,
        useLocalForage: true,
        location: "dbdata",
        entities: [SuiteSchema]
      })
    }
  }

  async startServer() {
    await this.setupDatabase()

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
      }
    })
  }
}

export const apiServer = new APIServer()
