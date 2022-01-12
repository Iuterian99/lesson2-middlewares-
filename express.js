const express = require("express");
const app = express();
const port = 9999;

//! Middlewares
/*
routeimiz va controllerimiz"(req, res) => {})"orasida ishlab turuvchi funksiya 
--> authorisation uchun, errorlani ushlab olish uchun, keyinchalik "api" larimizni bloklab qo`yish uchun ishatiladi
*/
const middleware = (req, res, next) => {
  console.log("message from middleware");
  next();
};

app.get("/", middleware, (req, res) => {
  res.send("salom");
});
app.listen(port, () => {
  console.log(`your 2nd lesson is running on https://localhost:${port}`);
});
