import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";
const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    require: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});
const User = models.User || mongoose.model("User", UserSchema);
const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    require: [true, "Prompt is required"],
    index: {
      type: "text",
    },
  },
  tag: {
    type: String,
    require: [true, "Tag is required"],
    index: {
      type: "text",
    },
  },
});

const Prompt = model("Prompt", PromptSchema);
export default Prompt;
