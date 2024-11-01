
const API_BASE_URL = 'https://busca-imoveis.onrender.com';

export const getProperties = async (filters = {}) => {
  let url = `${API_BASE_URL}/properties`;

  //vê se tem algum filtro preenchido
  const queryParams = new URLSearchParams(filters).toString();
  if (queryParams) {
    url = `${url}/search?${queryParams}`;
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
  const url = `${API_BASE_URL}/properties/${id}`;

  try {
    const response = await fetch(url);

    console.log(response);
    

    if (!response.ok) {
      throw new Error('Erro ao buscar detalhes do imóvel');
    }

    return await response.json(); // retorna os dados do imóvel
  } catch (error) {
    console.error('Erro na requisição da API:', error);
    throw error;
  }
}
