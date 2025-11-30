import { type NextRequest, NextResponse } from "next/server"
import { CyberIncident, initDb } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { v4 as uuidv4 } from "crypto"

export async function POST(req: NextRequest) {
  try {
    await initDb()
    const authHeader = req.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.slice(7)
    const decoded = verifyToken(token)

    const { incidentType, description, anonymous = false } = await req.json()

    const reportId = uuidv4()

    await CyberIncident.create({
      _id: reportId,
      userId: decoded.userId,
      incidentType,
      description,
      status: "reported",
      anonymous,
    })

    return NextResponse.json({ reportId, success: true }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
