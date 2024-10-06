import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SaveCurrentPath() {
  const location = useLocation();

  useEffect(() => {
    // 메뉴 페이지나 로그인 페이지로 진입했을 때는 경로를 저장하지 않음
    if (location.pathname === '/menu' || location.pathname === '/login' || location.pathname === '/input' || location.pathname === '/search') return;

    // 페이지 경로가 바뀔 때마다 현재 경로를 localStorage에 저장
    localStorage.setItem('previousPage', location.pathname);
  }, [location]);

  return null; // 렌더링할 내용은 없으므로 null을 반환
}

export default SaveCurrentPath;
