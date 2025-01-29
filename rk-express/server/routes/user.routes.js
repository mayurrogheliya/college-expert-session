import { Router } from "express";
import { createUser, getUserProfile, loginUser } from "../controllers/user.controller.js";
import { userProtectBearer } from "../middlewares/UserProtect.js";

const router = Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/getUser', userProtectBearer, getUserProfile);

export default router;