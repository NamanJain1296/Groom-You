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

async function distinctCategories2(req, res){
    try{
        const user = await postReqColRef.distinct("cat")
        res.send({user,status:true});
        return
    }catch(err){
        res.status(500).json({message:"Something went wrong",status:false})
        console.log(err)
    }
}

async function distinctCities2(req, res){
    try{
        const user = await postReqColRef.distinct("loc")
        res.send({user,status:true});
        return
    }catch(err){
        res.status(500).json({message:"Something went wrong",status:false})
        console.log(err)
    }
}

async function searchClient(req, res){
    try{
        const clients = await postReqColRef.find({cat:req.body.cat, loc:req.body.loc});
        res.send(clients);
    }catch(err){
        console.error(err);
        res.status(500).send("Error searching for clients");
    }
}

module.exports = {doPost, distinctCategories2, distinctCities2, searchClient};