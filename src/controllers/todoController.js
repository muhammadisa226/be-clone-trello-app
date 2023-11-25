import { prismaClient } from "../app/database.js"
import { ResponseError } from "../error/response-error.js"
import { validate } from "../validation/index.js"
import {
  createTodo,
  getTodoByIdValidation,
  updateTodoValidation,
  removeTodoValidation,
} from "../validation/todoValidation.js"
export const getAll = async (req, res, next) => {
  try {
    const response = await prismaClient.todo.findMany({
      select: {
        id: true,
        name: true,
        items: true,
      },
    })
    return res.status(200).json({
      data: response,
      message: "Get All Todo Success",
      errors: null,
    })
  } catch (error) {
    next(error)
  }
}
export const getById = async (req, res, next) => {
  try {
    const idTodo = validate(getTodoByIdValidation, req.params.id)
    const todoCount = await prismaClient.todo.count({
      where: {
        id: idTodo,
      },
    })
    if (todoCount !== 1) {
      throw new ResponseError(404, "Todo is not found")
    }
    const response = await prismaClient.todo.findUnique({
      where: {
        id: idTodo,
      },
      select: {
        id: true,
        name: true,
        items: true,
      },
    })
    return res.status(200).json({
      data: response,
      message: "Get Todo Success",
      errors: null,
    })
  } catch (error) {
    next(error)
  }
}
export const create = async (req, res, next) => {
  try {
    const request = req.body
    const todoData = validate(createTodo, request)
    const response = await prismaClient.todo.create({
      data: todoData,
    })
    return res.status(201).json({
      data: response,
      message: "Create Todo Success",
      errors: null,
    })
  } catch (error) {
    next(error)
  }
}
export const update = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name } = req.body
    const data = { id, name }
    const validatedData = validate(updateTodoValidation, data)
    const todoCount = await prismaClient.todo.count({
      where: {
        id: Number(id),
      },
    })
    if (todoCount !== 1) {
      throw new ResponseError(404, "Todo is not found")
    }

    const response = await prismaClient.todo.update({
      where: { id: Number(id) },
      data: {
        name: validatedData.name,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        items: true,
      },
    })
    return res.status(200).json({
      data: response,
      message: "Update Todo Success",
      errors: null,
    })
  } catch (e) {
    next(e)
  }
}
export const remove = async (req, res, next) => {
  try {
    const idTodo = validate(removeTodoValidation, req.params.id)
    const todoCount = await prismaClient.todo.count({
      where: {
        id: idTodo,
      },
    })
    if (todoCount !== 1) {
      throw new ResponseError(404, "Todo is not found")
    }
    await prismaClient.todo.delete({
      where: { id: idTodo },
    })
    return res.status(200).json({
      data: null,
      message: "Delete Todo Success",
      errors: null,
    })
  } catch (e) {
    next(e)
  }
}
