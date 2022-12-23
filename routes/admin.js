const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

const products = [];

// 🔴Lưu ý giống path, khác method
// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.render("add-product");
});
// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.router = router;
exports.products = products;
