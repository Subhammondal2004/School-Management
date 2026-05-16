import express from "express";
import cors from "cors";
import SchoolRoute from "./routes/school-route.js";

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/school", SchoolRoute);

export default app;