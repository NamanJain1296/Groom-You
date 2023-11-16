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
        res.send("Profile Uploaded Successfully");
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

module.exports = {doUpload, doModify};