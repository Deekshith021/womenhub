import { type NextRequest, NextResponse } from "next/server"
import { User, Enrollment, Order, Course, initDb } from "@/lib/db"
import { verifyToken, hasPermission } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    await initDb()
    const authHeader = req.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.slice(7)
    const decoded = verifyToken(token)

    if (!hasPermission(decoded.role as any, "admin")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const totalUsers = await User.countDocuments()
    const activeEnrollments = await Enrollment.countDocuments({ status: "active" })

    const totalRevenueResult = await Order.aggregate([
      { $match: { status: "paid" } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ])
    const totalRevenue = totalRevenueResult[0]?.total || 0

    const courseStats = await Course.aggregate([
      {
        $lookup: {
          from: "enrollments",
          localField: "_id",
          foreignField: "courseId",
          as: "enrollmentData",
        },
      },
      {
        $project: {
          title: 1,
          enrollmentCount: { $size: "$enrollmentData" },
        },
      },
      { $limit: 10 },
    ])

    return NextResponse.json({
      metrics: {
        totalUsers,
        activeEnrollments,
        totalRevenue,
      },
      courseStats,
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
