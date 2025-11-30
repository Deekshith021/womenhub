import { hashPassword, verifyPassword, createToken, verifyToken } from "@/lib/auth"

describe("Authentication", () => {
  describe("Password hashing", () => {
    it("should hash passwords", async () => {
      const password = "test123"
      const hash = await hashPassword(password)
      expect(hash).not.toBe(password)
    })

    it("should verify correct passwords", async () => {
      const password = "test123"
      const hash = await hashPassword(password)
      const verified = await verifyPassword(password, hash)
      expect(verified).toBe(true)
    })

    it("should reject incorrect passwords", async () => {
      const password = "test123"
      const wrongPassword = "wrong123"
      const hash = await hashPassword(password)
      const verified = await verifyPassword(wrongPassword, hash)
      expect(verified).toBe(false)
    })
  })

  describe("JWT tokens", () => {
    it("should create valid tokens", () => {
      const token = createToken("user123", "student")
      expect(token).toBeDefined()
      expect(typeof token).toBe("string")
    })

    it("should verify tokens", () => {
      const token = createToken("user123", "student")
      const decoded = verifyToken(token)
      expect(decoded.userId).toBe("user123")
      expect(decoded.role).toBe("student")
    })

    it("should reject invalid tokens", () => {
      expect(() => verifyToken("invalid_token")).toThrow()
    })
  })
})
