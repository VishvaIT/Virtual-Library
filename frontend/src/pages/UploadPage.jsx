import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { UploadCloud, CheckCircle, AlertCircle } from 'lucide-react';

const UploadPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    subjectCode: '',
    subjectName: '',
    semester: '1',
    academicYear: '1st',
    resourceType: 'Notes',
    description: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus({ type: 'error', message: 'Please select a file to upload.' });
      return;
    }
    
    setLoading(true);
    setStatus({ type: '', message: '' });

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append('file', file);

    try {
      await axios.post('/resources/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setStatus({ type: 'success', message: 'Resource uploaded successfully!' });
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Error uploading resource. It may be a duplicate or file size too large.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto flex justify-center">
          <div className="max-w-2xl w-full bg-white rounded-xl shadow-sm border p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4 text-indigo-600">
                <UploadCloud size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Upload Resource</h2>
              <p className="text-gray-500 mt-1">Share academic materials with your peers</p>
            </div>

            {status.message && (
              <div className={`p-4 mb-6 rounded-lg flex items-start gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                {status.type === 'success' ? <CheckCircle size={20} className="mt-0.5 text-green-600" /> : <AlertCircle size={20} className="mt-0.5 text-red-600" />}
                <div>{status.message}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resource Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="e.g., Chapter 1 to 3 Handwritten Notes"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject Code</label>
                  <input
                    type="text"
                    name="subjectCode"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., CS8492"
                    value={formData.subjectCode}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label>
                  <input
                    type="text"
                    name="subjectName"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., Database Management"
                    value={formData.subjectName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <select
                    name="academicYear"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.academicYear}
                    onChange={handleChange}
                  >
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                  <select
                    name="semester"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.semester}
                    onChange={handleChange}
                  >
                    {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
                  <select
                    name="resourceType"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.resourceType}
                    onChange={handleChange}
                  >
                    <option value="Notes">Notes</option>
                    <option value="PDF materials">PDF materials</option>
                    <option value="Question papers">Question papers</option>
                    <option value="Lab manuals">Lab manuals</option>
                    <option value="Important documents">Important documents</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <textarea
                  name="description"
                  rows="3"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Additional details about the material..."
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex justify-center items-center flex-col hover:border-indigo-500 transition-colors bg-gray-50">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                  <UploadCloud size={32} className="text-gray-400 mb-2" />
                  <span className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {file ? file.name : 'Click to select a file'}
                  </span>
                  {!file && <span className="text-xs text-gray-500 mt-1">PDF, DOC, PPT up to 10MB</span>}
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {loading ? 'Uploading...' : 'Upload Resource'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UploadPage;
