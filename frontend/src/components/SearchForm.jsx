import { useState } from 'react';
import PropTypes from 'prop-types';

const SearchForm = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    natureza: '',
    referencia: '',
    precoCompraMin: '',
    precoCompraMax: '',
    precoAluguelMin: '',
    precoAluguelMax: '',
    distrito: '',
    concelho: '',
    freguesia: '',
    tipologia: '',
    areaMin: '',
    areaMax: '',
    anoMin: '',
    anoMax: '',
    banco: '',
  });

  const [isBuying, setIsBuying] = useState(true); // Estado para controlar o botão ativo

  const handleInputChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(filters); // chama a função de busca no componente PropertiesPage
  };

  const toggleRentOrBuy = (Buying) => {
    setIsBuying(Buying); // Atualiza o estado com base no botão clicado
  };

  return (
    <div className="min-h-screen flex justify-items-start items-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/src/images/casa.jpg')` }}>
      {/* Box de busca */}
      <div className="bg-white m-10 p-8 shadow-lg rounded-lg w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Seu futuro lar pode estar aqui</h1>
        <div className="flex space-x-4 mb-6">
          <button className={`py-2 px-4 rounded-full ${isBuying ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => toggleRentOrBuy(true)}>Comprar</button>
          <button className={`py-2 px-4 rounded-full ${!isBuying ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => toggleRentOrBuy(false)}
          >Alugar</button>
          {/* adicionar lógica p alterar os campos qndo clicar em alugar ou comprar */}
        </div>

        {/* Formulário de busca */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="natureza" className="text-gray-700">Natureza</label>
            <input
              type="text"
              name="natureza"
              placeholder="Natureza"
              value={filters.natureza}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="referencia" className="text-gray-700">Referência</label>
            <input
              type="number"
              name="referencia"
              placeholder="Referência"
              value={filters.referencia}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>
          {isBuying && (
            <div className="flex flex-col">
              <span className="text-gray-700 mb-2">Preço de Compra</span>
              <div className="flex space-x-4">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="precoCompraMin" className="text-gray-700">Mínimo</label>
                  <input
                    type="number"
                    name="precoCompraMin"
                    placeholder="Preço Mínimo"
                    value={filters.preçoCompraMin}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg p-2"
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label htmlFor="precoCompraMax" className="text-gray-700">Máximo</label>
                  <input
                    type="number"
                    name="precoCompraMax"
                    placeholder="Preço Máximo"
                    value={filters.preçoCompraMax}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg p-2"
                  />
                </div>
              </div>
            </div>
          )}
          
          {!isBuying && (
            <div className="flex flex-col">
              <span className="text-gray-700 mb-2">Preço de Aluguel</span>
              <div className="flex space-x-4">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="precoAluguelMin" className="text-gray-700">Mínimo</label>
                  <input
                    type="number"
                    name="precoAluguelMin"
                    placeholder="Preço Mínimo"
                    value={filters.preçoAluguelMin}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg p-2"
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label htmlFor="precoAluguelMax" className="text-gray-700">Máximo</label>
                  <input
                    type="number"
                    name="precoAluguelMax"
                    placeholder="Preço Máximo"
                    value={filters.preçoAluguelMax}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg p-2"
                  />
                </div>
              </div>
            </div>
          )}
          
          <div className='flex flex-col'>
            <label htmlFor="distrito" className="text-gray-700">Distrito</label>
            <input
              type="text"
              name="distrito"
              placeholder="Distrito"
              value={filters.distrito}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="concelho" className="text-gray-700">Conselho</label>
            <input
              type="text"
              name="concelho"
              placeholder="Concelho"
              value={filters.concelho}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="freguesia" className="text-gray-700">Freguesia</label>
            <input
              type="text"
              name="freguesia"
              placeholder="Freguesia"
              value={filters.freguesia}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="tipologia" className="text-gray-700">Tipologia</label>
            <input
              type="text"
              name="tipologia"
              placeholder="Tipologia"
              value={filters.tipologia}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="flex flex-col">
              <span className="text-gray-700 mb-2">Área</span>
              <div className="flex space-x-4">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="areaMin" className="text-gray-700">Mínimo</label>
                  <input
                    type="number"
                    name="areaMin"
                    placeholder="Mínimo"
                    value={filters.areaMin}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg p-2"
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label htmlFor="areaMax" className="text-gray-700">Máximo</label>
                  <input
                    type="number"
                    name="areaMax"
                    placeholder="Máximo"
                    value={filters.areaMax}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg p-2"
                  />
                </div>
              </div>
            </div>
          <div className='flex flex-col'>
            <label htmlFor="banco" className="text-gray-700">Banco</label>
            <input
              type="text"
              name="banco"
              placeholder="Banco"
              value={filters.banco}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold">Buscar</button>
        </form>
      </div>
    </div>
    
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm;