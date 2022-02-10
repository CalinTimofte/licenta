require("dotenv").config({path:__dirname + '/.env'})
const fs = require('fs');
var path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const fsExtra = require('fs-extra');
const userController = require("./app/controllers/UserController");
const studentController = require("./app/controllers/StudentController")
const fileController = require("./app/controllers/FileController")
const { Schema } = mongoose;
const multer = require('multer');

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

let ClassRoom = require('./app/models/ClassRoom')

// simple route
app.get("/", (req, res) => {
    res.json("Welcome to thesis server.");
});

app.post("/createStudent", (req, res) => {
    userController.createAndSaveUser(req.body.userName, req.body.password, 1, (err, data) => {
        studentController.createAndSaveStudent(data.id, (err, data) => {
            console.log(data)
        });
    });
    res.json("You created a special John Doe.");
});

app.post("/createProfessor", (req, res) => {
    userController.createAndSaveUser(req.body.userName, req.body.password, 2, (err, data) => {
        console.log(data);
    });
    res.json("You created a special John Doe.");
});

app.post("/createAdmin", (req, res) => {
    userController.createAndSaveUser(req.body.userName, req.body.password, 3, (err, data) => {
        console.log(data);
    });
    res.json("You created a special John Doe.");
});

app.get("/deleteAllUsers", (req, res) => {
    userController.deleteAllUsers((err, data) => {
        studentController.deleteAllStudents((err, data) => {
            console.log(data);
        })
    });
    res.json("You killed all John Does :(");
});

app.get("/deleteAllStudents", (req, res) => {
    studentController.deleteAllStudents((err, data) => {
        console.log(data);
    });
    res.json("You killed all Students :(");
});

app.post("/findUser", (req, res) => {
    userController.findUserByUserName(req.body.userName, (err, data) => {
        console.log(data);
    });
    res.json("You created a special John Doe.");
});

app.post("/findUserSecurely", (req, res) => {
    userController.findUserByUserNameAndPassword(req.body.userName, req.body.password, (err, data) => {
        console.log(data);
    });
    res.json("You created a special John Doe.");
});

app.post("/findAndUpdateUser", (req, res) => {
    userController.findUserByUserNameAndUpdate(req.body.oldUserName, req.body.newUserName, req.body.newPassword, (err, data) => {
        console.log(data);
    });
    res.json("You modified Bon Joe");
});

app.post("/findAndUpdateUserSecurely", (req, res) => {
    userController.findUserByUserNameAndPasswordAndUpdate(req.body.oldUserName, req.body.newUserName, req.body.oldPassword, req.body.newPassword, (err, data) => {
        console.log(data);
    });
    res.json("You modified Bon Jovi");
});

app.get("/getAllUsers", (req, res) => {
    userController.getAllUsers((err, data) => {
        console.log(data);
        res.json(data);
    });
});

app.get("/getAllStudents", (req, res) => {
    studentController.getAllStudents((err, data) => {
        console.log(data);
        res.json(data);
    });
});

app.post("/getOneUser", (req, res) => {
    userController.findUserById(req.body.id, (err, data) => {
        console.log(data);
        res.json(data);
    });
});

//route for file submission
app.post('/fileUpload', upload.single('solution'), (req, res) => {
    fileController.createAndSaveFile(req.body.exerciseNumber, req.body.studentID, fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), (err, data) => {
        res.redirect('localhost:3000');
        deleteLocalUploads();
        console.log("File upload successful!");
    })
})

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})