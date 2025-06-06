// src/components/EditBlog.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "./AddBlog.css"; // Optional styling


export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/blogs/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setShortDescription(res.data.short_description);
        setContent(res.data.content);
      })
      .catch(err => alert("Failed to fetch blog"));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/blogs/${id}`, {
      title,
      short_description: shortDescription,
      content
    }).then(() => navigate("/blog"))
      .catch(err => alert("Failed to update blog"));
  };

  return (
    <div className="edit-blog-form">
      <h2>Edit Blog</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        <input type="text" value={shortDescription} onChange={e => setShortDescription(e.target.value)} required />
        <ReactQuill value={content} onChange={setContent} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
