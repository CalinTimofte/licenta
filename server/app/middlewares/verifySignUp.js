const User = require('../models/User');
const bcrypt = require("bcryptjs");

let checkDuplicateUsernameFactory = (usernameFieldToCheck) => ((req, res, next) => {
    User.findOne({userName: req.body[usernameFieldToCheck]}).exec((err, user) => {
        if (err){
            res.status(500).send({message: err});
            return;
        }
        if (user){
            res.status(400).send({message: "Failed! Username is already in use!"});
            return;
        }
        next();
    });
})

let checkDuplicateUsername = checkDuplicateUsernameFactory("userName");
let checkDuplicateUserNameOnUserNameChange = checkDuplicateUsernameFactory("newUserName")

let hashPassword = (req, res, next) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    next()
}

const verifySignUp = {
    checkDuplicateUsername,
    checkDuplicateUserNameOnUserNameChange,
    hashPassword
};

module.exports = verifySignUp