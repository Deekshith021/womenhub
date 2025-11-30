import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

// AI Tutor endpoint with mock mode by default
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.slice(7)
    const decoded = verifyToken(token)

    const { message, courseId, lessonId, context = "tutor" } = await req.json()

    // Mock mode: return deterministic responses
    if (!process.env.AI_API_KEY) {
      const mockResponses: Record<string, string> = {
        tutor: `Based on the lesson content, here's an explanation: The concept you're asking about relates to the core principles covered in this lesson. Try reviewing the section on [specific topic] and practice with the exercises provided.`,
        debugging: `I've identified the issue in your code. The problem is likely on line X where [specific error]. Try using [suggested fix] and test again.`,
        pricing: `Based on market analysis and your product category, a competitive price would be between $25-$45. Consider your costs and target market when setting the final price.`,
        financial: `For your budget: Track your fixed expenses first, then allocate 20% to savings. The remaining amount can be divided as: 50% needs, 30% wants. Review monthly and adjust as needed.`,
      }

      return NextResponse.json({
        response: mockResponses[context] || mockResponses.tutor,
        isReal: false,
        timestamp: Date.now(),
      })
    }

    // Real AI mode (when API key is provided)
    // This would integrate with real AI provider
    const realResponse = `Real AI response for: ${message}`

    return NextResponse.json({
      response: realResponse,
      isReal: true,
      timestamp: Date.now(),
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
