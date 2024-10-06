import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import apiUrl from './utils/config';

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background: #F2F4F8;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px; /* 작은 화면에서 패딩 추가 */
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px; /* 최대 너비를 설정하여 큰 화면에서는 중앙에 적절히 위치하도록 */
  padding: 40px 20px; /* 패딩을 조정하여 작은 화면에서 레이아웃이 망가지지 않도록 */
  background: white;
  border: 1px #DDE1E6 solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  box-sizing: border-box; /* 패딩과 보더가 전체 너비에 포함되도록 설정 */
`;

const Title = styled.div`
  text-align: center;
  color: #21272A;
  font-size: 36px;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
`;

const InputContainer = styled.div`
  width: 100%;
  max-width: 300px; /* 최대 너비를 300px로 제한 */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
`;

const Label = styled.label`
  color: #21272A;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  line-height: 1.4;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 14px; /* 패딩을 줄여서 입력 칸 높이도 줄임 */
  background: #F2F4F8;
  border: 1px solid #C1C7CD;
  font-size: 14px; /* 폰트 크기를 줄여 입력 칸의 전체 크기를 줄임 */
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  color: #21272A;
  line-height: 1.4;

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 12px; /* 작은 화면에서는 더 작은 폰트와 패딩 */
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 16px 12px;
  background: #0F62FE;
  border: 2px #0F62FE solid;
  color: white;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: #0353e9;
  }

  @media (max-width: 768px) {
    padding: 14px 10px;
    font-size: 14px;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  margin-top: 8px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const LoginScreen = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log('Attempting to log in with:', id, password);

      const response = await fetch(`${apiUrl}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: id, password: password }),
      });

      console.log('Server response status:', response.status);

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful, storing token:', data.accessToken);
        localStorage.setItem('accessToken', data.accessToken);
        window.location.href = '/';
      } else {
        console.log('Login failed, server message:', data.message);
        setError(data.message);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred');
    }
  };

  return (
    <Background>
      <Container>
        <Title>BRAiND Admin</Title>
        <Form>
          <InputContainer>
            <Label htmlFor="id">ID</Label>
            <Input
              type="text"
              id="id"
              placeholder="아이디 입력"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputContainer>
          <Button onClick={handleLogin}>로그인</Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </Container>
    </Background>
  );
};

export default LoginScreen;