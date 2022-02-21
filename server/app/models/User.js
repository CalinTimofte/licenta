const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: {type: String, required: true, maxLength: 40, minlength: 5, unique: true},
    password: {type: String, required: true},
    priviledge: {type: Number, required: true}
});

module.exports = mongoose.model("User", userSchema);