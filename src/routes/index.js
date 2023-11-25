import express from "express"
import todoRouter from "./todoRoutes.js"
import itemRouter from "./itemRoutes.js"
const router = express.Router()
const apiVersion = "/api/v1"

router.get(`/`, (req, res) => {
  return res.status(200).json({
    message: "Welcome To api Clone-Trello",
    version: "1.0.0",
  })
})
router.get(`${apiVersion}`, (req, res) => {
  return res.status(200).json({
    message: "Welcome To api Clone-Trello",
    version: "1.0.0",
  })
})
router.use(`${apiVersion}`, todoRouter)
router.use(`${apiVersion}`, itemRouter)
router.get("*", (req, res) => {
  res.status(404).json({
    data: null,
    message: null,
    errors: "Not Found",
  })
})
export default router
