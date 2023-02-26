const express = require("express");
const db = require("./db");
const application = express();

application.use(express.json());

// HOME
application.get("/", (_, res) => {
  res.json({ data: "dataRockie data analytics", version: "1.0.0" });
});

// GET ALL
application.get("/hotels", (req, res) => {
  const statement = db.prepare("SELECT * FROM hotels");
  const results = statement.all();
  res.json(results);
});

// POST
application.post("/hotels", (req, res) => {
  const { name, price } = req.body;

  const statement = db.prepare(`INSERT INTO hotels (name, price) VALUES (?, ?)`);
  const results = statement.run(name, price);
  res.json(results);
});

// GET BY ID
application.get("/hotels/:id", (req, res) => {
  const { id } = req.params;

  const statement = db.prepare(`SELECT * FROM hotels WHERE id = ?`);
  const results = statement.get(id);
  res.json(results);
});

// PATCH
application.patch("/hotels/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const statement = db.prepare(`UPDATE hotels SET name = ?,  price = ? WHERE id = ?`);
  const results = statement.run(name, price, id);
  res.json(results);
});

// DELETE

application.delete("/hotels/:id", (req, res) => {
  const { id } = req.params;

  const statement = db.prepare(`DELETE from hotels WHERE id = ?`);
  const results = statement.run(id);
  res.json(results);
});

application.listen(3000, function () {
  console.log("Application started at http://location:3000");
});
