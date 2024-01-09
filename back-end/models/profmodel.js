var mongoose = require("mongoose");

function profileUserSchema(){
    var SchemaClass = mongoose.Schema;
    var profSchema = new SchemaClass({
        email: {type:String, required:true, unique: true, index: true},
        name: String,
        mobile: String,
        address: String,
        city: String,
        ppic: String,
        idpic: String
    },{
        versionKey: false
    })

    var profColRef = mongoose.model("profiles", profSchema);
    return profColRef;
}

module.exports = profileUserSchema;