var mongoose = require("mongoose");


function providerUserSchema(){
    var SchemaClass = mongoose.Schema;
    var provSchema = new SchemaClass({
        email: {type:String, required:true, unique:true, index:true},
        name: String,
        mobile: String,
        address: String,
        city: String,
        idpic: String,
        cat:String,
        expert:String,
        exp:String,
        off:String,
        desc:String
    },{
        versionKey: false
    })

    var provColRef = mongoose.model("servProv", provSchema);
    return provColRef;
}

module.exports = providerUserSchema;