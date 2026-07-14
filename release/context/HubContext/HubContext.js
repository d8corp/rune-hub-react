'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var runeHub = require('rune-hub');

var HubContext = react.createContext(runeHub.Hub.root);
/**
 * Wraps your component tree and makes a Hub instance available to all child components.
 *
 * If you don't provide a Hub via the `value` prop, the default `Hub.root` will be used.
 * All hooks like `useRune`, `useAction`, and `useHub` will use the Hub from this context.
 *
 * @see {@link https://github.com/d8corp/rune-hub-react#hubprovider}
 *
 * @example
 * ```tsx
 * import { Hub } from 'rune-hub'
 * import { HubProvider } from '@rune-hub/react'
 *
 * const myHub = new Hub()
 *
 * function App () {
 *   return (
 *     <HubProvider value={myHub}>
 *       <YourComponents />
 *     </HubProvider>
 *   )
 * }
 * ```
 */
var HubProvider = HubContext.Provider;

exports.HubContext = HubContext;
exports.HubProvider = HubProvider;
