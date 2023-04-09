const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		tasks: [
			{
				title: { type: String, required: true },
				description: {
					type: String,
					required: true,
				},
				type: {
					type: String,
					required: true,
				},
				duration: {
					type: Number,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
