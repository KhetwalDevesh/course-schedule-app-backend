const mongoose = require("mongoose");

const EnrollmentSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: false,
		},
		course: {
			type: String,
			required: true,
		},
		enrollmentDate: {
			type: Date,
			required: true,
		},
		durationPerDay: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Enrollment = mongoose.model("Enrollment", EnrollmentSchema);
module.exports = Enrollment;
