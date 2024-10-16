import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyById } from "../services/propertiesApi";

const PropertyDetails = () => {
  const { id } = useParams(); // pega o id do imóvel da URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchProperty = async () => {
      try {
        const data = await getPropertyById(id); // busca o imóvel pelo id
        setProperty(data); // atualiza o estado com o imóvel
      } catch (error) {
        setError('Erro ao buscar detalhes do imóvel.', error);
      } finally {
        setLoading(false); // desliga o loading
      }
    };

    searchProperty();
  }, [id]); 

  if (loading) {
    return <p>Carregando detalhes do imóvel...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  <div>
    {property ? (
      <div>
        <h2>{property.natureza}</h2>
        <p>Preço: €{property.preçoVenda}</p>
        <p>Área: {property.area}metros quadrados</p>
        <p>Distrito: {property.distrito}</p>
        <p>Conselho: {property.concelho}</p>
        <p>Freguesia: {property.freguesia}</p>
        <p>Ano: {property.ano}</p>
        <div>
          {property.imagens && property.imagens.length > 0 ? (
            property.imagens.map((imagem, index) => (
              <img key={index} src={imagem.url} alt={`Imagem ${index + 1}`} />
            ))
            ) : (
              <p>Nwnhuma imagem disponível.</p>
            )
          }
        </div>
        <p>Banco responsável: {property.banco}</p>
        <p>Contacto: {property.contacto}</p>
        <p>Email: {property.email}</p>
        <p>Telefone:{property.telefone}</p>
      </div>
      ) : (
      <p>Imóvel não encontrado.</p>
    )}
  </div>
};

export default PropertyDetails;
