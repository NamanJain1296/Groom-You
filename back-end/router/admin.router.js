var express = require('express')
var controller = require("../contorllers/admincontroller")
var app = express.Router()

app.post("/admin-process", controller.doAdminLogin)
module.exports = app;