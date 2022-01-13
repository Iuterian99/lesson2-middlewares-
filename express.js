const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const port = 9999;
app.use(express.json());
//! app.use() to`liq application metodlari(Routelari) qabul qiluvchi middleware qabul qilish uchun ishlatiladi!

const users = require("./modules/users.js");
//! Middlewares
/*
"Middleware"lar routeimiz va controllerimiz"(req, res) => {})"orasida ishlab turuvchi funksiya 
--> authorisation va authentication uchun, errorlani ushlab olish uchun, "api" larimizni bloklab qo`yish uchun ishatiladi va req, response abyectlariga ta`ssir ko`rsatish uchun ishlatiladi
*/

const userStatusCheck = (req, res, next) => {
  const { name, token } = req.body;

  const foundUser = users.find((e) => e.name == name && e.token == token);
  if (foundUser) {
    req.body.role = foundUser.role;
    next(); // next()--> allows the request to continue to the next middleware or function
  } else {
    res.status(401).send({
      status: 401,
      message: "You are not authorized",
    });
  }
};

app.post("/login", userStatusCheck, (req, res) => {
  const { role } = req.body;
  if (role == "admin") {
    res.redirect("/admin");
  } else if (role == "subAdmin") {
    res.redirect("/subAdmin");
  } else if (role == "user") {
    res.redirect("/user");
  }
});

app.get("/admin", (req, res) => {
  res.send(
    "You are the main admin and you can create subAdmin😍 for doing this just in Routing part type 'subAdmin' with post metod and in its body input subAdmin`s name & id"
  );
});

app.get("/user", (req, res) => {
  res.send("user page");
});

app.get("/subAdmin", (req, res) => {
  const { name, id } = req.body;

  res.send("subAdmin page");
});

app.listen(port, () => {
  console.log(`your 2nd lesson is running on https://localhost:${port}`);
});
