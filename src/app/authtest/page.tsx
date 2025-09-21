"use client"
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const AuthTest: React.FC = () => {
  const {
    user,
    token,
    isLoading,
    isAuthenticated,
    error,
    login,
    logout,
    register,
    updateUser,
    clearError
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');

  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isRegisterMode) {
        await register(email, password, firstName, lastName);
      } else {
        await login(email, password);
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  const handleUpdateUser = () => {
    updateUser({
      firstname:firstName || user?.firstname || '',
      lastname:lastName || user?.lastname || '',
      email: user?.email || '',
      role: user?.role || 'user'
     

    }

    );
  };

  

  if (isLoading) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Auth Context Test</h2>
        <div className="bg-blue-100 p-4 rounded">
          <p>Loading authentication state...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Auth Context Test</h2>
      
      {/* Auth State Display */}
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Auth State:</h3>
        <p><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
        <p><strong>User:</strong> {user ? user.firstname : 'None'}</p>
                <p><strong>User:</strong> {user ? user.lastname : 'None'}</p>

        <p><strong>Token:</strong> {token ? 'Present' : 'None'}</p>
        <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
        {error && <p className="text-red-600"><strong>Error:</strong> {error.message}</p>}
      </div>

      {/* Test Buttons */}
      <div className="mb-6 space-y-2">
        
        
        {isAuthenticated && (
          <button
            onClick={handleUpdateUser}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Update User Name
          </button>
        )}
      </div>

      {/* Auth Forms */}
      {!isAuthenticated ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          {isRegisterMode && (
            <div>
              <label className="block text-sm font-medium mb-1">First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              <label className="block text-sm font-medium mb-1">Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : (isRegisterMode ? 'Register' : 'Login')}
          </button>
          
          <button
            type="button"
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Switch to {isRegisterMode ? 'Login' : 'Register'}
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="bg-green-100 p-4 rounded">
            <h3 className="font-semibold">Welcome, {user?.firstname} {user?.lastname}!</h3>
            <p>Email: {user?.email}</p>
            {/* <p>ID: {user?.id}</p> */}
          </div>
          
          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          <p>{error.message}</p>
          <button
            onClick={clearError}
            className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
          >
            Clear Error
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthTest;