import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from './utils/config';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

const axiosInstance = axios.create({
  baseURL: `${apiUrl}`, // 기본 API URL 설정
});

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => localStorage.getItem('userId') || null);
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken') || null);

  useEffect(() => {
    const getUserInfo = async () => {
      if (!accessToken) return;
      
      try {
        const response = await axiosInstance.get('/users/info', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        const { id } = response.data.data;
        setUserId(id);
        localStorage.setItem('userId', id);
      } catch (error) {
        console.error('Error fetching user info:', error);

        if (error.response && error.response.status === 401) {
          handleLogout();  // 토큰이 만료되었을 경우 자동 로그아웃 처리
        }
      }
    };

    getUserInfo();
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  }, [accessToken]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    setAccessToken(null);
    setUserId(null);
  };

  return (
    <UserContext.Provider value={{ userId, setUserId, accessToken, setAccessToken, logout: handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
