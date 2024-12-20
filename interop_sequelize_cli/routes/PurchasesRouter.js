import express from 'express'
import { PurchasesController} from '../controller/index.js'

const router = express.Router()

router.post("/", PurchasesController.create)
 
export { router as PurchasesRouter }