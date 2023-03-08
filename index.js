const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const isEmpty = require("is-empty");
const response = require("./response");
const db = require("./connection");

app.use(bodyParser.json());

app.get("/", (req, res) => {
   response(200, "Success", "API Node Js", res);
});

app.get("/pelajar", (req, res) => {
   const sql = "SELECT * FROM pelajar";
   db.query(sql, (err, fields) => {
      if (err) response(500, "Invalid", err.sqlMessage, res);

      response(200, "Success", fields, res);
   });
});

app.get("/pelajar/:np", (req, res) => {
   const sql = `SELECT * FROM pelajar WHERE np = ${req.params.np}`;
   db.query(sql, (err, fields) => {
      if (err) throw err;

      if (isEmpty(fields)) {
         response(404, "Invalid", "Data tidak ditemukan", res);
      }

      response(200, "Success", fields, res);
   });
});

app.post("/pelajar", (req, res) => {
   const { np, nama, alamat } = req.body;
   const sql = `INSERT INTO pelajar (np, nama, alamat) VALUES (${np}, '${nama}', '${alamat}')`;

   db.query(sql, (err, fields) => {
      if (err) response(500, "Invalid", err.sqlMessage, res);

      if (fields?.affectedRows) {
         response(201, "Success", `Success created new pelajar with np ${np}`, res);
      }
   });
});

app.put("/pelajar/edit", (req, res) => {
   response(200, "Success", "Edited", res);
});

app.delete("/pelajar/delete", (req, res) => {
   response(200, "Success", "Deleted", res);
});

app.use((req, res) => {
   res.sendStatus(404);
});

app.listen(port, () => {
   console.log(`listening on http://localhost:${port}`);
});
