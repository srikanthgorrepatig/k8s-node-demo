const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello from Node Demo App!");
});

app.listen(port, () => {
  console.log(`Node Demo App running on port ${port}`);
});
