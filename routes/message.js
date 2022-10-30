const router = require("express").Router();
const db = require("../utils/db");

router.post("/", (req, res) => {
  console.log(req.body);
  const { conversationId, sender_id, chat } = req.body;
  let c = JSON.stringify(chat);
  //   console.log(req.body);
  const q = `insert into message(conversationId,sender_id,chat)
            values(${conversationId},${sender_id},${c})`;
  db.query(q, (err, results, feilds) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: "Database error!" });
      return;
    }
    res.status(200).json({ msg: "messaged successfully!" });
  });
});

router.get("/:conversationId", (req, res) => {
  const { conversationId } = req.params;
  console.log(conversationId);

  if (conversationId === undefined) {
    res.status(400).json({ msg: "server error" });
    return;
  }

  const q = `select * from message where conversationId=${conversationId}`;
  db.query(q, (err, results, feilds) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: "Database error!" });
      return;
    }
    // console.log(results);
    res.status(200).json(results);
  });
});

module.exports = router;
