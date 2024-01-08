var express = require('express')
var mongoose = require('mongoose')
var regrouter = require("./router/reg.router")
var profrouter = require("./router/prof.router")
var provrouter = require("./router/prov.router")
var postrouter = require("./router/post.router")
var contactrouter = require("./router/contact.router")
var adminrouter = require("./router/admin.router")
var bp = require("body-parser")
var cors = require("cors")
var app = express()
var env = require("dotenv");
var fileupload = require("express-fileupload")
env.config();

app.use(fileupload())
app.use(cors());
app.use(bp.urlencoded({extended:true}))
app.use('/uploads', express.static('uploads'));
app.use('/uploads2', express.static('uploads2'));

app.listen(3005,()=>{
    console.log("### SERVER STARTED ###");
})

var configObj = require("./dbconfig/dbconfig");
const dburl = configObj.dburl;

var dbCon = mongoose.connect(dburl).then(()=>{
    console.log("### CONNECTED ###");
}).catch((err)=>{
    console.log("$$$"+err.toString());
    process.exit();
})

app.use(express.json({extended:true})) // express.json is used so that the response type remains same in react and node js. Data is converted to json form
app.use("/user", regrouter);
app.use("/user", profrouter);
app.use("/user", provrouter);
app.use("/user", postrouter);
app.use("/user", contactrouter);
app.use("/user", adminrouter);
