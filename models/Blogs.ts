import mongoose, { Schema } from 'mongoose';

const BlogSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  description: { type: String },
  excerpt: { type: String },
  date: { type: String }, // Use Date if storing as Date object
  tags: [{ type: String }],
  image: { type: String },
}, { timestamps: true });

export const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);