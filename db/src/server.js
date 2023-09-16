import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import {logEvent,deleteOldLogs} from './utils/audit_log.js'

main()

async function main() {
  const app = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(morgan('dev'))

  global.$log = logEvent

  // ===========>>>>>>>>> Schedule the deletion of old logs
  setInterval(deleteOldLogs, 24 * 60 * 60 * 1000)

  start(app, { port:8080 })
}


async function start(app, server_env) {
  try {
    app.listen(server_env.port, () => {
      console.log(`============>>>>>>>>Server listen on port ${server_env.port}<<<<<<<<=============`)
    })
  } catch (err) {
    throw new Error(err)
  }
}
