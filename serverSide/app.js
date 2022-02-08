if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const path = require("path");
const AppError = require("./utils/AppError");
const session = require("express-session");
const flash = require("connect-flash");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const photoRoutes = require("./routes/photoRoutes");
// const faker = require("faker");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const db = require("./utils/db");
const { json } = require("express");
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "notagoodsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(cors());
app.use(express.json());
app.use(flash());
app.use((req, res, next) => {
  res.locals.currUser = req.session.user;
  // console.log(currUser);
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/api/users/", userRoutes);
app.use("/api/photos/", photoRoutes);

//fake data
/**
const fakeData = () => {
  const salt = bcrypt.genSaltSync(8);
  const hashedPassword = bcrypt.hashSync("12345", salt);
  let q =
    "insert into users(fullName,username,phoneNo,userPass,email,profileImg) values ?";

  for (let i = 0; i < 10; i++) {
    let fullName = faker.name.findName();
    let username = `devesh${i}`;
    let email = faker.internet.email();
    let phoneNo = faker.phone.phoneNumber();
    let profileImg = faker.image.business();
    let userPass = hashedPassword;
    var val = [[fullName, username, phoneNo, userPass, email, profileImg]];
    db.query(q, [val], (err, results, fields) => {
      if (err) {
        console.log("ERROR------", err);
        return;
      }
      console.log(i, "  ");
      return;
    });
  }
};
fakeData();
 */
app.get("/", (req, res) => {
  res.render("../home");
});

app.get("/main", (req, res) => {
  let q = `select image_url,username,photos.user_id,photos.id as photo_id from photos
    join users on users.id=user_id
    group by photos.id
    order by photos.created_at desc`;
  db.query(q, function (error, results, fields) {
    if (error) {
      console.log(error);
      throw error;
    }
    let aq = `select count(*) as likes from photos
    join likes on photos.id=photo_id group by photos.id 
    order by photos.created_at desc`;
    db.query(aq, function (err, totalLikes, fields) {
      if (err) {
        console.log(err);
        throw error;
      }
      //  console.log('new res',totalLikes);
      res.render("main_page/index.ejs", { results, totalLikes });
      return;
    });
    // console.log(results[0].user_id);
  });
});

let q = "select username,id from users";
db.query(q, function (error, results, fields) {
  if (error) {
    console.log(error);
    throw error;
  }
  // console.log(results);
  exports.Userlist = results;
});

app.all("*", (req, res, next) => {
  next(new AppError("Page Not Found :|"));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("error", { message });
});

app.listen(3000, () => {
  console.log("hey baby, You are listening 3000 port");
});
