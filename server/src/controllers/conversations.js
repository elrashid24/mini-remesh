const url = require("url");
const querystring = require("querystring");

const db = require("../lib/db");

async function createConversation(req, res) {
  try {
    const title = req.body.title;
    const titleDate = req.body.startDate;
    const newTitle = await db.query(
      "INSERT INTO conversations (title, title_date) VALUES($1, $2) RETURNING *",
      [title, titleDate]
    );
    res.json(newTitle);
  } catch (err) {
    console.error(err.message);
  }
}

async function getAllConversations(req, res) {
  try {
    const allConversations = await db.query(
      "SELECT * FROM conversations ORDER BY conversation_id DESC"
    );
    res.json(allConversations.rows);
  } catch (err) {
    console.error(err.message);
  }
}

async function searchConversations(req, res) {
  try {
    let rawUrl = req.url;
    let parsedUrl = url.parse(rawUrl);
    let conversationTitle = querystring.parse(parsedUrl.query);
    const queriedConvos = await db.query(
      "SELECT * FROM conversations WHERE LOWER(title) LIKE '%' || $1 || '%' ORDER BY conversation_id DESC",
      [conversationTitle.title.toLocaleLowerCase()]
    );
    res.json(queriedConvos.rows);
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
  createConversation,
  getAllConversations,
  searchConversations,
};
