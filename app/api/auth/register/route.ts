import { type NextRequest, NextResponse } from "next/server"
import { User, initDb } from "@/lib/db"
import { hashPassword, createToken } from "@/lib/auth"
import { randomUUID } from "crypto"   // ✅ use randomUUID from crypto

export async function POST(req: NextRequest) {
  try {
    await initDb()

    const {
      email,
      password,
      firstName,
      lastName,
      role = "student",
      language = "en",
    } = await req.json()

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      )
    }

    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 },
      )
    }

    const userId = randomUUID()           // ✅ generate UUID correctly
    const hashedPassword = await hashPassword(password)

    await User.create({
      _id: userId,
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName,
      lastName,
      role,
      language,
      isVerified: false,
    })

    const token = createToken(userId, role)

    return NextResponse.json({
      success: true,
      user: { id: userId, email, firstName, lastName, role, language },
      token,
    })
  } catch (error) {
    console.error("Register API error:", error) // (optional but useful)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
