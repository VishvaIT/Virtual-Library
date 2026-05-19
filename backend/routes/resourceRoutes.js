const express = require('express');
const { uploadResource, getResources, searchResources, getResourceById, deleteResource } = require('../controllers/resourceController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getResources);

router.route('/upload')
  .post(protect, upload.single('file'), uploadResource);

router.route('/search')
  .get(protect, searchResources);

router.route('/:id')
  .get(protect, getResourceById)
  .delete(protect, deleteResource);

module.exports = router;
