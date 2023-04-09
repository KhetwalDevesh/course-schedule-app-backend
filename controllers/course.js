const Course = require("../models/course");

exports.getCourses = async (req, res) => {
	try {
		const courses = await Course.find();
		res.send(courses);
	} catch (error) {
		console.log(error.message);
	}
};

exports.getCourseById = async (req, res) => {
	try {
		const course = await Course.findById(req.params.id);
		if (course) {
			res.send(course);
		} else {
			res.status(400).send("Course not found");
		}
	} catch (error) {
		console.log("error in getting the course", error);
		throw error;
	}
};

exports.createCourse = async (req, res) => {
	try {
		const course = Course.create(req.body);
		res.json({ success: true, msg: course });
	} catch (error) {
		console.log(error.message);
	}
};
