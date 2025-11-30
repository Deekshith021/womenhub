"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, ShoppingBag, Wallet, Shield, Users, GraduationCap } from "lucide-react"

export default function HomePage() {
  const router = useRouter()

  const features = [
    {
      icon: BookOpen,
      title: "Skill Development",
      description: "Learn tailoring, coding, beauty, agriculture, and more with AI-powered tutoring",
      href: "/courses",
    },
    {
      icon: ShoppingBag,
      title: "Entrepreneurship",
      description: "Start and grow your business with our marketplace and seller tools",
      href: "/marketplace",
    },
    {
      icon: Wallet,
      title: "Financial Literacy",
      description: "Master budgeting, savings goals, and loan schemes",
      href: "/financial",
    },
    {
      icon: Shield,
      title: "Cyber Safety",
      description: "Learn to protect yourself from phishing, scams, and cyber threats",
      href: "/cyber-safety",
    },
    {
      icon: Users,
      title: "Mentorship",
      description: "Connect with mentors and build your network",
      href: "/mentorship",
    },
    {
      icon: GraduationCap,
      title: "Rural Support",
      description: "Government schemes, local training, and community support",
      href: "/rural-support",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">WomenSkillHub</div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => router.push("/login")}>
              Login
            </Button>
            <Button onClick={() => router.push("/signup")}>Sign Up</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-5xl font-bold mb-6">Empowering Women Through Skills</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Learn new skills, start your business, manage your finances, stay cyber-safe, and build your future with
          WomenSkillHub
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={() => router.push("/signup")}>
            Get Started
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="hover:shadow-lg transition cursor-pointer"
                onClick={() => router.push(feature.href)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-blue-600" />
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg mb-6">Join thousands of women learning and growing</p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Sign Up Now
          </Button>
        </div>
      </section>
    </div>
  )
}
