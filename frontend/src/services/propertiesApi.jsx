const API_BASE_URL = 'https://buscaimoveisapi.pt';

export const getProperties = async (filters = {}) => {
  let url = `${API_BASE_URL}/properties`;

  const queryParams = new URLSearchParams(filters).toString();

  if (queryParams) {
    url = `${url}/search?${queryParams}`;
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    

    const data = await response.json();

    if (!response.ok) {
      console.error('Erro ao buscar imóveis:', await response.text());
      throw new Error('Erro ao buscar imóveis');
    }

    return data;
  } catch (error) {
    console.error('Erro na requisição da API:', error);
    throw error;
  }
};

export const getPropertyById = async (id) => {
  let url = `${API_BASE_URL}/properties/${id}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    

    if (!response.ok) {
      throw new Error('Erro ao buscar detalhes do imóvel');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na requisição da API:', error);
    throw error;
  }
};
