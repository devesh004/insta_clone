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
      next(new AppError("Username or email already has been used", 400));
      return;
    } else if (password !== con_password) {
      next(new AppError("Passwords don't match"), 400);
      return;
    } else {
      let q =
        "insert into users(user_name,username,phone_no,user_pass,email) values ?";
      const hash_password = await bcrypt.hash(password, 8);
      console.log(hash_password);
      var val = [[name, username, phone_no, hash_password, email]];
      con.query(q, [val], (err, results, fields) => {
        if (err) {
          next(new AppError("Please fill the data properly", 404));
          return;
        }
        res.redirect("/main");
      });
    }
  });
});

router.get("/login", (req, res) => {
  res.render("users/login");
});
router.post("/login", (req, res,next) => {
  // console.log(req.body);
  const {username,password}=req.body;
  var q="select username,user_pass as hashPass from users where username=?";
  con.query(q,[username],(err,results,fields)=>{
    if(err){
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
              next(new AppError('Username or password incorrect',401));
            }
            if(correct){
              req.flash('success',`WELCOME BACK ${username}`)
              res.redirect("/main");
            }
      });
    }
  });
});

router.get("/user/:id", (req, res, next) => {
  const { id } = req.params;
  let q = `select count(*) as followers from follows where follower_id=${id};
    select count(*) as following from follows where followee_id=${id};
    select count(*) as posts from photos where user_id=${id};
    select username from users where id=${id};
    select image_url from photos where user_id=${id}`;
  con.query(q, function (err, results, fields) {
    if (err) {
      let message = "User Not Found !";
      // res.render('error.ejs', { message })
      next(new AppError(message, 404));
      return;
    }
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
  });
});


module.exports = router;







// // config/passport.js
// // load all the things we need
// var LocalStrategy   = require('passport-local').Strategy;
// var mysql = require('mysql');
// var con = mysql.createConnection({
//   host: process.env.database_host,
//   user: process.env.database_user,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
//   port: 3306,
//   insecureAuth: true,
//   multipleStatements: true,
// });

// // expose this function to our app using module.exports
// module.exports = function(passport) {

// 	// =========================================================================
//     // passport session setup ==================================================
//     // =========================================================================
//     // required for persistent login sessions
//     // passport needs ability to serialize and unserialize users out of session

//     // used to serialize the user for the session
//     passport.serializeUser(function(user, done) {
// 		done(null, user.id);
//     });

//     // used to deserialize the user
//     passport.deserializeUser(function(id, done) {
// 		connection.query("select * from users where id = "+id,function(err,rows){	
// 			done(err, rows[0]);
// 		});
//     });
	

//  	// =========================================================================
//     // LOCAL SIGNUP ============================================================
//     // =========================================================================
//     // we are using named strategies since we have one for login and one for signup
// 	// by default, if there was no name, it would just be called 'local'

//     passport.use('local-signup', new LocalStrategy({
//         // by default, local strategy uses username and password, we will override with email
//         usernameField : 'email',
//         passwordField : 'password',
//         passReqToCallback : true // allows us to pass back the entire request to the callback
//     },
//     function(req, email, password, done) {

// 		// find a user whose email is the same as the forms email
// 		// we are checking to see if the user trying to login already exists
//         connection.query("select * from users where email = '"+email+"'",function(err,rows){
// 			console.log(rows);
// 			console.log("above row object");
// 			if (err)
//                 return done(err);
// 			 if (rows.length) {
//                 return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
//             } else {

// 				// if there is no user with that email
//                 // create the user
//                 var newUserMysql = new Object();
				
// 				newUserMysql.email    = email;
//         newUserMysql.password = password; // use the generateHash function in our user model
			
// 				var insertQuery = "INSERT INTO users ( email, password ) values ('" + email +"','"+ password +"')";
// 					console.log(insertQuery);
// 				connection.query(insertQuery,function(err,rows){
// 				newUserMysql.id = rows.insertId;
				
// 				return done(null, newUserMysql);
// 				});	
//             }	
// 		});
//     }));

//     // =========================================================================
//     // LOCAL LOGIN =============================================================
//     // =========================================================================
//     // we are using named strategies since we have one for login and one for signup
//     // by default, if there was no name, it would just be called 'local'

//     passport.use('local-login', new LocalStrategy({
//         // by default, local strategy uses username and password, we will override with email
//         usernameField : 'email',
//         passwordField : 'password',
//         passReqToCallback : true // allows us to pass back the entire request to the callback
//     },
//     function(req, email, password, done) { // callback with email and password from our form

//          connection.query("SELECT * FROM `users` WHERE `email` = '" + email + "'",function(err,rows){
// 			if (err)
//                 return done(err);
// 			 if (!rows.length) {
//                 return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
//             } 
			
// 			// if the user is found but the password is wrong
//             if (!( rows[0].password == password))
//                 return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
			
//             // all is well, return successful user
//             return done(null, rows[0]);			
		
// 		});
//     }));

// };


