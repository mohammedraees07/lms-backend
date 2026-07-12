import config from "./config/config.js"
import express from "express";
import connectToDB from "./config/db.js";
import authRoute from "./routes/auth.routes.js"
import courseRoute from "./routes/course.routes.js"
import lessonRoute from "./routes/lesson.routes.js"
import enrollmentRoute from "./routes/enrollment.routes.js"
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();
const PORT = config.PORT;

app.use(express.json());


app.use("/api/auth",authRoute)
app.use("/api/courses",courseRoute)
app.use("/api/lesson",lessonRoute)
app.use("/api/enroll",enrollmentRoute)

app.use(errorMiddleware)


const startServer = async():Promise<void> => {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} in ${config.NODE_ENV} mode`);
    });
  } catch (error) {
    console.error("Failed to connect to server!",(error as Error).message);
  }
};

startServer();
