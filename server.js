const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const e = require("express");
dotenv.config();
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 8080; //process.env.POR 是Heroku自動動態設定

//連結 mongodb
mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("Connecting mongodb...");
  })
  .catch((e) => {
    console.log(e);
  });

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));

app.use("/api/user", authRoute);
//courseRoute 應該被jwt保護
//如果request header內部沒有jwt，則request就會被視為是unauthorized
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
);

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log("後端伺服器聆聽port 8080...");
});
