const Joi = require("joi")

const controller = require("./controller")
const MAXCOURSES = 100

exports.getCourse = (req,res) => {
    // let {endpoint} = req.params
    // let {id} = req.params
    // if(endpoint == 'api'){
    //     if(id){ // get a specific course
    //         let course = data.courses.find(e => e.id == req.params.id)
    //         if(course)
    //             return res.send(course)
    //         return res.status(404).send(`course with id ${req.params.id} not found`)
    //     }
    //     return res.send(data.courses) // get all courses
    // }
    // if(endpoint == 'web'){
    //     if(id){ // get a specific course
    //         if(id == 'create') // create new course page
    //             return res.render('Add Course')
    //         let course = data.courses.find(e => e.id == req.params.id)
    //         if(course)
    //             return res.render('course',course)
    //         return res.status(404).render('error',{msg: `course with id ${req.params.id} not found`})
    //     }
    //     return res.render('courses',{courses:data.courses}) // get all courses
    // }
    // return res.status(404).send("url not provided")
    controller.Get(req,res,'course')
}

exports.createCourse = (req,res) => {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        code: Joi.string().required().pattern(new RegExp(/^([a-zA-Z]{3}[0-9]{3})$/)), // 3 characters and then 3 digits
        id: Joi.number(),
        description: Joi.string().allow(null,'').max(200)
    })
    // let {endpoint} = req.params
    // let body = req.body
    // body.id = idGen()   // add id generated from a hash function
    // let results = schema.validate(body)
    // if(results.error){
    //     if(endpoint == 'api')
    //         return res.status(404).send(results.error.message)
    //     if(endpoint == 'web')
    //         return res.status(404).render('error',{msg:results.error.message,redirect:"/web/courses/create"})
    // }
    // if(data.courses.length == MAXCOURSES)
    //     data.courses.shift()
    // data.courses.push(body)
    // fs.writeFile("./data.json",JSON.stringify(data), err => {
    //     if(err) throw err
    //     if(endpoint == 'api')
    //         return res.send(body)
    //     if(endpoint == 'web')
    //         return res.redirect(`/web/courses/${body.id}`)
    // })
    controller.Create(req,res,'course',MAXCOURSES,schema)
}

exports.updateCourse = (req,res) => {
    const schema = Joi.object({
        name: Joi.string().min(5),
        code: Joi.string().pattern(new RegExp(/^([a-zA-Z]{3}[0-9]{3})$/)), // 3 characters and then 3 digits
        id: Joi.number(),
        description: Joi.string().allow(null,'').max(200)
    })
    // let {endpoint} = req.params
    // if(endpoint == 'api'){
    //     let {body} = req;
    //     let ind = data.courses.findIndex(e => e.id == req.params.id)
    //     if(ind > -1){
    //         Object.assign(data.courses[ind],body)
    //         delete data.courses[ind]._locals;
    //         fs.writeFile("./data.json",JSON.stringify(data), err => {
    //             if(err) throw err
    //             return res.send(data.courses[ind])
    //         })
    //     }
    //     res.status(400).send(`given id ${req.params.id} not found`)
    // }
    // res.status(404).send('url not provided')
    controller.Update(req,res,'course',schema)
}

exports.deleteCourse = (req,res) => {
    // let {endpoint} = req.params
    // if(endpoint == 'api'){
    //     let ind = data.courses.findIndex(e => e.id == req.params.id)
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
    controller.Delete(req,res,'course')
}