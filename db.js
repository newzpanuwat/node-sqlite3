const Database = require("better-sqlite3");

const db = Database("hotel.sqlite");

db.exec("CREATE TABLE IF NOT EXISTS hotels (id INTEGER PRIMARY KEY , name TEST, price INTEGER)");

module.exports = db;
