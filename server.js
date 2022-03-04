require("dotenv").config();

const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT;
const router = require("./router");
const session = require("express-session");
const flash = require("connect-flash");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(router);
app.set("view engine", "ejs");
app.set("views", "./views");

db.sequelize
  .sync({
    alter: true,
  })
  .then(() => {
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
