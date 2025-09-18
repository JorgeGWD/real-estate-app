import { render, screen } from '@testing-library/react'
import PropertyCard from '../../src/components/PropertyCard'
import { Property } from '../../src/types/property'

describe('PropertyCard', () => {
  const mockProperty: Property = {
    id: '123',
    idOwner: '1',
    name: 'House A',
    address: 'Street 1',
    price: 100000,
    imageUrl: '/placeholder.png'
  }

  it('renders property details correctly', () => {
    render(<PropertyCard property={mockProperty} />)

    expect(screen.getByText('House A')).toBeInTheDocument()
    expect(screen.getByText('Street 1')).toBeInTheDocument()
    expect(screen.getByText('$100,000')).toBeInTheDocument()
    const img = screen.getByRole('img') as HTMLImageElement
    expect(img.src).toContain('/placeholder.png')
  })
})