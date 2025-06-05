import React from "react";
import "./Dashboard.css"; // Make sure this CSS file is in the same folder

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-title">University</div>
        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">Courses</a>
          <a href="#">Upcoming Events</a>
          <a href="#">Gallery</a>
          <a href="#">News & Events</a>
          <a href="#">Blog</a>
        </nav>
      </aside>

      {/* Main content area */}
      <div className="main">
        {/* Header */}
        <header className="header">
          <div className="header-title">Dashboard</div>
          <div className="header-user">User</div>
        </header>

        {/* Content */}
        <main className="content">
          <h1>Welcome to Our University</h1>
          <p>Explore courses, events, and more.</p>
        </main>
      </div>
    </div>
  );
}
