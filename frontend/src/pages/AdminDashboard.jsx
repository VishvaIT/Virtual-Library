import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Users, FileText, Activity, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [statsRes, usersRes] = await Promise.all([
          axios.get('/admin/analytics'),
          axios.get('/admin/users')
        ]);
        setStats(statsRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-8 pb-20 md:pb-8 overflow-y-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Activity size={24} className="text-indigo-600" />
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Platform overview and user management.</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border p-6 flex items-center gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Total Students</p>
                    <h3 className="text-2xl font-bold text-gray-900">{stats?.totalStudents || 0}</h3>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border p-6 flex items-center gap-4">
                  <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                    <FileText size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Total Uploads</p>
                    <h3 className="text-2xl font-bold text-gray-900">{stats?.totalUploads || 0}</h3>
                  </div>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Users size={18} className="text-gray-500" />
                    Registered Users
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-sm border-b">
                        <th className="px-6 py-3 font-medium">Name</th>
                        <th className="px-6 py-3 font-medium">Register No.</th>
                        <th className="px-6 py-3 font-medium">Email</th>
                        <th className="px-6 py-3 font-medium">Department</th>
                        <th className="px-6 py-3 font-medium">Year</th>
                        <th className="px-6 py-3 font-medium">Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-sm text-gray-700">
                      {users.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                          <td className="px-6 py-4">{user.registerNumber}</td>
                          <td className="px-6 py-4">{user.email}</td>
                          <td className="px-6 py-4">{user.department}</td>
                          <td className="px-6 py-4">{user.year}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                              {user.role}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
