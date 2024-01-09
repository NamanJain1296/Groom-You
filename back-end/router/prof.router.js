var express = require('express')
var controller = require("../contorllers/profcontroller")
var app = express.Router()

app.post("/save-profile",controller.doSave);
app.post("/update-profile", controller.doUpdate);
app.get("/fetch-profile", controller.doFetch);

module.exports = app;