import express from "express";
import connectToMongo from "./config/db.js";
import authRouters from "./routes/blog.js";
const app = express();
const PORT = 9000;

connectToMongo();

app.get("/", (req, res) => {
  res.send("API IS RUNNING!");
});

// API routes
app.use("/api/v1", authRouters);

app.listen(PORT, () => {
  console.log(`API IS RUNNING ON http://localhost:${PORT}`);
});
