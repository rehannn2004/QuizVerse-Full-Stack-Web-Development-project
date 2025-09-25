const API_URL = 'http://localhost:5000/api/quiz';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getQuizzes = async () => {
  const response = await fetch(`${API_URL}`, getAuthHeader());

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch quizzes');
  }

  return data.data;
};

export const getQuiz = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, getAuthHeader());

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch quiz');
  }

  return data.data;
};

export const submitQuizAnswers = async (id, answers) => {
  try {
    const response = await fetch(`${API_URL}/${id}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader().headers,
      },
      body: JSON.stringify({ answers }),
      credentials: 'include'
    });

    const contentType = response.headers.get('content-type');
    const data = contentType?.includes('application/json') 
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      throw new Error(
        (typeof data === 'object' ? data.error || data.message : data) || 
        'Failed to submit quiz'
      );
    }

    // Return the entire data object since backend doesn't nest under 'data'
    return data;
  } catch (error) {
    console.error('Quiz submission error:', error);
    throw error;
  }
};