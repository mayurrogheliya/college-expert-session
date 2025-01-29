import { Router } from "express";
import { createBook } from "../controllers/book.controller.js";
import { userProtectBearer } from "../middlewares/UserProtect.js";

const router = Router();

router.post('/create', userProtectBearer, createBook);

export default router;