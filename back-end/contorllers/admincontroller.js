var adminEntrySchema = require("../models/adminmodel")
var adminEntryColRef = adminEntrySchema();

async function doAdminLogin(req, res){
    console.log(req.body);
    var obj = new adminEntryColRef(req.body)

    try{
        await obj.save();
        res.send("Admin Logged In Successfully");
    }catch(err){
        res.send(err);
    }
}

module.exports = {doAdminLogin};