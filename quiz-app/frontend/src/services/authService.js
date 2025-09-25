const API_URL = 'http://localhost:5000/api/auth';

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include' // Added for consistency
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Failed to login');
    }

    // Store token from both cookie and response (whichever exists)
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (name, email, contactNumber, usn, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, contactNumber, usn, password }),
      credentials: 'include'
    });

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    const data = contentType?.includes('application/json') 
      ? await response.json() 
      : await response.text();

    if (!response.ok) {
      throw new Error(
        (typeof data === 'object' ? data.error || data.message : data) || 
        'Registration failed'
      );
    }

    // Store token from response (if exists)
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data.user;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  // Optional: Add API call to backend logout if needed
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const response = await fetch(`${API_URL}/current`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include' // Added for consistency
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to get current user');
    }

    return data.user;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
};