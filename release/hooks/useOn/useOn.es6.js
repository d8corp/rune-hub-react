import { useEffect } from 'react';
import '../useSlot/index.es6.js';
import { useSlot } from '../useSlot/useSlot.es6.js';

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
function useOn(rune) {
    var slot = useSlot(rune);
    useEffect(function () { return slot.on(); }, [slot]);
}

export { useOn };
