import express from "express";
const app = express();
const PORT = 9000;

app.get("/", (req, res) => {
  res.send("API IS RUNNING!");
});

app.listen(PORT, () => {
  console.log(`API IS RUNNING ON http://localhost:${PORT}`);
});
