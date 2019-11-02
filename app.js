
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");


// connect and get the database client
const client = require("./database");

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

// create express app
const app = express();

app.use( (req, next, res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

// routing
app.use('/api/v1/auth', )





