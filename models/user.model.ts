import { string } from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default:
      "https://www.radiosawa.com/themes/custom/voa/images/Author__Placeholder.png",
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
