import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './AddCourse.css'; // create this for styling

export default function AddCourse() {
  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [mainPhoto, setMainPhoto] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [fullDesc, setFullDesc] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('short_desc', shortDesc);
    formData.append('main_photo', mainPhoto);
    formData.append('gallery', JSON.stringify(gallery)); // assuming you're storing filenames
    formData.append('full_description', fullDesc);

    try {
      const res = await axios.post('http://localhost:3000/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Course added!');
      window.location.href = `/courses/${res.data.id}`;
    } catch (err) {
      console.error('Error adding course:', err);
      alert('Failed to add course');
    }
  };

  return (
    <div className="add-course-container">
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit} className="course-form">
        <label>Course Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Short Description:</label>
        <input type="text" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} required />

        <label>Main Photo:</label>
        <input type="file" onChange={(e) => setMainPhoto(e.target.files[0])} accept="image/*" required />

        {/* Optional: Accept gallery images later */}
        {/* <label>Gallery Images:</label>
        <input type="file" multiple onChange={(e) => setGallery([...e.target.files])} accept="image/*" /> */}

        <label>Full Description:</label>
        <ReactQuill value={fullDesc} onChange={setFullDesc} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
