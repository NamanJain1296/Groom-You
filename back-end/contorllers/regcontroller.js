var getUserSchema = require("../models/regmodel")
var path = require('path')
var userColRef = getUserSchema();
var webtoken = require("jsonwebtoken")

async function signup_with_post(req, res){
    console.log(req.body)
    var obj = new userColRef(req.body)

    try {
        await obj.save();
        res.send("Signed up Successfully");
    } catch (err) {
        res.send(err);
    }
}

async function login_with_post(req, res){
    console.log(req.body)
    console.log(process.env.sec_key)

    try {
        const count = await userColRef.findOne({ email: req.body.email }).count();

        if (count === 0) {
            res.json({ status: false, message: "Invalid User ID" });
            return;
        }

        const existingUser = await userColRef.findOne({
            email: req.body.email,
            pwd: req.body.pwd,
        });

        console.log(existingUser);

        if (existingUser != null) {
            var token = webtoken.sign(
                { email: existingUser.email, choice: existingUser.choice },
                process.env.sec_key,
                { expiresIn: '1h' }
            );
            res.json({ status: true, existingUser, token,message:"Successfully Logged In" });
        } else {
            res.json({ status: false, message: "Invalid Password" });
        }
    } catch (err) {
        res.send(err);
    }  
}

async function currentUser(req, res){
    const count = await userColRef.find({ email: req.email }).count();

        if (count === 0) {
            res.json({ status: false, message: "Invalid User ID" });
            return;
        }else{
            const existingUser = await userColRef.findOne({
                email: req.email
            });

            res.json({ status: true, message: "Valid User ID", existingUser});
            return;
        }
}

async function fetchClients(req, res){
    try{
        const clients = await userColRef.find({choice : 'client'});
        res.json(clients);
    }catch(error){
        res.status(500).json({error: 'Internal Server Error'});
    }
}

async function fetchProviders(req, res){
    try{
        const servProv = await userColRef.find({choice : 'serviceProvider'});
        res.json(servProv);
    }catch(error){
        res.status(500).json({error: 'Internal Server Error'});
    }
}

module.exports = {signup_with_post, login_with_post, currentUser, fetchClients, fetchProviders};