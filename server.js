const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const courseRouter = require("./routes/course");
const enrollmentRouter = require("./routes/Enrollment");
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/courses", courseRouter);
app.use("/enroll", enrollmentRouter);
app.listen(8000, () => {
	console.log(`Server up and running on port 8000`);
});
