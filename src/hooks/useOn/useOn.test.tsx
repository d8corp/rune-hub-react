import '@testing-library/jest-dom'

import { render } from '@testing-library/react'
import React, { act } from 'react'
import { get, set } from 'rune-hub'

import { useRune } from '../useRune'
import { useOn } from './useOn'

describe('useOn', () => {
  it('should turn on and turn off an effect', () => {
    const log: number[] = []
    const count = () => 0
    const show = () => true

    const increase = () => {
      set(count, get(count) + 1)
    }

    const effect = () => {
      log.push(get(count))
    }

    function Counter () {
      const value = useRune(count)
      // Subscribe to count changes

      useOn(effect)
      // Activate log effect

      return <button onClick={increase}>Count: {value}</button>
    }

    function App () {
      const value = useRune(show)

      return value ? <Counter /> : null
    }

    const { container } = render(<App />)

    expect(container.innerHTML).toBe('<button>Count: 0</button>')
    expect(log).toEqual([0])

    act(() => {
      container.querySelector('button')!.click()
    })

    expect(container.innerHTML).toBe('<button>Count: 1</button>')
    expect(log).toEqual([0, 1])

    act(() => {
      container.querySelector('button')!.click()
    })

    expect(container.innerHTML).toBe('<button>Count: 2</button>')
    expect(log).toEqual([0, 1, 2])

    act(() => {
      set(show, false)
    })

    act(() => {
      increase()
    })

    expect(container.innerHTML).toBe('')
    expect(log).toEqual([0, 1, 2])
  })
})
