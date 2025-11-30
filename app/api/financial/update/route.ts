import { NextResponse } from "next/server"
import Financial from "@/models/Financial"
import { initDb } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    await initDb()

    const body = await req.json()
    const { income, expenses, savings } = body

    const authHeader = req.headers.get("authorization")
    if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const token = authHeader.split(" ")[1]
    const decoded = verifyToken(token)
    const userId = decoded.userId

    const updated = await Financial.findOneAndUpdate(
      { userId },
      { income, expenses, savings },
      { upsert: true, new: true }
    )

    return NextResponse.json({ success: true, data: updated })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
