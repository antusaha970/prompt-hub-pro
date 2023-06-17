import { Schema, model, models } from "mongoose";

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

const Prompt = models.Prompt || model("Prompt", PromptSchema);
export default Prompt;
