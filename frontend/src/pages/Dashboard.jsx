import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import ResourceCard from '../components/ResourceCard';
import { BookOpen } from 'lucide-react';

const Dashboard = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResources = async (searchParams = {}) => {
    setLoading(true);
    try {
      const res = await axios.get('/resources/search', { params: searchParams });
      setResources(res.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await axios.delete(`/resources/${id}`);
        setResources(resources.filter(r => r._id !== id));
      } catch (error) {
        console.error('Error deleting resource:', error);
        alert(error.response?.data?.message || 'Error deleting resource');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-8 pb-20 md:pb-8 overflow-y-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen size={24} className="text-indigo-600" />
              Resource Library
            </h1>
            <p className="text-gray-600 mt-1">Browse, search, and download academic materials.</p>
          </div>

          <SearchBar onSearch={fetchResources} />

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : resources.length === 0 ? (
            <div className="bg-white rounded-xl border p-12 text-center shadow-sm">
              <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No resources found</h3>
              <p className="text-gray-500 mt-1">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {resources.map((resource) => (
                <ResourceCard 
                  key={resource._id} 
                  resource={resource} 
                  onDelete={handleDelete} 
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
