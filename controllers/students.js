const Joi = require("joi")

const controller = require("./controller")
const MAXSTUDENTS = 100

exports.getStudent = (req,res) => {
    // let {endpoint} = req.params
    // let {id} = req.params
    // if(endpoint == 'api'){
    //     if(id){ // get a specific student
    //         let student = data.students.find(e => e.id == req.params.id)
    //     if(student)
    //         return res.send(student)
    //     return res.status(404).send(`student with id ${req.params.id} not found`)
    //     }
    //     return res.send(data.courses) // get all students
    // }
    // if(endpoint == 'web'){
    //     if(id){ // get a specific student
    //         if(id == 'create') // create new course page
    //             return res.render('Add Student')
    //         let student = data.students.find(e => e.id == req.params.id)
    //         if(student)
    //             return res.render('student',student)
    //         return res.status(404).render('error',{msg: `student with id ${req.params.id} not found`})
    //         }
    //     return res.render('students',{students:data.students}) // get all students
    // }
    // return res.status(404).send("url not provided")
    controller.Get(req,res,'student')
}

exports.createStudent = (req,res) => {
    // const schema = Joi.object({
    //     name: Joi.string().required().pattern(new RegExp(/^([a-zA-Z]|-|')+$/)), // characters in any case and - and '
    //     code: Joi.string().required().length(7),
    //     id: Joi.number()
    // })
    // let {endpoint} = req.params
    // let body = req.body
    // body.id = idGen()    // add id generated from a hash function
    // let results = schema.validate(body)
    // if(results.error) 
    // if(endpoint == 'api')
    //     return res.status(404).send(results.error.message)
    // if(endpoint == 'web')
    //     return res.status(404).render('error',{msg:results.error.message,redirect:"/web/students/create"})
    // if(data.students.length == MAXSTUDENTS)
    //     data.students.shift()
    // data.students.push(body)
    // fs.writeFile("./data.json",JSON.stringify(data), err => {
    //     if(err) throw err
    //     if(endpoint == 'api')
    //         return res.send(body)
    //     if(endpoint == 'web')
    //         res.send(res.redirect(`/web/students/${body.id}`))
    // })
    const schema = Joi.object({
        name: Joi.string().required().pattern(new RegExp(/^([a-zA-Z]|-|')+$/)), // characters in any case and - and '
        code: Joi.string().required().length(7),
        id: Joi.number()
    })
    controller.Create(req,res,'student',MAXSTUDENTS,schema)
}


exports.updateStudents = (req,res) => {
    // let {endpoint} = req.params
    // if(endpoint == 'api'){
    //     let {body} = req;
    //     let ind = data.students.findIndex(e => e.id == req.params.id)
    //     if(ind > -1){
    //         Object.assign(data.students[ind],body)
    //         delete data.students[ind]._locals;
    //         fs.writeFile("./data.json",JSON.stringify(data), err => {
    //             if(err) throw err
    //             return res.send(data.students[ind])
    //         })
    //     }
    //     res.status(400).send(`given id ${req.params.id} not found`)
    // }
    // res.status(404).send('url not provided')
    const schema = Joi.object({
        name: Joi.string().pattern(new RegExp(/^([a-zA-Z]|-|')+$/)), // characters in any case and - and '
        code: Joi.string().length(7),
        id: Joi.number()
    })
    controller.Update(req,res,'student',schema)
}

exports.deleteStudents = (req,res) => {
    // let {endpoint} = req.params
    // if(endpoint == 'api'){
    //     let ind = data.students.findIndex(e => e.id == req.params.id)
    //     if(ind > -1){
    //         let deleted = data.courses.splice(ind,1)[0];
    //         delete deleted._locals;
    //         return fs.writeFile("./data.json",JSON.stringify(data), err => {
    //             if(err) throw err
    //             res.send(deleted)
    //         })
    //     }
    //     res.status(400).send(`given id ${req.params.id} not found`)
    // }
    controller.Delete(req,res,'students')
}

// const Delete = (req,res,obj) => {
//     let {endpoint} = req.params
//     console.log(data)
//     if(endpoint == 'api'){
//         let ind = data[obj].findIndex(e => e.id == req.params.id)
//         if(ind > -1){
//             let deleted = data[obj].splice(ind,1)[0];
//             delete deleted._locals;
//             return fs.writeFile("./data.json",JSON.stringify(data), err => {
//                 if(err) throw err
//                 res.send(deleted)
//             })
//         }
//         res.status(400).send(`given id ${req.params.id} not found`)
//     }
// }