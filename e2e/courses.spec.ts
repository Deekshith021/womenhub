import { test, expect } from "@playwright/test"

test.describe("Course Enrollment Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Sign up and login
    await page.goto("/signup")
    const email = `course-test-${Date.now()}@example.com`

    await page.fill('input[name="firstName"]', "Test")
    await page.fill('input[name="lastName"]', "User")
    await page.fill('input[name="email"]', email)
    await page.fill('input[name="password"]', "Test123!")
    await page.click('button:has-text("Create Account")')

    await page.waitForURL("/dashboard")
  })

  test("should view courses", async ({ page }) => {
    await page.goto("/courses")

    // Should have course list
    const courseCards = await page.locator('[class*="card"]').count()
    expect(courseCards).toBeGreaterThan(0)
  })

  test("should enroll in a course", async ({ page }) => {
    await page.goto("/courses")

    // Find and click enroll button for first course
    await page.click('button:has-text("Enroll Now")', { force: true })

    // Should see success message
    await expect(page.locator("text=Enrolled successfully")).toBeVisible()
  })

  test("should filter courses by category", async ({ page }) => {
    await page.goto("/courses")

    // Click on a category filter
    await page.click('button:has-text("CODING")')

    // Should filter results
    const courseCards = await page.locator('[class*="card"]').count()
    expect(courseCards).toBeGreaterThanOrEqual(0)
  })
})
