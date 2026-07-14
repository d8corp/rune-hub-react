import { useContext } from 'react'

import { HubContext } from '../../context'

/**
 * Returns the current Hub instance from context.
 *
 * If no Hub is provided via HubProvider, returns the default `Hub.root` instance.
 *
 * @returns The current Hub instance
 * @see {@link https://github.com/d8corp/rune-hub-react#usehub}
 *
 * @example
 * ```tsx
 * function MyComponent () {
 *   const hub = useHub()
 *
 *   console.log(hub)
 *
 *   return <h1>Hello World!</h1>
 * }
 * ```
 */
export function useHub () {
  return useContext(HubContext)
}
