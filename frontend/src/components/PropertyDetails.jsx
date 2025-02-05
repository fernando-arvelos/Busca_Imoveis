import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyById } from "../services/propertiesApi";
import useFavorites from "../hooks/useFavorites";
import { useNavigate, useLocation } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams(); // pega o id do imóvel da URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, toggleFavorite } = useFavorites();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchProperty = async (id) => {
      try {
        setLoading(true); // liga o loading
        const data = await getPropertyById(id); // busca o imóvel pelo id
        setProperty(data); // atualiza o estado com o imóvel        
      } catch (error) {
        setError('Erro ao buscar detalhes do imóvel.', error);
      } finally {
        setLoading(false); // desliga o loading
      }
    };

    searchProperty(id);
  }, [id]); 

  useEffect(() => {
    if (property) {
      // Atualizar o título da página
      document.title = `${property.natureza} - €${property.preçoVenda.toLocaleString()}`;

      // Atualizar as meta tags
      const metaTitle = document.querySelector("meta[property='og:title']");
      if (metaTitle) {
        metaTitle.setAttribute("content", `${property.natureza} - €${property.preçoVenda.toLocaleString()}`);
      } else {
        const metaTitleElement = document.createElement("meta");
        metaTitleElement.setAttribute("property", "og:title");
        metaTitleElement.setAttribute("content", `${property.natureza} - €${property.preçoVenda.toLocaleString()}`);
        document.head.appendChild(metaTitleElement);
      }

      const metaDescription = document.querySelector("meta[property='og:description']");
      if (metaDescription) {
        metaDescription.setAttribute("content", `Confira este imóvel em ${property.distrito} / ${property.concelho}, com área de ${property.area} m², por €${property.preçoVenda.toLocaleString()}.`);
      } else {
        const metaDescriptionElement = document.createElement("meta");
        metaDescriptionElement.setAttribute("property", "og:description");
        metaDescriptionElement.setAttribute("content", `Confira este imóvel em ${property.distrito} / ${property.concelho}, com área de ${property.area} m², por €${property.preçoVenda.toLocaleString()}.`);
        document.head.appendChild(metaDescriptionElement);
      }

      const metaImage = document.querySelector("meta[property='og:image']");
      if (metaImage) {
        metaImage.setAttribute("content", property.imagens && property.imagens[0] ? property.imagens[0] : 'default-image-url.jpg');
      } else {
        const metaImageElement = document.createElement("meta");
        metaImageElement.setAttribute("property", "og:image");
        metaImageElement.setAttribute("content", property.imagens && property.imagens[0] ? property.imagens[0] : 'default-image-url.jpg');
        document.head.appendChild(metaImageElement);
      }

      const metaUrl = document.querySelector("meta[property='og:url']");
      if (metaUrl) {
        metaUrl.setAttribute("content", `${window.location.origin}${location.pathname}`);
      } else {
        const metaUrlElement = document.createElement("meta");
        metaUrlElement.setAttribute("property", "og:url");
        metaUrlElement.setAttribute("content", `${window.location.origin}${location.pathname}`);
        document.head.appendChild(metaUrlElement);
      }
    }
  }, [property, location.pathname]); // Reexecutar sempre que o imóvel mudar

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
    const propertyUrl = `${window.location.origin}/properties/${property.id}`;
    const encodedMessage = encodeURIComponent(`
   *${property.natureza}* - €${property.preçoVenda.toLocaleString()} te espera! 
   Localização: ${property.distrito} / ${property.concelho} 
   Área: ${property.area} m²
   Clique aqui para ver mais detalhes: 
   ${propertyUrl}
  `);
    return `https://wa.me/?text=${encodedMessage}`;
  };

  if (loading) {
    return <p>Carregando detalhes do imóvel...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="property-details flex justify-center">

      <div className="container px-3 md:px-0 py-6">
        {/* Botão de Voltar */}
        <button
          onClick={() => {
            if (window.history.length > 2) {
              navigate(-1); // Volta para a página anterior se houver histórico
            } else {
              navigate("/"); // Redireciona para a página inicial se não houver histórico
            }
          }}
          className="mb-4 py-2 px-4 bg-blue-500 text-white rounded"
        >
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
                  <img key={index} src={imagem} alt={`Imagem ${index + 1}`} className="w-full h-auto object-cover" />
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

          {/* Ações */}
          <div className="flex justify-between items-center mt-6">
            <button onClick={() => toggleFavorite(property.id)} className={`py-2 px-4 rounded ${favorites.includes(property.id) ? 'bg-red-500' : 'bg-blue-500'} text-white`}>{favorites.includes(property.id) ? 'Remover Favorito' : 'Adicionar Favorito'}
            </button>
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