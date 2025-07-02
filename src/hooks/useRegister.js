import { useState } from 'react';

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const registerUser = async (email, password, rol) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch('https://destored-backend-production.up.railway.app/api/v1/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rol }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Return with aliases to match what the component expects
  return { 
    register: registerUser,     // alias registerUser as register
    loading: isLoading,         // alias isLoading as loading
    error, 
    responseData: data          // alias data as responseData
  };
};

export default useRegister;