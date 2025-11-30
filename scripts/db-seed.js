const mongoose = require("mongoose")
const crypto = require("crypto")
const bcryptjs = require("bcryptjs")

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/womenhub"

// Define schemas inline for seeding
const userSchema = new mongoose.Schema({
  _id: String,
  email: { type: String, unique: true, lowercase: true },
  password: String,
  firstName: String,
  lastName: String,
  phone: String,
  role: String,
  language: { type: String, default: "en" },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const courseSchema = new mongoose.Schema({
  _id: String,
  title: String,
  description: String,
  category: String,
  instructorId: String,
  image: String,
  status: { type: String, default: "draft" },
  price: { type: Number, default: 0 },
  duration: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const productSchema = new mongoose.Schema({
  _id: String,
  sellerId: String,
  title: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  variants: mongoose.Schema.Types.Mixed,
  inventory: { type: Number, default: 0 },
  status: { type: String, default: "draft" },
  createdAt: { type: Date, default: Date.now },
})

const governmentSchemeSchema = new mongoose.Schema({
  _id: String,
  name: String,
  description: String,
  eligibilityJson: mongoose.Schema.Types.Mixed,
  applicationUrl: String,
  category: String,
  createdAt: { type: Date, default: Date.now },
})

const User = mongoose.model("User", userSchema)
const Course = mongoose.model("Course", courseSchema)
const Product = mongoose.model("Product", productSchema)
const GovernmentScheme = mongoose.model("GovernmentScheme", governmentSchemeSchema)

async function hashPassword(password) {
  return bcryptjs.hash(password, 10)
}

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("Connected to MongoDB")

    // Clear existing data
    await User.deleteMany({})
    await Course.deleteMany({})
    await Product.deleteMany({})
    await GovernmentScheme.deleteMany({})
    console.log("Cleared existing data")

    // Admin user
    const adminPassword = await hashPassword("admin123")
    const adminId = crypto.randomUUID()
    await User.create({
      _id: adminId,
      email: "admin@womenskillhub.com",
      password: adminPassword,
      firstName: "Admin",
      lastName: "User",
      role: "admin",
      language: "en",
      isVerified: true,
    })

    // Demo instructor
    const instructorPassword = await hashPassword("instructor123")
    const instructorId = crypto.randomUUID()
    await User.create({
      _id: instructorId,
      email: "instructor@womenskillhub.com",
      password: instructorPassword,
      firstName: "Priya",
      lastName: "Sharma",
      role: "instructor",
      language: "en",
      isVerified: true,
    })

    // Demo seller
    const sellerPassword = await hashPassword("seller123")
    const sellerId = crypto.randomUUID()
    await User.create({
      _id: sellerId,
      email: "seller@womenskillhub.com",
      password: sellerPassword,
      firstName: "Anita",
      lastName: "Patel",
      role: "seller",
      language: "en",
      isVerified: true,
    })

    // Sample courses
    const courses = [
      {
        _id: crypto.randomUUID(),
        title: "Basics of Coding",
        description: "Learn programming fundamentals with Python and JavaScript",
        category: "coding",
        instructorId: instructorId,
        price: 0,
        duration: 4,
        status: "published",
      },
      {
        _id: crypto.randomUUID(),
        title: "Traditional Tailoring",
        description: "Master traditional tailoring techniques and patterns",
        category: "tailoring",
        instructorId: instructorId,
        price: 0,
        duration: 6,
        status: "published",
      },
      {
        _id: crypto.randomUUID(),
        title: "Beauty & Skincare",
        description: "Learn professional beauty and skincare techniques",
        category: "beauty",
        instructorId: instructorId,
        price: 0,
        duration: 3,
        status: "published",
      },
      {
        _id: crypto.randomUUID(),
        title: "Cyber Safety Essentials",
        description: "Protect yourself from online threats and scams",
        category: "cyber_safety",
        instructorId: instructorId,
        price: 0,
        duration: 2,
        status: "published",
      },
      {
        _id: crypto.randomUUID(),
        title: "Financial Literacy 101",
        description: "Master budgeting, saving, and investment basics",
        category: "financial_literacy",
        instructorId: instructorId,
        price: 0,
        duration: 5,
        status: "published",
      },
    ]

    await Course.insertMany(courses)

    // Sample products
    const products = [
      {
        _id: crypto.randomUUID(),
        sellerId: sellerId,
        title: "Handmade Embroidered Saree",
        description: "Beautiful handmade saree with traditional embroidery",
        price: 50,
        category: "traditional_wear",
        inventory: 10,
        status: "published",
      },
      {
        _id: crypto.randomUUID(),
        sellerId: sellerId,
        title: "Organic Beauty Kit",
        description: "Natural and organic beauty products set",
        price: 25,
        category: "beauty_products",
        inventory: 20,
        status: "published",
      },
    ]

    await Product.insertMany(products)

    // Sample government schemes
    const schemes = [
      {
        _id: crypto.randomUUID(),
        name: "Prime Minister MUDRA Yojana",
        description: "Microfinance scheme for small business loans",
        eligibilityJson: { minAge: 18, businessType: "micro" },
        applicationUrl: "https://example.com/mudra",
        category: "business_finance",
      },
      {
        _id: crypto.randomUUID(),
        name: "Mahila Samman Savings Certificate",
        description: "Special savings scheme for women",
        eligibilityJson: { minAge: 18, gender: "female" },
        applicationUrl: "https://example.com/mahila",
        category: "savings",
      },
      {
        _id: crypto.randomUUID(),
        name: "Pradhan Mantri Ujjwala Yojana",
        description: "LPG connection scheme for below-poverty-line families",
        eligibilityJson: { bplStatus: true },
        applicationUrl: "https://example.com/ujjwala",
        category: "energy",
      },
    ]

    await GovernmentScheme.insertMany(schemes)

    console.log("Database seeded successfully!")
    await mongoose.disconnect()
  } catch (error) {
    console.error("Seeding error:", error)
    await mongoose.disconnect()
    process.exit(1)
  }
}

seedDatabase()
