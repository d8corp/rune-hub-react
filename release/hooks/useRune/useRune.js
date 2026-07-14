'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
require('../useSlot/index.js');
var useSlot = require('../useSlot/useSlot.js');

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
function useRune(rune) {
    var slot = useSlot.useSlot(rune);
    var stop = react.useMemo(function () { return slot.on(); }, [slot]);
    react.useEffect(function () { return stop; }, [stop]);
    var subscribe = react.useCallback(function (callback) {
        return slot.on('change', callback);
    }, [slot]);
    return react.useSyncExternalStore(subscribe, function () { return slot.raw; });
}

exports.useRune = useRune;
