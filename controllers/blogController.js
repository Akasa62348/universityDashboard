const db = require('../db');
const path = require('path');
const fs = require('fs');

// CREATE BLOG
exports.createBlog = (req, res) => {
  const { title, short_description, content, category } = req.body;
  const thumbnail = req.file ? req.file.filename : null;

  const query = `
    INSERT INTO blogs (title, short_description, content, category, thumbnail)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [title, short_description, content, category, thumbnail], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Blog created', id: result.insertId });
  });
};

// UPDATE BLOG
exports.updateBlog = (req, res) => {
  const { title, short_description, content, category } = req.body;
  const id = req.params.id;

  let query = `UPDATE blogs SET title = ?, short_description = ?, content = ?, category = ?`;
  const params = [title, short_description, content, category];

  if (req.file) {
    query += `, thumbnail = ?`;
    params.push(req.file.filename);
  }

  query += ` WHERE id = ?`;
  params.push(id);

  db.query(query, params, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Blog updated' });
  });
};

// GET BLOG BY ID
exports.getBlogById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM blogs WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ error: 'Not found' });

    const blog = result[0];
    blog.thumbnail_url = blog.thumbnail ? `http://localhost:3000/uploads/${blog.thumbnail}` : null;
    res.json(blog);
  });
};

// GET ALL BLOGS (needed for frontend list)
exports.getAllBlogs = (req, res) => {
  db.query('SELECT * FROM blogs ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    const blogs = results.map(blog => ({
      ...blog,
      thumbnail_url: blog.thumbnail ? `http://localhost:3000/uploads/${blog.thumbnail}` : null,
    }));
    res.json(blogs);
  });
};

// DELETE BLOG
exports.deleteBlog = (req, res) => {
  const { id } = req.params;

  // First, delete the thumbnail if it exists
  db.query('SELECT thumbnail FROM blogs WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ error: 'Not found' });

    const thumbnail = result[0].thumbnail;
    if (thumbnail) {
      const filepath = path.join(__dirname, '../uploads', thumbnail);
      fs.unlink(filepath, (err) => {
        if (err) console.error("Failed to delete thumbnail:", err);
      });
    }

    db.query('DELETE FROM blogs WHERE id = ?', [id], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Blog deleted' });
    });
  });
};
