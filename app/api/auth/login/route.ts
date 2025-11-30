import { type NextRequest, NextResponse } from "next/server"
import { User, initDb } from "@/lib/db"
import { verifyPassword, createToken } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    await initDb()
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const passwordValid = await verifyPassword(password, user.password)
    if (!passwordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = createToken(user._id, user.role)

    return NextResponse.json({
      success: true,
      user: { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role },
      token,
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
