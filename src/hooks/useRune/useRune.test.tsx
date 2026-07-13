import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { get, set } from 'rune-hub'

import { useRune } from '.'

describe('useRune', () => {
  test('computation', () => {
    const name = () => 'Foo'
    const surname = () => 'Bar'
    const fullName = () => `${get(name)} ${get(surname)[0]}.`

    let isRendered = false

    const changeSurname = () => {
      set(surname, 'Baz')
    }

    const Button = () => {
      const value = useRune(fullName)

      isRendered = true

      return <button onClick={changeSurname}>{value}</button>
    }

    render(<Button />)

    expect(screen.queryByText('Foo B.')).toBeInTheDocument()
    expect(get(surname)).toBe('Bar')

    isRendered = false

    fireEvent.click(screen.queryByText('Foo B.')!)

    expect(get(surname)).toBe('Baz')
    expect(screen.queryByText('Foo B.')).toBeInTheDocument()
    expect(isRendered).toBe(false)
  })
})
