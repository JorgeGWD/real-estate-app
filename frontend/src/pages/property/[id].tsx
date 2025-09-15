import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getPropertyById } from "../../services/propertyService"
import { Property } from "../../types/property"
import Image from "next/image"

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

  return (
    <div>
      <h1>{property.name}</h1>
      <Image src={property.imageUrl} alt={property.name} width="400" height="300" />
      <p><strong>Address:</strong> {property.address}</p>
      <p><strong>Price:</strong> ${property.price}</p>
      <p><strong>Owner ID:</strong> {property.idOwner}</p>
    </div>
  )
}