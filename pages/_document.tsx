import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/static/pokeball.svg" />
      </Head>
      <body className="bg-gradient-to-r from-slate-800 to-black text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
