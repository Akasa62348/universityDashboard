import React, { useState } from "react";
import {
  Home,
  BookOpen,
  CalendarDays,
  Camera,
  Newspaper,
  Menu,
  X,
  ChevronDown,
  Bell,
  User,
} from "lucide-react";

const navItems = [
  { name: "Home", icon: Home },
  {
    name: "Courses",
    icon: BookOpen,
    dropdown: ["Science", "Arts", "Technology", "Business"],
  },
  { name: "Events", icon: CalendarDays },
  { name: "Gallery", icon: Camera },
  { name: "News", icon: Newspaper },
];

export default function UniversityDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-gradient-to-br from-yellow-300 via-orange-200 to-yellow-100 scrollbar-none">
      {/* Sidebar */}
      <aside
        className={`$${sidebarOpen ? "w-64" : "w-20"} bg-gradient-to-b from-orange-700 to-yellow-500 text-white flex flex-col transition-all duration-300 ease-in-out items-center px-2 py-6 space-y-8`}
      >
        <button
          className="self-end mb-4 text-white hover:text-yellow-300 transition"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="mb-6">
          <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center text-orange-700 font-bold text-lg">
            U
          </div>
          {sidebarOpen && (
            <h1 className="mt-2 text-xl font-bold tracking-wide text-white drop-shadow text-center">
              University
            </h1>
          )}
        </div>
        <nav className="flex flex-col gap-3 w-full">
          {navItems.map(({ name, icon: Icon, dropdown }) => (
            <div key={name} className="relative">
              <div
                onClick={() =>
                  dropdown &&
                  setOpenDropdown(openDropdown === name ? null : name)
                }
                className="flex items-center gap-3 hover:bg-yellow-300/30 px-3 py-2 rounded-lg transition cursor-pointer group"
              >
                <Icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                {sidebarOpen && (
                  <span className="text-white font-medium group-hover:text-yellow-100 flex-1">
                    {name}
                  </span>
                )}
                {dropdown && sidebarOpen && <ChevronDown className="text-white w-4 h-4" />}
              </div>
              {dropdown && openDropdown === name && sidebarOpen && (
                <ul className="ml-8 mt-1 bg-yellow-400/20 rounded-lg py-1">
                  {dropdown.map((item) => (
                    <li
                      key={item}
                      className="px-4 py-1 text-sm text-white hover:bg-yellow-300/30 rounded-md cursor-pointer"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Nav */}
        <nav className="w-full bg-black text-white flex justify-between items-center px-6 py-3 shadow z-10">
          <div className="font-bold text-lg tracking-wide">University</div>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 hover:text-yellow-300 cursor-pointer" />
            <User className="w-6 h-6 hover:text-yellow-300 cursor-pointer" />
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-10 scrollbar-none">
          <header className="mb-8">
            <h2 className="text-4xl font-extrabold text-orange-700 drop-shadow-sm">
              Welcome to Our University
            </h2>
            <p className="text-lg text-gray-800">
              A vibrant place to explore, learn, and innovate.
            </p>
          </header>

          {/* Section Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-orange-100 rounded-xl p-6 shadow hover:scale-105 transition transform hover:shadow-xl">
              <h4 className="text-xl font-bold text-orange-800 mb-2">Join Our Clubs</h4>
              <p className="text-gray-700">Over 50+ student-led groups to explore your passions.</p>
            </div>
            <div className="bg-yellow-100 rounded-xl p-6 shadow hover:scale-105 transition transform hover:shadow-xl">
              <h4 className="text-xl font-bold text-yellow-800 mb-2">Live Workshops</h4>
              <p className="text-gray-700">Participate in live sessions and upskill with experts.</p>
            </div>
            <div className="bg-orange-200 rounded-xl p-6 shadow hover:scale-105 transition transform hover:shadow-xl">
              <h4 className="text-xl font-bold text-orange-900 mb-2">Explore Research</h4>
              <p className="text-gray-700">Get involved with cutting-edge academic research.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
