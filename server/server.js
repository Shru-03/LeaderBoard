const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/api", userRoutes);
