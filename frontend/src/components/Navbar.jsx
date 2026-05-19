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
    <nav className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 text-indigo-600">
        <Library size={28} className="text-indigo-600" />
        <span className="text-xl font-bold tracking-tight">IT Virtual Library</span>
      </Link>
      
      {user && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full">
            <User size={16} />
            <span className="font-medium">{user.name}</span>
            <span className="text-xs text-gray-500 uppercase">({user.role})</span>
          </div>
          <button 
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1 text-sm font-medium"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
