import { initDb } from "@/lib/db"
import { NextResponse } from "next/server"
import mongoose from "mongoose"

// Initialize database connection
export async function GET() {
  try {
    await initDb()
    const db = mongoose.connection.db
    const collections = await db.listCollections().toArray()

    return NextResponse.json({
      message: "MongoDB connected successfully",
      database: db.getName(),
      collections: collections.map((c) => c.name),
      connected: mongoose.connection.readyState === 1,
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
