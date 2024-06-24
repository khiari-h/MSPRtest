import { useState } from 'react';

const useErrorHandler = () => {
  const [error, setError] = useState(null);

  const handleError = (err) => {
    setError(err);
    console.error("Caught error:", err);
  };

  return { error, handleError };
};

export default useErrorHandler;
