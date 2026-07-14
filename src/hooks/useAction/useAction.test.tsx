import '@testing-library/jest-dom'

import { render } from '@testing-library/react'
import React, { act } from 'react'
import { get, Hub, slot } from 'rune-hub'

import { useRune } from '../useRune'
import { useAction } from './useAction'

import { HubProvider } from '../../context'

describe('useAction', () => {
  it('should use hub from context', () => {
    const hub = new Hub()
    const count = () => 0
    const increment = () => slot(count).value++

    function Counter () {
      const value = useRune(count)
      const handleClick = useAction(increment)

      return <button onClick={handleClick}>Count: {value}</button>
    }

    const { container } = render(<HubProvider value={hub}><Counter /></HubProvider>)

    expect(container.innerHTML).toBe('<button>Count: 0</button>')

    act(() => {
      container.querySelector('button')!.click()
    })

    expect(container.innerHTML).toBe('<button>Count: 1</button>')

    expect(get(count)).toBe(0)
  })
})
