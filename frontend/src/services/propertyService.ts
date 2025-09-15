import { Property } from "../types/property"

const API_URL = "http://localhost:5000/api/properties"

export async function getProperties(): Promise<Property[]> {
  const res = await fetch(API_URL)
  if (!res.ok) {
    throw new Error("Failed to fetch properties")
  }
  return res.json()
}

export async function getPropertyById(id: string): Promise<Property> {
  const res = await fetch(`${API_URL}/${id}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch property with id ${id}`)
  }
  return res.json()
}

export async function filterProperties(
  name?: string,
  address?: string,
  minPrice?: string,
  maxPrice?: string
): Promise<Property[]> {
  const query = new URLSearchParams()
  if (name) query.append("name", name)
  if (address) query.append("address", address)
  if (minPrice) query.append("minPrice", minPrice)
  if (maxPrice) query.append("maxPrice", maxPrice)

  const res = await fetch(`${API_URL}?${query.toString()}`)
  if (!res.ok) {
    throw new Error("Failed to filter properties")
  }
  return res.json()
}