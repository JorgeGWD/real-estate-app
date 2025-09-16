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
        width={250}
        height={200}
      />
      <div className="property-card__content">
        <h2>{property.name}</h2>
        <p>{property.address}</p>
        <p>{formattedPrice}</p>
        <Link href={`/property/${property.id}`}>
          <button className="property-card__view-button">View Details</button>
        </Link>
      </div>
    </div>
  )
}