// AddBlog.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./AddEditBlog.css";

export default function AddBlog() {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [category, setCategory] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("short_description", shortDescription);
    formData.append("content", content);
    formData.append("category", category);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      await axios.post("http://localhost:3000/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/blog");
    } catch (err) {
      alert("Failed to add blog");
    }
  };

  return (
    <div className="blog-form">
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <input type="text" placeholder="Short Description" value={shortDescription} onChange={e => setShortDescription(e.target.value)} required />
        <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <input type="file" onChange={handleThumbnailChange} accept="image/*" />
        {previewUrl && <img src={previewUrl} alt="Preview" className="thumbnail-preview" />}
        <ReactQuill value={content} onChange={setContent} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

