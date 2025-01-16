import Header from '@/components/Header';
import '../styles/index.css';
import Footer from '@/components/Footer';
import Head from 'next/head';
//import '../styles/App.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Busca Imóveis - Imóveis de bancos em Portugal com condições diferenciadas - Casas com 0 de Entrada | buscaimoveis.pt</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="description" content="Encontre imóveis de bancos em Portugal com 0 entrada e taxas reduzidas. Moradias, apartamentos, terrenos, entre outros à venda em Lisboa, Porto, Braga e mais regiões. Simples e confiável! Melhor buscador de imóveis de bancos em Portugal. Contamos com mais de 2.000 imóveis cadastrados com condições imperdíveis." />        
      </Head>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
