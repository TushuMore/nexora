import mongoose, { Schema, model, models, Document } from "mongoose";

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    image: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export const Blog =
  models.Blog || model("Blog", blogSchema); // ✅ Don't add types here