import { Schema, model } from 'mongoose'

const leadSchema = new Schema({
  email:      { type: String, required: true, lowercase: true, trim: true },
  modelId:    { type: String, required: true },
  modelName:  { type: String, required: true },
  discount:   { type: String, required: true },
  couponCode: { type: String, required: true, unique: true },
  redeemed:   { type: Boolean, default: false },
  redeemedAt: { type: Date },
}, { timestamps: true })

// Index for quick lookup by email (to detect duplicates)
leadSchema.index({ email: 1, modelId: 1 })

export const Lead = model('Lead', leadSchema)
