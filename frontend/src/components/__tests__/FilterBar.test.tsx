import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FilterBar from '../FilterBar'

// Mock del módulo propertyService
jest.mock('../../services/propertyService', () => ({
  getProperties: jest.fn(() => Promise.resolve([
    { id: 1, name: 'House A', address: 'Address A', price: 100000 },
    { id: 2, name: 'House B', address: 'Address B', price: 200000 },
  ]))
}))

describe('FilterBar', () => {
  it('calls onFilter when inputs change and filter button is clicked', async () => {
    const mockOnFilter = jest.fn()
    render(<FilterBar onFilter={mockOnFilter} />)

    // Simula la escritura en los inputs
    const nameInput = screen.getByPlaceholderText('Name')
    const addressInput = screen.getByPlaceholderText('Address')
    const minPriceInput = screen.getByPlaceholderText('Min Price')
    const maxPriceInput = screen.getByPlaceholderText('Max Price')
    const filterButton = screen.getByRole('button', { name: /filter/i })

    await userEvent.type(nameInput, 'House')
    await userEvent.type(addressInput, 'Address')
    await userEvent.type(minPriceInput, '50000')
    await userEvent.type(maxPriceInput, '150000')

    // Click en el botón de filtrar
    await userEvent.click(filterButton)

    // Espera a que se llame la función onFilter
    await waitFor(() => {
      expect(mockOnFilter).toHaveBeenCalled()
      expect(mockOnFilter).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ name: 'House A' })
        ])
      )
    })
  })
})