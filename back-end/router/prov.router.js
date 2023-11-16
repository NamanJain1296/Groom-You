var express = require('express')
var controller = require("../contorllers/provcontroller")
var app = express.Router()

app.post("upload-profile", controller.doUpload)
app.post("modify-profile", controller.doModify);

module.exports = app;