const Joi = require("joi")

const controller = require("./controller")
const MAXSTUDENTS = 100

exports.getStudent = (req,res) => {
    controller.Get(req,res,'student')
}

exports.createStudent = (req,res) => {
    const schema = Joi.object({
        name: Joi.string().required().pattern(new RegExp(/^([a-zA-Z]|-|')+$/)), // characters in any case and - and '
        code: Joi.string().required().length(7),
        id: Joi.number()
    })
    controller.Create(req,res,'student',MAXSTUDENTS,schema)
}

exports.updateStudents = (req,res) => {
    const schema = Joi.object({
        name: Joi.string().pattern(new RegExp(/^([a-zA-Z]|-|')+$/)), // characters in any case and - and '
        code: Joi.string().length(7),
        id: Joi.number()
    })
    controller.Update(req,res,'student',schema)
}

exports.deleteStudents = (req,res) => {
    controller.Delete(req,res,'student')
}