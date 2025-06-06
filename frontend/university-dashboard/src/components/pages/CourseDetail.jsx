import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/courses/${id}`)
      .then(res => setCourse(res.data))
      .catch(err => {
        console.error('Failed to load course', err);
        alert('Error fetching course data');
      });
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <h2>{course.name}</h2>
      <p><strong>Short Description:</strong> {course.short_desc}</p>

      {course.main_photo && (
        <img
          src={`http://localhost:3000/uploads/courses/${course.main_photo}`}
          alt={course.name}
          style={{ width: '200px', height: 'auto' }}
        />
      )}

      <div>
        <strong>Full Description:</strong>
        <div dangerouslySetInnerHTML={{ __html: course.full_description }} />
      </div>

      {/* Optional Gallery logic later */}
      {/* <div>
        <strong>Gallery:</strong>
        <div>...map over gallery array if implemented...</div>
      </div> */}

      <Link to={`/courses/${course.id}/edit`}>Edit Course</Link>
    </div>
  );
}
