import pkg from "pg";
const { Pool } = pkg

function connectionObj() {
    const pool = new Pool({
        user: "postgres",
        host: "localhost",
        database: "postgres",
        password: "postgre123",
        port: 5432,
        max: 20,
    })
    return pool;
}

export default connectionObj;