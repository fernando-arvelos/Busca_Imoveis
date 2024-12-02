import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const [searchPerformed, setSearchPerformed] = useState(false);

  const { favorites, toggleFavorite } = useFavorites();
  const resultsRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const searchProperties = async (filters = {}) => {
    setLoading(true);
    try {
      const data = await getProperties(filters); // busca os imóveis com ou sem filtros
      setProperties(data); // atualiza o estado com os imóveis
      setSearchPerformed(true);
    } catch (error) {
      setError('Erro ao buscar imóveis: ', error);
    } finally {
      setLoading(false); // desliga o loading
    }
  };

  const handleSearch = (filters) => {
    const queryFilters = { ...filters, page: 1 };
    setCurrentPage(1);

    const queryString = new URLSearchParams(queryFilters).toString();
    navigate(`?${queryString}`);

    searchProperties(queryFilters); // chama a função de busca com os filtros

    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const queryFilters = Object.fromEntries(new URLSearchParams(location.search));
    const pageFromUrl = parseInt(queryFilters.page) || 1; // Obtém a página ou usa 1 como padrão
    setCurrentPage(pageFromUrl);
  
    searchProperties(queryFilters); // Busca com os filtros
  }, [location.search]);

  // Paginação 
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProperties = properties.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(properties.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const queryFilters = Object.fromEntries(new URLSearchParams(location.search));
      const updatedFilters = { ...queryFilters, page: currentPage + 1 };
      navigate(`?${new URLSearchParams(updatedFilters).toString()}`); // Atualiza a URL
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const queryFilters = Object.fromEntries(new URLSearchParams(location.search));
      const updatedFilters = { ...queryFilters, page: currentPage - 1 };
      navigate(`?${new URLSearchParams(updatedFilters).toString()}`); // Atualiza a URL
    }
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} /> {/* passa a função de busca para o componente de busca */}

      {error && <p className="text-red-600">{error}</p>}

      <div ref={resultsRef} className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {loading ? (
          <p>Carregando...</p>
        ) : selectedProperties.length > 0 ? (
          selectedProperties.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ))
        ) : (
          searchPerformed && <p>Nenhum imóvel encontrado.</p>
        )}
      </div>

      <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      goToNextPage={goToNextPage}
      goToPreviousPage={goToPreviousPage}
      setCurrentPage={(page) => {
        const queryFilters = Object.fromEntries(new URLSearchParams(location.search));
        const updatedFilters = { ...queryFilters, page };
        navigate(`?${new URLSearchParams(updatedFilters).toString()}`); // Atualiza a URL
      }}
      />
    </div>
  );
};

export default PropertiesPage;