import { useState, useEffect, useRef } from "react";
// import { useLocation } from "react-router-dom";
import { getProperties } from "../services/propertiesApi";
import SearchForm from "./SearchForm";
import PropertyCard from "./PropertyCard";
import Pagination from "./Pagination";
import useFavorites from "../hooks/useFavorites";

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const { favorites, toggleFavorite } = useFavorites();
  const resultsRef = useRef(null);
  // const location = useLocation();

  useEffect(() => {

    searchProperties();
  }, []);

  const searchProperties = async (filters = {}) => {
    setLoading(true);
    try {
      const data = await getProperties(filters); // busca os imóveis com ou sem filtros
      setProperties(data); // atualiza o estado com os imóveis
    } catch (error) {
      setError('Erro ao buscar imóveis: ', error);
    } finally {
      setLoading(false); // desliga o loading
    }
  };

  const handleSearch = (filters) => {
    setCurrentPage(1); // volta para a primeira página
    searchProperties(filters); // chama a função de busca com os filtros

    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Paginação 
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProperties = properties.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(properties.length / itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} /> {/* passa a função de busca para o componente de busca */}

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div ref={resultsRef} className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {selectedProperties.length > 0 ? (
          selectedProperties.map(property => (
            <PropertyCard
            key={property.id}
            property={property}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            />
          ))
        ): (
          <p>Nenhum imóvel encontrado.</p>
        )}
      </div>
      <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      goToNextPage={goToNextPage}
      goToPreviousPage={goToPreviousPage}
      setCurrentPage={setCurrentPage}
      className="m-8"
      />
    </div>
  );
};

export default PropertiesPage;
