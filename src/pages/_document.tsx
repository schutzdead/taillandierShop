import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {

  const divStyle={
    overflow:"auto",
  }

  return (
    <Html lang="fr" style={divStyle}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
