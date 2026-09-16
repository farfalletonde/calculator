import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, expect, test, vi } from 'vitest'
import { calculate } from './api/calculate'
import { Calculator } from './Calculator'

vi.mock('./api/calculate', () => ({
  calculate: vi.fn(),
}))

const mockCalculate = vi.mocked(calculate)

beforeEach(() => {
  mockCalculate.mockReset()
})

test('adds two numbers from the keypad', async () => {
  mockCalculate.mockResolvedValueOnce({ result: 5 })

  render(<Calculator />)

  fireEvent.click(screen.getByRole('button', { name: '2' }))
  fireEvent.click(screen.getByRole('button', { name: 'add' }))
  fireEvent.click(screen.getByRole('button', { name: '3' }))
  fireEvent.click(screen.getByRole('button', { name: 'equals' }))

  await waitFor(() => {
    expect(screen.getByLabelText('display')).toHaveTextContent('5')
  })
})

test('clear resets the display', () => {
  render(<Calculator />)

  fireEvent.click(screen.getByRole('button', { name: '7' }))
  fireEvent.click(screen.getByRole('button', { name: 'clear' }))

  expect(screen.getByLabelText('display')).toHaveTextContent('0')
})
