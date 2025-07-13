import mongoose, { Schema, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    image: String,
    tech: [String],
    github: String,
    live: String,
  },
  { timestamps: true }
);

export const Project = models.Project || mongoose.model("Project", ProjectSchema);
