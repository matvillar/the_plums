import mongoose from 'mongoose';

const docSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  parentDocId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doc',
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Doc = mongoose.models.Doc || mongoose.model('Doc', docSchema);
export default Doc;
