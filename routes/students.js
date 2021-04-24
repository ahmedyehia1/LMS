const router = require("express").Router();
const controller = require("../controllers/students");
const fs = require("fs")

data = JSON.parse(fs.readFileSync("./data.json",'utf-8', err => {if(err) throw err}))

router.post("/:endpoint/students", controller.createStudent)        // C
router.get('/:endpoint/students/:id?', controller.getStudent)        // R
router.put("/:endpoint/students/:id", controller.updateStudents)     // U
router.delete("/:endpoint/students/:id", controller.deleteStudents)  // D


module.exports = router;