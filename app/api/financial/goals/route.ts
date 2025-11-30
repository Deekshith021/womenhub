import { NextResponse } from "next/server"
import Financial from "@/models/Financial"
import { initDb } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    await initDb()

    const body = await req.json()
    const { name, target } = body

    if (!name || !target)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })

    const authHeader = req.headers.get("authorization")
    if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const token = authHeader.split(" ")[1]
    const decoded = verifyToken(token)
    const userId = decoded.userId

    const financial = await Financial.findOneAndUpdate(
      { userId },
      { $push: { goals: { name, target } } },
      { upsert: true, new: true }
    )

    return NextResponse.json({ success: true, data: financial })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
