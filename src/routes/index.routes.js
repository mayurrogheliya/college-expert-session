import { Router } from 'express';
import books from './book.routes.js';

const router = Router();

router.use("/", books);

export default router;


