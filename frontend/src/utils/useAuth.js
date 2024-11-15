// hooks/useAuth.js
import { useContext, useEffect, useState } from 'react';
import ApiContext from '../Context/ApiState';

const useAuth = () => {
  const { checkAuth } = useContext(ApiContext);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const authenticate = async () => {
      const authResponse = await checkAuth();
      setIsAuthenticated(authResponse.success);
      setUser(authResponse.user)
    };

    authenticate();
  }, [checkAuth]);

  return { isAuthenticated,user };
};

export default useAuth;
