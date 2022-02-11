const jwt = require("jsonwebtoken");
require("dotenv").config({path:__dirname + '/.env'});
const User = require("../models/User");

let verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if(!token){
        return res.status(403).send({message: "No token provided!"});
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err){
            return res.status(401).send({message: "Unauthorized!"});
        }
        req.userID = decoded.id;
        next();
    })
}

let isRoleFactory = (priviledge_number) => ((req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
        if(user.priviledge !== priviledge_number){
            res.status(403).send({message: "Require Admin Role!"});
            return;
        }
        else{
            next();
            return;
        }
    })
    })

let isAdmin = isRoleFactory(3);
let isProfessor = isRoleFactory(2);
let isStudent = isRoleFactory(1);

const authJwt = {
    verifyToken,
    isAdmin,
    isProfessor,
    isStudent
}

module.exports = authJwt;
