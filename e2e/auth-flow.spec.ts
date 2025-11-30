import { test, expect } from "@playwright/test"

test.describe("Authentication Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("should navigate to login page", async ({ page }) => {
    await page.click('button:has-text("Login")')
    expect(page.url()).toContain("/login")
  })

  test("should navigate to signup page", async ({ page }) => {
    await page.click('button:has-text("Sign Up")')
    expect(page.url()).toContain("/signup")
  })

  test("should complete signup flow", async ({ page }) => {
    await page.goto("/signup")

    await page.fill('input[name="firstName"]', "Test")
    await page.fill('input[name="lastName"]', "User")
    await page.fill('input[name="email"]', `test-${Date.now()}@example.com`)
    await page.fill('input[name="password"]', "Test123!")

    await page.click('button:has-text("Create Account")')

    // Should redirect to dashboard after signup
    await page.waitForURL("/dashboard")
    expect(page.url()).toContain("/dashboard")
  })

  test("should complete login flow", async ({ page }) => {
    // First signup
    await page.goto("/signup")
    const email = `test-${Date.now()}@example.com`

    await page.fill('input[name="firstName"]', "Test")
    await page.fill('input[name="lastName"]', "User")
    await page.fill('input[name="email"]', email)
    await page.fill('input[name="password"]', "Test123!")
    await page.click('button:has-text("Create Account")')

    await page.waitForURL("/dashboard")

    // Logout
    await page.click('button:has-text("Logout")')
    await page.waitForURL("/")

    // Then login
    await page.goto("/login")
    await page.fill('input[name="email"]', email)
    await page.fill('input[name="password"]', "Test123!")
    await page.click('button:has-text("Login")')

    await page.waitForURL("/dashboard")
    expect(page.url()).toContain("/dashboard")
  })
})
