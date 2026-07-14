import type { Rune } from 'rune-hub';
/**
 * Subscribes to a Rune and returns its current value.
 *
 * Uses `useSyncExternalStore` for proper synchronization with React's rendering cycle.
 * Automatically subscribes to the Rune's slot and unsubscribes on unmount.
 *
 * @template T - The Rune type
 * @param rune - The Rune to subscribe to
 * @returns The current value of the Rune
 * @see {@link https://github.com/d8corp/rune-hub-react#userune}
 *
 * @example
 * ```tsx
 * const count = () => 0
 *
 * function Counter () {
 *   const value = useRune(count)
 *
 *   return <div>Count: {value}</div>
 * }
 * ```
 */
export declare function useRune<T extends Rune>(rune: T): ReturnType<T>;
