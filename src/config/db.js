import mongoose from "mongoose"

const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/WebExpert');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
}

export default dbConnection;