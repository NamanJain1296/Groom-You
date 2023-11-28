var express = require('express')
var controller = require("../contorllers/postcontrollers")
var app = express.Router()

app.post("/post-req", controller.doPost)

module.exports = app;