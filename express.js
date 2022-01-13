//! Middlewares
/*
"Middleware"lar routeimiz va controllerimiz"(req, res) => {})"orasida ishlab turuvchi funksiya 
--> authorisation va authentication uchun, errorlani ushlab olish uchun, "api" larimizni bloklab qo`yish uchun ishatiladi va req, response abyectlariga ta`ssir ko`rsatish uchun ishlatiladi
*/

//! app.use() to`liq application metodlari(Routelari) qabul qiluvchi middlewarelarni qabul qilish uchun ishlatiladi!

const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const port = 9999;

app.use(express.json());

const allUsers = require("./modules/allUsers.js");
const subAdmins = require("./modules/subAdmins.js");

const userStatusCheck = (req, res, next) => {
  const { name, token } = req.body;

  const foundUser = allUsers.find((e) => e.name == name && e.token == token);
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
  res.send(`You are the main admin and you have the rights to see allUsers for seeing
      this you should type '/admin/allUsers' in routing part with post method moreover, you can
      create subAdmin😍 for doing this just in Routing part type 'subAdmin' with
      post metod and in its body input subAdmin's name and id `);
});

app.post("/admin/allUsers", userStatusCheck, (req, res) => {
  const { role } = req.body;
  if (role == "admin") {
    res.send(allUsers);
  } else {
    res.send("You are not Admin🤷‍♂️");
  }
});

app.get("/user", (req, res) => {
  res.send("user page");
});

app.post("/subAdmin", (req, res) => {
  const user = req.body;

  fs.readFile(
    path.resolve(__dirname, "./modules/subAdmins.js"),
    (err, data) => {
      if (err) throw err;
      const newSubAdmin = data.push(user);
      res.send(JSON.stringify(newSubAdmin, null, 4));
    }
  );

  fs.writeFile(
    path.resolve(__dirname, "./modules/subAdmins.js"),
    (err, data) => {
      if (err) throw err;

      res.send(data);
    }
  );
});

app.listen(port, () => {
  console.log(`your 2nd lesson is running on https://localhost:${port}`);
});
