require("dotenv").config({path:__dirname + '/.env'})
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const fsExtra = require('fs-extra');
const controllers = require('./app/controllers/index');
const verifySignUp = require('./app/middlewares/verifySignUp');
const authJwt = require("./app/middlewares/authJwt");
const multer = require('multer');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userController = require("./app/controllers/UserController");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
let mmm = require('mmmagic'),
      Magic = mmm.Magic;

let magic = new Magic(mmm.MAGIC_MIME_TYPE);


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now())
    }
})

let upload = multer({storage: storage});

let deleteLocalUploads = () => {fsExtra.emptyDirSync(__dirname + '/uploads');}

const app = express();

// connect to DB
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {console.log("Connected to the database!");})
    .catch(err => {
        console.log("Cannot conenct to the database!", err);
        process.exit();
    })

let corsOptions = {
    origin: ["http://localhost:3001", "http://localhost:3000"]
};

app.use(cors(corsOptions));

// parse request of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

app.use(
    cookieSession({
        secret: "COOKIE_SECRET",
        httpOnly: true,
        sameSite: "strict"
    })
)

app.use(express.static(__dirname + "/app/views"));
// simple route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/app/views/index.html");
});

app.post("/createStudent", [verifySignUp.checkDuplicateUsername, verifySignUp.checkPasswordLength ,verifySignUp.hashPassword],
    (req, res) => {
    controllers.userController.createAndSaveUser(req.body.userName, req.body.password, 1, (err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
        controllers.studentController.createAndSaveStudent(data.id, (err, data) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
              }
            controllers.classRoomController.addStudentToClassRoomByName(req.body.classRoom, data.id, (err, data)=> {
                if (err) {
                res.status(500).send({ message: err });
                return;
                }
                console.log(data);
            })
        });
    });
});

app.post("/logIn", (req, res) => {
    userController.User.findOne({userName: req.body.userName}).exec((err, user) =>{
        if(err){
            res.status(500).send({message:err});
            return;
        }
        if(!user){
            return res.status(404).send({message: "User Not Found."});
        }
        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )
        if(!passwordIsValid){
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password"
            });
        }
        let token = jwt.sign({ id: user.id }, process.env.SECRET, {
            expiresIn: 86400
        });

        req.session.token = token;
        // Also set a non HTTP cookie to see if user is logged in on front-end
        res.cookie('loggedIn', true);

        if (user.priviledge === 1){
            controllers.studentController.getStudentByUserId(user._id,
                (err, student) => {
                    if(err){
                        res.status(500).send({message:err});
                        return;
                    }
                    else{
                        console.log(student.env)
                        res.status(200).send({
                            userName: user.userName,
                            priviledge: user.priviledge,
                            env: student.env
                        })
                    }
            }
            );   
        }
        else{
            res.status(200).send({
                userName: user.userName,
                priviledge: user.priviledge,
            })
        }
    })
})

app.post("/createProfessor", [verifySignUp.checkDuplicateUsername, verifySignUp.hashPassword], (req, res) => {
    controllers.userController.createAndSaveUser(req.body.userName, req.body.password, 2, (err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
        console.log(data);
    });
});

app.post("/createAdmin", [verifySignUp.checkDuplicateUsername, verifySignUp.hashPassword], (req, res) => {
    controllers.userController.createAndSaveUser(req.body.userName, req.body.password, 3, (err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
        console.log(data);
    });
});

app.post("/createClassRoom", [authJwt.verifyToken, authJwt.isAdmin], (req, res) => {
    controllers.classRoomController.createAndSaveClassRoom(req.body.classRoomName, (err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
        console.log(data);
    })
})

app.get("/deleteAllUsers", (req, res) => {
    controllers.userController.deleteAllUsers((err, data) => {
        controllers.studentController.deleteAllStudents((err, data) => {
            console.log(data);
        })
    });
});

app.get("/deleteAllStudents", (req, res) => {
    controllers.studentController.deleteAllStudents((err, data) => {
        console.log(data);
    });
});

app.post("/findUser", (req, res) => {
    controllers.userController.findUserByUserName(req.body.userName, (err, data) => {
        console.log(data);
    });
});

app.post("/findUserSecurely", (req, res) => {
    controllers.userController.findUserByUserNameAndPassword(req.body.userName, req.body.password, (err, data) => {
        console.log(data);
    });
});

app.post("/findAndUpdateUser", (req, res) => {
    controllers.userController.findUserByUserNameAndUpdate(req.body.oldUserName, req.body.newUserName, req.body.newPassword, (err, data) => {
        console.log(data);
    });
});

app.post("/findAndUpdateUserSecurely", (req, res) => {
    controllers.userController.findUserByUserNameAndPasswordAndUpdate(req.body.oldUserName, req.body.newUserName, req.body.oldPassword, req.body.newPassword, (err, data) => {
        console.log(data);
    });
});

app.get("/getAllUsers", (req, res) => {
    controllers.userController.getAllUsers((err, data) => {
        console.log(data);
        res.json(data);
    });
});

app.get("/getAllStudents", (req, res) => {
    controllers.studentController.getAllStudents((err, data) => {
        console.log(data);
        res.json(data);
    });
});

app.post("/getOneUser", (req, res) => {
    controllers.userController.findUserById(req.body.id, (err, data) => {
        console.log(data);
        res.json(data);
    });
});

//route for file submission
app.post('/fileUpload', [authJwt.verifyToken, authJwt.isStudent], upload.single('solution'), (req, res) => {
    
    controllers.userController.User.findById(req.userID, (err, data) =>{
        if(err){
            res.status(500).send({message:err});
            return;
        }
        controllers.studentController.Student.findOne({userID: data.id}, (err, student) =>{
            if(err){
                res.status(500).send({message:err});
                return;
            }
            magic.detectFile(__dirname + '/uploads/' + req.file.filename, (err, result) => {
                if (err) throw err;
                if(result !== "image/jpeg" && result !== "image/png"){
                    res.status(500).send({message:"Unaccepted file type"});
                    return;
                }
                controllers.fileController.File.find({exerciseNumber: req.body.exerciseNumber, studentID: student.id}, (err, result) => {
                    if(result.length === 0){
                        controllers.fileController.createAndSaveFile(req.body.exerciseNumber, student.id, fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), (err, data) => {
                            if(err){
                                res.status(500).send({message:err});
                                return;
                            }
                            res.redirect('localhost:3001');
                            deleteLocalUploads();
                            console.log("File upload successful!");
                        })
                    }
                    else{
                        controllers.fileController.File.findByIdAndUpdate(result[0].id, {data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename))}, (err, data) =>{
                            if(err){
                                res.status(500).send({message:err});
                                return;
                            }
                            res.redirect('localhost:3001');
                            deleteLocalUploads();
                            console.log("File upload successful!");
                        })
                    }
                })
            })
        })
    })
})

app.post('/getFile', [authJwt.verifyToken, authJwt.isStudent], (req, res) => {
    controllers.userController.User.findById(req.userID, (err, data) =>{
        if(err){
            res.status(500).send({message:err});
            return;
        }
        controllers.studentController.Student.findOne({userID: data.id}, (err, student) =>{
            if(err){
                res.status(500).send({message:err});
                return;
            }

            controllers.fileController.File.find({exerciseNumber: req.body.exerciseNumber, studentID: student.id}, (err, result) => {
                    if(result.length === 0){
                        res.status(500).send({message:"No file was uploaded yet!"});
                    }
                    else{
                        res.status(200).send({
                            fileData: result[0].data,
                        })
                        console.log("File fetched!");
                    }
                })
            })
        })
    })

app.get('/deleteAllFiles', (req, res) => {
    controllers.fileController.deleteAllFiles( (err, data) => {
        console.log("Files deleted!");
    })
})

//resource routes

app.get("/testAll", userController.allAccess);
app.get("/testStudent", [authJwt.verifyToken, authJwt.isStudent], userController.studentBoard);
app.get("/testProfessor", [authJwt.verifyToken, authJwt.isProfessor], userController.professorBoard);
app.get("/testAdmin", [authJwt.verifyToken, authJwt.isAdmin], userController.adminBoard);
app.get("/logOut", [authJwt.verifyToken], (req, res) =>{
    res.clearCookie('session');
    res.clearCookie('loggedIn');
    res.send('Logged out');
})

app.post('/updateEnv', [authJwt.verifyToken, authJwt.isStudent], (req, res) => {
    // console.log(req.body);
    userController.User.findOne({userName: req.body.userName}).exec((err, user) =>{
        if(err){
            res.status(500).send({message:err});
            return;
        }
        if(!user){
            return res.status(404).send({message: "User Not Found."});
        }

        // console.log(user); 
        
        controllers.studentController.findStudentByUserIdAndUpdateEnv(user.id, req.body.env, (err, data) =>{
            if(err){
                res.status(500).send({message:err});
                return;
            }
        })
    })
})

app.post("/updateUserName", [verifySignUp.checkDuplicateUserNameOnUserNameChange, authJwt.verifyToken], (req, res) => {
    userController.User.findOne({userName: req.body.oldUserName}).exec((err, user) => {
        if(err){
            res.status(500).send({message:err});
            return;
        }
        userController.User.findByIdAndUpdate(user.id, {userName: req.body.newUserName}, (err, data) => {
            if(err){
                res.status(500).send({message:err});
                return;
            }
            console.log(data);
        })
    })
})

app.get("/getAllClassroomNames", (req, res) => {
    controllers.classRoomController.retrieveAllClassRoomNames((err, classRooms) => {
        if(err){
            res.status(500).send({message:err});
            return;
        }
        
        res.status(200).send({
            classRoomNames: classRooms,
        })
    });
})

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})