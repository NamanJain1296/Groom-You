var providerUserSchema = require("../models/provmodel")
var path = require('path')
var provColRef = providerUserSchema()

//Uplodaing Function
async function doUpload(req, res){
    console.log(req.body);

    const {email, name, mobile, address, city, cat, expert, exp, off, desc} = req.body;
    const idpic = req.files?.idpic;
    let idpicPath = '';

    if(idpic){
        idpicPath = path.join('uploads2', idpic.name);
        idpic.mv(idpicPath)
    }

    try{
        const newProfile = new provColRef({
            email, 
            name, 
            mobile, 
            address, 
            city, 
            cat, 
            expert, 
            exp, 
            off, 
            desc,
            idpic: idpicPath,
        });

        await newProfile.save();
        const uploadedProfile = await provColRef.findOne({email});
        res.json({ message: "Profile Uploaded Successfully", profile: uploadedProfile });
        }catch(err){
        res.status(500).send("Error Uploading Profile:" + err);
    }
}

//Modification Function
async function doModify(req, res){
    console.log(req.body);

    const {email, name, mobile, address, city, cat, expert, exp, off, desc} = req.body;
    const idpic = req.files?.idpic;
    let idpicPath = '';

    if(idpic){
        idpicPath = path.join(__dirname,'..','uploads2', idpic.name);
        idpic.mv(idpicPath)
    }

    const modifyData = {
        name, 
        mobile, 
        address, 
        city, 
        cat, 
        expert, 
        exp, 
        off, 
        desc,
    };

    if (idpicPath) {
        modifyData.idpic = idpicPath;
    }

    try{
        const result = await provColRef.updateOne({email}, {$set: modifyData});
        if(result.nModified === 1){
            res.send("Profile Modified Successfully");
        }else{
            res.send("Profile Not Found");
        }
    }catch(err){
        res.send("Error Modifying Profile:"+err.message);
    }
}

async function distinctCategories(req, res){
    try{
        const user = await provColRef.distinct("cat")
        res.send({user,status:true});
        return
    }catch(err){
        res.status(500).json({message:"Something went wrong",status:false})
        console.log(err)
    }
}

async function distinctCities(req, res){
    try{
        const user = await provColRef.distinct("city")
        res.send({user,status:true});
        return
    }catch(err){
        res.status(500).json({message:"Something went wrong",status:false})
        console.log(err)
    }
}

async function searchProv(req, res){
    try{
        const providers = await provColRef.find({cat:req.body.cat, city:req.body.city});
        res.send(providers);
    }catch(err){
        console.error(err);
        res.status(500).send("Error searching for service providers")
    }
}

module.exports = {doUpload, doModify, distinctCategories, distinctCities, searchProv};