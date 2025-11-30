import { type NextRequest, NextResponse } from "next/server"
import { GovernmentScheme, initDb } from "@/lib/db"

export async function GET(req: NextRequest) {
  try {
    await initDb()
    const category = req.nextUrl.searchParams.get("category")
    const query: any = {}

    if (category) {
      query.category = category
    }

    const schemes = await GovernmentScheme.find(query).lean()
    return NextResponse.json({ schemes })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
