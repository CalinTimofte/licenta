const User = require('../models/User');
const bcrypt = require("bcryptjs");

let checkDuplicateUsername = (req, res, next) => {
    User.findOne({userName: req.body.userName}).exec((err, user) => {
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
}

let hashPassword = (req, res, next) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    next()
}

const verifySignUp = {
    checkDuplicateUsername,
    hashPassword
};

module.exports = verifySignUp