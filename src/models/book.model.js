import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        publicationYear: {
            type: Number,
            required: true
        },
    },
    { timestamps: true }
)

export const Book = mongoose.model("Book", bookSchema);