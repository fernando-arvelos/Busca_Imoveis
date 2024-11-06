
// const API_BASE_URL = 'https://busca-imoveis.onrender.com';
const API_BASE_URL = 'http://localhost:8080';


export const getProperties = async (filters = {}) => {
  let url = `${API_BASE_URL}/properties`;

  //vê se tem algum filtro preenchido
  // const queryParams = new URLSearchParams(filters).toString();

  let queryParams = Object.keys(filters)
    .map((key) => `${key}=${filters[key]}`)
    .join("&");
    
  if (queryParams) {
    url = `${url}/search?${queryParams}`;
    console.log(url);
  }

  try {
    const response = await fetch(url);

    const data = await response.json();  // Converte a resposta para JSON
    
    if (!response.ok) {
      throw new Error('Erro ao buscar imóveis');
    }

    return data; // retorna os dados dos imoveis
  } catch (error) {
    console.error('Erro na requisição da API:', error);
    throw error;
  }

}

export const getPropertyById = async (id) => {
  let url = `${API_BASE_URL}/properties/${id}`;

  try {
    const response = await fetch(url);    

    if (!response.ok) {
      throw new Error('Erro ao buscar detalhes do imóvel');
    }

    return await response.json(); // retorna os dados do imóvel
  } catch (error) {
    console.error('Erro na requisição da API:', error);
    throw error;
  }
}
