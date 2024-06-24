import React from 'react';
import ErrorMessage from '../atoms/ErrorMessage';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <ErrorMessage message="Page not found. The page you are looking for does not exist." />
    </div>
  );
};

export default NotFoundPage;
