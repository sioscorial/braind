import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import Home from './components/home';
import Post from './components/post';
import Login from './components/login';
import Contents from './components/contents';
import Modify from './components/modify';
import  { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('accessToken'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/post" element={isAuthenticated ? <Post /> : <Navigate to="/login" />} />
          <Route path="/contents" element={isAuthenticated ? <Contents /> : <Navigate to="/login" />} />
          <Route path="/modify/:id" element={isAuthenticated ? <Modify /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
