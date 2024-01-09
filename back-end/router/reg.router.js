var express = require('express');
var controller = require("../contorllers/regcontroller")
var app = express.Router();
var {jawth} = require("../middleware/auth")

app.post("/signup-process", controller.signup_with_post)
app.post("/login-process", controller.login_with_post)
app.get("/currentUser", jawth,controller.currentUser)
module.exports = app;