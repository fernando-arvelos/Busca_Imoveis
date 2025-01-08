import axios from 'axios';

export const getProperties = async (filters = {}) => {
  let url = 'https://buscaimoveisapi.pt/properties';

  const queryParams = new URLSearchParams(filters).toString();

  if (queryParams) {
    url = `${url}/search?${queryParams}`;
  }

  try {
    const response = await axios.get(url);
    return response.data; // Os dados já estão disponíveis aqui
  } catch (error) {
    console.error('Erro ao buscar propriedades:', error);
    throw error; // Repassa o erro para o SSR ou componente
  }
};

export const getPropertyById = async (id) => {
  let url = 'https://buscaimoveisapi.pt/properties';

  try {
    const response = await axios.get(`${url}/${id}`);
    return response.data; // Os dados já estão disponíveis aqui
  } catch (error) {
    console.error('Erro ao buscar detalhes do imóvel:', error);
    throw error; // Repassa o erro para o SSR ou componente
  }
};