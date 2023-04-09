const express = require("express");
const courseRouter = express.Router();
const {
	getCourses,
	createCourse,
	getCourseById,
} = require("../controllers/course");

courseRouter.route("/").get(getCourses).post(createCourse);
courseRouter.route("/:id").get(getCourseById);

module.exports = courseRouter;
