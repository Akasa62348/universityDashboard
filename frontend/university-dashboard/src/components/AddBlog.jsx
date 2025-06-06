// src/components/AddBlog.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./AddBlog.css"; // Optional styling

export default function AddBlog() {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/blogs", {
      title,
      short_description: shortDescription,
      content
    }).then(() => navigate("/blog"))
      .catch(err => alert("Failed to add blog"));
  };

  return (
    <div className="add-blog-form">
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title}
          onChange={e => setTitle(e.target.value)} required />
        <input type="text" placeholder="Short Description" value={shortDescription}
          onChange={e => setShortDescription(e.target.value)} required />
        <ReactQuill value={content} onChange={setContent} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
