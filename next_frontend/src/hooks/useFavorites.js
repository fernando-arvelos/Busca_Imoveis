import { useState, useEffect } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      try {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
      } catch (error) {
        console.error("Erro ao carregar favoritos do localStorage:", error);
        return [];        
      }
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error("Erro ao salvar favoritos no localStorage:", error);     
    }
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => 
      prevFavorites.includes(id) 
        ? prevFavorites.filter(favId => favId !== id)
        : [...prevFavorites, id]
    ); 
  };

  return { favorites, toggleFavorite };
};

export default useFavorites;
