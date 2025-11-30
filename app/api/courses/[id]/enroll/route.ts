import { type NextRequest, NextResponse } from "next/server"
import { Enrollment, initDb } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { v4 as uuidv4 } from "crypto"

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await initDb()
    const authHeader = req.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.slice(7)
    const decoded = verifyToken(token)
    const { id } = await params

    const existing = await Enrollment.findOne({
      userId: decoded.userId,
      courseId: id,
    })

    if (existing) {
      return NextResponse.json({ error: "Already enrolled" }, { status: 400 })
    }

    const enrollmentId = uuidv4()
    await Enrollment.create({
      _id: enrollmentId,
      userId: decoded.userId,
      courseId: id,
      progress: 0,
      status: "active",
    })

    return NextResponse.json({ enrollmentId, success: true }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
