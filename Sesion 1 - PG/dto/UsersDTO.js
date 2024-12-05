import Joi from "joi";

/**
 * nombre, apellido, email, password
 * Representa el usuario enviado por el cliente
 */
const id = Joi.number().integer();
const nombre = Joi.string().alphanum().min(3).max(30)
const apellido = Joi.string().alphanum().min(3).max(30)
const email = Joi.string().email()
const password = Joi.string().min(6)
// const role = Joi.string().pattern(new RegExp('(user)|(admin)')).default('user'),

export const createUserSchema = Joi.object({
  nombre: nombre.required(),
  apellido: apellido.required(),
  email: email.required(),
  password: password.required()
});

export const updateUserSchema = Joi.object({
  nombre,
  email,
  apellido
})
