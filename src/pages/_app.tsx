import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import React from 'react';
import { cartArticle } from '../../components/type';

export type myContext = {
  cart:cartArticle[],
  setCart:(yourCard: cartArticle[])=>void 
}

export const UserContext = React.createContext<myContext>({} as myContext);

export default function App({ Component, pageProps }: AppProps) {
  
  const [yourCard, setYourCard] = useState<cartArticle[]>([]) 

  return (
  <UserContext.Provider value={{cart:yourCard, setCart:setYourCard}}>
    <Component {...pageProps} />
  </UserContext.Provider>
  )
}
