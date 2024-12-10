import Joi from "joi";
const id = Joi.number().integer();

export const buyIdSchema = Joi.object({
  anime_id: id.required()
})
