import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  noteBody: {
    type: String,
    required: false,
  },
  parentFolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);

export default Note;
