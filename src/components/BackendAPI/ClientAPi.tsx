const baseUrl = 'http://localhost:8081/client-microservice/api/clients';

export const createClient = async (client : any ) => {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(client),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

export const getAllClients = async () => {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting clients:', error);
    throw error;
  }
};

export const getClientById = async (id : any) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`);
    if (response.status === 404) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error getting client with ID ${id}:`, error);
    throw error;
  }
};

export const updateClient = async (id : any, client : any) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(client),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating client with ID ${id}:`, error);
    throw error;
  }
};

export const deleteClient = async (id : any) => {
  try {
    await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Error deleting client with ID ${id}:`, error);
    throw error;
  }
};
