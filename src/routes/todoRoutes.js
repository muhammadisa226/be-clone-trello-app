import express from "express"
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../controllers/todoController.js"
const todoRouter = express.Router()

todoRouter.get("/todos", getAll)
todoRouter.get("/todos/:id", getById)
todoRouter.post("/todos", create)
todoRouter.put("/todos/:id", update)
todoRouter.delete("/todos/:id", remove)
export default todoRouter
