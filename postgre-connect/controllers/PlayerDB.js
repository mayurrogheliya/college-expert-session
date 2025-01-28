import connectionObj from "./postgresdb.js";

const fun1 = (req, res) => {
    console.log("function 1 called");
    res.send("Function 1 executed");
}

const fun2 = (req, res) => {
    console.log("function 2 called");
    res.send("Function 2 executed");
}

const fun3 = (req, res) => {
    console.log("Not implemented");
    res.send("Not found please try again");
}

const pool = connectionObj();

const createPlayer = (req, res) => {
    try {
        pool.query(
            `INSERT INTO public.player1(pl_nm, pl_rum, pl_country)VALUES('${req.body.name}', ${req.body.run}, '${req.body.country}');`,
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).send("Internal Server Error");
                } else {
                    res.status(200).send("Player created successfully");
                }
            }
        )
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const getPlayers = (req, res) => {
    try {
        pool.query(
            "SELECT * FROM public.player1",
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).send("Internal Server Error");
                }
                res.status(200).json({
                    message: "Players fetched successfully",
                    data: result.rows
                })
            }
        )
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const deletePlayer = (req, res) => {
    const { id } = req.params;
    try {
        pool.query(
            `DELETE FROM public.player1 WHERE pl_id=${id}`,
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).send("Internal Server Error");
                } else if (result.rowCount === 0) {
                    res.status(404).send("Player not found");
                }
                else {
                    res.status(200).send("Player deleted successfully");
                }
            }
        )
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const updatePlayer = (req, res) => {
    const { id } = req.params;
    try {
        pool.query(
            `
            UPDATE public.player1
            SET pl_nm='${req.body.name}', pl_rum=${req.body.run}, pl_country='${req.body.country}'
            WHERE pl_id=${id}
            `,
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).send("Internal Server Error");
                } else if (result.rowCount === 0) {
                    res.status(404).send("Player not found");
                }
                else {
                    res.status(200).send("Player updated successfully");
                }
            }
        )
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

export { fun1, fun2, fun3, createPlayer, getPlayers, deletePlayer, updatePlayer };