"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, ShoppingBag, Wallet, Shield, LogOut } from "lucide-react"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(storedUser))
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
  }

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">WomenSkillHub</div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user?.firstName} {user?.lastName}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Welcome, {user?.firstName}!</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition" onClick={() => router.push("/courses")}>
            <CardHeader>
              <BookOpen className="w-8 h-8 text-blue-600 mb-2" />
              <CardTitle>My Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>View enrolled courses and continue learning</CardDescription>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition" onClick={() => router.push("/marketplace")}>
            <CardHeader>
              <ShoppingBag className="w-8 h-8 text-green-600 mb-2" />
              <CardTitle>Marketplace</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Browse products and seller opportunities</CardDescription>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition" onClick={() => router.push("/financial")}>
            <CardHeader>
              <Wallet className="w-8 h-8 text-orange-600 mb-2" />
              <CardTitle>Financial Literacy</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Manage budgets and learn about schemes</CardDescription>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition" onClick={() => router.push("/cyber-safety")}>
            <CardHeader>
              <Shield className="w-8 h-8 text-red-600 mb-2" />
              <CardTitle>Cyber Safety</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Learn to stay safe online</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">No recent activity yet. Start by enrolling in a course!</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
