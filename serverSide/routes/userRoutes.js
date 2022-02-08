const express = require("express");
const AppError = require("../utils/AppError");
const router = express.Router();
const bcrypt = require("bcryptjs");
const con = require("../utils/db");
const jwt = require("jsonwebtoken");
const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("./verifyToken");

router.get("/signUp", (req, res) => {
  res.render("users/signUp");
});

router.post("/signUp", (req, res, next) => {
  const {
    fullName,
    username,
    phoneNo,
    userPass,
    conPassword,
    email,
    profileImg,
  } = req.body;
  // console.log(req.body);
  var q1 = "SELECT * FROM users WHERE email=? or username= ?";
  con.query(q1, [email, username], async (err, results, fields) => {
    if (err) {
      console.log("E1  ", err);
      next(new AppError("Insufficient Data", 400));
      return;
    }
    if (results.length > 0) {
      req.flash("This username or email already has been taken !");
      console.log("E2  ");
      res.redirect("/api/users/signUp");
    } else if (userPass !== conPassword) {
      req.flash("Passwords don't match", 401);
      console.log("E3  ");
      res.redirect("/api/users/signUp");
    } else {
      let isAdmin = false;
      let q =
        "insert into users(fullName,username,phoneNo,userPass,email,profileImg,isAdmin) values ?";
      const salt = bcrypt.genSaltSync(8);
      const hash_password = bcrypt.hashSync(userPass, salt);
      var val = [
        [
          fullName,
          username,
          phoneNo,
          hash_password,
          email,
          profileImg,
          isAdmin,
        ],
      ];
      con.query(q, [val], (err, results, fields) => {
        if (err) {
          console.log("ERROR------", err);
          next(new AppError("Please fill the data properly", 404));
          return;
        }
        let idQu = `select id from users where username=?`;
        con.query(idQu, [username], (err, results, fields) => {
          if (err) {
            console.log(err);
            return;
          }
          let id = results[0].id;
          console.log(id);
          req.session.user = username;
          const { userPass, conPassword, ...others } = req.body;
          const accessToken = jwt.sign(
            {
              isAdmin: isAdmin,
              id: id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
          );
          res.status(200).json({ id, ...others, isAdmin, accessToken });
          return;
        });
      });
    }
  });
});

router.get("/login", (req, res) => {
  if (req.session.user) {
    req.flash("error", "You have already logged in");
    res.redirect("/main");
  } else {
    res.render("users/login");
  }
});

router.post("/login", (req, res, next) => {
  // console.log(req.body);
  const { username, userPass } = req.body;
  var q =
    "select id,username,isAdmin,userPass as hashPass from users where username=?";
  con.query(q, [username], (err, results, fields) => {
    if (err) {
      console.log("Login Error:-", err);
      next(new AppError("Something went wrong", 400));
      return;
    }
    if (results.length == 0) {
      req.flash("error", "username or password is incorrect Try again :|");
      res.redirect("/login");
    } else if (results.length > 0) {
      const hashPass = results[0].hashPass;
      const id = results[0].id;
      const isAdmin = results[0].isAdmin;
      bcrypt.compare(userPass, hashPass, function (err, correct) {
        if (err) {
          console.log("You are error");
          console.log(err);
          next(new AppError("Username or password incorrect", 401));
        }
        if (correct) {
          req.session.user = username;
          let userQu = "select * from users where id=?";
          con.query(userQu, [id], (err, results, fields) => {
            if (err) {
              console.log("CAN'T FIND USER DETAILS", err);
            }
            // console.log(results[0]);
            const accessToken = jwt.sign(
              {
                id: id,
                isAdmin: isAdmin,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "3d",
              }
            );
            const { userPass, ...others } = results[0];
            res.status(200).json({ ...others, accessToken });
          });
        } else {
          req.flash("error", "username or password is incorrect Try again :|");
          res.redirect("/login");
        }
      });
    }
  });
});

router.get("/user/:id", (req, res, next) => {
  const { id } = req.params;
  // console.log(currUser);
  let q = `select id from users where id=${id}`;
  con.query(q, function (err, results, fields) {
    // console.log(results);
    if (err) {
      console.log("DEVESH SHAKYA");
      let message = "User Not Found !";
      // res.render('error.ejs', { message })
      next(new AppError(message, 404));
      return;
    }
    if (results.length === 0) {
      req.flash("error", "User Not Found !");
      res.redirect("/main");
    }
    if (results.length > 0) {
      let query = `select count(*) as followers from follows where follower_id=${id};
      select count(*) as following from follows where followee_id=${id};
      select count(*) as posts from photos where user_id=${id};
      select username from users where id=${id};
      select image_url from photos where user_id=${id}`;
      con.query(query, (err, results, fields) => {
        // console.log(results[1][0].following);
        const followers = results[0][0].followers;
        const following = results[1][0].following;
        const posts = results[2][0].posts;
        const username = results[3][0].username;
        const images = results[4];
        // console.log(images);

        res.render("users/index", {
          id,
          username,
          followers,
          following,
          posts,
          images,
        });
      });
    }
  });
});

router.get("/follow/:id", (req, res, next) => {
  const { id } = req.params;
  let q = "select id from users where username=?";
  const user = req.session.user;
  con.query(q, user, (err, results, fields) => {
    if (err) {
      console.log(err);
      next(new AppError(err.message, 400));
      return;
    }
    const currUserId = results[0].id;
    let qu = "insert into follows(follower_id,followee_id) values ?";
    const arr = [[currUserId, id]];
    con.query(qu, [arr], (err, results, fields) => {
      if (err) {
        console.log(err);
        next(new AppError(`You can't follow this user`, 500));
        return;
      }
      const followed = 1;
      res.redirect(`/user/${id}`);
    });
  });
});

router.post("/logout", (req, res) => {
  // console.log("LOGOUT");
  if (req.headers.token) {
    req.headers.token = "";
  }
  res.status(200).json("Logged Out Successfully!");
});

module.exports = router;
