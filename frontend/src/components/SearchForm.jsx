import { useState } from 'react';
import PropTypes from 'prop-types';

const SearchForm = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    natureza: '',
    referencia: '',
    preçoVendaMin: '',
    preçoVendaMax: '',
    preçoAluguelMin: '',
    preçoAluguelMax: '',
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

  return (
    <div>
      {/* Coluna da esquerda - Formulário */}
      <div>
        <h1 className="bg-red-500 text-white p-6">Seu futuro lar pode estar aqui</h1>

        {/* Botões de opções (Alugar/Comprar) */}
        <div>
          <button >Alugar</button>
          <button >Comprar</button>
        </div>

        {/* Formulário de busca */}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="natureza" >Natureza</label>
            <input
              type="text"
              name="natureza"
              placeholder="Natureza"
              value={filters.natureza}
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="natureza">Referência</label>
            <input
              type="number"
              name="referencia"
              placeholder="Referência"
              value={filters.referencia}
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="natureza">Preço de Venda Mínimo</label>
            <input
              type="number"
              name="preçoVendaMin"
              placeholder="Preço Mínimo"
              value={filters.preçoVendaMin}
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="natureza">Preço de Venda Máximo</label>
            <input
              type="number"
              name="preçoVendaMax"
              placeholder="Preço Máximo"
              value={filters.preçoVendaMax}
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="natureza">Preço de Aluguel Mínimo</label>
            <input
              type="number"
              name="preçoAluguelMin"
              placeholder="Preço Mínimo"
              value={filters.preçoAluguelMin}
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="natureza">Preço de Aluguel Máximo</label>
            <input
              type="number"
              name="preçoAluguelMax"
              placeholder="Preço Máximo"
              value={filters.preçoAluguelMax}
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="natureza">Distrito</label>
            <input
              type="text"
              name="distrito"
              placeholder="Distrito"
              value={filters.distrito}
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="natureza">Conselho</label>
            <input
              type="text"
              name="concelho"
              placeholder="Concelho"
              value={filters.concelho}
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="natureza">Freguesia</label>
            <input
              type="text"
              name="freguesia"
              placeholder="Freguesia"
              value={filters.freguesia}
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="natureza">Tipologia</label>
            <input
              type="text"
              name="tipologia"
              placeholder="Tipologia"
              value={filters.tipologia}
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="natureza">Área (mínimo)</label>
            <input
              type="number"
              name="areaMin"
              placeholder="Área Mínima"
              value={filters.areaMin}
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="natureza">Área (máximo)</label>
            <input
              type="number"
              name="areaMax"
              placeholder="Área Máxima"
              value={filters.areaMax}
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="natureza">Banco</label>
            <input
              type="text"
              name="banco"
              placeholder="Banco"
              value={filters.banco}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Buscar</button>
        </form>
      </div>
    </div>
    
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm;