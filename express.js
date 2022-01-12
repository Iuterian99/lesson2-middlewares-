const express = require("express");
const app = express();
const port = 9999;

//! Middlewares
/*
"Middleware"lar routeimiz va controllerimiz"(req, res) => {})"orasida ishlab turuvchi funksiya 
--> authorisation va authentication uchun, errorlani ushlab olish uchun, keyinchalik "api" larimizni bloklab qo`yish uchun ishatiladi
*/

const users = [
  {
    id: 1,
    name: "Ali",
  },
  {
    id: 2,
    name: "Bekzod",
  },
];

const middleware = (req, res, next) => {
  const userId = req.params.id;
  const foundUser = users.find((e) => e.id == userId);
  if (foundUser) {
    next(); // next()--> allows the request to continue to the next middleware or function
  } else {
    res.send("tur yuqol");
  }
};

app.get("/users/:id", middleware, (req, res) => {
  res.send(users);
});

app.post("/users/:id", middleware, (req, res) => {
  res.send(users);
});

app.post("/users/:id", middleware, (req, res) => {
  res.send(users);
});
app.listen(port, () => {
  console.log(`your 2nd lesson is running on https://localhost:${port}`);
});
