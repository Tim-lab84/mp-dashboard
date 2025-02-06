const express = require("express");
const products = require("./assets/products-data.json");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 5000;

app.use(cors());

app.use(express.static(path.join(__dirname, "public", "client-build")));

app.get("/api/products", (req, res) => {
  res.json([...products]);
});

app.use("*", (request, response) => {
  response.sendFile(
    path.join(__dirname, "public", "client-build", "index.html")
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
