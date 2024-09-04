import sqlite3 from 'sqlite3';
console.log('Started');

sqlite3.verbose();

const db = new sqlite3.Database('./users.db');
// const db = new sqlite3.Database(':memory:');

interface User {
  id: number;
  name: string;
}

db.serialize(() => {
  db.run("CREATE TABLE user (id INT, name TEXT)", (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
      return;
    }
    console.log('Table created.');
  });

  const stmt = db.prepare("INSERT INTO user VALUES (?, ?)");

  stmt.run(17, "John7 Doe", (err) => {
    if (err) {
      console.error('Error inserting data:', err.message);
    } else {
      console.log('Inserted John Doe.');
    }
  });

  stmt.run(27, "Jane7 Doe", (err) => {
    if (err) {
      console.error('Error inserting data:', err.message);
    } else {
      console.log('Inserted Jane Doe.');
    }
  });

  stmt.finalize((err) => {
    if (err) {
      console.error('Error finalizing statement:', err.message);
    } else {
      console.log('Statement finalized.');
    }
  });

  db.each("SELECT id, name FROM user", (err, row: User) => {
    if (err) {
      console.error('Error querying data:', err.message);
    } else {
      console.log(`User ID: ${row.id}, Name: ${row.name}`);
    }
  });
});

db.close((err) => {
  if (err) {
    console.error('Error closing database:', err.message);
  } else {
    console.log('Closed the database connection.');
  }
});
