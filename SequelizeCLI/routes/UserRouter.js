const express = require('express')
const { UserController } = require('../controllers')

const router = express.Router()

router.post("/", UserController.create)
router.get("/", UserController.all)
router.post("/:id/todos", UserController.createToDo)
router.get("/:id/todos", UserController.listTodos)

module.exports = {
  UserRouter: router
}