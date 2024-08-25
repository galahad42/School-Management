const db = require("../config/db");

class School {
  static addSchool(name, address, latitude, longitude, callback) {
    const query =
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    db.query(query, [name, address, latitude, longitude], (err, result) => {
      if (err) return callback(err);
      callback(null, result.insertId);
    });
  }

  static getAllSchools(callback) {
    const query = "SELECT * FROM schools";
    db.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
}

module.exports = School;
