import { useState, useEffect } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
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
