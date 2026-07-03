import config from "./config/config.js"
import express from "express";
import connectToDB from "./config/db.js";
import authRoute from "./routes/auth.routes.js"
import courseRoute from "./routes/course.routes.js"
import lessonRoute from "./routes/lesson.routes.js"
import enrollmentRoute from "./routes/enrollment.routes.js"

const app = express();
const PORT = config.PORT|| 3000;

app.use(express.json());


app.use("/api/auth",authRoute)
app.use("/api/course",courseRoute)
app.use("/api/lesson",lessonRoute)
app.use("/api/enroll",enrollmentRoute)


const startServer = async() => {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to server!",error);
  }
};

startServer();
