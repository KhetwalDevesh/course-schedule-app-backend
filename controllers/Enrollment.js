const Enrollment = require("../models/Enrollment");
const Course = require("../models/course");

exports.getSchedule = async (req, res) => {
	try {
		// const { course, username } = req.params;
		const course = req.query.course;
		const currentCourse = await Course.findOne({ name: course });

		const courseEnrollmentDetails = await Enrollment.findOne({
			course: course,
		});

		if (!courseEnrollmentDetails) {
			return;
		}

		// converting schedule duration per day in minutes
		const scheduleDurationPerDay = courseEnrollmentDetails.durationPerDay * 60;

		const enrollmentDate = courseEnrollmentDetails.enrollmentDate;
		let currentDateOfSchedule = new Date();
		currentDateOfSchedule.setDate(enrollmentDate.getDate() + 1);

		let schedule = {};

		let temporaryTasksArray = [];

		let currentDurationCountInMinutes = 0;

		// if current Day is Saturday or Sunday move ahead
		while (
			currentDateOfSchedule.getDay() === 6 ||
			currentDateOfSchedule.getDay() === 0
		) {
			currentDateOfSchedule.setDate(currentDateOfSchedule.getDate() + 1);
		}

		currentCourse.tasks.map((currentTask) => {
			if (
				currentDurationCountInMinutes + currentTask.duration <=
				scheduleDurationPerDay
			) {
				temporaryTasksArray.push(currentTask);
				currentDurationCountInMinutes += currentTask.duration;
			} else {
				// in case duration count of tasks gets higher than duration per day.........push all the tasks corresponding to the current date
				schedule[currentDateOfSchedule.toDateString()] = temporaryTasksArray;
				currentDateOfSchedule.setDate(currentDateOfSchedule.getDate() + 1);

				// if current Day is Saturday or Sunday move ahead
				while (
					currentDateOfSchedule.getDay() === 6 ||
					currentDateOfSchedule.getDay() === 0
				) {
					currentDateOfSchedule.setDate(currentDateOfSchedule.getDate() + 1);
				}
				currentDurationCountInMinutes = currentTask.duration;
				temporaryTasksArray = [];
				temporaryTasksArray.push(currentTask);
			}
		});
		res.send(schedule);
	} catch (error) {
		console.log(error);
	}
};

exports.getAllEnrollments = async (req, res) => {
	try {
		const allEnrollments = await Enrollment.find();
		res.send(allEnrollments);
	} catch (error) {
		console.log(error);
	}
};

exports.enrollToTheCourse = async (req, res) => {
	try {
		const { username, course, enrollmentDate, durationPerDay } = req.body;
		const isCourseEnrolled = await Enrollment.findOne({ course: course });
		console.log("isCourseEnrolled", JSON.stringify(isCourseEnrolled, null, 2));
		if (isCourseEnrolled === null) {
			const enrolledCourse = await Enrollment.create(req.body);
			res.json({
				success: true,
				msg: enrolledCourse,
			});
		} else {
			return res
				.status(409)
				.send({ error: "YOU_ARE_ALREADY_ENROLLED_IN_THIS_COURSE" });
		}
	} catch (error) {}
};

exports.deleteAllEnrollments = async (req, res) => {
	try {
		await Enrollment.deleteMany({});
		res.send("all enrollments deleted successfully");
	} catch (error) {
		console.log(error);
	}
};
