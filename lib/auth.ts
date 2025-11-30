import jwt, { SignOptions, Secret } from "jsonwebtoken"
import bcryptjs from "bcryptjs"

const JWT_SECRET: Secret = process.env.JWT_SECRET || "dev-secret-key-change-in-production"

export type UserRole = "admin" | "instructor" | "seller" | "student" | "mentee" | "field_agent"

export async function hashPassword(password: string) {
  return bcryptjs.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string) {
  return bcryptjs.compare(password, hash)
}

export function createToken(
  userId: string,
  role: UserRole,
  expiresIn: SignOptions["expiresIn"] = "7d"
) {
  const payload = { userId, role }
  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions["expiresIn"], // help TS a bit
  }

  return jwt.sign(payload, JWT_SECRET, options)
}

export function verifyToken(token: string): { userId: string; role: UserRole } {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; role: UserRole }
  } catch (error) {
    throw new Error("Invalid token")
  }
}

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: ["*"],
  instructor: ["create:courses", "edit:own:courses", "view:enrollments", "view:analytics"],
  seller: ["create:products", "edit:own:products", "manage:orders", "view:sales:analytics"],
  student: ["view:courses", "enroll:courses", "view:progress", "download:certificates"],
  mentee: ["request:mentorship", "view:mentors", "book:sessions"],
  field_agent: ["register:users", "upload:data", "view:regional:analytics"],
}

export function hasPermission(role: UserRole, permission: string): boolean {
  if (ROLE_PERMISSIONS[role]?.includes("*")) return true
  return ROLE_PERMISSIONS[role]?.includes(permission) || false
}
