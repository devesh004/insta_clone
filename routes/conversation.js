const router = require("express").Router();
const db = require("../utils/db");

// Add conversation
router.post("/", (req, res) => {
  console.log(req.body);
  const { senderId, receiverId } = req.body;
  const q = `select count(*) as len from conversation where (senderId=${senderId} and receiverId=${receiverId}) or 
    (senderId=${receiverId} and receiverId=${senderId})`;
  db.query(q, (err, results, feild) => {
    if (err) {
      res.status(100).json({ msg: "Database error occured!" });
      return;
    }
    const exist = results[0].len;
    if (exist == 0) {
      const qu = `insert into conversation(senderId,receiverId) values(${senderId},${receiverId})`;
      db.query(qu, (err, results, feilds) => {
        if (err) {
          res.status(100).json({ msg: "Database error occured!" });
          return;
        }
        res.status(200).json({ senderId, receiverId });
      });
    } else {
      res.status(409).json({ msg: "Users are chating already!" });
    }
  });
});

// get user chat
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  const q = `select * from conversation where (senderId=${userId} or receiverId=${userId})`;
  db.query(q, (err, results, feilds) => {
    if (err) {
      res.status(100).json({ msg: "Got database error!" });
      return;
    }
    // console.log(results[0].senderId);
    res.status(200).json(results);
  });
});

//get conversation id for 2 users
router.get("/find/:firstUser/:secondUser", (req, res) => {
  const { firstUser, secondUser } = req.params;
  // console.log(firstUser, secondUser);
  const q = `select id from conversation where (senderId=${firstUser} and receiverId=${secondUser})
  || (senderId=${secondUser} and receiverId=${firstUser})`;
  db.query(q, (err, results, feilds) => {
    if (err) {
      console.log(err);
      res.status(100).json({ msg: "Database error!" });
    }
    res.status(200).json(results);
  });
});

router.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const q = `select id,profileImg,username from users where id=${id}`;
  db.query(q, (err, results, feilds) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: "Database Error" });
    }
    // console.log(results);
    res.status(200).json(results[0]);
  });
});

module.exports = router;
