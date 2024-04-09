import mongoose from 'mongoose';

const folderSchema = new mongoose.Schema({
  folderTitle: {
    type: String,
    required: true,
  },
  folderImage: {
    type: String,
    required: true,
  },
  folderDescription: {
    type: String,
    required: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  notes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Folder = mongoose.models.Folder || mongoose.model('Folder', folderSchema);

export default Folder;
