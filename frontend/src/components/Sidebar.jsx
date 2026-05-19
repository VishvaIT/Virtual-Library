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
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r h-[calc(100vh-73px)] sticky top-[73px] flex-col p-4 z-40">
        <div className="space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/admin'}
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

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50 flex justify-around p-2 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/admin'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors flex-1 ${
                isActive 
                  ? 'text-indigo-600 bg-indigo-50/50' 
                  : 'text-gray-500 hover:text-indigo-600 hover:bg-gray-50'
              }`
            }
          >
            {link.icon}
            <span className="text-[10px] font-medium text-center">{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
