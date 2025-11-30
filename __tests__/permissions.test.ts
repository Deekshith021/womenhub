import { hasPermission } from "@/lib/auth"

describe("Role-based permissions", () => {
  it("should grant admin all permissions", () => {
    expect(hasPermission("admin", "create:courses")).toBe(true)
    expect(hasPermission("admin", "edit:own:courses")).toBe(true)
    expect(hasPermission("admin", "any_permission")).toBe(true)
  })

  it("should grant instructor course permissions", () => {
    expect(hasPermission("instructor", "create:courses")).toBe(true)
    expect(hasPermission("instructor", "edit:own:courses")).toBe(true)
    expect(hasPermission("instructor", "manage:orders")).toBe(false)
  })

  it("should grant seller marketplace permissions", () => {
    expect(hasPermission("seller", "create:products")).toBe(true)
    expect(hasPermission("seller", "manage:orders")).toBe(true)
    expect(hasPermission("seller", "create:courses")).toBe(false)
  })

  it("should grant student view permissions", () => {
    expect(hasPermission("student", "view:courses")).toBe(true)
    expect(hasPermission("student", "enroll:courses")).toBe(true)
    expect(hasPermission("student", "create:courses")).toBe(false)
  })
})
