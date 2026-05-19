const mongoose = require('mongoose');

const resourceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subjectCode: {
      type: String,
      required: true,
    },
    subjectName: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    resourceType: {
      type: String,
      required: true,
      enum: ['Notes', 'PDF materials', 'Question papers', 'Lab manuals', 'Important documents', 'Other'],
    },
    description: {
      type: String,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    isApproved: {
      type: Boolean,
      default: true, // For simplicity, auto-approve or adjust based on need
    },
    downloads: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate uploads index
// If a resource already exists for same subjectCode, resourceType, semester, and academicYear
resourceSchema.index({ subjectCode: 1, resourceType: 1, semester: 1, academicYear: 1 }, { unique: true });

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
