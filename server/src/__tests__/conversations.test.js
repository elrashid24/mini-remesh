const app = require("../app");
const supertest = require("supertest");

const request = supertest(app);

// Test data
let params = {
  title: "Test conversation",
  startDate: new Date(),
};

describe("conversations controller", () => {
  test("should be able to create a conversation", async () => {
    const response = await request.post("/conversations").send(params);
    expect(response.status).toBe(200);
    const json = JSON.parse(response.text);
    expect(json.rows[0].title).toBe(params.title);
  });

  test("should be able to get all conversations", async () => {
    await request.post("/conversations").send(params);
    const response = await request.get("/conversations");
    const json = JSON.parse(response.text);
    expect(json.length).toBe(1);
  });
});
