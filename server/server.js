require("dotenv").config({path:__dirname + '/.env'})
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const fsExtra = require('fs-extra');
const { Schema } = mongoose;

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

let User = require('./app/models/User');
let File = require('./app/models/File');
let ClassRoom = require('./app/models/ClassRoom')
let Student = require('./app/models/Student');

const createAndSaveUser = (userName, password, priviledge, done) => {
    const user = new User({userName: userName, password: password, priviledge: priviledge});
    user.save((err, data) => {
        if (err) return console.error(err);
        done(null, data);
    });
};

const createAndSaveStudent = (userID, done) => {
    const student = new Student({userID: userID});
    student.save((err, data) => {
        if (err) return console.error(err);
        done(null, data);
    });
};

const deleteAllUsers = (done) => {
    User.deleteMany(null,(err, data) => {
        if (err) return console.error(err);
        done(null, data);
    });
};

const deleteAllStudents = (done) => {
    Student.deleteMany(null,(err, data) => {
        if (err) return console.error(err);
        done(null, data);
    });
};

const getAllUsers = (done) => {
    User.find({},(err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
  };

const getAllStudents = (done) => {
    Student.find({},(err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
  };

const findUserById = (id, done) => {
User.findById(id,(err, data) => {
    if (err) return console.error(err);
    done(null, data);
});
};

const findUserByUserName = (userName, done) => {
    User.find({userName: userName},(err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
  };

  const findUserByUserNameAndPassword = (userName, password, done) => {
    User.find({userName: userName, password: password},(err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
  };

const findUserByUserNameAndUpdate = (oldUserName, newUserName, newPassword, done) => {
    findUserByUserName(oldUserName, (err, data) => {
        User.findByIdAndUpdate(data[0].id, {userName: newUserName, password: newPassword}, (err, data)=> {
            if (err) return console.err(err);
            done(null, data);
        });
    });
}

const findUserByUserNameAndPasswordAndUpdate = (oldUserName, newUserName, oldPassword, newPassword, done) => {
    findUserByUserNameAndPassword(oldUserName, oldPassword, (err, data) => {
        User.findByIdAndUpdate(data[0].id, {userName: newUserName, password: newPassword}, (err, data)=> {
            if (err) return console.err(err);
            done(null, data);
        });
    });
}

// simple route
app.get("/", (req, res) => {
    res.json("Welcome to thesis server.");
});

app.post("/createStudent", (req, res) => {
    createAndSaveUser(req.body.userName, req.body.password, 1, (err, data) => {
        createAndSaveStudent(data.id, (err, data) => {
            console.log(data)
        });
    });
    res.json("You created a special John Doe.");
});

app.post("/createProfessor", (req, res) => {
    createAndSaveUser(req.body.userName, req.body.password, 2, (err, data) => {
        console.log(data);
    });
    res.json("You created a special John Doe.");
});

app.post("/createAdmin", (req, res) => {
    createAndSaveUser(req.body.userName, req.body.password, 3, (err, data) => {
        console.log(data);
    });
    res.json("You created a special John Doe.");
});

app.get("/deleteAllUsers", (req, res) => {
    deleteAllUsers((err, data) => {
        console.log(data);
    });
    res.json("You killed all John Does :(");
});

app.get("/deleteAllStudents", (req, res) => {
    deleteAllStudents((err, data) => {
        console.log(data);
    });
    res.json("You killed all Students :(");
});

app.post("/findUser", (req, res) => {
    findUserByUserName(req.body.userName, (err, data) => {
        console.log(data);
    });
    res.json("You created a special John Doe.");
});

app.post("/findUserSecurely", (req, res) => {
    findUserByUserNameAndPassword(req.body.userName, req.body.password, (err, data) => {
        console.log(data);
    });
    res.json("You created a special John Doe.");
});

app.post("/findAndUpdateUser", (req, res) => {
    findUserByUserNameAndUpdate(req.body.oldUserName, req.body.newUserName, req.body.newPassword, (err, data) => {
        console.log(data);
    });
    res.json("You modified Bon Joe");
});

app.post("/findAndUpdateUserSecurely", (req, res) => {
    findUserByUserNameAndPasswordAndUpdate(req.body.oldUserName, req.body.newUserName, req.body.oldPassword, req.body.newPassword, (err, data) => {
        console.log(data);
    });
    res.json("You modified Bon Jovi");
});

app.get("/getAllUsers", (req, res) => {
    getAllUsers((err, data) => {
        console.log(data);
        res.json(data);
    });
});

app.get("/getAllStudents", (req, res) => {
    getAllStudents((err, data) => {
        console.log(data);
        res.json(data);
    });
});

app.post("/getOneUser", (req, res) => {
    findUserById(req.body.id, (err, data) => {
        console.log(data);
        res.json(data);
    });
});

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})