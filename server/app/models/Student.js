const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
    userID: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    env: [String],
    classRoomID: {type: Schema.Types.ObjectId, ref: 'ClassRoom'}
})

module.exports = mongoose.model("Student", studentSchema);