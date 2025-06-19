const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./Routers/auth.router");
const bookRoutes = require("./Routers/book.router");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });
