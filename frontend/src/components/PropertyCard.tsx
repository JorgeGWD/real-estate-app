import Link from "next/link"
import { Property } from "../types/property"
import Image from "next/image"

export default function PropertyCard({ property }: { property: Property }) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(property.price)

  return (
    <div className="property-card">
      <Image
        src={property.imageUrl}
        alt={`Image of ${property.name}`}
        width={200}
        height={150}
      />
      <h2>{property.name}</h2>
      <p>{property.address}</p>
      <p>{formattedPrice}</p>
      <Link href={`/property/${property.id}`}>View Details</Link>
    </div>
  )
}