var express = require('express')
var controller = require("../contorllers/contactcontrollers")
var app = express.Router()

app.post("/contact-us",controller.doContact);

module.exports = app;