const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Anjana1234",
  database: "studentsystem",
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const std = req.body.std;
  const book = req.body.book;
  

  db.query(
    "INSERT INTO students (name, std, book) VALUES (?,?,?)",
    [name, std, book],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const std = req.body.std;
  db.query(
    "UPDATE students SET std = ? WHERE id = ?",
    [std, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM students WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
    connection.release();
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});