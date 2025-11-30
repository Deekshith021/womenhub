"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import axios from "axios"
import { toast } from "sonner"

export default function FinancialPage() {
  const router = useRouter()

  // States for database storage
  const [incomeValue, setIncomeValue] = useState("")
  const [expenseValue, setExpenseValue] = useState("")
  const [savingsValue, setSavingsValue] = useState("")
  const [goals, setGoals] = useState<any[]>([])
  const [goalName, setGoalName] = useState("")
  const [goalAmount, setGoalAmount] = useState("")
  const [userFinancialData, setUserFinancialData] = useState<any>(null)

  // EMI states
  const [emiPrincipal, setEmiPrincipal] = useState(100000)
  const [emiRate, setEmiRate] = useState(10)
  const [emiMonths, setEmiMonths] = useState(60)

  useEffect(() => {
    fetchFinancialData()
  }, [])

  // Fetch saved financial data
  const fetchFinancialData = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) return

      const res = await axios.get("/api/financial/get", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.data?.data) {
        const data = res.data.data
        setUserFinancialData(data)
        setGoals(data.goals || [])
        // pre-fill inputs with saved values
        setIncomeValue(data.income != null ? String(data.income) : "")
        setExpenseValue(data.expenses != null ? String(data.expenses) : "")
        setSavingsValue(data.savings != null ? String(data.savings) : "")
      }
    } catch (err) {
      console.log("Error fetching finance:", err)
    }
  }

  // Save income/expense/savings
  const saveBudget = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) return router.push("/login")

      const payload = {
        income: Number(incomeValue || 0),
        expenses: Number(expenseValue || 0),
        savings: Number(savingsValue || 0),
        // categories can be added later
        categories: {},
      }

      await axios.post("/api/financial/update", payload, {
        headers: { Authorization: `Bearer ${token}` },
      })

      toast.success("Budget saved successfully!")
      fetchFinancialData()
    } catch (err) {
      toast.error("Failed to save budget")
    }
  }

  // Add new savings goal
  const addGoal = async () => {
    if (!goalName || !goalAmount) return toast.error("Fill all fields")

    try {
      const token = localStorage.getItem("token")
      if (!token) return router.push("/login")

      await axios.post(
        "/api/financial/goals",
        {
          name: goalName,
          target: Number(goalAmount),
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      setGoalName("")
      setGoalAmount("")
      toast.success("Goal added")
      fetchFinancialData()
    } catch (err) {
      toast.error("Failed to add goal")
    }
  }

  // Real history for charts
  const history = userFinancialData?.history || []

  // Real expense categories for pie chart (last month’s record)
  const pieCategories =
    history.length > 0 ? history[history.length - 1]?.categories || {} : {}

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

  // EMI Calculator
  const calculateEMI = () => {
    const monthlyRate = emiRate / 12 / 100
    const emi =
      (emiPrincipal * monthlyRate * Math.pow(1 + monthlyRate, emiMonths)) /
      (Math.pow(1 + monthlyRate, emiMonths) - 1)
    return emi.toFixed(2)
  }

  const totalPayment = (Number.parseFloat(calculateEMI()) * emiMonths).toFixed(2)
  const totalInterest = (Number.parseFloat(totalPayment) - emiPrincipal).toFixed(2)

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

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Financial Literacy & Budgeting</h1>

        <Tabs defaultValue="budget" className="space-y-4">
          <TabsList>
            <TabsTrigger value="budget">Budget Tracker</TabsTrigger>
            <TabsTrigger value="goals">Savings Goals</TabsTrigger>
            <TabsTrigger value="loans">Loan Schemes</TabsTrigger>
            <TabsTrigger value="emi">EMI Calculator</TabsTrigger>
          </TabsList>

          {/* BUDGET TRACKER */}
          <TabsContent value="budget" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Update Monthly Budget</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Monthly Income (₹)</Label>
                  <Input
                    value={incomeValue}
                    onChange={(e) => setIncomeValue(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Total Expenses (₹)</Label>
                  <Input
                    value={expenseValue}
                    onChange={(e) => setExpenseValue(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Total Savings (₹)</Label>
                  <Input
                    value={savingsValue}
                    onChange={(e) => setSavingsValue(e.target.value)}
                  />
                </div>

                <Button onClick={saveBudget}>Save Budget</Button>
              </CardContent>
            </Card>

            {/* Summary cards: ONLY DB values (or 0) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    ₹{userFinancialData?.income ?? 0}
                  </div>
                  <p className="text-xs text-gray-500">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    ₹{userFinancialData?.expenses ?? 0}
                  </div>
                  <p className="text-xs text-gray-500">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    ₹{userFinancialData?.savings ?? 0}
                  </div>
                  <p className="text-xs text-gray-500">This month</p>
                </CardContent>
              </Card>
            </div>

            {/* Real-data Line Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Income vs Expenses Trend</CardTitle>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    No financial history available yet.
                  </p>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={history}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="income" stroke="#3b82f6" />
                      <Line type="monotone" dataKey="expenses" stroke="#ef4444" />
                      <Line type="monotone" dataKey="savings" stroke="#10b981" />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* Real-data Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                {Object.keys(pieCategories).length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    No category-wise expense data yet.
                  </p>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={Object.entries(pieCategories).map(([name, value]) => ({
                          name,
                          value,
                        }))}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ₹${value}`}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {Object.keys(pieCategories).map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* SAVINGS GOALS */}
          <TabsContent value="goals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add Savings Goal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  placeholder="Goal name"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                />
                <Input
                  placeholder="Target Amount"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(e.target.value)}
                />
                <Button onClick={addGoal} className="w-full">
                  Add Goal
                </Button>
              </CardContent>
            </Card>

            {/* Display existing goals */}
            <Card>
              <CardHeader>
                <CardTitle>My Savings Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {goals.length === 0 ? (
                  <p className="text-sm text-gray-500">No goals added yet.</p>
                ) : (
                  goals.map((goal) => (
                    <div key={goal._id} className="space-y-2 border-b pb-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{goal.name}</span>
                        <span className="text-sm text-gray-600">₹{goal.target}</span>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* LOAN SCHEMES (restored) */}
          <TabsContent value="loans" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Government Loan Schemes</CardTitle>
                <CardDescription>
                  Explore available schemes for women entrepreneurs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    name: "Prime Minister MUDRA Yojana",
                    description: "Microfinance scheme for small business loans",
                    maxAmount: "₹10 Lakhs",
                    interest: "8-12%",
                  },
                  {
                    name: "Mahila Samman Savings Certificate",
                    description: "Special savings scheme for women",
                    maxAmount: "₹2 Lakhs",
                    interest: "7.5%",
                  },
                  {
                    name: "Pradhan Mantri Ujjwala Yojana",
                    description: "LPG connection scheme for below-poverty-line families",
                    maxAmount: "Free Connection",
                    interest: "N/A",
                  },
                ].map((scheme) => (
                  <Card key={scheme.name} className="border">
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-2">{scheme.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{scheme.description}</p>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Max Amount</p>
                          <p className="font-semibold">{scheme.maxAmount}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Interest Rate</p>
                          <p className="font-semibold">{scheme.interest}</p>
                        </div>
                      </div>
                      <Button size="sm" className="w-full">
                        Check Eligibility
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* EMI CALCULATOR (restored) */}
          <TabsContent value="emi" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>EMI Calculator</CardTitle>
                <CardDescription>Calculate your monthly loan payment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="principal">Loan Amount (₹)</Label>
                    <Input
                      id="principal"
                      type="number"
                      value={emiPrincipal}
                      onChange={(e) => setEmiPrincipal(Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="rate">Interest Rate (% per annum)</Label>
                    <Input
                      id="rate"
                      type="number"
                      step="0.1"
                      value={emiRate}
                      onChange={(e) => setEmiRate(Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="months">Loan Duration (Months)</Label>
                    <Input
                      id="months"
                      type="number"
                      value={emiMonths}
                      onChange={(e) => setEmiMonths(Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly EMI</span>
                    <span className="font-bold text-lg">₹{calculateEMI()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Payment</span>
                    <span className="font-bold">₹{totalPayment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Interest</span>
                    <span className="font-bold text-orange-600">₹{totalInterest}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
