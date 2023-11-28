var mongoose = require("mongoose");

function getUserSchema() {
    var SchemaClass = mongoose.Schema;
    var colSchema = new SchemaClass({
        email: { type: String, required: true, unique: true, index: true },
        pwd: String,
        choice: { type: String, enum: ['client', 'serviceProvider']}
    }, {
        versionKey: false
    });

    var userColRef = mongoose.model("registers", colSchema);
    return userColRef;
}

module.exports = getUserSchema;
