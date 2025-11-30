"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertTriangle, Lock, Eye } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"

export default function CyberSafetyPage() {
  const router = useRouter()
  const [activeModule, setActiveModule] = useState("phishing")
  const [reportForm, setReportForm] = useState({
    incidentType: "phishing",
    description: "",
    anonymous: false,
  })

  const modules = [
    {
      id: "phishing",
      title: "Phishing Awareness",
      icon: AlertTriangle,
      description: "Learn to identify and avoid phishing attacks",
      lessons: ["What is phishing?", "Common phishing tactics", "How to spot fake emails", "Safe email practices"],
    },
    {
      id: "passwords",
      title: "Password Security",
      icon: Lock,
      description: "Create and manage strong passwords",
      lessons: [
        "Strong password criteria",
        "Password managers",
        "Two-factor authentication",
        "Password recovery safely",
      ],
    },
    {
      id: "social-media",
      title: "Social Media Safety",
      icon: Eye,
      description: "Protect your privacy on social platforms",
      lessons: ["Privacy settings guide", "Avoiding oversharing", "Recognizing scams", "Reporting abuse"],
    },
    {
      id: "general",
      title: "General Cyber Safety",
      icon: Shield,
      description: "Essential cybersecurity practices",
      lessons: ["Safe browsing habits", "Public WiFi risks", "Malware protection", "Data backup importance"],
    },
  ]

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/login")
        return
      }

      await axios.post("/api/cyber/report", reportForm, {
        headers: { Authorization: `Bearer ${token}` },
      })

      toast.success("Incident reported successfully!")
      setReportForm({ incidentType: "phishing", description: "", anonymous: false })
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to report incident")
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
        <h1 className="text-3xl font-bold mb-8">Cyber Safety Education</h1>

        <Tabs defaultValue="modules" className="space-y-4">
          <TabsList>
            <TabsTrigger value="modules">Learning Modules</TabsTrigger>
            <TabsTrigger value="simulations">Simulations</TabsTrigger>
            <TabsTrigger value="report">Report Incident</TabsTrigger>
          </TabsList>

          {/* Learning Modules */}
          <TabsContent value="modules" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.map((module) => {
                const Icon = module.icon
                return (
                  <Card
                    key={module.id}
                    className="hover:shadow-lg transition cursor-pointer"
                    onClick={() => setActiveModule(module.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Icon className="w-6 h-6 text-blue-600" />
                        <CardTitle>{module.title}</CardTitle>
                      </div>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {module.lessons.map((lesson) => (
                          <li key={lesson} className="text-sm text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                            {lesson}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full mt-4">Start Learning</Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Simulations */}
          <TabsContent value="simulations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Phishing Simulation</CardTitle>
                <CardDescription>Test your ability to spot phishing emails</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    This is a simulated phishing email. Can you spot what makes it suspicious?
                  </AlertDescription>
                </Alert>

                <div className="bg-white border rounded-lg p-4 space-y-3">
                  <div className="border-b pb-3">
                    <p className="text-sm font-semibold">From: support@paypa1.com</p>
                    <p className="text-sm font-semibold">Subject: Urgent: Verify Your Account</p>
                  </div>

                  <div className="text-sm space-y-2">
                    <p>Dear Valued Customer,</p>
                    <p>
                      We have detected unusual activity on your account. Please click the link below to verify your
                      identity immediately:
                    </p>
                    <p className="text-blue-600 underline cursor-pointer">Click here to verify account</p>
                    <p>If you don't verify within 24 hours, your account will be suspended.</p>
                    <p>
                      Best regards,
                      <br />
                      PayPal Security Team
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold">What's suspicious about this email?</p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      ✓ Sender email has typo (paypa1 instead of paypal)
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      ✓ Creates urgency with 24-hour deadline
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      ✓ Asks to click link instead of logging in directly
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      ✓ Generic greeting instead of your name
                    </Button>
                  </div>
                </div>

                <Button className="w-full">Try Another Simulation</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Report Incident */}
          <TabsContent value="report" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Report Cyber Incident</CardTitle>
                <CardDescription>Report phishing, scams, or other cyber threats</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReportSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Incident Type</label>
                    <select
                      value={reportForm.incidentType}
                      onChange={(e) => setReportForm((prev) => ({ ...prev, incidentType: e.target.value }))}
                      className="w-full border rounded-lg p-2"
                    >
                      <option value="phishing">Phishing Email</option>
                      <option value="scam">Online Scam</option>
                      <option value="malware">Malware/Virus</option>
                      <option value="harassment">Online Harassment</option>
                      <option value="fraud">Fraud</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={reportForm.description}
                      onChange={(e) => setReportForm((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe what happened..."
                      className="w-full border rounded-lg p-2 h-32"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={reportForm.anonymous}
                      onChange={(e) => setReportForm((prev) => ({ ...prev, anonymous: e.target.checked }))}
                      className="rounded"
                    />
                    <label htmlFor="anonymous" className="text-sm">
                      Report anonymously
                    </label>
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Report
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Reporting Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="font-semibold">National Cyber Crime Reporting Portal</p>
                  <p className="text-sm text-gray-600">www.cybercrime.gov.in</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="font-semibold">Local Police Cyber Cell</p>
                  <p className="text-sm text-gray-600">Contact your nearest police station</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="font-semibold">Bank Fraud Reporting</p>
                  <p className="text-sm text-gray-600">Contact your bank's customer service immediately</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
