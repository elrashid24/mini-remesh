// Packages
const express = require("express");
const app = express();
const cors = require("cors");

// Controllers
const {
  createConversation,
  getAllConversations,
  searchConversations,
} = require("./controllers/conversations");
const {
  createMessage,
  getMessagesByConversationId,
  searchMessages,
} = require("./controllers/messages");
const {
  createThought,
  getThoughtsByMessageId,
} = require("./controllers/thoughts");

// Initialize global middlewares
app.use(cors());
app.use(express.json());

// Attach controllers to endpoints
// Conversations
app.post("/conversations", createConversation);
app.get("/conversations", getAllConversations);
app.get("/search/conversations", searchConversations);
// Messages
app.post("/messages", createMessage);
app.get("/messages/:id", getMessagesByConversationId);
app.get("/search/messages", searchMessages);
// Thoughts
app.post("/thoughts", createThought);
app.get("/thoughts/:id", getThoughtsByMessageId);

module.exports = app;
