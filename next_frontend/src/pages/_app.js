import Header from '@/components/Header';
import '../styles/index.css';
import Footer from '@/components/Footer';
import Head from 'next/head';
//import '../styles/App.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Busca Imóveis - Imóveis de bancos de Portugal com condições diferenciadas.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content="Melhor buscador de imóveis de bancos em Portugal. Contamos com mais de 2.000 imóveis cadastrados." />        
      </Head>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
