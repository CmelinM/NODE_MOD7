import Joi from "joi";
const id = Joi.number().integer();
const nombre = Joi.string().min(3).max(30);
const genero = Joi.string().max(30);
const year = Joi.string().max(4);
const autor = Joi.string().max(30);
const stock = Joi.number().integer().min(0)

export const createAnimeSchema = Joi.object({
  nombre: nombre.required(),
  genero: genero.required(),
  year: year.required(),
  autor: autor.required(),
  stock: stock.required()
});

export const updateAnimeSchema = Joi.object({
  id: id.required(),
  nombre: nombre.optional(),
  genero: genero.optional(),
  year: year.optional(),
  autor: autor.optional(),
  stock: stock.optional()
}).or("nombre", "genero", "year", "autor", "stock");

