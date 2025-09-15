import Link from "next/link"
import { Property } from "../types/property"

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="property-card">
      <img src={property.imageUrl} alt={property.name} width="200" />
      <h2>{property.name}</h2>
      <p>{property.address}</p>
      <p>${property.price}</p>
      <Link href={`/property/${property.id}`}>View Details</Link>
    </div>
  )
}