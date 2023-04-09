const express = require("express");
const {
	getSchedule,
	enrollToTheCourse,
	getAllEnrollments,
	deleteAllEnrollments,
} = require("../controllers/Enrollment");

const enrollmentRouter = express.Router();

enrollmentRouter
	.route("/")
	.get(getSchedule)
	.post(enrollToTheCourse)
	.delete(deleteAllEnrollments);
enrollmentRouter.route("/getAllEnrollments").get(getAllEnrollments);

module.exports = enrollmentRouter;
