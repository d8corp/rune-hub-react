<h1 align="center">
<img src="https://cdn.jsdelivr.net/gh/d8corp/rune-hub@main/logo.svg" width="80">
<br>
@rune-hub/react
</h1>

<p align="center"><b>RuneHub with React</b></p>

<div align="center">
  <a href="https://www.npmjs.com/package/@rune-hub/react" target="_blank">
    <img src="https://img.shields.io/npm/v/@rune-hub/react.svg" alt="rune-hub npm">
  </a>
  <a href="https://www.npmtrends.com/@rune-hub/react" target="_blank">
    <img src="https://img.shields.io/npm/dm/@rune-hub/react.svg" alt="rune-hub downloads">
  </a>
  <a href="https://github.com/d8corp/rune-hub-react/tree/main/release" target="_blank">
    <img src="https://packagephobia.com/badge?p=@rune-hub/react" alt="rune-hub install size">
  </a>
  <a href="https://www.typescriptlang.org" target="_blank">
    <img src="https://img.shields.io/npm/types/@rune-hub/react" alt="TypeScript">
  </a>
  <a href="https://github.com/d8corp/rune-hub-react/blob/main/LICENSE" target="_blank">
    <img src="https://img.shields.io/npm/l/@rune-hub/react" alt="rune-hub license">
  </a>
  <a href="https://github.com/d8corp/rune-hub-react/blob/main/CHANGELOG.md" target="_blank">
    <img src="https://img.shields.io/badge/Changelog-⋮-brightgreen" alt="rune-hub changelog">
  </a>
  <a href="https://d8corp.github.io/rune-hub-react/coverage/lcov-report" target="_blank">
    <img src="https://github.com/d8corp/rune-hub-react/actions/workflows/tests.yml/badge.svg" alt="rune-hub tests">
  </a>
  <a href="https://github.com/d8corp/rune-hub-react/issues" target="_blank">
    <img src="https://img.shields.io/github/issues-raw/d8corp/rune-hub-react" alt="Open issues">
  </a>
  <a href="https://github.com/d8corp/rune-hub-react/pulls" target="_blank">
    <img src="https://img.shields.io/github/issues-pr-raw/d8corp/rune-hub-react" alt="Pull requests">
  </a>
</div>
<br>

**Library for integrating [rune-hub](https://www.npmjs.com/package/rune-hub) with [React](https://www.npmjs.com/package/react).**
Provides utils for working with state management system.

Written in TypeScript and provides full type definitions out of the box.

[![stars](https://img.shields.io/github/stars/d8corp/rune-hub-react?style=social)](https://github.com/d8corp/rune-hub-react/stargazers)
[![watchers](https://img.shields.io/github/watchers/d8corp/rune-hub-react?style=social)](https://github.com/d8corp/rune-hub-react/watchers)

## Index

<sup>**[ [Install](#install) ]**</sup>  
<sup>**[ [Examples](#examples) ]** [Basic Counter](#basic-counter) • [Todo List with Undo/Redo](#todo-list-with-undoredo)</sup>  
<sup>**[ [API](#api) ]** [HubProvider](#hubprovider) • [useHub](#usehub) • [useAction](#useaction) • [useRune](#userune) • [useSlot](#useslot)</sup>  
<sup>**[ [Links](#links) ]**</sup>

## Install
###### [🏠︎](#index) / Install [↓](#examples)

**Requires [React 18+](https://www.npmjs.com/package/react) and [rune-hub 1.0+](https://www.npmjs.com/package/rune-hub).**

Use with any modern bundler (Vite, Webpack, Rollup, etc.) or framework (Next.js, Remix, etc.).

```shell
npm i rune-hub @rune-hub/react
```

## Examples
###### [🏠︎](#index) / Examples [↑](#install) [↓](#api)

<sup>[Basic Counter](#basic-counter) • [Todo List with Undo/Redo](#todo-list-with-undoredo)</sup>

### Basic Counter
###### [🏠︎](#index) / [Examples](#examples) / Basic Counter [↓](#todo-list-with-undoredo)

A simple counter demonstrating `useRune` and `useAction` working together.

```tsx
import { set, get } from 'rune-hub'
import { useRune } from '@rune-hub/react'

const count = () => 0
const increment = () => set(count, get(count) + 1)
const decrement = () => set(count, get(count) - 1)

function Counter () {
  const value = useRune(count)

  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{value}</span>
      <button onClick={increment}>+</button>
    </div>
  )
}
```

### Todo List with Undo/Redo
###### [🏠︎](#index) / [Examples](#examples) / Todo List with Undo/Redo [↑](#basic-counter)

A todo list showcasing rune-hub's command pattern with undo/redo capabilities.

```tsx
import { useState } from 'react'
import { get, set, update } from 'rune-hub'
import { useRune } from '@rune-hub/react'

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

  const handleSubmit = (e: any) => {
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
```

## API
###### [🏠︎](#index) / API [↑](#examples) [↓](#links)

<sup>[HubProvider](#hubprovider) • [useHub](#usehub) • [useAction](#useaction) • [useRune](#userune) • [useSlot](#useslot)</sup>

### HubProvider
###### [🏠︎](#index) / [API](#api) / HubProvider [↓](#usehub)

**Context provider for sharing a Hub instance across React components.**

The `HubProvider` wraps your component tree and makes a Hub instance available to all child components via `useHub` hook.

```tsx
import { Hub } from 'rune-hub'
import { HubProvider } from '@rune-hub/react'

const myHub = new Hub()

function App () {
  return (
    <HubProvider value={myHub}>
      <YourComponents />
    </HubProvider>
  )
}
```

If you don't provide a Hub, the default `Hub.root` will be used.

### useHub
###### [🏠︎](#index) / [API](#api) / useHub [↑](#hubprovider) [↓](#useaction)

**Returns the current Hub instance from context.**

Use this hook to access the Hub and execute commands manually.

```tsx
import { useHub } from '@rune-hub/react'
import { myCommand } from './commands'

function MyComponent () {
  const hub = useHub()

  const handleClick = () => {
    hub.use(myCommand)
  }

  return <button onClick={handleClick}>Execute Command</button>
}
```

### useAction
###### [🏠︎](#index) / [API](#api) / useAction [↑](#usehub) [↓](#userune)

**Wraps an action function to execute within the current Hub context.**

The hook automatically binds your action to the Hub, ensuring all state changes are tracked in custom hub.

```tsx
import { set, get } from 'rune-hub'
import { useRune, useAction } from '@rune-hub/react'

const count = () => 0
const increment = () => set(count, get(count) + 1)
const decrement = () => set(count, get(count) - 1)

function Counter () {
  const value = useRune(count)
  const inc = useAction(increment)
  const dec = useAction(decrement)

  return (
    <div>
      <button onClick={dec}>-</button>
      <span>{value}</span>
      <button onClick={inc}>+</button>
    </div>
  )
}
```

The returned function is memoized and stable across re-renders, making it safe to use in dependency arrays.

### useRune
###### [🏠︎](#index) / [API](#api) / useRune [↑](#useaction) [↓](#useslot)

**Subscribe to a Rune and trigger re-renders when its value changes.**

Uses `useSyncExternalStore` for proper synchronization with React's rendering cycle. Automatically subscribes to the Rune's slot and unsubscribes on unmount.

```tsx
import { rune } from 'rune-hub'
import { useRune } from '@rune-hub/react'

const $count = rune(0)

function Counter () {
  const count = useRune($count)

  return <div>Count: {count}</div>
}
```

### useSlot
###### [🏠︎](#index) / [API](#api) / useSlot [↑](#userune)

**Returns a Slot instance for a given Rune within the current Hub context.**

A Slot is a Hub-scoped reactive container that tracks changes to a Rune. Use this when you need direct access to the Slot API rather than just the value.

```tsx
import { useEffect } from 'react'
import { useSlot } from '@rune-hub/react'

const $count = () => 0

function Counter () {
  const slot = useSlot($count)

  useEffect(() => {
    // Access raw value without subscribing
    console.log(slot.raw)

    // Manually listen to changes
    return slot.on('change', () => {
      console.log('Count changed:', slot.raw)
    })
  }, [slot])

  return <div>Count: {slot.raw}</div>
}
```

The Slot instance is memoized and stable for the Rune and Hub combination.

## Links
###### [🏠︎](#index) / Links [↑](#examples)

- **Creator**: [Mike Lysikov](http://github.com/d8corp)
- **Source Code**: [GitHub](https://github.com/d8corp/rune-hub-react)
- **Repository**: [npm](https://www.npmjs.com/package/@rune-hub/react) • [npmx](https://npmx.dev/package/@rune-hub/react)
- **Utils**: [@rune-hub/utils](https://github.com/d8corp/rune-hub-utils)

**Contributions are welcome!** Please feel free to submit [issues](https://github.com/d8corp/rune-hub-react/issues) and [pull requests](https://github.com/d8corp/rune-hub-react/pulls).

[![issues](https://img.shields.io/github/issues-raw/d8corp/rune-hub-react)](https://github.com/d8corp/rune-hub-react/issues)
[![pulls](https://img.shields.io/github/issues-pr-raw/d8corp/rune-hub-react)](https://github.com/d8corp/rune-hub-react/pulls)
