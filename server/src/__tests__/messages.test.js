const app = require("../app");
const supertest = require("supertest");

const request = supertest(app);

// Test data
let testParams = {
  title: "Test Title",
  startDate: new Date(),
};

let messageParams = {
  messageText: "Test Title",
  sentDate: new Date(),
  sentTime: "2017-07-23 13:10:11",
};

describe("messages controller", () => {
  test("should be able to create a message and get a message", async () => {
    //create a convo
    const createdConvo = await request.post("/conversations").send(testParams);
    const convoJson = JSON.parse(createdConvo.text);
    const convoId = convoJson.rows[0].conversation_id;

    //create a message using that convoid
    messageParams.conversationId = convoId;
    const createdMessage = await request.post("/messages").send(messageParams);
    const messageJson = JSON.parse(createdMessage.text);

    expect(messageJson.rows[0].conversation_id).toBe(convoId);
    expect(messageJson.rows[0].message_text).toBe(messageParams.messageText);

    //get that message
    const response = await request.get("/messages/" + convoId);
    const json = JSON.parse(response.text);

    expect(response.status).toBe(200);
    expect(json.length).toBe(1);
    expect(json[0].conversation_id).toBe(convoId);
  });
});
