import { useState, useEffect } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      const savedFavorites = localStorage.getItem('favorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
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
