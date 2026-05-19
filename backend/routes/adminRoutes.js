const express = require('express');
const { getUsers, getAnalytics } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');
const { deleteResource } = require('../controllers/resourceController');

const router = express.Router();

router.route('/users')
  .get(protect, admin, getUsers);

router.route('/analytics')
  .get(protect, admin, getAnalytics);

// Admin can also delete resources
router.route('/resource/:id')
  .delete(protect, admin, deleteResource);

module.exports = router;
