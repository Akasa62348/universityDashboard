import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
//import './EditCourse.css'; // Create this if needed

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [mainPhoto, setMainPhoto] = useState(null);
  const [existingPhotoUrl, setExistingPhotoUrl] = useState('');

  useEffect(() => {
    // Fetch existing course data
    axios.get(`http://localhost:3000/courses/${id}`)
      .then(res => {
        const course = res.data;
        setName(course.name);
        setShortDesc(course.short_desc);
        setFullDesc(course.full_description);
        if (course.main_photo) {
          setExistingPhotoUrl(`http://localhost:3000/uploads/courses/${course.main_photo}`);
        }
      })
      .catch(err => {
        console.error('Failed to fetch course:', err);
        alert('Course not found');
        navigate('/courses');
      });
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('short_desc', shortDesc);
    formData.append('full_description', fullDesc);
    if (mainPhoto) {
      formData.append('main_photo', mainPhoto);
    }

    try {
      await axios.put(`http://localhost:3000/courses/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Course updated successfully');
      navigate('/courses');
    } catch (err) {
      console.error('Error updating course:', err);
      alert('Failed to update course');
    }
  };

  return (
    <div className="edit-course-container">
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit} className="course-form">
        <label>Course Name:</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <label>Short Description:</label>
        <input
          type="text"
          value={shortDesc}
          onChange={e => setShortDesc(e.target.value)}
          required
        />

        <label>Main Photo:</label>
        {existingPhotoUrl && (
          <div>
            <img src={existingPhotoUrl} alt="Current Main" style={{ width: '200px', marginBottom: '10px' }} />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={e => setMainPhoto(e.target.files[0])}
        />

        <label>Full Description:</label>
        <ReactQuill value={fullDesc} onChange={setFullDesc} />

        <button type="submit">Update Course</button>
      </form>
    </div>
  );
}
