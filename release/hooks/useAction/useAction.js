'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var react = require('react');
require('../useHub/index.js');
var useHub = require('../useHub/useHub.js');

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
function useAction(action) {
    var hub = useHub.useHub();
    return react.useCallback((function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return hub.use(function () { return action.apply(void 0, tslib.__spreadArray([], tslib.__read(args), false)); });
    }), [hub, action]);
}

exports.useAction = useAction;
