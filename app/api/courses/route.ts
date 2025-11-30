import { type NextRequest, NextResponse } from "next/server"
import { Course, initDb } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { v4 as uuidv4 } from "crypto"

export async function GET(req: NextRequest) {
  try {
    await initDb()
    const category = req.nextUrl.searchParams.get("category")
    const query: any = { status: "published" }

    if (category) {
      query.category = category
    }

    const courses = await Course.find(query).lean()
    return NextResponse.json({ courses })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await initDb()
    const authHeader = req.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.slice(7)
    const decoded = verifyToken(token)

    const { title, description, category, price, duration } = await req.json()

    const courseId = uuidv4()

    await Course.create({
      _id: courseId,
      title,
      description,
      category,
      instructorId: decoded.userId,
      price: price || 0,
      duration,
      status: "draft",
    })

    return NextResponse.json({ id: courseId, success: true }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
