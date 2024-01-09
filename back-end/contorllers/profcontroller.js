var profileUserSchema = require("../models/profmodel")
var path = require('path')
var profColRef = profileUserSchema();

async function doSave(req, res) {
    console.log(req.body);

    const { email, name, mobile, address, city } = req.body;
    const ppic = req.files?.ppic;
    const idpic = req.files?.idpic;
    let ppicPath = '';
    let idpicPath = '';

    if (ppic) {
        ppicPath = path.join('uploads', ppic.name);
        ppic.mv(ppicPath);
    }

    if (idpic) {
        idpicPath = path.join('uploads', idpic.name);
        idpic.mv(idpicPath);
    }

    try {
        const newProfile = new profColRef({
            email,
            name,
            mobile,
            address,
            city,
            ppic: ppicPath, // Save ppicPath to the database
            idpic: idpicPath, // Save idpicPath to the database
        });

        await newProfile.save();
        res.send("Profile Saved Successfully");
    } catch (err) {
        res.status(500).send("Error Saving Profile: " + err);
    }
}


async function doUpdate(req, res) {
    console.log(req.body);

    const { email, name, mobile, address, city} = req.body;
    const ppic = req.files?.ppic;
    const idpic = req.files?.idpic;
    
    let ppicPath = '';
    let idpicPath = '';

    if (ppic) {
        ppicPath = path.join(__dirname, '..', 'uploads', ppic.name);
        ppic.mv(ppicPath);
    }

    if (idpic) {
        idpicPath = path.join(__dirname, '..', 'uploads', idpic.name);
        idpic.mv(idpicPath);
    }

    const updateData = {
        name,
        mobile,
        address,
        city,
    };

    if (ppicPath) {
        updateData.ppic = ppicPath;
    }

    if (idpicPath) {
        updateData.idpic = idpicPath;
    }

    try {
        const result = await profColRef.updateOne({ email }, { $set: updateData });
        if (result.nModified === 1) {
            res.send("Profile Updated Successfully");
        } else {
            res.send("Profile Not Found");
        }
    } catch (err) {
        res.send("Error Updating Profile: " + err.message);
    }
}

async function doFetch(req, res){
    console.log(req.body)

    await profColRef
    .findOne({email: req.query.email})
    .then((doc)=>{
        res.send(doc)
    })
    .catch((err)=>{
        res.send(err.message)
    })
}

module.exports = {doSave, doUpdate, doFetch};

