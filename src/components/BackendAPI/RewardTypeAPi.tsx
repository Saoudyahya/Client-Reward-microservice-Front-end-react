const baseRewardTypeUrl = 'http://localhost:8081/client-microservice/api/reward-types';

export const getAllRewardTypes = async () => {
  try {
    const response = await fetch(baseRewardTypeUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting reward types:', error);
    throw error;
  }
};

export const getRewardTypeById = async (id:any) => {
  try {
    const response = await fetch(`${baseRewardTypeUrl}/${id}`);
    if (response.status === 404) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error getting reward type with ID ${id}:`, error);
    throw error;
  }
};

export const createRewardType = async (rewardType:any) => {
  try {
    const response = await fetch(baseRewardTypeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rewardType),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating reward type:', error);
    throw error;
  }
};

export const updateRewardType = async (id:any, rewardType:any) => {
  try {
    const response = await fetch(`${baseRewardTypeUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rewardType),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating reward type with ID ${id}:`, error);
    throw error;
  }
};

export const deleteRewardType = async (id:any) => {
  try {
    await fetch(`${baseRewardTypeUrl}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Error deleting reward type with ID ${id}:`, error);
    throw error;
  }
};
