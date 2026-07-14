import '@testing-library/jest-dom'

import { fireEvent, render } from '@testing-library/react'
import React, { act, useState } from 'react'
import { get, set, update } from 'rune-hub'

import { useRune } from '.'

describe('Examples', () => {
  test('Aside Menu', () => {
    const isShow = () => false

    const toggle = () => {
      set(isShow, !get(isShow))
    }

    const AsideMenuButton = () => {
      return <button onClick={toggle} />
    }

    const AsideMenu = () => {
      const show = useRune(isShow)

      return show ? <div>Aside Menu</div> : null
    }

    const { container } = render(
      <>
        <AsideMenuButton />
        <AsideMenu />
      </>,
    )

    expect(container.innerHTML).toBe('<button></button>')

    act(() => {
      container.querySelector('button')!.click()
    })

    expect(container.innerHTML).toBe('<button></button><div>Aside Menu</div>')

    act(() => {
      container.querySelector('button')!.click()
    })

    expect(container.innerHTML).toBe('<button></button>')
  })

  test('Todo List', () => {
    interface Todo {
      id: number
      text: string
      done: boolean
    }

    const $todos = (): Todo[] => []
    let nextId = 1

    const addTodo = (text: string) => {
      get($todos).push({ id: nextId++, text, done: false })
      update($todos)
    }

    const toggleTodo = (todoId: number) => {
      set($todos, get($todos).map(todo =>
        todoId === todo.id ? { ...todo, done: !todo.done } : todo,
      ))
    }

    function TodoList () {
      const todos = useRune($todos)
      const [text, setText] = useState('')

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (text.trim()) {
          addTodo(text.trim())
          setText('')
        }
      }

      return (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder='What needs to be done?'
            />
            <button type='submit'>Add</button>
          </form>
          <ul>
            {todos.map(({ id, done, text }) => (
              <li
                key={id}
                onClick={() => toggleTodo(id)}
                style={{ textDecoration: done ? 'line-through' : 'none' }}
              >
                {text}
              </li>
            ))}
          </ul>
        </div>
      )
    }

    const { container } = render(<TodoList />)

    expect(container.querySelectorAll('li').length).toBe(0)

    const input = container.querySelector('input')

    fireEvent.change(input!, { target: { value: 'Buy milk' } })
    fireEvent.submit(container.querySelector('form')!)

    expect(container.querySelectorAll('li').length).toBe(1)
    expect(container.querySelector('li')?.textContent).toBe('Buy milk')
    expect(container.querySelector('li')?.style.textDecoration).toBe('none')

    act(() => {
      container.querySelector('li')?.click()
    })

    expect(container.querySelector('li')?.style.textDecoration).toBe('line-through')

    act(() => {
      container.querySelector('li')?.click()
    })

    expect(container.querySelector('li')?.style.textDecoration).toBe('none')
  })

  test('Effect', () => {
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

      useRune(effect)
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
