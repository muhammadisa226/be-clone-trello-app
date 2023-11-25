import Joi from "joi"

export const createItem = Joi.object({
  name: Joi.string().max(255).required(),
  todoId: Joi.number().positive().required(),
})
export const getItemByIdValidation = Joi.number()
  .positive()
  .required()
  .label("id")
export const updateItemValidation = Joi.object({
  id: Joi.number().positive().required(),
  name: Joi.string().max(255).required(),
})
export const removeItemValidation = Joi.number()
  .positive()
  .required()
  .label("id")
export const moveItemValidation = Joi.object({
  id: Joi.number().positive().required(),
  targetTodoId: Joi.number().positive().required(),
})
