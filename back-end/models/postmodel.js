var mongoose = require("mongoose")

function postReqSchema(){
    var SchemaClass = mongoose.Schema;
    var postSchema = new SchemaClass({
        email: String,
        cat: String,
        task: String,
        utd: String,
        loc: String,
        mobile: String
    })

    var postReqColRef = mongoose.model("requirements", postSchema);
    return postReqColRef;
}

module.exports = postReqSchema;
    