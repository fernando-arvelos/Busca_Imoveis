import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyById } from "../services/propertiesApi";
import useFavorites from "../hooks/useFavorites";

const PropertyDetails = () => {
  const { id } = useParams(); // pega o id do imóvel da URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const searchProperty = async (id) => {
      try {
        const data = await getPropertyById(id); // busca o imóvel pelo id
        setProperty(data); // atualiza o estado com o imóvel
        console.log(data);
        
      } catch (error) {
        setError('Erro ao buscar detalhes do imóvel.', error);
      } finally {
        setLoading(false); // desliga o loading
      }
    };

    searchProperty(id);
  }, [id]); 

  if (loading) {
    return <p>Carregando detalhes do imóvel...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="property-details">
      {property ? (
        <div className="container mx-auto p-6">
          {/* Título e Preço */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{property.natureza}</h2>
            <p className="text-3xl font-bold text-pink-600">€{property.preçoVenda.toLocaleString()}</p>
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
  );
};

export default PropertyDetails;
