// src/components/Blog.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Blog.css"; // Optional styling

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/blogs")
      .then(res => setBlogs(res.data))
      .catch(err => console.error("Failed to fetch blogs:", err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      axios.delete(`http://localhost:3000/blogs/${id}`)
        .then(() => setBlogs(prev => prev.filter(blog => blog.id !== id)))
        .catch(err => alert("Failed to delete blog."));
    }
  };

  return (
    <div className="blog-list">
      <h2>All Blogs</h2>
      <Link to="/blogs/add" className="add-blog">➕ Add Blog</Link>
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        blogs.map(blog => (
          <div key={blog.id} className="blog-card">
            <h3>{blog.title}</h3>
            <p>{blog.short_description}</p>
            <div className="blog-actions">
              <Link to={`/blogs/${blog.id}/edit`} className="edit-btn">✏️ Edit</Link>
              <button onClick={() => handleDelete(blog.id)} className="delete-btn">🗑️ Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
