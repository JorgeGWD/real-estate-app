import { useState } from "react"
import { getProperties } from "../services/propertyService"
import { Property } from "../types/property"

interface FilterBarProps {
  onFilter: (data: Property[]) => void
}

export default function FilterBar({ onFilter }: FilterBarProps) {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFilter(): Promise<void> {
    setLoading(true)
    setError(null)
    try {
      const filters = {
        name: name.trim() || undefined,
        address: address.trim() || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined
      }

      const data = await getProperties(filters)
      onFilter(data)
    } catch (err) {
      console.error("Error filtering properties:", err)
      setError("Failed to fetch properties. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={e => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={e => setMaxPrice(e.target.value)}
      />
      <button onClick={handleFilter} disabled={loading}>
        {loading ? "Filtering..." : "Filter"}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  )
}