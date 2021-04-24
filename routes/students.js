const router = require("express").Router();
const controller = require("../controllers/students");
const fs = require("fs")

// full path is used here so that endpoint variable is avalible inside callback
router.post("/:endpoint/students", controller.createStudent)         // C
router.get('/:endpoint/students/:id?', controller.getStudent)        // R
router.put("/:endpoint/students/:id", controller.updateStudents)     // U
router.delete("/:endpoint/students/:id", controller.deleteStudents)  // D


module.exports = router;