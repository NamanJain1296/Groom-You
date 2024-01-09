var mongoose = require("mongoose")

function adminEntrySchema(){
    var SchemaClass = mongoose.Schema;
    var adminSchema = new SchemaClass({
        email: String,
        pwd: String
    })

    var adminEntryColRef = mongoose.model("admin", adminSchema);
    return adminEntryColRef;
}

module.exports = adminEntrySchema;