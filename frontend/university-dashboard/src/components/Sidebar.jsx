import { NavLink } from 'react-router-dom';

const navItems = [
  { name: "Dashboard", to: "/dashboard" },
  { name: "Courses", to: "/courses" },
  { name: "Blogs", to: "/blogs" },
  { name: "News & Events", to: "/news-events" },
  { name: "Gallery", to: "/gallery" },
  { name: "Upcoming Events", to: "/upcoming-events" },
  { name: "Login", to: "/login" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg h-full p-5">
      <h2 className="text-xl font-bold mb-6">University Admin</h2>
      <nav className="flex flex-col space-y-3">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `p-2 rounded hover:bg-gray-200 ${isActive ? 'bg-blue-100 text-blue-600 font-semibold' : ''}`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
