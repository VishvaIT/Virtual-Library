const User = require('../models/User');
const Resource = require('../models/Resource');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getAnalytics = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalUploads = await Resource.countDocuments();
    
    // Group by year
    const yearStats = await Resource.aggregate([
      { $group: { _id: '$academicYear', count: { $sum: 1 } } }
    ]);

    // Group by type
    const typeStats = await Resource.aggregate([
      { $group: { _id: '$resourceType', count: { $sum: 1 } } }
    ]);

    res.json({
      totalStudents,
      totalUploads,
      yearStats,
      typeStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, getAnalytics };
