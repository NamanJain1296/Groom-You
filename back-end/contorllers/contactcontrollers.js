var contactUserSchema = require("../models/contactmodel")
var contColRef = contactUserSchema();

async function doContact(req, res) {
    console.log(req.body);

    const { email, name, mobile, city } = req.body;

    try {
        const contact = new contColRef({
            email,
            name,
            mobile,
            city,
        });

        await contact.save();
        res.send("Profile Connected Successfully");
    } catch (err) {
        res.status(500).send("Error Saving Profile: " + err);
    }
}

module.exports = {doContact};