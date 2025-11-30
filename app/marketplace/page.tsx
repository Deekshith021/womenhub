"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Plus } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"

interface Product {
  id?: string          // allow optional id
  _id?: string         // allow MongoDB _id
  title: string
  description: string
  price: number
  category: string
  inventory: number
  sellerId: string
}

export default function MarketplacePage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/marketplace/products")
        setProducts(response.data.products || [])
      } catch (error) {
        toast.error("Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleCheckout = async (productId: string) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/login")
        return
      }

      await axios.post(
        "/api/marketplace/checkout",
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      toast.success("Order created! (Test mode - no real payment)")
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Checkout failed")
    }
  }

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">WomenSkillHub</div>
          <div className="flex gap-4">
            {user?.role === "seller" && (
              <Button onClick={() => router.push("/marketplace/create")}>
                <Plus className="w-4 h-4 mr-2" />
                List Product
              </Button>
            )}
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Women's Marketplace</h1>

        {/* Search */}
        <div className="mb-8">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p>Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No products available yet.
            </p>
          ) : (
            filteredProducts.map((product) => {
              const productId = product.id || product._id
              if (!productId) return null

              return (
                <Card key={productId} className="hover:shadow-lg transition">
                  <CardHeader>
                    <CardTitle>{product.title}</CardTitle>
                    <CardDescription>{product.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold">${product.price}</span>
                        <p className="text-xs text-gray-500">
                          {product.inventory} in stock
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleCheckout(productId)}
                        disabled={product.inventory === 0}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Buy
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
