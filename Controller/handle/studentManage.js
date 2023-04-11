const fs = require('fs');
const qs = require('qs')
const studentManagement = require('../../Management/studentManagement.js')
const classManagement = require('../../Management/classManagement.js')
class StudentManage {
    getHtmlStudents =  (students, indexHtml) =>{
        let studentsHtml = ''
        students.map((item, index) =>{
            studentsHtml += `
                    <tr>
                        <td scope="row" style="padding: 0 10px;">${index + 1}</td>
                        <td >${item.idstudent}</td>
                        <td >${item.name_Student}</td>
                        <td >${item.practice_Points}</td>
                        <td >${item.theoretical_Points}</td>
                        <td >${item.comment}</td>
                        <td >${item.description}</td>
                        <td ><a type="button" class="btn btn-outline-secondary" href="/edit/${item.idstudent}">Update</a></td>
                        <td >
                        <form method="POST" onsubmit="return confirm ('Delete')">
                             <input name="idDelete" type="hidden" value='${item.idstudent}'>
                             <button type="submit" class="btn btn-outline-dark">Delete</button>
                        </form>
                        </td>
                        <td ><a type="button" class="btn btn-outline-secondary" href="/detail/${item.idstudent}">Detail</a></td>
                        <td >
                    </tr> 
            `
            index++;
        })
        indexHtml = indexHtml.replace('{student}', studentsHtml)
        return indexHtml
    }
    homePage = async (req,res) => {
        if (req.method === 'GET') {
            fs.readFile('./view/home.html', 'utf-8', async (err, indexHtml) => {
                let students = await studentManagement.findAll()
                indexHtml = this.getHtmlStudents(students, indexHtml)
                res.write(indexHtml);
                res.end()
            })
        } else {
            const buffers = [];
            for await (const chunk of req){
                buffers.push(chunk)
            }
            const data = Buffer.concat(buffers).toString();
            const student = qs.parse(data);

            if(student.idDelete){
                let id = student.idDelete
                await studentManagement.deleteById(id)
                res.writeHead(301, {location: '/home'})
                res.end();
            }
        }
    }
    editInfo = async (req,res,id)=>{

        if (req.method === 'GET') {
            fs.readFile('./View/change.html', 'utf-8', async (err, editHtml) => {
                let student = await studentManagement.findById(id)
                let classes = await classManagement.findAll()
                editHtml = editHtml.replace('{name}', student.name_Student)
                editHtml = editHtml.replace('{practice_Points}', student.practice_Points)
                editHtml = editHtml.replace('{theoretical_Points}', student.theoretical_Points)
                editHtml = editHtml.replace('{comment}', student.comment)
                editHtml = editHtml.replace('{description}', student.description)
                let htmlClasses = ''
                classes.map(item => {
                    htmlClasses += `
                  <option value="${item.class_id}">${item.name_Class}</option>
            `
                })
                editHtml = editHtml.replace('{class}',  htmlClasses)
                res.write(editHtml);
                res.end()
            })
        }else{
            let data = ''
            req.on('data', (chunk) => {
                data = data + chunk;
            })

            req.on('end', async () => {
                let editStudent = qs.parse(data);
                console.log(editStudent)
                await studentManagement.set(id,editStudent)
                res.writeHead(301, {location: '/home'})
                res.end();
            })

        }
    }

    create = async (req,res)=>{
        if (req.method === 'GET') {
            fs.readFile('./View/create.html', 'utf-8', async(err,addHtml)=>{
                let classes = await classManagement.findAll()
                let htmlClasses = ''
                classes.map(item => {
                    htmlClasses += `
                  <option value="${item.class_id}">${item.name_Class}</option>
                  `
                })
                addHtml = addHtml.replace('{class}',htmlClasses)
                res.write(addHtml);
                res.end()
            })
        }else{
            let data = ''
            req.on('data', (chunk) => {
                data = data + chunk;
            })
            req.on('end', () => {
                let addStudent = qs.parse(data);
                studentManagement.addStudentSql(addStudent)
                res.writeHead(301, {location: '/home'})
                res.end();
            })

        }
    }

    studentInfo = async (req,res,id) => {
        fs.readFile('./View/detail.html', 'utf-8', async (err, editHtml) => {
            let student = await studentManagement.detail(id)
            editHtml = editHtml.replace('{name}', student.name_Student)
            editHtml = editHtml.replace('{practice_Points}', student.practice_Points)
            editHtml = editHtml.replace('{theoretical_Points}', student.theoretical_Points)
            editHtml = editHtml.replace('{comment}', student.comment)
            editHtml = editHtml.replace('{description}', student.description)
            editHtml = editHtml.replace('{name_class}',  student.name_Class)
            res.write(editHtml);
            res.end()
        })
    }
}
module.exports = new StudentManage