import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyByRef } from "../services/propertiesApi";

const PropertyDetails = () => {
  const { referência } = useParams(); // pega o id do imóvel da URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchProperty = async () => {
      try {
        const data = await getPropertyByRef(referência); // busca o imóvel pelo id
        setProperty(data); // atualiza o estado com o imóvel
      } catch (error) {
        setError('Erro ao buscar detalhes do imóvel.', error);
      } finally {
        setLoading(false); // desliga o loading
      }
    };

    searchProperty();
  }, [referência]); 

  if (loading) {
    return <p>Carregando detalhes do imóvel...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  // <div>
  //   {property ? (
  //     <div>
  //       <h2>{property.natureza}</h2>
  //       <p>Preço: €{property.preçoVenda}</p>
  //       <p>Área: {property.area}metros quadrados</p>
  //       <p>Distrito: {property.distrito}</p>
  //       <p>Conselho: {property.concelho}</p>
  //       <p>Freguesia: {property.freguesia}</p>
  //       <p>Ano: {property.ano}</p>
  //       <div>
  //         {property.imagens && property.imagens.length > 0 ? (
  //           property.imagens.map((imagem, index) => (
  //             <img key={index} src={imagem.url} alt={`Imagem ${index + 1}`} />
  //           ))
  //           ) : (
  //             <p>Nwnhuma imagem disponível.</p>
  //           )
  //         }
  //       </div>
  //       <p>Banco responsável: {property.banco}</p>
  //       <p>Contacto: {property.contacto}</p>
  //       <p>Email: {property.email}</p>
  //       <p>Telefone:{property.telefone}</p>
  //     </div>
  //     ) : (
  //     <p>Imóvel não encontrado.</p>
  //   )}
  // </div>

  return (
    <div className="property-details">
      {property ? (
        <div className="container mx-auto p-6">
          {/* Título e Preço */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{property.natureza} {property.tipologia}</h2>
            <p className="text-3xl font-bold text-pink-600">€{property.preçoVenda.toLocaleString()}</p>
          </div>

          {/* Informações Principais */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-500">Ref: {property.id}</p>
            <button className="bg-pink-500 text-white py-2 px-4 rounded">Simular prestação</button>
          </div>

          {/* Detalhes do Imóvel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div>
              <p><strong>Localização:</strong> {property.distrito} / {property.concelho}</p>
              <p><strong>Freguesia:</strong> {property.freguesia}</p>
              <p><strong>Tipologia:</strong> {property.tipologia}</p>
              <p><strong>Área:</strong> {property.area} m²</p>
              <p><strong>Estado:</strong> {property.estado}</p>
              <p><strong>Ano:</strong> {property.ano}</p>
              <p><strong>Situação Ocupacional:</strong> {property.situacaoOcupacional}</p>
              <p><strong>Morada:</strong> {property.morada}</p>
              <p><strong>Código Postal:</strong> {property.codigoPostal}</p>
            </div>
            <div>
              <p>{property.descricao}</p>
            </div>
          </div>

          {/* Galeria de Imagens */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Fotos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {property.imagens && property.imagens.length > 0 ? (
                property.imagens.map((imagem, index) => (
                  <img key={index} src={imagem.url} alt={`Imagem ${index + 1}`} className="w-full h-auto object-cover" />
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
            <button className="bg-blue-500 text-white py-2 px-4 rounded">Adicionar Favorito</button>
            <button className="bg-gray-500 text-white py-2 px-4 rounded">Enviar a um amigo</button>
          </div>
        </div>
      ) : (
        <p>Imóvel não encontrado.</p>
      )}
    </div>
  );
};

export default PropertyDetails;
