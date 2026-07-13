import { createContext } from 'react'
import { Hub } from 'rune-hub'

export const HubContext = createContext<Hub>(Hub.root)

export const HubProvider = HubContext.Provider
