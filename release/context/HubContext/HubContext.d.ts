import { Hub } from 'rune-hub';
export declare const HubContext: import("react").Context<Hub>;
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
export declare const HubProvider: import("react").Provider<Hub>;
