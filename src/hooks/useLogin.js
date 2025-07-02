import { useState, useEffect } from 'react';

const useLogin = (email, password) => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const login = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://destored-backend-production.up.railway.app/api/v1/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setResponseData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (email && password) {
      login();
    }
  }, [email, password]);

  return { responseData, error, loading, userRole: responseData?.user?.rol };
};

export default useLogin;