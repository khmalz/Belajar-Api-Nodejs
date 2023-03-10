const isEmpty = require("is-empty");

const db = require("../utils/db");
const response = require("../utils/response");

exports.get = (req, res) => {
   const sql = "SELECT * FROM pelajar";
   db.query(sql, (err, fields) => {
      if (err) response(500, "Invalid", err.sqlMessage, res);

      response(200, "Success", fields, res);
   });
};

exports.detail = (req, res) => {
   const sql = `SELECT * FROM pelajar WHERE np = ${req.params.np}`;
   db.query(sql, (err, fields) => {
      if (err) throw err;

      if (isEmpty(fields)) {
         response(404, "Invalid", "Data tidak ditemukan", res);
      } else {
         response(200, "Success", fields, res);
      }
   });
};

exports.post = (req, res) => {
   const { np, nama, alamat } = req.body;
   const sql = `INSERT INTO pelajar (np, nama, alamat) VALUES (${np}, '${nama}', '${alamat}')`;

   db.query(sql, (err, fields) => {
      if (err) response(500, "Invalid", err.sqlMessage, res);

      if (fields?.affectedRows) {
         response(201, "Success", `Success created new pelajar with np ${np}`, res);
      }
   });
};

exports.put = (req, res) => {
   const { np, nama, alamat } = req.body;
   const sql = `UPDATE pelajar SET np = ${np}, nama = '${nama}', alamat = '${alamat}' WHERE np = ${np}`;

   db.query(sql, (err, fields) => {
      if (err) response(500, "Invalid", err.sqlMessage, res);

      if (fields?.affectedRows) {
         response(200, "Success", `Success edited pelajar with np ${np}`, res);
      } else {
         response(404, "Invalid", "Data tidak ditemukan", res);
      }
   });
};

exports.delete = (req, res) => {
   const { np } = req.params;
   const sql = `DELETE FROM pelajar WHERE np = ${np}`;

   db.query(sql, (err, fields) => {
      if (err) response(500, "Invalid", err.sqlMessage, res);

      if (fields?.affectedRows) {
         response(200, "Success", `Success deleted pelajar with np ${np}`, res);
      } else {
         response(404, "Invalid", "Data tidak ditemukan", res);
      }
   });
};
