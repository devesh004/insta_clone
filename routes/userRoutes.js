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

// const { updateQuery } = require("../middleware/user");

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
      console.log("signUp error  ", err);
      res.status(400).json({ msg: "Insufficient Data" });
      return;
    }
    if (results.length > 0) {
      res
        .status(401)
        .json({ msg: "This username or email already has been taken !" });
    } else if (userPass !== conPassword) {
      res.status(401).json({ msg: "Password don't match" });
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
          res.status(500).json({ msg: "Please fill the data properly" });
          // next(new AppError("Please fill the data properly", 404));
          return;
        }
        let idQu = `select id from users where username=?`;
        con.query(idQu, [username], (err, results, fields) => {
          if (err) {
            console.log(err);
            return;
          }
          let id = results[0].id;
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

router.post("/login", (req, res, next) => {
  const { username, userPass } = req.body;
  var q =
    "select id,username,isAdmin,userPass as hashPass from users where username=?";
  con.query(q, [username], (err, results, fields) => {
    if (err) {
      console.log("Login Error:- ", err);
      next(new AppError("Something went wrong", 500));
      return;
    }
    if (results.length == 0) {
      res
        .status(401)
        .json({ msg: "username or password is incorrect Try again :|" });
    } else if (results.length > 0) {
      const hashPass = results[0].hashPass;
      const id = results[0].id;
      const isAdmin = results[0].isAdmin;
      bcrypt.compare(userPass, hashPass, function (err, correct) {
        if (err) {
          console.log("You are error");
          res
            .status(401)
            .json({ msg: "username or password is incorrect Try again :|" });
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
            // console.log("login", accessToken);
            const { userPass, ...others } = results[0];
            res.status(200).json({ ...others, accessToken });
          });
        }
      });
    }
  });
});

router.put("/userEdit/:id", (req, res) => {
  const userId = req.params.id;
  const user = req.body;
  const type = req.body.type;
  // console.log(user);
  let q;
  if (type === "edit") {
    if (user.username == "guest") {
      res.status(401).json({ msg: "You are not authorized" });
    }
    const web = JSON.stringify(user.websites);
    q = `update users SET username="${user.username}",fullName="${user.fullName}",phoneNo="${user.phoneNo}",
    email="${user.email}",bio="${user.bio}",websites='${web}',profileImg="${user.profileImg}" 
    where id=${userId}`;
    con.query(q, (err, results, fields) => {
      if (err) {
        console.log(err);
        res.status(400).json({ msg: "Your update can't take place" });
      } else {
        console.log("Updated Here");
        res.status(200).json({ msg: "Update successfull" });
      }
    });
  } else if (type === "changePass") {
    if (user.username === "guest") {
      res.status(401).json({ msg: "You are not authorized" });
    }
    let qu = `select userPass from users where username="${user.username}"`;
    var p = 1;
    con.query(qu, (err, results, fields) => {
      if (err) {
        console.log(err);
        res.status(400).json("You are not authorized");
      } else if (results.length === 0) {
        res.status(400).json("User not found");
      } else {
        const hashPass = results[0].userPass;
        const userPass = user.oldPass;
        console.log(user.oldPass, user.newPass, hashPass);
        bcrypt.compare(userPass, hashPass, function (err, correct) {
          if (err) {
            console.log("You are error");
            res.status(401).json({ msg: "Old password is wrong" });
          }
          if (correct) {
            console.log("CORRECT");
            const salt = bcrypt.genSaltSync(8);
            const newHashPass = bcrypt.hashSync(user.newPass, salt);
            q = `update users SET userPass="${newHashPass}" where id=${userId}`;
            con.query(q, (err, results, fields) => {
              if (err) {
                console.log(err);
                res.status(400).json({ msg: "Your update can't take place" });
              } else {
                console.log("Updated Here");
                res.status(200).json("Update successfull");
              }
            });
          } else {
            console.log("In Else");
            res.status(400).json({ msg: "Wrong Password" });
          }
        });
      }
    });
  }
});

router.post("/user/:id", verifyToken, (req, res, next) => {
  const { id } = req.params;
  const { currentId } = req.body;
  // console.log(id, " ", currentId);
  let query = `select count(*) as followers from follows where followee_id=${id};
      select count(*) as following from follows where follower_id=${id};
      select * from users where id=${id};
      select * from post where user_id=${id};
      select 1 as status from follows where follower_id=${currentId} and followee_id=${id};`;
  con.query(query, (err, results, fields) => {
    // console.log(results);
    const followers = results[0][0].followers;
    const following = results[1][0].following;
    const { userPass, ...user } = results[2][0];
    const posts = results[3];
    let status = results[4].length;
    const userDet = { followers, following, user, posts, status };
    res.status(200).json(userDet);
  });
});

router.post("/follow/:id", (req, res, next) => {
  const { id } = req.params;
  const currUserId = req.body.id;
  if (id == currUserId) {
    return;
  }
  let qu = "insert into follows(follower_id,followee_id) values ?";
  const arr = [[currUserId, id]];
  con.query(qu, [arr], (err, results, fields) => {
    if (err) {
      const q = `delete from follows where follower_id=${currUserId} and followee_id=${id}`;
      con.query(q, (err, results, fields) => {
        if (err) {
          console.log(err);
          return;
        }
        res.status(200).json({ follow: -1, status: "follow" });
      });
    } else {
      res.status(200).json({ follow: 1, status: "following" });
    }
  });
});

router.get("/userFind/:input", (req, res) => {
  const input = req.params.input.toLowerCase();
  // console.log("INPUT ", input);
  const query = `select id,username,fullName,profileImg from users where username like "%${input}%" or fullName like "%${input}%"`;
  con.query(query, (err, results, fields) => {
    if (err) {
      console.log("ERROR ", err);
    }
    console.log(results);
    res.status(200).json(results);
  });
});

router.post("/logout", (req, res) => {
  console.log("server LOGOUT");
  req.headers.token = null;
  res.status(200).json("Logged Out Successfully!");
});

module.exports = router;
