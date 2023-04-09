const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: false,
		},
		courses: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: "Course",
			},
		],
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);
module.exports = User;
