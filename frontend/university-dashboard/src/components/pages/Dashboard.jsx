import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [showCourses, setShowCourses] = useState(false);
  const [courses, setCourses] = useState([]);

  const handleLogout = () => {
    navigate("/login");
  };

  useEffect(() => {
    axios.get("http://localhost:3000/courses")
      .then(res => setCourses(res.data))
      .catch(err => console.error("Failed to fetch courses:", err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      axios.delete(`http://localhost:3000/courses/${id}`)
        .then(() => {
          setCourses(prev => prev.filter(c => c.id !== id));
        })
        .catch(err => {
          console.error("Failed to delete course:", err);
          alert("Failed to delete course.");
        });
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-title">University</div>
        <nav className="nav">
          <a href="#">Home</a>

          {/* Courses Dropdown */}
          <div className="dropdown">
            <button onClick={() => setShowCourses(!showCourses)}>
              Courses ▼
            </button>
            {showCourses && (
              <div className="dropdown-content">
                <Link to="/courses/add">➕ Add New Course</Link>
                {courses.length === 0 ? (
                  <p>No courses yet</p>
                ) : (
                  courses.map(course => (
                    <div key={course.id} className="dropdown-item">
                      <span className="course-name" title={course.name}>{course.name}</span>

                      <div className="course-actions">
                        <Link to={`/courses/${course.id}/edit`} className="edit-btn">✏️</Link>
                        <button onClick={() => handleDelete(course.id)} className="delete-btn">🗑️</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <a href="#">Upcoming Events</a>
          <a href="#">Gallery</a>
          <a href="#">News & Events</a>
          <Link to="/blog">Blog</Link>

          
        </nav>
      </aside>

      {/* Main content area */}
      <div className="main">
        <header className="header">
          <div className="header-title">Dashboard</div>
          <div className="header-user">
            User
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <main className="content">
          <h1>Welcome to Our University</h1>
          <p>Explore courses, events, and more.</p>
        </main>
      </div>
    </div>
  );
}
