const baseRewardUrl = 'http://localhost:8081/client-microservice/api/rewards';

export const getAllRewards = async () => {
  try {
    const response = await fetch(baseRewardUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting rewards:', error);
    throw error;
  }
};

export const getRewardById = async (id: any) => {
  try {
    const response = await fetch(`${baseRewardUrl}/${id}`);
    if (response.status === 404) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error getting reward with ID ${id}:`, error);
    throw error;
  }
};

export const createReward = async (reward: any) => {
  try {
    const response = await fetch(baseRewardUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reward),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating reward:', error);
    throw error;
  }
};

export const updateReward = async (id: any, reward: any) => {
  try {
    const response = await fetch(`${baseRewardUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reward),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating reward with ID ${id}:`, error);
    throw error;
  }
};

export const deleteReward = async (id: any) => {
  try {
    await fetch(`${baseRewardUrl}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Error deleting reward with ID ${id}:`, error);
    throw error;
  }
};