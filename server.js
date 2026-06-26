import express from "express";
import 'dotenv/config'
import connectToDB from "./config/db.js";
import authRoute from "./routes/auth.routes.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use("/api/auth",authRoute)

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
