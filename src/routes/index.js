import express from "express"
import todoRouter from "./todoRoutes.js"

const router = express.Router()
const apiVersion = "/api/v1"

router.get(`${apiVersion}`, (req, res) => {
  return res.status(200).json({
    message: "Welcome To api Clone-Trello",
    version: "1.0.0",
  })
})
router.use(`${apiVersion}`, todoRouter)

export default router
