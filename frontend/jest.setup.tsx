import '@testing-library/jest-dom'
import React, { FC } from 'react'

// Mock de next/image para tests
jest.mock('next/image', () => {
  const NextImageMock: FC<{ src?: string; alt?: string }> = ({ src = '', alt = '' }) => {
    if (!src) return <span>{alt}</span> // evita error con src vacío
    return <img src={src} alt={alt} />
  }
  return {
    __esModule: true,
    default: NextImageMock,
  }
})