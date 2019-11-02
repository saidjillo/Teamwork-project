
const { Client } = require("pg");


const client = new Client({
    user: "postgres",
    password: "benora1990",
    host: "localhost",
    port: 5432,
    database: "teamwork",
});


client.connect()
    .then( (con)=>{
        console.log("Connected Successfully");
    })

    .catch( (error)=> {
        console.log("App could not connect to the database");
    })

    .finally( ()=>{
        client.end();
        console.log("Successfully disconnected to the database");
    });


module.exports = client;





