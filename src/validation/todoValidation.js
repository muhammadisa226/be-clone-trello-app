import Joi from "joi"

export const createTodo = Joi.object({
  name: Joi.string().max(255).required(),
})
export const getTodoByIdValidation = Joi.number().positive().label("id")
export const updateTodoValidation = Joi.object({
  id: Joi.number().positive().required(),
  name: Joi.string().max(255).required(),
})
export const removeTodoValidation = Joi.number().positive().label("id")
