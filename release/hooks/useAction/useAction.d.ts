import type { Fn } from 'rune-hub';
/**
 * The hook automatically binds your action to context Hub, ensuring all Rune mutations
 * triggered inside the action are tracked within the same Hub instance.
 *
 * @template T - The action function type
 * @param action - The action function to bind to the Hub
 * @returns A stable callback that executes the action in the Hub context
 * @see {@link https://github.com/d8corp/rune-hub-react#useaction}
 *
 * @example
 * ```tsx
 * const count = () => 0
 * const increment = () => slot(count).value++
 *
 * function Counter () {
 *   const value = useRune(count)
 *   const inc = useAction(increment)
 *
 *   return <button onClick={inc}>Count: {value}</button>
 * }
 * ```
 */
export declare function useAction<T extends Fn>(action: T): T;
