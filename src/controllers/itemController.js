import { prismaClient } from "../app/database.js"
import { ResponseError } from "../error/response-error.js"
import { validate } from "../validation/index.js"
import {
  createItem,
  updateItemValidation,
  removeItemValidation,
  getItemByIdValidation,
  moveItemValidation,
} from "../validation/itemValidation.js"
export const getById = async (req, res, next) => {
  try {
    const idItem = validate(getItemByIdValidation, req.params.id)
    const itemCount = await prismaClient.item.count({
      where: {
        id: idItem,
      },
    })
    if (itemCount !== 1) {
      throw new ResponseError(404, "Item is not found")
    }
    const response = await prismaClient.item.findUnique({
      where: {
        id: idItem,
      },
      select: {
        id: true,
        name: true,
        todoId: true,
      },
    })
    return res.status(200).json({
      data: response,
      message: "Get Item Success",
      errors: null,
    })
  } catch (error) {
    next(error)
  }
}
export const create = async (req, res, next) => {
  try {
    const request = req.body
    const itemData = validate(createItem, request)
    const response = await prismaClient.item.create({
      data: itemData,
    })
    return res.status(201).json({
      data: response,
      message: "Create Item Success",
      errors: null,
    })
  } catch (error) {
    next(error)
  }
}
export const update = async (req, res, next) => {
  try {
    const validatedData = validate(updateItemValidation, {
      id: req.params.id,
      name: req.body.name,
    })
    const itemCount = await prismaClient.item.count({
      where: {
        id: validatedData.id,
      },
    })
    if (itemCount !== 1) {
      throw new ResponseError(404, "Item is not found")
    }
    const response = await prismaClient.item.update({
      where: { id: validatedData.id },
      data: {
        name: validatedData.name,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        todoId: true,
      },
    })
    return res.status(200).json({
      data: response,
      message: "Update Item Success",
      errors: null,
    })
  } catch (e) {
    next(e)
  }
}
export const remove = async (req, res, next) => {
  try {
    const idItem = validate(removeItemValidation, req.params.id)
    const itemCount = await prismaClient.item.count({
      where: {
        id: idItem,
      },
    })
    if (itemCount !== 1) {
      throw new ResponseError(404, "Item is not found")
    }
    await prismaClient.item.delete({
      where: { id: idItem },
    })
    return res.status(200).json({
      data: null,
      message: "Delete Item Success",
      errors: null,
    })
  } catch (e) {
    next(e)
  }
}
export const move = async (req, res, next) => {
  try {
    const { id } = req.params
    const { targetTodoId } = req.body
    const validatedData = validate(moveItemValidation, { id, targetTodoId })
    const itemCount = await prismaClient.item.count({
      where: {
        id: validatedData.id,
      },
    })
    const todoCount = await prismaClient.todo.count({
      where: {
        id: validatedData.targetTodoId,
      },
    })
    console.log(todoCount)
    if (itemCount !== 1) {
      throw new ResponseError(404, "Item is not found")
    } else if (todoCount !== 1) {
      throw new ResponseError(404, "Todo is not found")
    }
    const response = await prismaClient.item.update({
      where: { id: validatedData.id },
      data: {
        todoId: validatedData.targetTodoId,
      },
      select: {
        id: true,
        name: true,
        todoId: true,
      },
    })
    return res.status(200).json({
      data: response,
      message: "Move Item Success",
      errors: null,
    })
  } catch (e) {
    next(e)
  }
}
