const express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
  res.render("client/pages/products/index");
})

module.exports = routes;