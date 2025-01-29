import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from "./routes/index.js";

// init express server
const app = express();

// loading env variables
dotenv.config();

const port = process.env.PORT || 3000;
const mongoose_url = process.env.MONGODB_URL

app.use(cors({
    origin: ['*'],
    credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1', routes);

app.get('/', (req, res) => {
    res.json({ message: 'API is running...' });
})

mongoose.connect
    (mongoose_url)
    .then(() => {
        console.log('Connected to MongoDB...');
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
    })