import { Router } from 'express';
import { addBook, deleteBook, getBooks, updateBook } from '../controllers/book.controller.js';

const router = Router();

router.get('/', getBooks);
router.post('/', addBook);
router.delete('/:id', deleteBook);
router.put('/:id', updateBook);

export default router;