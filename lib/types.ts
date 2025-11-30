export interface User {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  role: "admin" | "instructor" | "seller" | "student" | "mentee" | "field_agent"
  language: string
  isVerified: boolean
  createdAt: number
  updatedAt: number
}

export interface Course {
  id: string
  title: string
  description: string
  category: string
  instructorId: string
  image?: string
  status: "draft" | "pending" | "approved" | "rejected"
  price: number
  duration: number
  createdAt: number
  updatedAt: number
}

export interface Lesson {
  id: string
  courseId: string
  title: string
  content: string
  videoUrl?: string
  audioUrl?: string
  pdfUrl?: string
  order: number
  createdAt: number
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  progress: number
  status: "active" | "completed"
  enrolledAt: number
  completedAt?: number
}

export interface Product {
  id: string
  sellerId: string
  title: string
  description: string
  price: number
  category: string
  image?: string
  variants: string
  inventory: number
  status: "draft" | "pending" | "approved" | "rejected"
  createdAt: number
}

export interface Order {
  id: string
  buyerId: string
  sellerId: string
  productId: string
  quantity: number
  totalPrice: number
  status: "pending" | "paid" | "shipped" | "delivered"
  paymentId?: string
  createdAt: number
}

export interface Budget {
  id: string
  userId: string
  month: string
  income: number
  expenses: Record<string, number>
  savings: number
  createdAt: number
}

export interface MentorshipRequest {
  id: string
  menteeId: string
  mentorId: string
  skillAreas: string[]
  status: "pending" | "accepted" | "rejected" | "completed"
  createdAt: number
}

export interface CyberIncident {
  id: string
  userId: string
  incidentType: string
  description: string
  status: "reported" | "investigating" | "resolved"
  anonymous: boolean
  createdAt: number
}

export interface GovernmentScheme {
  id: string
  name: string
  description: string
  eligibilityJson: string
  applicationUrl: string
  category: string
  createdAt: number
}
