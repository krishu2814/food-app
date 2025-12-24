import express, { urlencoded } from "express";
import colors from "colors"; // only in console.
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

// dot env configuration -> root file
dotenv.config();

// DB connection
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routing

app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to food-app</h1>");
});

// Port
const PORT = process.env.PORT;

// Listening on the Port
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`.white.bgMagenta);
});
