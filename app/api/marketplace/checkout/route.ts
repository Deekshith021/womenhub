import { type NextRequest, NextResponse } from "next/server"
import { Order, Product, initDb } from "@/lib/db"
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

    const { productId, quantity } = await req.json()

    const product = await Product.findById(productId)
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const orderId = uuidv4()
    const paymentId = `test_${uuidv4().slice(0, 8)}`

    await Order.create({
      _id: orderId,
      buyerId: decoded.userId,
      sellerId: product.sellerId,
      productId: productId,
      quantity,
      totalPrice: product.price * quantity,
      status: "pending",
      paymentId,
    })

    return NextResponse.json(
      {
        orderId,
        paymentId,
        amount: product.price * quantity,
        currency: "USD",
        testMode: !process.env.STRIPE_SECRET_KEY,
        clientSecret: `pi_test_${uuidv4().slice(0, 16)}`,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
