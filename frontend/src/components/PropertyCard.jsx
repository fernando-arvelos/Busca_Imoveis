import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const PropertyCard = ({ property, favorites, toggleFavorite }) => {
  return (
    <Link to={`/properties/${property.id}`} className="block bg-white shadow-md rounded-lg overflow-hidden">
      <div onClick={(e) => e.stopPropagation()} className="w-full h-full">
        <img src={property.imagens[0]} alt={`Imóvel em ${property.freguesia}`} className="w-full h-48 object-cover" />
        <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold mb-2">{property.natureza}</h2>
          <button
            className={`text-gray-600 ${favorites.includes(property.id) ? 'text-red-600' : 'hover:text-red-600'}`}
            onClick={(e) => {
              e.preventDefault(); // Impede a navegação ao clicar no botão de favorito
              toggleFavorite(property.id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={favorites.includes(property.id) ? 'black' : 'none'}
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
          </button>
        </div>
        <p className="text-gray-600 mb-2">€ {property.preçoVenda.toLocaleString()}</p>
        <p className="text-gray-700 font-semibold text-sm">{property.area} m² - Ano {property.ano}</p>
        <p className="text-gray-500 text-sm">{property.distrito} - {property.concelho} - {property.freguesia}</p>
        <p className="text-gray-400 text-sm mb-2">Banco responsável: {property.banco}</p>
        <p className="text-gray-400 text-sm mb-2 hover:text-blue-500">Ver Detalhes</p>
      </div>
    </div>
  </Link>
  );
};
PropertyCard.propTypes = {
  property: PropTypes.object.isRequired,
  favorites: PropTypes.array.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default PropertyCard;