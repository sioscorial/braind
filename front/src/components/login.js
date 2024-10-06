import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext';
import { ReactComponent as LogoSVG } from '../assets/icons/Logo.svg';
import apiUrl from './utils/config';

const maxWidth = 600;

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: ${maxWidth}px;
  margin: 120px auto auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10% 15%;
  box-sizing: border-box;
  @media (max-width: 768px) {
    padding: 8% 12%;
  }
  @media (max-width: 480px) {
    padding: 6% 10%;
  }
`;

const ContentArea = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 64px;
`;

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const LogoWrapper = styled.div`
  width: 240px;
  cursor: pointer;
`;

const Subtitle = styled.div`
  text-align: center;
  color: black;
  font-size: 18px;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 1.2;
  word-wrap: break-word;
  white-space: nowrap;
`;

const ActionArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const HomeLink = styled.div`
  text-align: center;
  color: #a0a0a0;
  font-size: 14px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 1.5;
  word-wrap: break-word;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  width: 222px;
  height: 49px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  
  #kakao-login-btn {
    width: 100%;
    height: 100%;
  }
`;

function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const { setUserId, setAccessToken } = useUser();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.Kakao.init('8d125425def80d83903c91ce78702de1');
      if (window.Kakao.isInitialized()) {
        window.Kakao.Auth.createLoginButton({
          container: '#kakao-login-btn',
          success: async (authObj) => {
            try {
              // 백엔드로 카카오 액세스 토큰을 전달
              const response = await axios.post(`${apiUrl}/users/login`, {
                accessToken: authObj.access_token,
              });
              
              const { accessToken, userId } = response.data;

              // JWT 토큰과 사용자 ID를 저장
              setAccessToken(accessToken);
              setUserId(userId);
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('userId', userId);

              // 저장된 이전 경로로 이동 (로그인 또는 메뉴 페이지는 제외됨)
              const previousPage = localStorage.getItem('previousPage') || '/';
              navigate(previousPage);
            } catch (error) {
              console.error('Failed to login with Kakao:', error);
              setLoginError('카카오 로그인에 실패했습니다. 다시 시도해주세요.');
            }
          },
          fail: (err) => {
            console.error('Kakao Login failed: ', err);
            setLoginError('카카오 로그인에 실패했습니다.');
          },
        });
      } else {
        console.error('Kakao SDK initialization failed.');
        setLoginError('카카오 SDK 초기화에 실패했습니다.');
      }
    };

    script.onerror = () => {
      console.error('Kakao SDK script failed to load.');
      setLoginError('카카오 SDK 로딩에 실패했습니다.');
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [navigate, setAccessToken, setUserId]);

  const goToHome = () => {
    navigate('/');
  };

  return (
    <LoginContainer>
      <ContentArea>
        <TitleArea>
          <LogoWrapper onClick={goToHome}>
            <LogoSVG width="100%" height="100%" />
          </LogoWrapper>
          <Subtitle>Fashion Brand Recommendation AI</Subtitle>
        </TitleArea>
        <ActionArea>
          {loginError && <p>{loginError}</p>}
          <ButtonWrapper>
            <div id="kakao-login-btn"></div>
          </ButtonWrapper>
          <HomeLink onClick={goToHome}>홈으로 가기</HomeLink>
        </ActionArea>
      </ContentArea>
    </LoginContainer>
  );
}

export default Login;
