import Head from 'next/head'
import { Header } from '../../components/Header/header'
import { Main } from '../../components/Main/main'
import { Footer } from '../../components/Footer/footer'
import React from 'react'

export default function Home() {

  return (
    <>
      <Head>
        <title>Boucherie Taillandier</title>
        <meta name="description" content="boucherie taillandier" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/boucherie.png" />
      </Head>
      
      <Header />
      <Main />
      <Footer />
    </>
  )
}
