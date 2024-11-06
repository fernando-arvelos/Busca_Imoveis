import React, { useEffect, useState } from 'react';
import { getPropertyById } from '../services/propertiesApi';
import useFavorites from '../hooks/useFavorites';
import PropertyCard from './PropertyCard'; 

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const [favoriteProperties, setFavoriteProperties] = useState([]);

  useEffect(() => {
    const fetchFavoriteProperties = async () => {
      const properties = await Promise.all(
        favorites.map((id) => getPropertyById(id))
      );
      setFavoriteProperties(properties);
    };

    if (favorites.length > 0) {
      fetchFavoriteProperties();
    }
  }, [favorites]);

  if (favorites.length === 0) {
    return <p className="py-4 px-8">Você ainda não tem nenhum imóvel favorito.</p>;
  }

  return (
    <div className="py-4 px-8">
      <h1 className="text-xl font-bold">Seus Favoritos</h1>
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {favoriteProperties.map((property) => (
          <PropertyCard key={property.id} property={property} favorites={favorites} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
