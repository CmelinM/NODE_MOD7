const express = require('express')
const { UsersController } = require('../controllers')

const router = express.Router()

router.post("/", UsersController.create)
router.get("/", UsersController.getAll)
router.get("/:id", UsersController.findById)
router.delete("/:id", UsersController.delete)
router.put("/:id", UsersController.update)

module.exports = {
  UserRouters: router
}