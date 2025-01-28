import express from 'express';
import routes from './routes/index.routes.js';
import dbConnection from './config/db.js';

const app = express();
const port = 3500;

app.use(express.json());

app.use("/api/books", routes)

app.get("/", (req, res) => {
    res.send('<h1>Hello, World!</h1>');
})

dbConnection()
    .then(() => {
        app.listen(port, () => {
            console.log(`you server is running on http://localhost:${port}`);
        })
    })
    .catch((err) => console.error(err));
