import { useMemo } from 'react';
import { slot } from 'rune-hub';
import '../useHub/index.es6.js';
import { useHub } from '../useHub/useHub.es6.js';

/**
 * Returns a Slot instance for a given Rune within the current Hub context.
 *
 * A Slot is a Hub-scoped reactive container that tracks changes to a Rune.
 * The Slot instance is memoized and stable for the Rune and Hub combination.
 *
 * @template T - The Rune value type
 * @param rune - The Rune to get a Slot for
 * @returns A memoized Slot instance for the Rune
 * @see {@link https://github.com/d8corp/rune-hub-react#useslot}
 *
 * @example
 * ```tsx
 * const count = () => 0
 *
 * function Counter () {
 *   const slot = useSlot(count)
 *
 *   useEffect(() => {
 *     // Access raw value without subscribing
 *     console.log(slot.raw)
 *
 *     // Manually listen to changes
 *     return slot.on('change', () => {
 *       console.log('Count changed:', slot.raw)
 *     })
 *   }, [slot])
 *
 *   return <div>Count: {slot.raw}</div>
 * }
 * ```
 */
function useSlot(rune) {
    var hub = useHub();
    return useMemo(function () { return hub.use(function () { return slot(rune); }); }, [rune, hub]);
}

export { useSlot };
