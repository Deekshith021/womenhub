const mongoose = require("mongoose")
const path = require("path")
const fs = require("fs")

const dataDir = path.join(__dirname, "../data")
const dbPath = path.join(dataDir, "skillhub.db")

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/womenhub"

async function initDb() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("MongoDB connected successfully!")
    console.log(`Database: ${mongoose.connection.db.getName()}`)
    console.log(`Host: ${mongoose.connection.host}`)

    // Create collections with validation if needed
    const db = mongoose.connection.db
    const collections = await db.listCollections().toArray()
    console.log(
      "Existing collections:",
      collections.map((c) => c.name),
    )

    await mongoose.disconnect()
    console.log("Database initialization complete!")
  } catch (error) {
    console.error("MongoDB initialization error:", error)
    process.exit(1)
  }
}

initDb()
