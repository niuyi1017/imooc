var teacher = require('./teacher')
var student =require("./student");




function add(teacherName,studentName) {
    teacher.add(teacherName);
    studentName.forEach(item => {
        student.add(item);
    });
}

exports.add = add