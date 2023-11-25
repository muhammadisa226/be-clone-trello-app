import express from "express"
import cors from "cors"
import router from "../routes/index.js"
import { errorMiddleware } from "../middleware/error-middleware.js"
export const web = express()
web.use(cors())
web.use(express.json())
web.use(express.urlencoded({ extended: false }))
web.use(router)
web.use(errorMiddleware)
