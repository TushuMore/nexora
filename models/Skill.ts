import mongoose, { Schema, models } from "mongoose"

const SkillSchema = new Schema(
  {
    name: { type: String, required: true },
    percentage: { type: Number, required: true },
  },
  { timestamps: true }
)

export const Skill =
  models.Skill || mongoose.model("Skill", SkillSchema)
