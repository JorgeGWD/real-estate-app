import { useState } from "react"
import { filterProperties } from "../services/propertyService"
import { Property } from "../types/property"

export default function FilterBar({ onFilter }: { onFilter: (data: Property[]) => void }) {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  async function handleFilter() {
    const data = await filterProperties(name, address, minPrice, maxPrice)
    onFilter(data)
  }

  return (
    <div className="filter-bar">
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
      <input type="number" placeholder="Min Price" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
      <input type="number" placeholder="Max Price" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
      <button onClick={handleFilter}>Filter</button>
    </div>
  )
}