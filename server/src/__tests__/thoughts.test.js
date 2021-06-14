const app = require("../app");
const supertest = require("supertest");

const request = supertest(app);

// Test data
let testParams = {
  title: "Test Title",
  startDate: new Date(),
};

let messageParams = {
  messageText: "Test Message",
  sentDate: new Date(),
  sentTime: "2017-07-23 13:10:11",
};

let thoughtParams = {
  thoughtText: "Test Thought",
  sentDate: new Date(),
  sentTime: "2017-07-23 13:10:11",
};

describe("thoughts controller", () => {
  test("should be able to create a thought and get a message", async () => {
    //create a convo
    const createdConvo = await request.post("/conversations").send(testParams);

    const convoJson = JSON.parse(createdConvo.text);
    const convoId = convoJson.rows[0].conversation_id;

    expect(convoId).toBeGreaterThan(0);

    //create a message using that convoid
    messageParams.conversationId = convoId;
    const createdMessage = await request.post("/messages").send(messageParams);

    const messageJson = JSON.parse(createdMessage.text);
    const messageId = messageJson.rows[0].message_id;

    expect(messageId).toBeGreaterThan(0);

    //create a thought using that messageId
    thoughtParams.messageId = messageId;
    const createdThought = await request.post("/thoughts").send(thoughtParams);

    const thoughtJson = JSON.parse(createdThought.text);
    const thoughtId = thoughtJson.rows[0].thought_id;
    expect(thoughtId).toBeGreaterThan(0);
    expect(thoughtJson.rows[0].message_id).toBe(messageId);
    expect(thoughtJson.rows[0].thought_text).toBe(thoughtParams.thoughtText);

    //get that thought using messageId
    const response = await request.get("/thoughts/" + messageId);
    const json = JSON.parse(response.text);
    expect(response.status).toBe(200);
    expect(json.length).toBe(1);
    expect(json[0].message_id).toBe(messageId);
  });
});
