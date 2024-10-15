import React, { useState, useEffect } from "react";
import { getProperties } from "../services/propertiesApi";
import SearchForm from "./SearchForm";

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchProperties = async (filters = {}) => {
    setLoading(true);
    try {
      const data = await getProperties(filters); // busca os imóveis com ou sem filtros
      setProperties(data); // atualiza o estado com os imóveis
    } catch (error) {
      setError('Erro ao buscar imóveis');
    } finally {
      setLoading(false); // desliga o loading
    }
  };

  // chama a função de buscar todos os imoveis no primeiro carregamento da página
  useEffect(() => {
    searchProperties();
  }, []);

  const handleSearch = (filters) => {
    searchProperties(filters); // chama a função de busca com os filtros
  };

  return (
    <div>
      <h1>Buscar Imóveis</h1>
      <SearchForm onSearch={handleSearch} /> {/* passa a função de busca para o componente de busca */}

      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}

      <div>
        {properties.length > 0 ? (
          properties.map(property => (
            <div key={property.id}>
              <h2>{property.natureza}</h2>
              <p>{property.preçoVenda}</p>
              <p>{property.distrito}</p>
              <p>{property.concelho}</p>
              <p>{property.freguesia}</p>
              <p>{property.area}</p>
              <p>{property.ano}</p>
              <p>{property.banco}</p>
              <Link to={`/properties/${property.id}`}>Ver Detalhes</Link>
            </div>
          ))
        ): (
          <p>Nenhum imóvel encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;