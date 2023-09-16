import fs from 'fs'
import path from 'path'
import moment from 'moment'

// Audit logs
const logDirectory = path.join(process.cwd(), 'logs')

if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory)

// Log fuction
const logEvent = (event, user, endpoint, request_time, level = 'info') => {
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
  const logMessage = `[${timestamp}] [${level}] [User: ${user}] [Time to takes execute: ${request_time}ms] [Endpoint: ${endpoint}] ${event}\n`

  const logFile = path.join(
    logDirectory,
    `${moment().format('YYYY-MM-DD')}.log`
  )

  fs.appendFileSync(logFile, logMessage, 'utf8')
}

// Function to delete old logs
const deleteOldLogs = () => {
  const thirtyDaysAgo = moment().subtract(30, 'days').format('YYYY-MM-DD')

  fs.readdirSync(logDirectory).forEach((file) => {
    const filePath = path.join(logDirectory, file)

    if (file.endsWith('.log') && file < thirtyDaysAgo) {
      fs.unlinkSync(filePath)
    }
  })
}

export { logEvent, deleteOldLogs }
