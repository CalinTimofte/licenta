const jwt = require("jsonwebtoken");
require("dotenv").config({path:__dirname + '/.env'});
const User = require("../models/User");

let verifyToken = (req, res, next) => {
    let token = req.session.token;
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

let isRoleFactory = (priviledge_number, role_name) => ((req, res, next) => {
    User.findById(req.userID).exec((err, user) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
        if(user.priviledge !== priviledge_number){
            res.status(403).send({message: `Requires ${role_name} Role!`});
            return;
        }
        else{
            next();
            return;
        }
    })
    })

let isAdmin = isRoleFactory(3, "Admin");
let isProfessor = isRoleFactory(2, "Professor");
let isStudent = isRoleFactory(1, "Student");

const authJwt = {
    verifyToken,
    isAdmin,
    isProfessor,
    isStudent
}

module.exports = authJwt;
