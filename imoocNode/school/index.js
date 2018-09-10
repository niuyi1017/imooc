var klass =  require('./klass')

exports.add = (klasses) =>{
    klasses.forEach(item => {
        var _klass =item;
        var teacherName = _klass.teacherName;
        var studentName = _klass.studentName;
        klass.add(teacherName, studentName);
    });
}
