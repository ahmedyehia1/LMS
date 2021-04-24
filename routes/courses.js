const router = require("express").Router();
const controller = require("../controllers/courses");

// full path is used here so that endpoint variable is avalible inside callback
router.post("/:endpoint/courses/", controller.createCourse)       // C
router.get('/:endpoint/courses/:id?', controller.getCourse)       // R
router.put("/:endpoint/courses/:id", controller.updateCourse)     // U
router.delete("/:endpoint/courses/:id", controller.deleteCourse)  // D

module.exports = router;