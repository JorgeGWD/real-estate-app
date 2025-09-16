import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getPropertyById } from "../../services/propertyService"
import { Property } from "../../types/property"
import Image from "next/image"
import Head from "next/head"

export default function PropertyDetail() {
  const router = useRouter()
  const { id } = router.query
  const [property, setProperty] = useState<Property | null>(null)

  useEffect(() => {
    if (id) {
      getPropertyById(id as string).then(setProperty)
    }
  }, [id])

  if (!property) return <p>Loading...</p>

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(property.price)

  return (
    <>
      <Head>
        <title>{property.name} | Real Estate Properties</title>
        <meta name="description" content={`Details for ${property.name}, located at ${property.address}.`} />
        <meta name="keywords" content="real estate, property, home, house, property details" />
        <meta property="og:title" content={property.name} />
        <meta property="og:description" content={`Details for ${property.name}, located at ${property.address}.`} />
        <meta property="og:image" content={property.imageUrl} />
      </Head>

      <div className="property-details container">
        <h1>{property.name}</h1>
        <Image
          src={property.imageUrl}
          alt={property.name}
          width={400}
          height={300}
          unoptimized
        />
        <div className="property-details__content">
          <p><strong>Address:</strong> {property.address}</p>
          <p><strong>Price:</strong> {formattedPrice}</p>
          <p><strong>Owner ID:</strong> {property.idOwner}</p>
        </div>
      </div>
    </>
  )
}