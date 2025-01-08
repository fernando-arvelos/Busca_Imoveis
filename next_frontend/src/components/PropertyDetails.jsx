import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const PropertyDetails = ({ property, error }) => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const handleShare = async () => {
    const currentUrl = `${window.location.origin}${location.pathname}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: property?.natureza || "Detalhes do Imóvel",
          text: `Confira este imóvel: ${property?.natureza || "Imóvel"}`,
          url: currentUrl,
        });
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    } else {
      navigator.clipboard.writeText(currentUrl);
      alert('Link copiado para a área de transferência.');
    }
  };

  const formatWhatsappMessage = () => {
    if (typeof window === 'undefined') {
      return '';
    }
    
    const propertyUrl = `${window.location.origin}/properties/${property.id}`;
    const encodedMessage = encodeURIComponent(`
    Confira este imóvel:
   ${propertyUrl}
  `);
    return `https://wa.me/?text=${encodedMessage}`;
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!property) {
    return <p>Imóvel não encontrado.</p>;
  }

  return (
    <div className="property-details flex justify-center">

      <div className="container px-3 md:px-0 py-6">
        {/* Botão de Voltar */}
        <button onClick={handleBack} className="mb-4 py-2 px-4 bg-blue-500 text-white rounded">
          Voltar
        </button>
        
      {property ? (
        <div className="container">
          {/* Título e Preço */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{property.natureza}</h2>
            <p className="text-3xl font-bold text-pink-600">€{property.preçoVenda.toLocaleString()}</p>
          </div>

          {/* Botão de Compartilhar */}
          <div className="mb-6">
            <button 
              onClick={handleShare} 
              className="bg-blue-500 text-white py-2 px-4 rounded mr-4"
            >
              Compartilhar
            </button>

            {/* Link para WhatsApp */}
            <a
                href={formatWhatsappMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Enviar no WhatsApp
              </a>
          </div>

          {/* Informações Principais */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-500">Ref: {property.referência}</p>
          </div>

          {/* Detalhes do Imóvel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div>
              <p><strong>Tipologia:</strong> {property.tipologia}</p>
              <p><strong>Localização:</strong> {property.distrito} / {property.concelho}</p>
              <p><strong>Freguesia:</strong> {property.freguesia}</p>
              <p><strong>Área:</strong> {property.area} m²</p>
              <p><strong>Ano:</strong> {property.ano}</p>
            </div>
            <div>
            <p dangerouslySetInnerHTML={{ __html: property.descricao }}></p>
            </div>
          </div>

          {/* Galeria de Imagens */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Fotos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {property.imagens && property.imagens.length > 0 ? (
                property.imagens.map((imagem, index) => (
                  <Image key={index} src={imagem} alt={`Imagem ${index + 1}`} className="w-full h-auto object-cover" />
                ))
              ) : (
                <p>Nenhuma imagem disponível.</p>
              )}
            </div>
          </div>

          {/* Banco e Contato */}
          <div className="bg-gray-100 p-4 rounded">
            <p><strong>Banco responsável:</strong> {property.banco}</p>
            <p><strong>Contacto:</strong> {property.contacto}</p>
            <p><strong>Email:</strong> {property.email}</p>
            <p><strong>Telefone:</strong> {property.telefone}</p>
          </div>
        </div>
      ) : (
        <p>Imóvel não encontrado.</p>
      )}
    </div>
  </div>
  );
};

export default PropertyDetails;