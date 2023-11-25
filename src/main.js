import { logger } from "./app/logging.js"
import { web } from "./app/web.js"
import "dotenv/config"
web.listen(process.env.APP_PORT, () => {
  logger.info(`App Start In Port ${process.env.APP_PORT}`)
})
