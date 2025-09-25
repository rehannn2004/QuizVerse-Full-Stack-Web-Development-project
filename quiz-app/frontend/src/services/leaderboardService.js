const API_URL = 'http://localhost:5000/api/leaderboard';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getLeaderboard = async (subject) => {
  const response = await fetch(`${API_URL}/${subject}`, getAuthHeader());

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch leaderboard');
  }

  return data.data;
};