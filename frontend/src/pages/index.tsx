import { useEffect, useState } from "react"
import PropertyCard from "../components/PropertyCard"
import FilterBar from "../components/FilterBar"
import { getProperties } from "../services/propertyService"
import { Property } from "../types/property"

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function fetchProperties(filters?: {
    name?: string
    address?: string
    minPrice?: string
    maxPrice?: string
  }) {
    try {
      setLoading(true)
      setError(null)
      const data = await getProperties(filters)
      setProperties(data)
    } catch (err) {
      console.error(err)
      setError("Failed to load properties. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  return (
    <div>
      <h1>Real Estate Properties</h1>
      <FilterBar onFilter={setProperties} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div className="property-list">
          {properties.length > 0 ? (
            properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </div>
      )}
    </div>
  )
}