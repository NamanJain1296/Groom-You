var postReqSchema = require("../models/postmodel")

var postReqColRef = postReqSchema();

async function doPost(req, res){
    console.log(req.body);

    const { email, cat, task, utd, loc, mobile } = req.body;

    try {
        const newReq = new postReqColRef({
            email, 
            cat, 
            task, 
            utd, 
            loc, 
            mobile
        });

        await newReq.save();
        res.send("Requirement Posted Successfully");
    } catch (err) {
        res.status(500).send("Error Posting Requirement: " + err);
    }
}

module.exports = {doPost};