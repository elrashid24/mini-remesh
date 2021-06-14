const { execSync } = require("child_process");

beforeAll(() => {
  execSync("npm run setup:test");
});

beforeEach(() => {
  execSync("npm run migrate:test");
});

afterEach(() => {
  execSync("npm run drop:tables");
});
