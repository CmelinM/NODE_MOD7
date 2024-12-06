import Joi from "joi";
/** * nombre, apellido, email, password * Representa el usuario enviado por el cliente */ const id =
  Joi.number()
    .integer()
    .messages({
      "number.base": "El ID debe ser un número.",
      "number.integer": "El ID debe ser un número entero.",
    });
const nombre = Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .messages({
    "string.alphanum":
      "El nombre solo puede contener caracteres alfanuméricos.",
    "string.min": "El nombre debe tener al menos 3 caracteres.",
    "string.max": "El nombre no puede exceder los 30 caracteres.",
    "string.base": "El nombre debe ser un texto.",
  });
const apellido = Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .messages({
    "string.alphanum":
      "El apellido solo puede contener caracteres alfanuméricos.",
    "string.min": "El apellido debe tener al menos 3 caracteres.",
    "string.max": "El apellido no puede exceder los 30 caracteres.",
    "string.base": "El apellido debe ser un texto.",
  });
const email = Joi.string()
  .email()
  .messages({
    "string.email": "Debes proporcionar un email válido.",
    "string.base": "El email debe ser un texto.",
  });
const password = Joi.string()
  .min(6)
  .messages({
    "string.min": "La contraseña debe tener al menos 6 caracteres.",
    "string.base": "La contraseña debe ser un texto.",
  });
export const createUserSchema = Joi.object({
  nombre: nombre
    .required()
    .messages({ "any.required": "El nombre es obligatorio." }),
  apellido: apellido
    .required()
    .messages({ "any.required": "El apellido es obligatorio." }),
  email: email
    .required()
    .messages({ "any.required": "El email es obligatorio." }),
  password: password
    .required()
    .messages({ "any.required": "La contraseña es obligatoria." }),
});
export const updateUserSchema = Joi.object({
  nombre: nombre.optional(),
  email: email.optional(),
  apellido: apellido.optional(),
})
  .min(1)
  .messages({
    "object.min":
      "Debes proporcionar al menos un campo: nombre, email o apellido.",
  });
