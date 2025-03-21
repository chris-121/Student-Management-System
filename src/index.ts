import express, { Request, Response } from "express";
import connectDB from "./config/db";
import userRoutes from "./routes/users.routes";
import taskRoutes from "./routes/tasks.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Student Management server");
});

app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
