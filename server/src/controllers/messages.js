const url = require("url");
const querystring = require("querystring");

const db = require("../lib/db");

async function createMessage(req, res) {
  try {
    const conversation_id = req.body.conversationId;
    const message_text = req.body.messageText;
    const sent_date = req.body.sentDate;
    const sent_time = req.body.sentTime;

    const newMessage = await db.query(
      "INSERT INTO messages (conversation_id, message_text, sent_date, sent_time) VALUES($1, $2, $3, $4) RETURNING *",
      [conversation_id, message_text, sent_date, sent_time]
    );
    res.json(newMessage);
  } catch (err) {
    console.error(err.message);
  }
}

async function getMessagesByConversationId(req, res) {
  try {
    const { id } = req.params;
    const messages = await db.query(
      "SELECT * FROM messages WHERE conversation_id = $1 ORDER BY message_id DESC",
      [id]
    );
    res.json(messages.rows);
  } catch (err) {
    console.error(err.message);
  }
}

async function searchMessages(req, res) {
  try {
    let rawUrl = req.url;
    let parsedUrl = url.parse(rawUrl);
    let { id, content } = querystring.parse(parsedUrl.query);
    const queriedMessages = await db.query(
      "SELECT * FROM messages WHERE conversation_id = $1 AND LOWER(message_text) LIKE '%' || $2 || '%' ORDER BY message_id DESC",
      [id, content.toLowerCase()]
    );
    return res.json(queriedMessages.rows);
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
  createMessage,
  getMessagesByConversationId,
  searchMessages,
};
