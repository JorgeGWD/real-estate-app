import { useEffect, useState } from "react"
import PropertyCard from "../components/PropertyCard"
import FilterBar from "../components/FilterBar"
import { getProperties } from "../services/propertyService"
import { Property } from "../types/property"

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const data = await getProperties()
      setProperties(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1>Real Estate Properties</h1>
      <FilterBar onFilter={setProperties} />
      {loading ? <p>Loading...</p> : (
        <div className="property-list">
          {properties.map(p => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  )
}