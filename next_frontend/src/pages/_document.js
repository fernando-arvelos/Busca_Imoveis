import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js? client=ca-pub-3822292795194891" crossOrigin="anonymous"></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TYQVJKWQ7P"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TYQVJKWQ7P');
            `,
          }}
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
        <script type='text/javascript' src='//pl25552590.profitablecpmrate.com/6a/eb/de/6aebde97e97cf1681948650a320b5ca9.js'></script>
      </body>
    </Html>
  );
}