const Joi = require("joi")
const fs = require("fs")

const controller = require("./controller")
const MAXCOURSES = 100

exports.getCourse = (req,res) => {
    controller.Get(req,res,'course')
}

exports.createCourse = (req,res) => {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        code: Joi.string().required().pattern(new RegExp(/^([a-zA-Z]{3}[0-9]{3})$/)), // 3 characters and then 3 digits
        id: Joi.number(),
        description: Joi.string().allow(null,'').max(200)
    })
    controller.Create(req,res,'course',MAXCOURSES,schema)
}

exports.updateCourse = (req,res) => {
    const schema = Joi.object({
        name: Joi.string().min(5),
        code: Joi.string().pattern(new RegExp(/^([a-zA-Z]{3}[0-9]{3})$/)), // 3 characters and then 3 digits
        id: Joi.number(),
        description: Joi.string().allow(null,'').max(200)
    })
    controller.Update(req,res,'course',schema)
}

exports.deleteCourse = (req,res) => {
    controller.Delete(req,res,'course')
}