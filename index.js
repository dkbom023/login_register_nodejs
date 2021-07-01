const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
const dbConnection = require("./database");
const { body, validationResult } = require("express-validator");
const { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } = require("constants");

const app = express();
app.use(express.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  cookieSession({
    name: "session",

    keys: ["key1", "key2"],
    maxAge: 3600 * 1000,
  })
);

//for nonloggedin fucking people
const ifNotLoggedIn = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.render("login-register");
  }
  next();
};

//root
app.get("/", ifNotLoggedIn, (req, res, next) => {
  dbConnection
    .execute("SELECT name FROM users WHERE id =?"[req.session.userID])
    .then(([rows]) => {
      res.render("home", {
        name: rows[0].name,
      });
    });
});

app.listen(3000, () => console.log("Server is running..."));
