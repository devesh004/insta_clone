const express = require("express");
const router = express.Router();
const AppError = require("../utils/AppError");
const con = require("../utils/db");
const { verifyTokenAndAuth } = require("./verifyToken");

router.post("/createPost", verifyTokenAndAuth, (req, res, next) => {
  const { image_url, user_id } = req.body;
  let q = "insert into photos(image_url,user_id) values ?";
  const val = [[image_url, user_id]];
  con.query(q, [val], (err, results, fields) => {
    if (err) {
      console.log("Can't upload post", err);
      res.status(401).json({ msg: "Post can't be uploaded" });
    }
    res.status(200).json("Post successfully uploaded :)");
  });
});

router.get("/photo/:id/comments", (req, res, next) => {
  const { id } = req.params;
  let q = `select comment_text as comment,username,user_id,comments.id as comment_id
  from users join comments on users.id=user_id where photo_id=${id}`;
  con.query(q, (err, results, fields) => {
    if (err) {
      console.log(err);
      next(new AppError("No Comment Found", 400));
      return;
    }
    // console.log(results)
    const photo_id = id;
    const comments = results;
    res.render("photos/comment", { comments, photo_id });
  });
});

router.post("/photo/:id/comments", (req, res, next) => {
  // console.log(req.body);
  const { id } = req.params;
  const comment = req.body.comment;
  // console.log('DEVESH-',comment);
  if (req.session.user && comment) {
    const user = req.session.user;
    // console.log(user);
    let q = "select id from users where username=?";
    con.query(q, user, (err, result, fields) => {
      if (err) {
        // console.log(err);
        next(new AppError("Something went wrong please try again;|", 404));
        return;
      }
      // console.log(result[0].id)
      const user_id = result[0].id;
      let qu = "insert into comments(comment_text,user_id,photo_id) values ?";
      const arr = [[comment, user_id, id]];
      con.query(qu, [arr], (err, result, fields) => {
        if (err) {
          console.log(err);
          next();
          return;
        }
        let qu = `select comment_text as comment,username,user_id,comments.id as comment_id 
          from users join comments on users.id=user_id where photo_id=${id}`;
        con.query(qu, (err, results, fields) => {
          if (err) {
            console.log(err);
            next(new AppError("No Comment Found", 400));
            return;
          }
          // console.log(results)
          const photo_id = id;
          const comments = results;
          res.render("photos/comment", { comments, photo_id });
        });
      });
    });
  } else {
    req.flash("error", "You should be logged in to add a comment");
    res.redirect("/main");
  }
});

router.delete("/photo/:photo_id/comment/:id", (req, res, next) => {
  if (req.session.user) {
    const { photo_id, id } = req.params;
    let q = `delete from comments where id=${id}`;
    con.query(q, (err, results, fields) => {
      if (err) {
        console.log(err);
        next(new AppError("Can't delete this comment", 401));
        return;
      }
      let qu = `select comment_text as comment,username,user_id,comments.id as comment_id
    from users join comments on users.id=user_id where photo_id=${photo_id}`;
      con.query(qu, (err, results, fields) => {
        if (err) {
          console.log(err);
          next(new AppError("No Comment Found", 400));
          return;
        }
        const comments = results;
        res.render("photos/comment", { comments, photo_id });
      });
    });
  }
});

module.exports = router;
