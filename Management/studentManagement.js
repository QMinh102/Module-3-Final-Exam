const connection = require('../Entity/connection.js')
class StudentManagement {
    connect;
    constructor(){
        connection.SQLConnection();
        this.connect = connection.Connecting()
    }
    findById = (id)=>{
        return new Promise((resolve, reject)=>{
            this.connect.query(`select * from student inner join class on student.idClass = class.idclass where student.idstudent = ${id}`,(err,student)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(student[0])
                }
            })
        })
    }

    findAll = () =>{
        return new Promise((resolve, reject)=>{
            this.connect.query('select student.* from student ',(err,student)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(student)
                }
            })
        })
    }

    set = (id, editStudent) =>{
        return new Promise((resolve, reject)=>{
            this.connect.query(`update student set name_Student = '${editStudent.name}', practice_Points = '${editStudent.practical_Points}', theoretical_Points = '${editStudent.theoretical_Points}', description = '${editStudent.description}' where student.idstudent = ${id}`,(err,students)=>{
                if(err){
                    reject(err)
                }else{
                    resolve('Completed')
                }
            })
        })
    }
    deleteById = (id) =>{
        return new Promise((resolve, reject)=>{
            this.connect.query(`delete from student where idstudent = ${id}`,(err,student)=>{
                if(err){
                    reject(err)
                }else{
                    resolve('Completed')
                }
            })
        })
    }
    addStudentSql = (addStudent) =>{
        return new Promise((resolve, reject)=>{
            this.connect.query(`insert into student(name_Student, practice_Points, theoretical_Points, comment,  description, idClass) values('${addStudent.name}',${addStudent.practical_Points},${addStudent.theoretical_Points}, '${addStudent.comment}', '${addStudent.description}', ${addStudent.Class_ID})`,(err,students)=>{
                if(err){
                    reject(err)
                }else{
                    resolve('Completed')
                }
            })
        })
    }

    detail = (id) =>{
        return new Promise((resolve, reject)=>{
            this.connect.query(`select student.*, name_Class from student inner join class on student.idClass = class.idclass where student.idStudent = '${id}'`,(err,students)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(students[0])
                }
            })
        })
    }

}
module.exports = new StudentManagement()