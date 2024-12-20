const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getProperties = async (filters = {}) => {
  let url = `${API_BASE_URL}/properties`;

  let queryParams = Object.keys(filters)
    .map((key) => `${key}=${filters[key]}`)
    .join("&");

  if (queryParams) {
    url = `${url}/search?${queryParams}`;
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    const data = await response.json();

    if (!response.ok) {
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
