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
  let q = `select comment_text as comment,username,user_id,comments.id as comment_id
  from users join comments on users.id=user_id where photo_id=${id}`;
  con.query(q, (err, results, fields) => {
    if (err) {
      console.log(err);
      next(new AppError("No Comment Found", 400));
      return;
    }
    // console.log(results)
    const photo_id=id;
    const comments=results;
    res.render("photos/comment", { comments, photo_id });
  });
  
});

router.post("/photo/:id/comments", (req, res, next)=>{
  // console.log(req.body);
  const { id } = req.params;
  const comment=req.body.comment;
  // console.log('DEVESH-',comment);
  if(req.session.user && comment){
    const user=req.session.user;
    // console.log(user);
    let q='select id from users where username=?'
    con.query(q,user,(err,result,fields)=>{
      if(err){
        // console.log(err);
        next(new AppError('Something went wrong please try again;|',404));
        return;
      }
      // console.log(result[0].id)
      const user_id=result[0].id;
      let qu='insert into comments(comment_text,user_id,photo_id) values ?';
      const arr=[[comment,user_id,id]];
      con.query(qu,[arr],(err,result,fields)=>{
        if(err){
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
          const photo_id=id;
          const comments=results;
          res.render("photos/comment", { comments, photo_id });
        });
      });
    })
  }
  else{
    req.flash('error','You should be logged in to add a comment')
    res.redirect('/main')
  }
})

router.delete("/photo/:photo_id/comment/:id",(req,res,next)=>{
  if(req.session.user){
    const {photo_id,id}=req.params;
    let q=`delete from comments where id=${id}`
    con.query(q,(err,results,fields)=>{
        if(err){
          console.log(err);
          next(new AppError("Can't delete this comment",401));
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
      const comments=results;
      res.render("photos/comment", { comments, photo_id });
    });
    })
  }
 
})

module.exports=router;