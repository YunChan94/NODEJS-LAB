// const routes = require("./routes"); // import file routes vao sever
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "pug"); // 🔴dùng pug engine vào
app.set("views", "views");

const admin = require("./routes/admin");
const adminRoutes = admin.router;
const shopRouters = require("./routes/shop");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public"))); //dùng trong file html

app.use("/admin", adminRoutes); //path /admin/... chạy vào trong adminRouter

app.use(shopRouters);

app.use((req, res, next) => {
  res.render("404");
});
app.listen(3000);
