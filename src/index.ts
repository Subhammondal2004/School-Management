import dotenv from "dotenv";
dotenv.config();
import app from './app.js';
import pool from "./config/db.js";

const PORT = process.env.PORT;

async function startServer() {
  try {
    const connection = await pool.getConnection();

    console.log("MySQL Connected");

    connection.release();

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });

  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

startServer();