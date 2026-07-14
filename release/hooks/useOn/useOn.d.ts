import type { Rune } from 'rune-hub';
/**
 * Activates a Rune effect without subscribing to its value.
 * The hook automatically subscribes to the Rune's slot on mount and unsubscribes on unmount.
 *
 * @param rune - The Rune to activate
 * @see {@link https://github.com/d8corp/rune-hub-react#useon}
 *
 * @example
 * ```tsx
 * const count = () => 0
 * const log = () => console.log(get(count))
 *
 * function Counter () {
 *   const value = useRune(count)
 *
 *   useOn(log)
 *
 *   return <div>Count: {value}</div>
 * }
 * ```
 */
export declare function useOn(rune: Rune): void;
