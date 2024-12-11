import express from 'express';
import multer from 'multer';
import { carController } from '../controllers/index.js';
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validatorMiddleWare } from '../middleware/validatorMiddleware.js';
import { carSchema } from "../validations/carValidation.js";

const router = express.Router();


const upload = multer({ dest: 'uploads/' });

router.post('/add-car', authMiddleware, validatorMiddleWare(carSchema), upload.array('pictures', 10), carController.addCar);

export default router;

