import Link from "next/link";
import PropTypes from 'prop-types';
import Image from 'next/image';

const PropertyCard = ({ property, favorites, toggleFavorite }) => {
  return (
    <Link href={`/properties/${property.id}`} className="block bg-white shadow-md rounded-lg overflow-hidden">
      <div className="w-full h-full">
        <Image 
          src={property.imagens?.[0] || '/placeholder.jpg'} 
          alt={`Imóvel em ${property.freguesia || 'local desconhecido'}`} 
          className="w-full h-48 object-cover" 
          width={300}
          height={200}
          layout="responsive"
          objectFit="cover"
          quality={50}
        />
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold mb-2">{property.natureza}</h2>
            <button
              aria-label={
                favorites.includes(property.id)
                  ? 'Remover dos favoritos'
                  : 'Adicionar aos favoritos'
              }
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
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                />
              </svg>{' '}
            </button>   
          </div>
          <p className="text-gray-600 mb-2">€ {property.preçoVenda?.toLocaleString() || 'Preço não informado'}</p>
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
  property: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imagens: PropTypes.arrayOf(PropTypes.string),
    natureza: PropTypes.string.isRequired,
    preçoVenda: PropTypes.number,
    area: PropTypes.number,
    ano: PropTypes.number,
    distrito: PropTypes.string,
    concelho: PropTypes.string,
    freguesia: PropTypes.string,
    banco: PropTypes.string,
  }).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default PropertyCard;