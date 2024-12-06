import Joi from "joi";

/**
 * nombre, apellido, email, password
 * Representa el usuario enviado por el cliente
 */
const id = Joi.number().integer();
const nombre = Joi.string().min(3).max(30)
const apellido = Joi.string().min(3).max(30)
const email = Joi.string().email().messages({'string.email': 'Debes proporcionar un email válido.'})
const password = Joi.string().min(6)
// const role = Joi.string().pattern(new RegExp('(user)|(admin)')).default('user'),

export const createUserSchema = Joi.object({
  nombre: nombre.required(),
  apellido: apellido.required(),
  email: email.required(),
  password: password.required()
});

export const updateUserSchema = Joi.object({
  id: id.required(),
  nombre: nombre.optional(),
  email: email.optional(),
  apellido: apellido.optional()
}).or('nombre', 'email', 'apellido')
