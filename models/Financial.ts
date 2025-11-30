import mongoose, { Schema, models } from "mongoose"

const GoalSchema = new Schema({
  name: { type: String, required: true },
  target: { type: Number, required: true },
  current: { type: Number, default: 0 }, // optional for future
})

const FinancialSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },

    income: { type: Number, default: 0 },
    expenses: { type: Number, default: 0 },
    savings: { type: Number, default: 0 },

    goals: [GoalSchema],
  },
  { timestamps: true },
)

export default models.Financial || mongoose.model("Financial", FinancialSchema)
