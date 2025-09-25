const API_URL = 'http://localhost:5000/api/chat';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};

export const getMessages = async () => {
  const response = await fetch(`${API_URL}`, getAuthHeader());

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch messages');
  }

  return data.data;
};

export const sendMessage = async (message) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader().headers,
      },
      body: JSON.stringify({ message }),
      credentials: 'include'
    });

    const contentType = response.headers.get('content-type');
    const data = contentType?.includes('application/json') 
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      throw new Error(
        (typeof data === 'object' ? data.error || data.message : data) || 
        'Failed to send message'
      );
    }

    // Return the full response data
    return data.data || data;
  } catch (error) {
    console.error('Message send error:', error);
    throw error;
  }
};