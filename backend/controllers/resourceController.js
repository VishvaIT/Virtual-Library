const Resource = require('../models/Resource');
const fs = require('fs');
const path = require('path');

// @desc    Upload a resource
// @route   POST /api/resources/upload
// @access  Private
const uploadResource = async (req, res) => {
  try {
    const { title, subjectCode, subjectName, semester, academicYear, resourceType, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    // Check duplicate
    const exists = await Resource.findOne({
      subjectCode,
      resourceType,
      semester,
      academicYear,
    });

    if (exists && req.user.role !== 'admin') {
      // Remove the uploaded file if duplicate
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: 'Resource already uploaded for this subject.' });
    }

    const resource = await Resource.create({
      title,
      subjectCode,
      subjectName,
      semester,
      academicYear,
      resourceType,
      description,
      fileUrl: `/uploads/${req.file.filename}`,
      uploadedBy: req.user._id,
    });

    res.status(201).json(resource);
  } catch (error) {
    // Attempt to remove file if error happens after upload
    if (req.file) {
      try { fs.unlinkSync(req.file.path); } catch (e) { console.log(e); }
    }
    if (error.code === 11000) {
       return res.status(400).json({ message: 'Resource already uploaded for this subject.' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all resources
// @route   GET /api/resources
// @access  Private
const getResources = async (req, res) => {
  try {
    const resources = await Resource.find({}).populate('uploadedBy', 'name registerNumber').sort({ createdAt: -1 });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search resources
// @route   GET /api/resources/search
// @access  Private
const searchResources = async (req, res) => {
  try {
    const { keyword, year, semester, resourceType, subjectCode } = req.query;
    
    let query = {};
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { subjectName: { $regex: keyword, $options: 'i' } }
      ];
    }
    if (year) query.academicYear = year;
    if (semester) query.semester = semester;
    if (resourceType) query.resourceType = resourceType;
    if (subjectCode) query.subjectCode = { $regex: subjectCode, $options: 'i' };

    const resources = await Resource.find(query).populate('uploadedBy', 'name registerNumber');
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get resource by ID
// @route   GET /api/resources/:id
// @access  Private
const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id).populate('uploadedBy', 'name registerNumber');
    if (resource) {
      res.json(resource);
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a resource
// @route   DELETE /api/resources/:id
// @access  Private (Uploader or Admin)
const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (resource.uploadedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this resource' });
    }

    // Delete file
    const filePath = path.join(__dirname, '..', resource.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await resource.deleteOne();
    res.json({ message: 'Resource removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadResource, getResources, searchResources, getResourceById, deleteResource };
