import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as TrashIcon } from '../assets/icons/delete.svg';
import { ReactComponent as ButtonIcon } from '../assets/icons/button.svg';
import { ReactComponent as HeaderLogoSVG } from '../assets/icons/Logo.svg';
import { useUser } from './UserContext';
import axios from 'axios';
import apiUrl from './utils/config';

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100%;
  position: relative;
  background: white;
  margin: 0 auto;
`;

// 헤더 시작

const HeaderContainer = styled.div`
  width: 100%; /* 화면 크기에 맞게 설정 */
  max-width: 600px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  display: flex;
  align-items: center;
  padding: 16px 24px;
  box-sizing: border-box;
  z-index: 1000;
  overflow: hidden;
`;

const Logo = styled.div`
  width: 143px;
  height: 33px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: auto; /* 로고를 왼쪽으로 고정 */
`;

const MenuButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute; /* 우측 패딩 24px에 고정 */
  right: 24px; /* 우측 패딩 위치에 고정 */
`;

const MenuIconLines = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
`;

const MenuLine = styled.div`
  width: 24px;
  height: 2px;
  background: black;
`
// 헤더 끝

// 3탭 시작

const HeaderBar = styled.div`
  width: 100%;
  max-width: 600px;
  height: 58px;
  position: absolute;
  top: 58px;
  left: 50%;
  transform: translateX(-50%);
`;

const BorderLine = styled.div`
  width: 100%;
  max-width: 600px;
  height: 0;
  position: absolute;
  top: 56px;
  border-top: 2px solid #F2F2F2;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Section = styled.div`
  width: 33.33%;
  height: 58px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 17px;
`;

const Title = styled.div`
  text-align: center;
  color: ${props => props.color};
  font-size: 18px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 25.20px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
  cursor: pointer;
`;

const BottomBorder = styled.div`
  width: 25%;
  height: 0;
  position: absolute;
  top: 55px;
  border-top: 4px solid ${props => props.active ? '#191A1D' : 'transparent'};
`;

// 3탭 끝

// 북마크 콘텐츠 시작

const MainContent = styled.div`
  width: calc(100% - 48px);
  max-width: 600px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  padding: 140px 24px 100px; // Added horizontal padding
`;

const Card = styled.div`
  width: calc(100vw - 48px);
  max-width: 440px;
  min-width: 320px;
  padding: 24px 24px 32px;
  background: white;
  border-radius: 16px;
  border: 1px solid #E6E6E6;
  box-shadow: 0px 4px 30px rgba(27, 25, 86, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin: 0 auto; // Center the card
`;

const CardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start; /* 변경된 부분 */
  align-items: center;
`;

const DateText = styled.div`
  color: #A0A0A0;
  font-size: 12px;
  font-family: 'Inter';
  font-weight: 500;
  line-height: 18px;
  word-wrap: break-word;
  margin-right: auto; /* 왼쪽으로 붙이는 효과 */
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: black;
  font-size: 3vw;
  pointer-events: auto;
`;

const TrashIconWrapper = styled.div`
  cursor: pointer;
  pointer-events: auto;
`;

const CardImage = styled.div`
  width: calc(100% - 80px); // Subtracting 80px for left and right margins
  max-width: 320px; // Adjusted to account for margins
  min-width: 240px; // Adjusted to account for margins
  margin: 0 40px; // Adding left and right margins
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;


const BrandLogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  align-items: center;
  gap: 10px;
`;

const BrandLogo = styled.div`
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 100%;
  overflow: hidden;
  border: 0.5px #F2F2F2 solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BrandImage = styled.img`
  width: 30px;
  height: auto;
`;

const ButtonContainer = styled.div`
  width: 279px;
  height: 20px;
  padding: 16px;
  background: white;
  border-radius: 16px;
  border: 1px solid #BFBFBF;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const ButtonContent = styled.div`
  flex: 1 1 0;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const ButtonText = styled.div`
  text-align: justify;
  color: black;
  font-size: 14px;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;

// 북마크 콘텐츠 끝


function Bookmark() {
  const navigate = useNavigate();
  const { userId, accessToken } = useUser();
  const [bookmarkData, setBookmarkData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchBookmarkData = async () => {
      if (!userId || !accessToken) return;

      try {
        const response = await axios.get(`${apiUrl}/likes/bookmarkAll`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setBookmarkData(response.data.data);
      } catch (error) {
        console.error('북마크 데이터를 불러오는 데 실패했습니다:', error);
      }
    };
    fetchBookmarkData();
  }, [userId, accessToken]);

  const toggleBookmark = async (backImgId) => {
    try {
      await axios.post(`${apiUrl}/likes/bookmark`, {
        backImgId,
      }, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setBookmarkData(prevData => prevData.filter(item => item.back_img_id !== backImgId));
    } catch (error) {
      console.error('북마크 토글 실패:', error);
    }
  };

  const handleTrashClick = (item) => {
    toggleBookmark(item.back_img_id);
  };

  const handleCardClick = (id) => {
    navigate(`/backdetail/${id}`);
};

  const handleLogoClick = () => navigate('/');
  const handleMenuClick = () => navigate('/menu');
  const handleSearchClick = () => navigate('/search');
  const handleInputClick = () => navigate('/input');
  const handleBookmarkClick = () => navigate('/bookmark');
  const handleMyBrandClick = () => navigate('/mybrand');
  const handleWishlistClick = () => navigate('/wishlist');

  return (
    <Container>
      <HeaderContainer>
        <Logo onClick={handleLogoClick}>
          <HeaderLogoSVG width="143" height="33" />
        </Logo>
        <MenuButton>
          <MenuIconLines onClick={handleMenuClick}>
            <MenuLine />
            <MenuLine />
            <MenuLine />
          </MenuIconLines>
        </MenuButton>
      </HeaderContainer>
      <HeaderBar>
        <BorderLine />
        <HeaderContent>
          <Section>
            <Title color="black" onClick={handleBookmarkClick} style={{ fontWeight: 'bold' }}>BOOKMARK</Title>
            <BottomBorder active />
          </Section>
          <Section>
            <Title color="#A0A0A0" onClick={handleMyBrandClick}>MY BRAND</Title>
            <BottomBorder />
          </Section>
          <Section>
            <Title color="#A0A0A0" onClick={handleWishlistClick}>WISHLIST</Title>
            <BottomBorder />
          </Section>
        </HeaderContent>
      </HeaderBar>
      <MainContent>
        {bookmarkData.length > 0 ? (
          bookmarkData.map((item) => (
            <Card key={item.back_img_id}>
              <CardHeader>
                <DateText>{new Date(item.created_at).toLocaleDateString()}</DateText>
                <TrashIconWrapper onClick={() => handleTrashClick(item)}>
                  <Icon as={TrashIcon} />
                </TrashIconWrapper>
              </CardHeader>
              <CardImage onClick={() => handleCardClick(item.back_img_id)}>
                <img src={item.img_path} alt="북마크 이미지" />
              </CardImage>
            
              <BrandLogoContainer>
                {item.brands && item.brands.slice(0, 6).map((brand, index) => (
                  <BrandLogo key={index}>
                    <BrandImage src={brand.brand_logo_url} alt={`브랜드 로고 ${index + 1}`} />
                  </BrandLogo>
                ))}
              </BrandLogoContainer>
              <ButtonContainer onClick={() => navigate('/input')}>
                <ButtonContent>
                  <ButtonIcon style={{ width: '24px', height: '24px' }} />
                  <ButtonText>스타일로 브랜드 추천받기</ButtonText>
                </ButtonContent>
              </ButtonContainer>
            </Card>
          ))
        ) : (
          <p>No BookMarks Found.</p>
        )}
      </MainContent>
    </Container>
  );
}

export default Bookmark;
