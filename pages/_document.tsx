import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {

  return (
    <Html lang="en">
      <Head><link rel="icon" href="/static/pokemon_icon.svg" /></Head>
      <body className='bg-gradient-to-r from-slate-800 to-cyan-900 text-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}





