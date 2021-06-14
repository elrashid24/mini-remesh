const { Pool } = require("pg");

const db = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: process.env.NODE_ENV === "test" ? "miniremesh_test" : "miniremesh",
});

module.exports = db;
