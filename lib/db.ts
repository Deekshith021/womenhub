import mongoose from "mongoose"
import Financial from "@/models/Financial"  // ensure model is registered


const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/womenhub"

// Models/Schemas
export const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String },
  role: { type: String, required: true, enum: ["admin", "instructor", "seller", "student", "mentee", "field_agent"] },
  language: { type: String, default: "en" },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const courseSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  instructorId: { type: String, required: true },
  image: { type: String },
  status: { type: String, default: "draft", enum: ["draft", "published", "archived"] },
  price: { type: Number, default: 0 },
  duration: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const lessonSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  courseId: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String },
  videoUrl: { type: String },
  audioUrl: { type: String },
  pdfUrl: { type: String },
  order: { type: Number },
  createdAt: { type: Date, default: Date.now },
})

export const enrollmentSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  progress: { type: Number, default: 0 },
  status: { type: String, default: "active", enum: ["active", "completed", "dropped"] },
  enrolledAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
})

export const productSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sellerId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  image: { type: String },
  variants: { type: mongoose.Schema.Types.Mixed },
  inventory: { type: Number, default: 0 },
  status: { type: String, default: "draft", enum: ["draft", "published", "archived"] },
  createdAt: { type: Date, default: Date.now },
})

export const orderSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  buyerId: { type: String, required: true },
  sellerId: { type: String, required: true },
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, default: "pending", enum: ["pending", "paid", "shipped", "delivered", "cancelled"] },
  paymentId: { type: String },
  createdAt: { type: Date, default: Date.now },
})

export const budgetSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  month: { type: String, required: true },
  income: { type: Number, default: 0 },
  expenses: { type: mongoose.Schema.Types.Mixed, default: {} },
  savings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

export const mentorshipRequestSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  menteeId: { type: String, required: true },
  mentorId: { type: String, required: true },
  skillAreas: { type: [String] },
  status: { type: String, default: "pending", enum: ["pending", "accepted", "rejected", "completed"] },
  createdAt: { type: Date, default: Date.now },
})

export const cyberIncidentSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  incidentType: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: "reported", enum: ["reported", "investigating", "resolved"] },
  anonymous: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

export const governmentSchemeSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  eligibilityJson: { type: mongoose.Schema.Types.Mixed },
  applicationUrl: { type: String },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
})

export const assessmentSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  lessonId: { type: String, required: true },
  title: { type: String, required: true },
  questions: { type: [mongoose.Schema.Types.Mixed], required: true },
  createdAt: { type: Date, default: Date.now },
})

export const assessmentResponseSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  assessmentId: { type: String, required: true },
  userId: { type: String, required: true },
  answers: { type: mongoose.Schema.Types.Mixed, required: true },
  score: { type: Number },
  createdAt: { type: Date, default: Date.now },
})

export const certificateSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  certificateHash: { type: String, required: true },
  issuedAt: { type: Date, default: Date.now },
})

// Get or create models
export const User = mongoose.models.User || mongoose.model("User", userSchema)
export const Course = mongoose.models.Course || mongoose.model("Course", courseSchema)
export const Lesson = mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema)
export const Enrollment = mongoose.models.Enrollment || mongoose.model("Enrollment", enrollmentSchema)
export const Product = mongoose.models.Product || mongoose.model("Product", productSchema)
export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema)
export const Budget = mongoose.models.Budget || mongoose.model("Budget", budgetSchema)
export const MentorshipRequest =
  mongoose.models.MentorshipRequest || mongoose.model("MentorshipRequest", mentorshipRequestSchema)
export const CyberIncident = mongoose.models.CyberIncident || mongoose.model("CyberIncident", cyberIncidentSchema)
export const GovernmentScheme =
  mongoose.models.GovernmentScheme || mongoose.model("GovernmentScheme", governmentSchemeSchema)
export const Assessment = mongoose.models.Assessment || mongoose.model("Assessment", assessmentSchema)
export const AssessmentResponse =
  mongoose.models.AssessmentResponse || mongoose.model("AssessmentResponse", assessmentResponseSchema)
export const Certificate = mongoose.models.Certificate || mongoose.model("Certificate", certificateSchema)

// Database connection
export async function initDb() {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection
    }
    await mongoose.connect(MONGODB_URI)
    console.log("MongoDB connected successfully")
    return mongoose.connection
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw error
  }
}

export async function getDb() {
  if (mongoose.connection.readyState !== 1) {
    await initDb()
  }
  return mongoose.connection
}

// Legacy-compatible helper functions for API routes
export async function runAsync(operation: (session: any) => Promise<any>) {
  await initDb()
  return operation(null)
}

export async function getAsync<T>(model: any, query: any = {}): Promise<T | undefined> {
  await initDb()
  return model.findOne(query).lean() as Promise<T | undefined>
}

export async function allAsync<T>(model: any, query: any = {}): Promise<T[]> {
  await initDb()
  return model.find(query).lean() as Promise<T[]>
}

// Close connection
export async function closeDb() {
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect()
  }
}
