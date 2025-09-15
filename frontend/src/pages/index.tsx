import Head from "next/head"
import { useEffect, useState } from "react"
import FilterBar from "../components/FilterBar"
import PropertyCard from "../components/PropertyCard"
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
    <>
      <Head>
        <title>Real Estate Properties | Find Your Home</title>
        <meta
          name="description"
          content="Browse real estate properties with filters by price, location, and name."
        />
        <meta name="keywords" content="real estate, properties, homes, buy house, rent house" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Open Graph tags opcionales para redes sociales */}
        <meta property="og:title" content="Real Estate Properties" />
        <meta
          property="og:description"
          content="Find your perfect home with our real estate listings."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:image" content="https://picsum.photos/1200/630" />
      </Head>

      <div>
        <h1>Real Estate Properties</h1>
        <FilterBar onFilter={setProperties} />
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && (
          <div className="property-list">
            {properties.length > 0 ? (
              properties.map((p) => <PropertyCard key={p.id} property={p} />)
            ) : (
              <p>No properties found.</p>
            )}
          </div>
        )}
      </div>
    </>
  )
}