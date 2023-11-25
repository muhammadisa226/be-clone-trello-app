import express from "express"
import {
  create,
  getById,
  remove,
  update,
  move,
} from "../controllers/itemController.js"
const itemRouter = express.Router()

itemRouter.get("/items/:id", getById)
itemRouter.post("/items", create)
itemRouter.patch("/items/:id", update)
itemRouter.patch("/items/:id/move", move)
itemRouter.delete("/items/:id", remove)
export default itemRouter
