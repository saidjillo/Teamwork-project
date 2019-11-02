
const { Client } = require("pg");


const client = new Client({
    user: "postgres",
    password: "benora1990",
    host: "localhost",
    port: 5432,
    database: "teamwork",
});



module.exports = client;





