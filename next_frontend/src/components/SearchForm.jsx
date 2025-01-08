import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SearchForm = ({ onSearch }) => {
  const initialFilters= {
    natureza: '',
    referencia: '',
    minV: '',
    maxV: '',
    minL: '',
    maxL: '',
    distrito: '',
    concelho: '',
    freguesia: '',
    tipologias: [],
    minA: '',
    maxA: '',
    anoMin: '',
    anoMax: '',
    banco: '',
  };

  const [filters, setFilters] = useState(initialFilters);
  const [isBuying, setIsBuying] = useState(true); // Estado para controlar o botão ativo
  const [listDistrictsConcelhos, setListDistrictsConcelhos] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [errors, setErrors] = useState({});
  const [concelho, setConcelho] = useState([]);

  // buscar json de distritos e concelhos
  useEffect(() => {
    fetch('/Lista_distrito_concelho.json')
      .then((response) => response.json())
      .then((json) => setListDistrictsConcelhos(json))
      .catch((error) => console.error('Erro ao buscar distritos e concelhos:', error));
  }, []);
  

  // filtrar concelhos por distrito
  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setSelectedDistrict(selectedDistrict);

    setFilters({
      ...filters,
      distrito: selectedDistrict,
    });

    console.log(listDistrictsConcelhos);

    const concelhosDoDistrito = listDistrictsConcelhos
  .filter(item => item.distrito === selectedDistrict)
  .flatMap(item => item.concelhos) || [];
    setConcelho(concelhosDoDistrito);
    console.log(concelhosDoDistrito);
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    // Atualize os filtros
    setFilters({
      ...filters,
      [name]: value,
    });
  
    // Validações específicas para campos numéricos
    if (name === 'minV' || name === 'maxV') {
      const minV = name === 'minV' ? value : filters.minV;
      const maxV = name === 'maxV' ? value : filters.maxV;
  
      if (Number(minV) > Number(maxV)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          price: 'O preço mínimo não pode ser maior que o máximo.',
        }));
      } else {
        setErrors((prevErrors) => {
          const { price, ...rest } = prevErrors;
          return rest;
        });
      }
    }
  
    if (name === 'minA' || name === 'maxA') {
      const minA = name === 'minA' ? value : filters.minA;
      const maxA = name === 'maxA' ? value : filters.maxA;
  
      if (Number(minA) > Number(maxA)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          area: 'A área mínima não pode ser maior que a máxima.',
        }));
      } else {
        setErrors((prevErrors) => {
          const { area, ...rest } = prevErrors;
          return rest;
        });
      }
    }
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setFilters((prevFilters) => {
      const isChecked = prevFilters.tipologias.includes(value);
      if (isChecked) {
        // Remove o valor se já estiver selecionado
        return {
          ...prevFilters,
          tipologias: prevFilters.tipologias.filter((item) => item !== value),
        };
      } else {
        // Adiciona o valor se não estiver selecionado
        return {
          ...prevFilters,
          tipologias: [...prevFilters.tipologias, value],
        }
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { minV, maxV, minA, maxA } = filters;

    if (Number(minV) > Number(maxV)) {
      alert('O preço mínimo não pode ser maior que o máximo.');
      return;
    }

    if (Number(minA) > Number(maxA)) {
      alert('A área mínima não pode ser maior que a máxima.');
      return;
    }

    const updatedFilters = {
      ...filters,
      tipologias: filters.tipologias.join(",")
    };

    onSearch(updatedFilters); // chama a função de busca no componente PropertiesPage
  };

  const toggleRentOrBuy = (Buying) => {
    setIsBuying(Buying); // Atualiza o estado com base no botão clicado
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    setSelectedDistrict('');
    setConcelho([]);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/images/casa.jpg')` }}>
      <div className='container flex flex-col lg:flex-row lg:w-full items-start lg:items-center lg:space-x-8 p-10 shadow-lg rounded-lg'>
          {/* Box de busca */}
        <div className="bg-white w-full p-8 shadow-lg rounded-lg">
          <h1 className="text-2xl md:text-4xl text-center font-bold mb-6 text-gray-900">Seu Guia de Imóveis à Venda em Portugal</h1>
          <div className="flex space-x-4 mb-6">
            <button className={`py-2 px-4 rounded-full ${isBuying ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
              onClick={() => toggleRentOrBuy(true)}>Comprar</button>
            {/* <button className={`py-2 px-4 rounded-full ${!isBuying ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
              onClick={() => toggleRentOrBuy(false)}
            >Alugar</button> */}
          </div>
          {/* Formulário de busca */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="natureza" className="text-gray-700">Natureza</label>
              <select
                id='natureza'
                name="natureza"
                value={filters.natureza}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2"
                >
                <option value="">Selecione a Natureza</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Moradia">Moradia</option>
                <option value="Prédio">Prédio</option>
                <option value="Terreno">Terreno</option>
                <option value="Garagem">Garagem</option>
                <option value="Quinta">Quinta</option>
                <option value="Armazem">Armazém</option>
                <option value="Escritório">Escritório</option>
                <option value="Loja">Loja</option>
                <option value="Parqueamento">Parqueamento</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
            {isBuying && (
              <div className="flex flex-col">
                <span className="text-gray-700 mb-2">Preço de Compra</span>
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <div className="flex flex-col md:w-1/2">
                    <label htmlFor="minV" className="text-gray-700">Mínimo</label>
                    <input
                      id='minV'
                      type="number"
                      name="minV"
                      placeholder="Preço Mínimo"
                      value={filters.minV}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg p-2"
                    />
                  </div>
                  <div className="flex flex-col md:w-1/2">
                    <label htmlFor="maxV" className="text-gray-700">Máximo</label>
                    <input
                      id='maxV'
                      type="number"
                      name="maxV"
                      placeholder="Preço Máximo"
                      value={filters.maxV}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg p-2"
                    />
                  </div>
                </div>
                {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
              </div>
            )}
            
            {/* {!isBuying && (
              <div className="flex flex-col">
                <span className="text-gray-700 mb-2">Preço de Aluguel</span>
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="minL" className="text-gray-700">Mínimo</label>
                    <input
                      type="number"
                      name="minL"
                      placeholder="Preço Mínimo"
                      value={filters.preçoAluguelMin}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg p-2"
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="maxL" className="text-gray-700">Máximo</label>
                    <input
                      type="number"
                      name="maxL"
                      placeholder="Preço Máximo"
                      value={filters.preçoAluguelMax}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg p-2"
                    />
                  </div>
                </div>
              </div>
            )} */}
            
            <div className='flex flex-col'>
              <label htmlFor="distrito" className="text-gray-700">Distrito</label>
              <select id='distrito' value={selectedDistrict} onChange={handleDistrictChange} className="border border-gray-300 rounded-lg p-2">
                <option value=''>Selecione um distrito</option>
                {listDistrictsConcelhos.map((item, index) => (
                  <option key={index} value={item.distrito}>{item.distrito}</option>
                ))}
                </select>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="concelho" className="text-gray-700">Concelho</label>
              <select id="concelho" name="concelho" value={filters.concelho} onChange={handleInputChange} className='border border-gray-300 rounded-lg p-2'>
                <option value="">Selecione um concelho</option>
                {concelho.map((concelho, index) => (
                  <option key={index} value={concelho}>{concelho}</option>
                ))}
              </select>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="tipologias" className="text-gray-700">Tipologia</label>
              <div className='flex flex-wrap justify-evenly md:justify-start md:space-x-4'>
                <label className='flex items-center space-x-2'>
                    <input
                      type="checkbox"
                      value="T0"
                      checked={filters.tipologias.includes('T0')}
                      onChange={(event) => handleCheckboxChange(event)}
                      className="form-checkbox text-blue-600"
                    />
                    <span>T0</span>
                  </label>
                <label className='flex items-center space-x-2'>
                  <input
                    type="checkbox"
                    value="T1"
                    checked={filters.tipologias.includes('T1')}
                    onChange={(event) => handleCheckboxChange(event)}
                    className="form-checkbox text-blue-600"
                  />
                  <span>T1</span>
                </label>
                <label className='flex items-center space-x-2'>
                  <input
                    type="checkbox"
                    value="T2"
                    checked={filters.tipologias.includes('T2')}
                    onChange={(event) => handleCheckboxChange(event)}
                    className="form-checkbox text-blue-600"
                  />
                  <span>T2</span>
                </label>
                <label className='flex items-center space-x-2'>
                  <input
                    type="checkbox"
                    value="T3"
                    checked={filters.tipologias.includes('T3')}
                    onChange={(event) => handleCheckboxChange(event)}
                    className="form-checkbox text-blue-600"
                  />
                  <span>T3</span>
                </label>
                <label className='flex items-center space-x-2'>
                  <input
                    type="checkbox"
                    value="T4"
                    checked={filters.tipologias.includes('T4')}
                    onChange={(event) => handleCheckboxChange(event)}
                    className="form-checkbox text-blue-600"
                  />
                  <span>T4+</span>
                </label>

              </div>
            </div>
            <div className="flex flex-col">
                <span className="text-gray-700 mb-2">Área</span>
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <div className="flex flex-col md:w-1/2">
                    <label htmlFor="minA" className="text-gray-700">Mínimo</label>
                    <input
                      id='minA'
                      type="number"
                      name="minA"
                      placeholder="Mínimo"
                      value={filters.minA}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg p-2"
                    />
                  </div>
                  <div className="flex flex-col md:w-1/2">
                    <label htmlFor="maxA" className="text-gray-700">Máximo</label>
                    <input
                      id='maxA'
                      type="number"
                      name="maxA"
                      placeholder="Máximo"
                      value={filters.maxA}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg p-2"
                    />
                  </div>
                </div>
                {errors.area && <span className="text-red-500 text-sm">{errors.area}</span>}
              </div>
            <button 
              type="submit" 
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold"
            >
              Buscar
            </button>
            <button
              type="button"
              onClick={handleClearFilters}
              className="w-full py-3 bg-gray-300 text-black rounded-lg font-bold mt-4"
            >
              Limpar Filtros
            </button>
          </form>
        </div>

          {/* Texto do site */}
          <div className="bg-white lg:w-1/2 p-8 shadow-lg rounded-lg mt-10">
            <p className="mt-4 text-gray-700">
            Encontre imóveis direto dos principais bancos em Portugal, com informações confiáveis e atualizadas. Simplificamos sua busca por casas, apartamentos e terrenos.
            </p>
          </div>
      </div>
      
      
    </div>
    
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm;