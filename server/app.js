const express = require("express");
const products = require("./assets/products-data.json");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());

app.get("/api/products", (req, res) => {
  res.json([...products]);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
