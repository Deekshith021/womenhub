import { type NextRequest, NextResponse } from "next/server"
import { Course, initDb } from "@/lib/db"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await initDb()
    const { id } = await params
    const course = await Course.findOne({ _id: id, status: "published" }).lean()

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json({ course })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
