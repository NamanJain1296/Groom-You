var express = require('express')
var controller = require("../contorllers/postcontrollers")
var app = express.Router()

app.post("/post-req", controller.doPost)
app.get("/distinct-categories2",controller.distinctCategories2);
app.get("/distinct-cities2", controller.distinctCities2)
app.post("/searchClient",controller.searchClient);

module.exports = app;