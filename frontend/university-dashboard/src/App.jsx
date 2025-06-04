import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/pages/Dashboard';
import Courses from './components/pages/Courses';
import Blogs from './components/pages/Blogs';
import NewsEvents from './components/pages/NewsEvents';
import Gallery from './components/pages/Gallery';
import UpcomingEvents from './components/pages/UpcomingEvents';
import Login from './components/pages/Login';

export default function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/news-events" element={<NewsEvents />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/upcoming-events" element={<UpcomingEvents />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}
