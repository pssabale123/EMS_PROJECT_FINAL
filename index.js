require("dotenv").config();

const express = require("express");
const app = express();


app.get("/",function(req,res){
    res.send("HOME");
})

//import logging
const log = require("./start/logging");
log();

//configuring cors
require("./start/cors")(app);

//checked jwt key is present or not
const checkJwt = require("./start/config");
checkJwt();


//connecting to database
require("./start/db")()

//importing routes
require("./start/route")(app);

//setting port 
require("./start/port")(app);