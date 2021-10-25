const express=require('express');
const router=express.Router();
const mysql=require('mysql');
const AppError = require("../utils/AppError");

var con = mysql.createConnection({
    host: process.env.database_host,
    user: process.env.database_user,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 3306,
    insecureAuth: true,
    multipleStatements: true,
  });

  router.get("/photo/:id/comments", (req, res, next) => {
    const { id } = req.params;
    let q = `select comment_text as comment,username,user_id from users join comments on users.id=user_id where photo_id=${id}`;
    con.query(q, (err, results, fields) => {
      if (err) {
        next(new AppError("No Comment Found", 400));
        return;
      }
      // console.log(results);
      // let user = results[1];
      const comments = results;
      const photo_id = id;
      res.render("photos/comment", { comments, photo_id });
    });
  });

  module.exports=router;