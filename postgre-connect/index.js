import express from 'express';
import { createPlayer, deletePlayer, fun1, fun2, fun3, getPlayers, updatePlayer } from "./controllers/PlayerDB.js"
const app = express();
const port = 4500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.get('/e1', fun1)
app.get('/e2', fun2)
app.get('/addPlayer', createPlayer);
app.get('/getPlayers', getPlayers);
app.get('/deletePlayers/:id', deletePlayer);
app.get('/updatePlayers/:id', updatePlayer);
app.get('/*', fun3)

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
})