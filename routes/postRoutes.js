const express = require("express");
const router = express.Router();
const AppError = require("../utils/AppError");
const con = require("../utils/db");
const { verifyTokenAndAuth, verifyToken } = require("./verifyToken");

router.get("/allPosts/:id", verifyToken, (req, res) => {
  const size = 4;
  const id = req.params.id;
  // console.log(id);
  let { page } = req.query;
  const peg = parseInt(page);
  const skip = (peg - 1) * size;
  // console.log(skip, size);
  let q = `select image_urls,username,post.user_id,post.id as post_Id,post.created_at as created_at,profileImg,caption,
  (select 1 from likes where user_id=${id} and post_id=post.id) as isLiked,
  (select COALESCE(count(*),0) from comments where post_id=post.id) as comments ,
  (select COALESCE(count(*),0) from likes where post_id=post.id) as likes 
    from post
    join users on users.id=user_id
    group by post.id
    order by post.created_at desc
    limit ${skip},${size}`; // instead of skip we can use created_at concept in where condition
  con.query(q, function (error, results, fields) {
    if (error) {
      console.log(error);
      throw error;
    }
    const posts = results;
    // console.log(posts.length);
    console.log(`${peg}th call of function`);
    if (posts.length === 0) {
      res.status(200).json(null);
    } else {
      res.status(200).json(posts);
    }
  });
});

router.post("/createPost/:id", verifyTokenAndAuth, (req, res, next) => {
  // console.log(req.body);
  const url = JSON.stringify(req.body.url);
  // console.log(url);
  const caption = req.body.caption;
  // console.log(typeof url);
  let q = "insert into post(image_urls,user_id,caption) values ?";
  const user_id = req.params.id;
  const val = [[url, user_id, caption]];
  con.query(q, [val], (err, results, fields) => {
    if (err) {
      console.log("Can't upload post", err);
      res.status(401).json({ msg: "Some error occured during post" });
      return;
    }
    console.log("Successfully uploaded!");
    res.status(200).json({ msg: "Post Uploaded" });
    return;
  });
});

router.get("/post/:id/comments/:userId", verifyToken, (req, res, next) => {
  const { id, userId } = req.params;
  // console.log(id, userId);
  let q = `select comment_text as comment,username,user_id,comments.id as comment_id,profileImg,
  (select 1 from likeComment where (users.id=${userId} and comments.id=commentId)) as isLiked 
  from users join comments on users.id=user_id where post_id=${id}`;
  con.query(q, (err, results, fields) => {
    if (err) {
      console.log(err);
      next(new AppError("No Comment Found", 400));
      return;
    }
    const comments = results;
    res.status(200).json(comments);
  });
});

router.post("/post/:id/comment", (req, res, next) => {
  console.log(req.body);
  const { id } = req.params;
  const comment = req.body.comment;
  const username = req.body.username;
  // console.log('DEVESH-',comment);
  if (username && comment) {
    let q = "select id from users where username=?";
    con.query(q, username, (err, result, fields) => {
      if (err) {
        // console.log(err);
        next(new AppError("Something went wrong please try again;|", 404));
        return;
      }
      // console.log(result[0].id)
      const user_id = result[0].id;
      let qu = "insert into comments(comment_text,user_id,post_id) values ?";
      const arr = [[comment, user_id, id]];
      con.query(qu, [arr], (err, result, fields) => {
        if (err) {
          console.log(err);
          next();
          return;
        }
        res.status(200).json("Successfully comment added!");
      });
    });
  } else {
    res.status(400).json("add a comment or login to comment");
  }
});

router.post("/like/post/:id", (req, res, next) => {
  // console.log(req.body);
  const { id } = req.params;
  const user_id = req.body.user_id;
  let qu = "insert into likes(user_id,post_id) values ?";
  const arr = [[user_id, id]];
  con.query(qu, [arr], (err, result, fields) => {
    if (err) {
      let q = `delete from likes where user_id=${user_id} and post_id=${id}`;
      con.query(q, (err, resp, fields) => {
        if (err) {
          console.log(err);
          next();
          return;
        }
        res
          .status(200)
          .json("You removed this post from your liked collection");
        return;
      });
    } else {
      res.status(200).json("You liked this post");
    }
  });
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

router.post("/likeComment", (req, res) => {
  // console.log(req.body);
  const { user_id, comment_id } = req.body;
  let q = `insert into likeComment(userId,commentId) values(${user_id},${comment_id})`;
  con.query(q, (err, results, fields) => {
    if (err) {
      // console.log("ERROR", err.sqlMessage);
      let qu = `delete from likeComment where userId=${user_id} and commentId=${comment_id}`;
      con.query(qu, (err, resu, fields) => {
        if (err) {
          console.log(err);
          return;
        }
      });
      // console.log("DisLiked");
      res.status(202).json({ msg: "Removed like" });
      return;
    } else {
      console.log("Liked");
      res.status(202).json({ msg: "Successfully liked comment!" });
    }
  });
});

module.exports = router;
