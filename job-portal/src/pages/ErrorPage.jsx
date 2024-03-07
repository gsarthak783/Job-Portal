import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-100 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h2>
        <p className="text-gray-600 mb-6">We're sorry, but an unexpected error has occurred.</p>
        <Link to="/" className="text-blue-500 hover:underline text-center">Go back to the homepage</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
