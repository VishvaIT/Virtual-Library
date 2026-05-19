import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Upload, Users, BarChart } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  const studentLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Upload Resource', path: '/upload', icon: <Upload size={20} /> },
  ];

  const adminLinks = [
    { name: 'Admin Dashboard', path: '/admin', icon: <BarChart size={20} /> },
    { name: 'Manage Users', path: '/admin/users', icon: <Users size={20} /> },
  ];

  const links = user?.role === 'admin' ? adminLinks : studentLinks;

  return (
    <aside className="w-64 bg-white border-r h-[calc(100vh-73px)] sticky top-[73px] flex flex-col p-4">
      <div className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
              }`
            }
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
