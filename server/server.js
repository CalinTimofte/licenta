require("dotenv").config({path:__dirname + '/.env'})
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const app = express();

// connect to DB
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {console.log("Connected to the database!");})
    .catch(err => {
        console.log("Cannot conenct to the database!", err);
        process.exit();
    })

let corsOptions = {
    origin: "http://localhost:3001"
};

app.use(cors(corsOptions));

// parse request of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// Password is in plaintext for now but it will be changed later
const userSchema = new Schema({
    userName: {type: String, required: true},
    password: {type: String, required: true},
    priviledge: {type: Number, required: true}
});

let User = mongoose.model("User", userSchema);

const createAndSaveTestUser = (done) => {
    const doe = new User({userName: 'JohnDoe', password: 'johndoe1', priviledge: 3});
    doe.save((err, data) => {
        if (err) return console.error(err);
        done(data, data);
    });
};

// simple route
app.get("/", (req, res) => {
    res.json("Welcome to thesis server.");
});

app.get("/testUser", (req, res) => {
    createAndSaveTestUser(done => {
        console.log(done);
    });
    res.json("You created John Doe.");
});

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})