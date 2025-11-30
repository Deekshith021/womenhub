import { type NextRequest, NextResponse } from "next/server"
import { Product, initDb } from "@/lib/db"
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

    const products = await Product.find(query).lean()
    return NextResponse.json({ products })
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

    const { title, description, price, category, inventory, variants } = await req.json()

    const productId = uuidv4()

    await Product.create({
      _id: productId,
      sellerId: decoded.userId,
      title,
      description,
      price,
      category,
      inventory,
      variants: variants || {},
      status: "pending",
    })

    return NextResponse.json({ id: productId, success: true }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
