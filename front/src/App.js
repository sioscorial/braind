import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import { createGlobalStyle } from 'styled-components';  // 전역 스타일을 위한 import
import MyComponent from './components/newmain';
import Menu from './components/menu';
import Login from './components/login';
import Input from './components/input';
import Mybookmark from './components/mybookmark';
import Mybrand from './components/mybrand';
import Wishlist from './components/wishlist';
import Search from './components/search';
import Brand from './components/brand';
import Filtermain from './components/filtermain';
import UserStyle from './components/userstyle';
import Detail from './components/backdetail';
import SaveCurrentPath from './components/utils/SaveCurrentPath'; // 경로 저장 컴포넌트 추가
import { Helmet } from 'react-helmet'; // react-helmet을 사용해 폰트 로드

// 전역 스타일 정의
const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Apple SD Gothic Neo", Inter, "Helvetica Neue", Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #ffffff;
    -webkit-font-smoothing: antialiased;  /* Safari에서 폰트 스무딩 활성화 */
    -moz-osx-font-smoothing: grayscale;   /* macOS에서 폰트 스무딩 활성화 */
  }
`;

function App() {
  return (
    <Router>
      <UserProvider>
        {/* 전역 스타일 적용 */}
        <Helmet>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
        </Helmet>
        <GlobalStyle />

        {/* 모든 페이지에서 경로를 저장하는 SaveCurrentPath 컴포넌트 */}
        <SaveCurrentPath /> 

        <Routes>
          <Route path="/" element={<MyComponent />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/input" element={<Input />} />
          <Route path="/mybookmark" element={<Mybookmark />} />
          <Route path="/mybrand" element={<Mybrand />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<Search />} />
          <Route path="/brand/:brandName" element={<Brand />} /> 
          <Route path="/filtermain" element={<Filtermain />} />
          <Route path="/userstyle/:id" element={<UserStyle />} />
          <Route path='/backdetail/:id' element={<Detail />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
