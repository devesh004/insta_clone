if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mysql = require("mysql");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const path = require("path");
const { nextTick } = require("process");
const AppError = require("./utils/AppError");
const session = require("express-session");
// const faker = require('faker');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const userRoutes = require("./routes/userRoutes");
const photoRoutes=require("./routes/photoRoutes");

var con = mysql.createConnection({
  host: process.env.database_host,
  user: process.env.database_user,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: 3306,
  insecureAuth: true,
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// Basic queries
// var q = `insert into users(user_name,username,user_pass,email,phone_no) values ? `;
// let val = [['hello', 'user', 'bebe', 'njhgf@edf', '3457687989'],
// ['devu', 'devuUser', 'password', 'devesh@122', '2313234423']];

//SEEDING FAKE DATA
// let q = 'insert into users(user_name,username,user_pass,email,phone_no) values ?';
// let val = [];
// for (let i = 0; i < 100; i++) {
//     let name = faker.name.findName();
//     let username = faker.name.firstName();
//     let email = faker.internet.email();
//     val.push([
//     ])
// }

// con.query(q, [val], function (error, results, fields) {
//     if (error) { throw error; }
//     console.log(results);
// });
// con.end;

app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
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
app.use(flash());

app.use((req,res,next)=>{
    res.locals.currUser = req.user;
    res.locals.success = req.flash('success');  
    res.locals.error = req.flash('error');
    next();
})

app.use("/", userRoutes);
app.use("/",photoRoutes);

app.get("/", (req, res) => {
  // req.session.mai = 'devesh'
  // console.log(req.session.mai);
  res.send(flash())
  res.render("../home");
});
// app.get('/login', (req, res) => {
//     res.render('users/login')
// });
// app.post('login',(req,res)=>{
// })

app.get("/main", (req, res) => {
  let q = `select image_url,username,photos.user_id,photos.id as photo_id,count(*) as likes from photos 
    join users on users.id=user_id
    join likes on photo_id=photos.id
    group by photos.id
    order by photos.created_at desc`;
  con.query(q, function (error, results, fields) {
    if (error) {
      console.log(error);
      throw error;
    }
    // console.log(results);
    // console.log(results[0].user_id);
    res.render("main_page/index.ejs", { results });
  });
});


// app.post('/photo/:id/comments', (req, res, next) => {

// })

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