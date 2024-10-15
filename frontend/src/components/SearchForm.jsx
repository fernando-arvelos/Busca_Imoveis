import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    natureza: '',
    referência: '',
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

  const handleImputChange = (event) => {
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="natureza"
        placeholder="Natureza"
        value={filters.natureza}
        onChange={handleImputChange}
      />
      <input
        type="number"
        name="referência"
        placeholder="Referência"
        value={filters.referência}
        onChange={handleImputChange}
      />
      <input
        type="number"
        name="preçoVendaMin"
        placeholder="Preço Mínimo"
        value={filters.preçoVendaMin}
        onChange={handleImputChange}
      />
      <input
        type="number"
        name="preçoVendaMax"
        placeholder="Preço Máximo"
        value={filters.preçoVendaMax}
        onChange={handleImputChange}
      />
      <input
        type="number"
        name="preçoAluguelMin"
        placeholder="Preço Mínimo"
        value={filters.preçoAluguelMin}
        onChange={handleImputChange}
      />
      <input
        type="number"
        name="preçoAluguelMax"
        placeholder="Preço Máximo"
        value={filters.preçoAluguelMax}
        onChange={handleImputChange}
      />
      <input
        type="text"
        name="distrito"
        placeholder="Distrito"
        value={filters.distrito}
        onChange={handleImputChange}
      />
      <input
        type="text"
        name="concelho"
        placeholder="Concelho"
        value={filters.concelho}
        onChange={handleImputChange}
      />
      <input
        type="text"
        name="freguesia"
        placeholder="Freguesia"
        value={filters.freguesia}
        onChange={handleImputChange}
      />
      <input
        type="text"
        name="tipologia"
        placeholder="Tipologia"
        value={filters.tipologia}
        onChange={handleImputChange}
      />
      <input
        type="number"
        name="areaMin"
        placeholder="Área Mínima"
        value={filters.areaMin}
        onChange={handleImputChange}
      />
      <input
        type="number"
        name="areaMax"
        placeholder="Área Máxima"
        value={filters.areaMax}
        onChange={handleImputChange}
      />
      <input
        type="number"
        name="anoMin"
        placeholder="Ano Mínimo"
        value={filters.anoMin}
        onChange={handleImputChange}
      />
      <input
        type="number"
        name="anoMax"
        placeholder="Ano Máximo"
        value={filters.anoMax}
        onChange={handleImputChange}
      />
      <input
        type="text"
        name="banco"
        placeholder="Banco"
        value={filters.banco}
        onChange={handleImputChange}
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchForm;