import { createServer } from "miragejs"
import { Server } from "miragejs/server"
import initSql from "sql.js"
import sqlWaswmURL from "sql.js/dist/sql-wasm.wasm?url"
import { createConnection, getConnection } from "typeorm/browser"

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
        entities: []
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
      }
    })
  }
}

export const apiServer = new APIServer()
