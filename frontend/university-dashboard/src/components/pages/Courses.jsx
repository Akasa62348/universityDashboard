import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import './Courses.css'; // Optional CSS file

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:3000/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
      alert('Error loading courses');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await axios.delete(`http://localhost:3000/courses/${id}`);
      setCourses(courses.filter(course => course.id !== id));
    } catch (err) {
      console.error('Error deleting course:', err);
      alert('Delete failed');
    }
  };

  return (
    <div className="courses-container">
      <div className="courses-header">
        <h2>Courses</h2>
        <Link to="/courses/add" className="add-course-button">Add New Course</Link>
      </div>
      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <table className="courses-table">
          <thead>
            <tr>
              <th>Main Photo</th>
              <th>Name</th>
              <th>Short Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td>
                  {course.main_photo && (
                    <img
                      src={`http://localhost:3000/uploads/courses/${course.main_photo}`}
                      alt={course.name}
                      style={{ width: '100px', height: 'auto' }}
                    />
                  )}
                </td>
                <td>{course.name}</td>
                <td>{course.short_desc}</td>
                <td>
                  <Link to={`/courses/${course.id}/edit`} className="edit-button">Edit</Link>
                  <button onClick={() => handleDelete(course.id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
