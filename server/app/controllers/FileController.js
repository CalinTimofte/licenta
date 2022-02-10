let File = require('../models/File');

const createAndSaveFile = (exerciseNumber, studentID, solution, done) => {
    const file = new File({exerciseNumber: exerciseNumber, data: solution, studentID: studentID});
    file.save((err, data) => {
        if (err) return console.error(err);
        done(null, data);
    });
};

const findFileById = (id, done) => {
    File.findById(id,(err, data) => {
        if (err) return console.error(err);
        done(null, data);
    });
    };

const fileController = {
    createAndSaveFile: createAndSaveFile,
    findFileById: findFileById
};

module.exports = fileController;