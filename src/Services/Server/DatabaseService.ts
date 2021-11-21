import initSqlJs from "sql.js"
import { createConnection, getConnection } from "typeorm/browser"
import { ComparisonEntity } from "./entities/ComparisonEntity"
import { FileEntity } from "./entities/FileEntity"
import { FileGroupEntity } from "./entities/FileGroupEntity"
import { SuiteEntity } from "./entities/SuiteEntity"

class DatabaseService {
  get isConnected() {
    return new Promise((resolve) => {
      try {
        getConnection()
        resolve(true)
      } catch (e) {
        resolve(false)
      }
    })
  }

  async setupSqlJS() {
    if (!("SQL" in window)) {
      const SQL = await initSqlJs({
        locateFile: (file) => `https://sql.js.org/dist/${file}`
      })

      ;(window as any).SQL = SQL
    }
  }

  async setupConnection() {
    if (!(await this.isConnected)) {
      await createConnection({
        type: "sqljs",
        location: "data",
        autoSave: true,
        entities: [SuiteEntity, ComparisonEntity, FileGroupEntity, FileEntity],
        synchronize: true,
        useLocalForage: true,
        ...(process.env.NODE_ENV !== "production"
          ? {
              logging: ["query", "schema"]
            }
          : {})
      })
    }
  }

  async setup() {
    await this.setupSqlJS()
    await this.setupConnection()
  }
}

export default new DatabaseService()
