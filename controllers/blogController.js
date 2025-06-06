// controllers/blogController.js
const db = require("../db");

exports.getAllBlogs = (req, res) => {
  db.query("SELECT * FROM blogs", (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch blogs" });
    res.json(results);
  });
};

exports.getBlogById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM blogs WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error fetching blog" });
    if (results.length === 0) return res.status(404).json({ error: "Blog not found" });
    res.json(results[0]);
  });
};

exports.createBlog = (req, res) => {
  const { title, short_description, content } = req.body;
  db.query(
    "INSERT INTO blogs (title, short_description, content) VALUES (?, ?, ?)",
    [title, short_description, content],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error adding blog" });
      res.json({ id: result.insertId, title, short_description, content });
    }
  );
};

exports.updateBlog = (req, res) => {
  const { id } = req.params;
  const { title, short_description, content } = req.body;
  db.query(
    "UPDATE blogs SET title = ?, short_description = ?, content = ? WHERE id = ?",
    [title, short_description, content, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error updating blog" });
      res.json({ id, title, short_description, content });
    }
  );
};

exports.deleteBlog = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM blogs WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error deleting blog" });
    res.json({ message: "Blog deleted successfully" });
  });
};
