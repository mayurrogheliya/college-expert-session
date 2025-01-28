import { Book } from "../models/book.model.js"

const addBook = async (req, res) => {
    const book = await Book.create({ ...req.body });

    if (!book) {
        return res.status(400).json({ message: "Invalid book data" });
    }

    res.status(201).json({
        status: true,
        message: "Book added successfully",
        book
    });
}

const getBooks = async (_, res) => {
    try {
        const books = await Book.find();

        if (books.length <= 0) {
            return res.status(404).json({ message: "No books available" });
        }

        res.status(200).json({
            status: true,
            message: "Books retrieved successfully",
            books
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Server Error"
        });
    }
}

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({
            status: true,
            message: "Book deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Server Error"
        });
    }

}

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        const updateBook = await Book.findByIdAndUpdate(id, { ...req.body }, { new: true });

        if (!updateBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({
            status: true,
            message: "Book updated successfully",
            book: updateBook
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Server Error"
        });
    }
}

export { getBooks, addBook, deleteBook, updateBook }