import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as ArrowLeftIcon } from '../assets/icons/ArrowLeft.svg';
import { ReactComponent as PersonIcon } from '../assets/icons/person.svg';
import loading from '../assets/icons/loading.gif';
import axios from 'axios';
import apiUrl from './utils/config';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 600px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  margin: 0 auto;
  overflow: hidden;
`;

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 58px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: relative;
  box-sizing: border-box;
`;

const Logo = styled.div`
  text-align: center;
  color: black;
  font-size: 20px;
  font-family: 'Inter';
  font-weight: 700;
  line-height: 41.6px;
  word-wrap: break-word;
  cursor: pointer;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: black;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
`;

const Message = styled.div`
  text-align: center;
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
  font-family: 'Inter';
  font-weight: ${props => props.fontWeight};
  line-height: ${props => props.lineHeight};
  word-wrap: break-word;
`;

const UploadSection = styled.label`
  width: 163px;
  height: 240px;
  background: #FAFAFB;
  border-radius: 12px;
  overflow: hidden;
  border: 3px dashed #E6E6E6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StyledPersonIcon = styled(PersonIcon)`
  width: 48px;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;  // 배경을 흰색으로 설정
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingImage = styled.img`
  max-width: 100vw;  // 화면 너비에 맞추기
  max-height: 100vh; // 화면 높이에 맞추기
  object-fit: contain;  // 이미지 비율 유지
`;

const Home = styled.div`
  text-align: center;
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
  font-family: 'Inter';
  font-weight: ${props => props.fontWeight};
  line-height: ${props => props.lineHeight};
  word-wrap: break-word;
  cursor: pointer;
`;

const ErrorContainer = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 600px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  margin: 0 auto;
  overflow: hidden;
`;

const ErrorHeader = styled.div`
  width: 100%;
  max-width: 600px;
  height: 58px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: relative;
  box-sizing: border-box;
`;

const ErrorMessage = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 24px;
  display: flex;
`;

const ErrorText = styled.div`
  text-align: center;
  color: #EC1313;
  font-size: 12px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;

function Input() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState('100vh');
  const [containerWidth, setContainerWidth] = useState('100vw');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const maxWidth = 744;
      const minWidth = 375;
      const maxHeight = 1133;
      const minHeight = 578;

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const newWidth = Math.min(Math.max(windowWidth, minWidth), maxWidth);
      const newHeight = Math.min(Math.max(windowHeight, minHeight), maxHeight);

      setContainerWidth(`${newWidth}px`);
      setContainerHeight(`${newHeight}px`);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 로그인 상태를 확인하고 없으면 로그인 페이지로 리디렉션
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [navigate, location]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    setIsLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/style`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data && response.data.id) {
        localStorage.setItem('imageData', JSON.stringify(response.data.data));
        navigate(`/userstyle/${response.data.id}`);
      } else {
        console.error('No ID returned from the server.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    const previousPage = localStorage.getItem('previousPage');
    
    if (previousPage) {
      // 이전 페이지로 이동
      navigate(previousPage);
    } else {
      // 이전 페이지가 없으면 메뉴로 이동
      navigate('/menu');
    }
  };

  const handleHomeClick = () => navigate('/');

  return (
    <Container style={{ width: containerWidth, height: containerHeight }}>
      {!error ? (
        <>
          <HeaderContainer>
            <Icon as={ArrowLeftIcon} onClick={handleBackClick} />
            <Logo>STYLE SEARCH</Logo>
          </HeaderContainer>
          <ContentContainer>
            <Message fontSize="20px" fontWeight="700" lineHeight="24px" color="black">
              스타일에 적합한 브랜드 추천을 위해 <br />
              전신 코디 사진을 업로드 하세요
            </Message>
            <UploadSection>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
              />
              <StyledPersonIcon />
              <Message fontSize="12px" fontWeight="600" lineHeight="15px" color="#BFBFBF">
                코디 사진
                <br />
                업로드하기
              </Message>
            </UploadSection>
            <Message fontSize="14px" fontWeight="400" lineHeight="21px" color="black">
              브래인드는 패션 브랜드들의 스타일 이미지를 학습해 사진의 <br />
              스타일과 유사한 브랜드를 예측해요. 스타일이 잘 드러나는
              <br />
              ‘전신 코디 사진’ 일수록 보다 잘 추천할 수 있어요.
            </Message>
            <Home
              fontSize="14px"
              fontWeight="600"
              lineHeight="21px"
              color="#A0A0A0"
              onClick={handleHomeClick}
            >
              홈으로 이동
            </Home>
          </ContentContainer>
        </>
      ) : (
        <ErrorContainer>
          <ErrorHeader>
            <Icon as={ArrowLeftIcon} onClick={handleBackClick} />
            <Logo>STYLE SEARCH</Logo>
          </ErrorHeader>
          <ErrorMessage>
            <Message fontSize="20px" fontWeight="700" lineHeight="24px" color="black">
              스타일에 적합한 브랜드 추천을 위해
              <br />
              전신 코디 사진을 업로드 하세요
            </Message>
            <UploadSection>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
              />
              <StyledPersonIcon />
              <Message fontSize="12px" fontWeight="600" lineHeight="15px" color="#BFBFBF">
                코디 사진
                <br />
                업로드하기
              </Message>
            </UploadSection>
            <ErrorText>
              *사진에서 스타일이 감지되지 않았어요!
              <br />
              다시 업로드 하세요
            </ErrorText>
            <Message fontSize="14px" fontWeight="400" lineHeight="21px" color="black">
              브래인드는 패션 브랜드들의 스타일 이미지를 학습해 사진의 <br />
              스타일과 유사한 브랜드를 예측해요. 스타일이 잘 드러나는
              <br />
              ‘전신 코디 사진’ 일수록 보다 잘 추천할 수 있어요.
            </Message>
            <Home
              fontSize="14px"
              fontWeight="600"
              lineHeight="21px"
              color="#A0A0A0"
              onClick={handleHomeClick}
            >
              홈으로 이동
            </Home>
          </ErrorMessage>
        </ErrorContainer>
      )}
      {isLoading && (
        <LoadingOverlay>
          <LoadingImage src={loading} alt="Loading..." />
        </LoadingOverlay>
      )}
    </Container>
  );
}

export default Input;
