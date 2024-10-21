import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProperties } from "../services/propertiesApi";
import SearchForm from "./SearchForm";

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

    // Carrega os favoritos e busca propriedades no carregamento inicial
  useEffect(() => {
    // Carrega os favoritos do localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);

    // Busca os imóveis ao carregar a página
    searchProperties();
  }, []); // Executa apenas na montagem inicial

  // Salva os favoritos no localStorage quando eles mudam
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]); // Executa sempre que os favoritos mudam

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => 
    prevFavorites.includes(id) 
      ? prevFavorites.filter(favId => favId !== id) // remove o id dos favoritos
      : [...prevFavorites, id] // adiciona o id aos favoritos
    ); 
  };

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
    searchProperties(filters); // chama a função de busca com os filtros
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
      <h1 className="text-3xl font-bold mb-6">Buscar Imóveis</h1>
      <SearchForm onSearch={handleSearch} /> {/* passa a função de busca para o componente de busca */}

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {selectedProperties.length > 0 ? (
          selectedProperties.map(property => (
            <div key={property.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={property.imagens[0]} alt={`Imóvel em ${property.freguesia}`} className="w-full h-48 object-cover"/>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{property.natureza}</h2>
                <button
                  className={`text-gray-600 ${favorites.includes(property.id) ? 'text-red-600' : 'hover:text-red-600'}`}
                  onClick={() => toggleFavorite(property.id)} // Chama a função toggleFavorite ao clicar
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="#000000"
                    className="w-6 h-6 inline-block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                    />
                  </svg>{' '}
                  {favorites.includes(property.id) ? 'Favoritado' : 'Favoritar'} {/* Altera para coração cheio e vazio */}
                </button>
                <p className="text-gray-600 mb-2">€ {property.preçoVenda}</p>
                <p className="text-gray-700 font-semibold text-sm">{property.area} m² - Ano {property.ano}</p>
                <p className="text-gray-500 text-sm">{property.distrito} - {property.concelho} - {property.freguesia}</p>
                <p className="text-gray-400 text-sm mb-2">Banco responsável: {property.banco}</p>
                <Link to={`/properties/${property.id}`} className="text-blue-500 hover:text-blue-700">Ver Detalhes</Link>
                
              </div>
            </div>
          ))
        ): (
          <p>Nenhum imóvel encontrado.</p>
        )}
      </div>
      {/* Paginação */}
      <div className="flex justify-center space-x-4 mt-6">
        <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={`py-2 px-4 rounded-full ${currentPage === 1 ? 'bg-gray-200' : 'bg-blue-600 text-white'}`}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`py-2 px-4 rounded-full ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`py-2 px-4 rounded-full ${currentPage === totalPages ? 'bg-gray-200' : 'bg-blue-600 text-white'}`}
          >
            &gt;
          </button>
      </div>
    </div>
  );
};

export default PropertiesPage;
