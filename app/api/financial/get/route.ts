import { NextResponse } from "next/server"
import Financial from "@/models/Financial"
import { initDb } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

export async function GET(req: Request) {
  try {
    await initDb()

    const authHeader = req.headers.get("authorization")
    if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const token = authHeader.split(" ")[1]
    const decoded = verifyToken(token)
    const userId = decoded.userId

    const data = await Financial.findOne({ userId })

    return NextResponse.json({ success: true, data })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
