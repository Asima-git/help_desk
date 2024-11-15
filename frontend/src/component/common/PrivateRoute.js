import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import api from 'axios';

const PrivateRoute = ({ element, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    api.get('/protected')
      .then((response) => {
        setIsAuthenticated(true);
      })
      .catch((error) => {
        setIsAuthenticated(false); 
      });
  }, []);
  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
