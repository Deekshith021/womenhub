import { type NextRequest, NextResponse } from "next/server"
import { Order, initDb } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    await initDb()
    const body = await req.json()

    // Mock webhook handling for test mode
    if (body.type === "test_payment_success") {
      const order = await Order.findOne({ paymentId: body.paymentId })
      if (order) {
        await Order.updateOne({ _id: order._id }, { status: "paid" })
      }

      return NextResponse.json({ received: true })
    }

    return NextResponse.json({ received: false }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
