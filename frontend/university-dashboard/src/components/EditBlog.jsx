// EditBlog.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "./AddEditBlog.css";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [category, setCategory] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/blogs/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setShortDescription(res.data.short_description);
        setContent(res.data.content);
        setCategory(res.data.category || "");
        if (res.data.thumbnail_url) setPreviewUrl(res.data.thumbnail_url);
      })
      .catch(() => alert("Failed to fetch blog"));
  }, [id]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("short_description", shortDescription);
    formData.append("content", content);
    formData.append("category", category);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      await axios.put(`http://localhost:3000/blogs/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/blog");
    } catch (err) {
      alert("Failed to update blog");
    }
  };

  return (
    <div className="blog-form">
      <h2>Edit Blog</h2>
      <form onSubmit={handleUpdate} encType="multipart/form-data">
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        <input type="text" value={shortDescription} onChange={e => setShortDescription(e.target.value)} required />
        <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" />
        <input type="file" onChange={handleThumbnailChange} accept="image/*" />
        {previewUrl && <img src={previewUrl} alt="Preview" className="thumbnail-preview" />}
        <ReactQuill value={content} onChange={setContent} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
