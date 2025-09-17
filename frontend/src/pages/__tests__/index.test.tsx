import { render, screen } from '@testing-library/react'
import Home from '../index'

// Mock del servicio
jest.mock('../../services/propertyService', () => ({
  getProperties: jest.fn(() =>
    Promise.resolve([
      { id: 1, name: 'House A', price: 100000, address: '123 Street', image: '/placeholder.png' }
    ])
  )
}))

describe('Home Page', () => {
  it('renders property list fetched from service', async () => {
    render(<Home />)
    const propertyName = await screen.findByText('House A')
    expect(propertyName).toBeInTheDocument()
  })
})