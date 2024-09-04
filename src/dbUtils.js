"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sqlite3 = require("sqlite3");
console.log('Started');
sqlite3.verbose();
var db = new sqlite3.Database('./users.db');
db.serialize(function () {
    db.run("CREATE TABLE user (id INT, name TEXT)", function (err) {
        if (err) {
            console.error('Error creating table:', err.message);
            return;
        }
        console.log('Table created.');
    });
    var stmt = db.prepare("INSERT INTO user VALUES (?, ?)");
    stmt.run(17, "John7 Doe", function (err) {
        if (err) {
            console.error('Error inserting data:', err.message);
        }
        else {
            console.log('Inserted John Doe.');
        }
    });
    stmt.run(27, "Jane7 Doe", function (err) {
        if (err) {
            console.error('Error inserting data:', err.message);
        }
        else {
            console.log('Inserted Jane Doe.');
        }
    });
    stmt.finalize(function (err) {
        if (err) {
            console.error('Error finalizing statement:', err.message);
        }
        else {
            console.log('Statement finalized.');
        }
    });
    db.each("SELECT id, name FROM user", function (err, row) {
        if (err) {
            console.error('Error querying data:', err.message);
        }
        else {
            console.log("User ID: ".concat(row.id, ", Name: ").concat(row.name));
        }
    });
});
db.close(function (err) {
    if (err) {
        console.error('Error closing database:', err.message);
    }
    else {
        console.log('Closed the database connection.');
    }
});
