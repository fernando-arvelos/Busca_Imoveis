import { useState, useEffect, useRef } from "react";
import { getProperties } from "../services/propertiesApi";
import { useRouter } from "next/router";
import SearchForm from "./SearchForm";
import PropertyCard from "./PropertyCard";
import Pagination from "./Pagination";
import useFavorites from "@/hooks/useFavorites";

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;
  const [searchPerformed, setSearchPerformed] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const resultsRef = useRef(null);

  const searchProperties = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProperties(filters); // Busca os imóveis com ou sem filtros
      setProperties(data || []); // Atualiza o estado com os imóveis
      console.log(properties);
      
      setSearchPerformed(true); // Indica que a busca foi realizada
    } catch (error) {
      setError("Erro ao buscar imóveis: " + error.message);
    } finally {
      setLoading(false); // Desliga o loading
    }
  };

  const handleSearch = (filters) => {
    const queryFilters = { ...filters };
    setCurrentPage(1);

    router.push({
      pathname: router.pathname,
      query: queryFilters,
    });

    searchProperties(queryFilters);

    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!router.isReady) return;

    const queryFilters = router.query; // Obtém os filtros da URL
    const pageFromUrl = parseInt(queryFilters.page) || 1; // Obtém a página ou usa 1 como padrão
    setCurrentPage(pageFromUrl);
  
    searchProperties(queryFilters); // Busca com os filtros
  }, [router.isReady, router.query]); // Executa quando a rota estiver pronta

  // Paginação
  const goToPage = (page) => {
    const queryFilters = { ...router.query, page };
    setCurrentPage(page);

    // Atualiza a URL com a nova página
    router.push({
      pathname: router.pathname,
      query: queryFilters,
    });

    searchProperties(queryFilters);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProperties = properties.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(properties.length / itemsPerPage);

  return (
    <div>
      <SearchForm onSearch={handleSearch} /> {/* passa a função de busca para o componente de busca */}

      {error && <p className="text-red-600">{error}</p>}

      <div ref={resultsRef} className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {loading ? (
          <p>Carregando...</p>
        ) : selectedProperties && selectedProperties.length > 0 ? (
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

      <script async="async" data-cfasync="false" src="//pl25552622.profitablecpmrate.com/69e9134ea398bc2678d3e57043592b21/invoke.js"></script>
      <div id="container-69e9134ea398bc2678d3e57043592b21"></div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToNextPage={() => goToPage(currentPage + 1)}
        goToPreviousPage={() => goToPage(currentPage - 1)}
        setCurrentPage={goToPage}
      />
    </div>
  );
};

export default PropertiesPage;