/*
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("Post", postSchema);
*/

import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, minlength: 5, maxlength: 30, required: true },
  content: { type: String, minlength: 10, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hashtags: [String],
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

// Middleware para actualizar updatedAt en cada modificación
postSchema.pre("findOneAndUpdate", function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

export default mongoose.model("Post", postSchema);
