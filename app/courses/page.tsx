"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
import { toast } from "sonner"

interface Course {
  id?: string
  _id?: string
  title: string
  description: string
  category: string
  price: number
  instructorId: string
  createdAt: number
}

export default function CoursesPage() {
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses")
        setCourses(response.data.courses || [])
      } catch (error) {
        toast.error("Failed to load courses")
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const categories = [
    "all",
    "coding",
    "tailoring",
    "baking",
    "beauty",
    "agriculture",
    "financial_literacy",
    "cyber_safety",
  ]

  const handleEnroll = async (courseId: string) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/login")
        return
      }

      await axios.post(
        `/api/courses/${courseId}/enroll`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      toast.success("Enrolled successfully!")
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Enrollment failed")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">WomenSkillHub</div>
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Skill Development Courses</h1>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              className="whitespace-nowrap"
            >
              {cat.replace("_", " ").toUpperCase()}
            </Button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p>Loading courses...</p>
          ) : courses.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No courses available yet.</p>
          ) : (
            courses
              .filter((course) =>
                selectedCategory === "all" ? true : course.category === selectedCategory,
              )
              .map((course) => {
                const courseId = course.id || course._id
                if (!courseId) return null

                return (
                  <Card key={courseId} className="hover:shadow-lg transition">
                    <CardHeader>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription>{course.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">{course.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">${course.price}</span>
                        <Button size="sm" onClick={() => handleEnroll(courseId)}>
                          Enroll Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
          )}
        </div>
      </main>
    </div>
  )
}
