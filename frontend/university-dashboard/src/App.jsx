import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/pages/Dashboard';
import Courses from './components/pages/Courses';
import Blogs from './components/pages/Blogs';
import NewsEvents from './components/pages/NewsEvents';
import Gallery from './components/pages/Gallery';
import UpcomingEvents from './components/pages/UpcomingEvents';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import AddCourse from './components/pages/AddCourse';
import CourseDetail from './components/pages/CourseDetail';
import EditCourse from './components/pages/EditCourse';
import Blog from "./components/Blog";
import AddBlog from "./components/AddBlog";
import EditBlog from "./components/EditBlog";

export default function App() {
  const location = useLocation();

  // Hide sidebar on these base routes and their subroutes
  const hideSidebarPrefixes = [
    '/login',
    '/signup',
    '/blog',
    '/blogs',
    '/courses',
  ];

  const shouldHideSidebar = hideSidebarPrefixes.some(prefix =>
    location.pathname === prefix || location.pathname.startsWith(prefix + '/')
  );

  return (
    <div className="flex h-screen">
      {!shouldHideSidebar && <Sidebar />}
      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/add" element={<AddCourse />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/courses/:id/edit" element={<EditCourse />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/news-events" element={<NewsEvents />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/upcoming-events" element={<UpcomingEvents />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogs/add" element={<AddBlog />} />
          <Route path="/blogs/:id/edit" element={<EditBlog />} />
        </Routes>
      </div>
    </div>
  );
}