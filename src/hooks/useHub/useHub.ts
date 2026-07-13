import { useContext } from 'react'

import { HubContext } from '../../context'

export function useHub () {
  return useContext(HubContext)
}
