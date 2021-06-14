const db = require("../lib/db");

async function createThought(req, res) {
  try {
    const message_id = req.body.messageId;
    const thought_text = req.body.thoughtText;
    const sent_date = req.body.sentDate;
    const sent_time = req.body.sentTime;

    const newThought = await db.query(
      "INSERT INTO thoughts (message_id, thought_text, sent_date, sent_time) VALUES($1, $2, $3, $4) RETURNING *",
      [message_id, thought_text, sent_date, sent_time]
    );
    res.json(newThought);
  } catch (err) {
    console.error(err.message);
  }
}

async function getThoughtsByMessageId(req, res) {
  try {
    const { id } = req.params;
    const thoughts = await db.query(
      "SELECT * FROM thoughts WHERE message_id = $1 ORDER BY thought_id DESC",
      [id]
    );
    res.json(thoughts.rows);
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
  createThought,
  getThoughtsByMessageId,
};
