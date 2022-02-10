require("dotenv").config({path:__dirname + '/.env'})
const fs = require('fs');
var path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const fsExtra = require('fs-extra');
const controllers = require('./app/controllers/index');
const verifySignUp = require('./app/middlewares/verifySignUp')
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

app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, COntent-Type, Accept"
    );
    next();
})

let ClassRoom = require('./app/models/ClassRoom')

// simple route
app.get("/", (req, res) => {
    res.json("Welcome to thesis server.");
});

app.post("/createStudent", [verifySignUp.checkDuplicateUsername],
    (req, res) => {
    controllers.userController.createAndSaveUser(req.body.userName, req.body.password, 1, (err, data) => {
        controllers.studentController.createAndSaveStudent(data.id, (err, data) => {
            console.log(data)
        });
    });
});

app.post("/createProfessor", (req, res) => {
    controllers.userController.createAndSaveUser(req.body.userName, req.body.password, 2, (err, data) => {
        console.log(data);
    });
    res.json("You created a special John Doe.");
});

app.post("/createAdmin", (req, res) => {
    controllers.userController.createAndSaveUser(req.body.userName, req.body.password, 3, (err, data) => {
        console.log(data);
    });
    res.json("You created a special John Doe.");
});

app.get("/deleteAllUsers", (req, res) => {
    controllers.userController.deleteAllUsers((err, data) => {
        controllers.studentController.deleteAllStudents((err, data) => {
            console.log(data);
        })
    });
    res.json("You killed all John Does :(");
});

app.get("/deleteAllStudents", (req, res) => {
    controllers.studentController.deleteAllStudents((err, data) => {
        console.log(data);
    });
    res.json("You killed all Students :(");
});

app.post("/findUser", (req, res) => {
    controllers.userController.findUserByUserName(req.body.userName, (err, data) => {
        console.log(data);
    });
    res.json("You created a special John Doe.");
});

app.post("/findUserSecurely", (req, res) => {
    controllers.userController.findUserByUserNameAndPassword(req.body.userName, req.body.password, (err, data) => {
        console.log(data);
    });
    res.json("You created a special John Doe.");
});

app.post("/findAndUpdateUser", (req, res) => {
    controllers.userController.findUserByUserNameAndUpdate(req.body.oldUserName, req.body.newUserName, req.body.newPassword, (err, data) => {
        console.log(data);
    });
    res.json("You modified Bon Joe");
});

app.post("/findAndUpdateUserSecurely", (req, res) => {
    controllers.userController.findUserByUserNameAndPasswordAndUpdate(req.body.oldUserName, req.body.newUserName, req.body.oldPassword, req.body.newPassword, (err, data) => {
        console.log(data);
    });
    res.json("You modified Bon Jovi");
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
app.post('/fileUpload', upload.single('solution'), (req, res) => {
    controllers.fileController.createAndSaveFile(req.body.exerciseNumber, req.body.studentID, fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), (err, data) => {
        res.redirect('localhost:3000');
        deleteLocalUploads();
        console.log("File upload successful!");
    })
})

app.get('/getTestFile', (req, res) => {
    controllers.fileController.findFileById("6204a19a9f136903f74da803", (err, data) => {
        res.json(data);
        console.log("File fetched!");
    })
})

app.get('/deleteAllFiles', (req, res) => {
    controllers.fileController.deleteAllFiles( (err, data) => {
        console.log("Files deleted!");
    })
})

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})