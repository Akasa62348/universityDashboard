const fs = require('fs');
const path = require('path');
const db = require('../db');

exports.getCourses = (req, res) => {
  db.query('SELECT * FROM courses', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getCourse = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM courses WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).send("Not found");
    res.json(results[0]);
  });
};

exports.createCourse = (req, res) => {
  const { name, short_desc, full_description } = req.body;
  const main_photo = req.file?.filename || null;
  const gallery = req.body.gallery || "[]";

  db.query(
    'INSERT INTO courses (name, short_desc, main_photo, gallery, full_description) VALUES (?, ?, ?, ?, ?)',
    [name, short_desc, main_photo, gallery, full_description],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, message: "Course added" });
    }
  );
};

exports.updateCourse = (req, res) => {
  const { id } = req.params;
  const { name, short_desc, full_description, gallery } = req.body;
  const main_photo = req.file?.filename || null;

  const sql = main_photo
    ? 'UPDATE courses SET name=?, short_desc=?, main_photo=?, gallery=?, full_description=? WHERE id=?'
    : 'UPDATE courses SET name=?, short_desc=?, gallery=?, full_description=? WHERE id=?';

  const values = main_photo
    ? [name, short_desc, main_photo, gallery, full_description, id]
    : [name, short_desc, gallery, full_description, id];

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Course updated" });
  });
};

exports.deleteCourse = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM courses WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Course deleted" });
  });
};
