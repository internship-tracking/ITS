import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom'; // Add 'Routes' to the import statement
import { useSelector } from 'react-redux';

const PrivateRoute = ( {children}, allowedUserTypes, ) => {
  const userType = useSelector(state => state.auth.userType);
  if (!userType || !allowedUserTypes) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;

