var express = require('express')
var controller = require("../contorllers/provcontroller")
var app = express.Router()

app.post("/upload-profile", controller.doUpload)
app.post("/modify-profile", controller.doModify);
app.get("/distinct-categories", controller.distinctCategories)
app.get("/distinct-cities", controller.distinctCities)
app.post("/searchProv",controller.searchProv)
module.exports = app;