import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true },
  name: { type: String, required: true },
  userImg: { type: String, required: true },
  folders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Folder' }],
  isOnboard: { type: Boolean, default: false },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
