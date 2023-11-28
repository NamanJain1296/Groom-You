var mongoose = require("mongoose");

function contactUserSchema(){
    var SchemaClass = mongoose.Schema;
    var contSchema = new SchemaClass({
        email: {type:String, required:true, unique: true, index: true},
        name: String,
        mobile: String,
        city: String,
    },{
        versionKey: false
    })

    var  contColRef = mongoose.model("connect", contSchema);
    return contColRef;
}

module.exports = contactUserSchema;