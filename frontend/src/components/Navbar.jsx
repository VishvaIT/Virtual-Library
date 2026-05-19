import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Library, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 text-indigo-600">
        <Library size={26} className="text-indigo-600 shrink-0" />
        <span className="hidden sm:inline text-xl font-bold tracking-tight">IT Virtual Library</span>
        <span className="sm:hidden text-lg font-bold tracking-tight">Library</span>
      </Link>
      
      {user && (
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2 text-sm text-gray-700 bg-gray-100 px-2 sm:px-3 py-1.5 rounded-full max-w-[140px] sm:max-w-none">
            <User size={16} className="shrink-0" />
            <span className="font-medium truncate">{user.name}</span>
            <span className="hidden md:inline text-xs text-gray-500 uppercase">({user.role})</span>
          </div>
          <button 
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1 text-sm font-medium p-1.5 sm:p-0 rounded-lg hover:bg-red-50 sm:hover:bg-transparent"
            title="Logout"
          >
            <LogOut size={20} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
