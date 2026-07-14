'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
require('../../context/index.js');
var HubContext = require('../../context/HubContext/HubContext.js');

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
function useHub() {
    return react.useContext(HubContext.HubContext);
}

exports.useHub = useHub;
