import { Property } from "../types/property"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/properties"

// ✅ GET /api/properties con filtros opcionales
export async function getProperties(filters?: {
  name?: string
  address?: string
  minPrice?: string
  maxPrice?: string
}): Promise<Property[]> {
  const query = new URLSearchParams()

  if (filters?.name) query.append("name", filters.name)
  if (filters?.address) query.append("address", filters.address)
  if (filters?.minPrice) query.append("minPrice", filters.minPrice)
  if (filters?.maxPrice) query.append("maxPrice", filters.maxPrice)

  const url = query.toString() ? `${API_URL}?${query.toString()}` : API_URL

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error("Failed to fetch properties")
  }
  return res.json()
}

// ✅ GET /api/properties/{id}
export async function getPropertyById(id: string): Promise<Property> {
  const res = await fetch(`${API_URL}/${id}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch property with id ${id}`)
  }
  return res.json()
}