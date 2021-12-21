const express = require("express");
const mysql = require("mysql");
const AppError = require("../utils/AppError");
const router = express.Router();
const bcrypt = require("bcryptjs");
var con = mysql.createConnection({
  host: process.env.database_host,
  user: process.env.database_user,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: 3306,
  insecureAuth: true,
  multipleStatements: true,
});


router.get("/signUp", (req, res) => {
  res.render("users/signUp");
});

router.post("/signUp", (req, res, next) => {
  // console.log(req.body)
  const { name, username, phone_no, password, con_password, email } = req.body;
  
  var q1 = "SELECT * FROM users WHERE email=? or username= ?";
  con.query(q1, [email, username], async (err, results, fields) => {
    if (err) {
      console.log(err);
      next(new AppError("Insufficient Data", 400));
      return;
    }
    if (results.length > 0) {
      req.flash('This username or email already has been taken !')
      res.redirect('/signUp');
    } else if (password !== con_password) {
      req.flash("Passwords don't match",401);
      res.redirect('/signUp');
    } else {
      let q =
        "insert into users(user_name,username,phone_no,user_pass,email) values ?";
      const hash_password = await bcrypt.hash(password, 8);
      // console.log(hash_password);
      var val = [[name, username, phone_no, hash_password, email]];
      con.query(q, [val], (err, results, fields) => {
        if (err) {
          next(new AppError("Please fill the data properly", 404));
          return;
        }
        req.session.user=username;
        res.redirect("/main");
      });
    }
  });
});

router.get("/login", (req, res) => {
  if(req.session.user){
    req.flash('error','You have already logged in')
    res.redirect('/main')
  }else{
    res.render("users/login");
  }
});



router.post("/login", (req, res,next) => {
  // console.log(req.body);
  const {username,password}=req.body;
  var q="select username,user_pass as hashPass from users where username=?";
  con.query(q,[username],(err,results,fields)=>{
    if(err){
      console.log('Login Error:-',err);
      next(new AppError('Something went wrong',400));
      return;
    }
    if(results.length==0){
      //
      req.flash('error','username or password is incorrect Try again :|')
      res.redirect('/login');
    }
    else if(results.length>0){
      const hashPass=results[0].hashPass;
      bcrypt.compare(password, hashPass, function(err, correct) {
            if(err){
              // console.log('You are error');
              console.log(err);
              next(new AppError('Username or password incorrect',401));
            }
            if(correct){
              // console.log('You are correct');
              req.session.user=username;
              // console.log('login',req.user);
              req.flash('success',`WELCOME BACK ${username}`);
              res.redirect("/main");
            }
            else{
              req.flash('error','username or password is incorrect Try again :|')
              res.redirect('/login');
            }
      });
    }
  });
});

router.get("/user/:id", (req, res, next) => {
  const { id } = req.params;
  // console.log(currUser);
  let q=`select id from users where id=${id}`
  con.query(q, function (err, results, fields) {
    // console.log(results);
    if (err) {
      console.log("DEVESH SHAKYA")
      let message = "User Not Found !";
      // res.render('error.ejs', { message })
      next(new AppError(message, 404));
      return;
    }
    if(results.length===0){
      req.flash('error',"User Not Found !")
      res.redirect('/main');
    }
    if(results.length>0){
      let query = `select count(*) as followers from follows where follower_id=${id};
      select count(*) as following from follows where followee_id=${id};
      select count(*) as posts from photos where user_id=${id};
      select username from users where id=${id};
      select image_url from photos where user_id=${id}`;
      con.query(query,(err,results,fields)=>{
      // console.log(results[1][0].following);
      const followers = results[0][0].followers;
      const following = results[1][0].following;
      const posts = results[2][0].posts;
      const username = results[3][0].username;
      const images = results[4];
      // console.log(images);
      res.render("users/index", {
        username,
        followers,
        following,
        posts,
        images,
      });
    })
    }
  });
});


router.get('/logout',(req,res)=>{
  if(req.session.user){
    const user=req.session.user;
    req.session.user=''
    req.flash('success',`See you soon ${user}:)`)
    res.redirect('/main');
  }
  else{
     req.flash('error','You are not logged in :|')
     res.redirect('/login');
  }
})


module.exports = router;






