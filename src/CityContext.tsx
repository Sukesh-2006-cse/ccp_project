import { createContext } from 'react'
export const CityContext = createContext({ city: 'Hyderabad', setCity: (_city: string) => {} })
