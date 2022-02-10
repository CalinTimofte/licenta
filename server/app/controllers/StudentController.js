let Student = require('../models/Student');

const createAndSaveStudent = (userID, done) => {
    const student = new Student({userID: userID});
    student.save((err, data) => {
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

const getAllStudents = (done) => {
    Student.find({},(err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
  };

const studentController = {
    createAndSaveStudent: createAndSaveStudent,
    deleteAllStudents: deleteAllStudents,
    getAllStudents: getAllStudents
}

module.exports = studentController;