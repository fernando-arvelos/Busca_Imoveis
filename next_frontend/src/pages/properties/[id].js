import PropertyDetails from '@/components/PropertyDetails';
import { getPropertyById } from '@/services/propertiesApi';
import Head from 'next/head';

export default function Properties({ property, error }) {
  if (error || !property) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Imóvel não encontrado</h1>
        <p>{error || 'O imóvel que você está procurando não está mais disponível.'}</p>
        <a href="/">Voltar para a página inicial</a>
      </div>
    );
  }

  return (
    <>
    {/* Meta Tags Dinâmicas */}
    <Head>
        {/* Meta Tags Básicas */}
        <title>{property.natureza} - €{property.preçoVenda.toLocaleString()}</title>
        <meta name="description" content={property.descricao?.slice(0, 160) || 'Confira os detalhes deste imóvel.'} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={`${property.natureza} à venda em ${property.concelho}, ${property.distrito} - €${property.preçoVenda.toLocaleString()}`} />
        <meta property="og:description" content={property.descricao?.slice(0, 160) || 'Confira os detalhes deste imóvel.'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://buscaimoveis.pt/properties/${property.id}`} />
        <meta property="og:image" content={property.imagens?.[0] || '/default-image.jpg'} />
        <meta property="og:image:width" content="1500" />
        <meta property="og:image:height" content="1125" />
        <meta property="og:image:alt" content={`Imagem de ${property.natureza}`} />

      </Head>

      <main>
        <PropertyDetails property={property} />
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const data = await getPropertyById(id);

    if (!data) {
      return {
        props: { error: 'O imóvel não foi encontrado ou não está mais disponível.' },
      };
    }

    return {
      props: { property: data },
    };
  } catch (error) {
    console.error('Erro ao buscar detalhes do imóvel:', error);
    return {
      props: { error: 'Erro ao carregar os detalhes do imóvel.' },
    };
  }
}
