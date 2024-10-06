import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as HeartIcon } from '../assets/icons/heartred.svg';
import { ReactComponent as HeartWIcon } from '../assets/icons/heartW.svg';
import { ReactComponent as HeaderLogoSVG } from '../assets/icons/Logo.svg';
import { useUser } from './UserContext';
import axios from 'axios';


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

// 메인 콘텐츠 시작

const MainContent = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 48px 20px;
  padding: 140px 24px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    justify-content: space-between;
  }

  @media (max-width: 374px) {
    padding: 160px 8px; // Reduce side padding for very small screens
  }
`;

const Card = styled.div`
  flex: 0 1 calc(33.333% - 14px);
  max-width: calc(33.333% - 14px);
  padding: 0;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  
  @media (max-width: 600px) {
    flex: 0 1 calc(50% - 10px);
    max-width: calc(50% - 10px);
  }
  
  @media (max-width: 374px) {
    flex: 0 1 calc(50% - 4px); // Adjust for 2 cards per row on very small screens
    max-width: calc(50% - 4px);
  }
`;

const CardContainer = styled.div`
  width: 100%;
  max-width: 161px;
  height: 200px;
  border: 1px solid #E6E6E6;
  position: relative;
  background: white;
  box-shadow: 0px 4px 30px rgba(27, 25, 86, 0.1);
  border-radius: 16px;
  top: 0;
  left: 0;

  @media (max-width: 375px) {
    max-width: 100%; // Allow full width on very small screens
  }
`;


const BrandNameKR = styled.div`
  position: relative;
  top: 40px; 
  left: 50%;
  transform: translateX(-50%);
  width: 110px; 
  text-align: center;
  color: black;
  font-size: 15px;
  font-family: 'Inter';
  font-weight: 700;
  line-height: 21px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
  overflow-wrap: break-word; 
  white-space: normal;
`;

const CardImage = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
  top: 32px;
  left: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain; // Changed from 'cover' to 'contain' to prevent cropping
  }
`;

const HeartIconContainer = styled.div`
  width: 40px;  // 하트 아이콘 크기를 더 크게 조정
  height: 40px; // 하트 아이콘 높이를 더 크게 조정
  position: absolute;
  top: 168px; // 위치 조정
  left: 51px; // 위치 조정
  padding: 10px; // 안쪽 여백 증가
  border-radius: 30px; // 둥근 모서리를 더욱 강조
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    width: 100%;  // SVG 아이콘의 크기를 컨테이너에 맞춤
    height: 100%; // SVG 아이콘의 높이를 컨테이너에 맞춤
  }
`;

function MyBrand() {
  const navigate = useNavigate();
  const [containerHeight, setContainerHeight] = useState('100vh');
  const [containerWidth, setContainerWidth] = useState('100vw');
  const { userId, accessToken } = useUser();
  const [styleData, setStyleData] = useState([]);
  const [liked, setLiked] = useState({});

  useEffect(() => {
    function updateSize() {
      setContainerWidth(Math.min(window.innerWidth, 744) + 'px');
      setContainerHeight(Math.min(window.innerHeight, 1133) + 'px');
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const fetchBrandLikes = async () => {
      if (!userId || !accessToken) return;

      try {
        const response = await axios.get('http://127.0.0.1:3001/likes/brandAll', {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: { user_id: userId },
        });

        const fullData = response.data.data;
        setStyleData(fullData);

        // 좋아요 상태 초기화
        const initialLiked = {};
        fullData.forEach((item) => {
          initialLiked[item.id] = true;
        });
        setLiked(initialLiked);
      } catch (error) {
        console.error('브랜드 데이터를 불러오는 데 실패했습니다:', error);
      }
    };
    fetchBrandLikes();
  }, [userId, accessToken]);

  const handleLogoClick = () => navigate('/');
  const handleMenuClick = () => navigate('/menu');
  const handleMystyleClick = () => navigate('/mybookmark');
  const handleMyBrandClick = () => navigate('/mybrand');
  const handleWishlistClick = () => navigate('/wishlist');

  const handleHeartClick = async (item) => {
    try {
      await axios.post(
        'http://127.0.0.1:3001/likes/brand',
        { brandId: item.id },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      setLiked((prevLiked) => ({
        ...prevLiked,
        [item.id]: !prevLiked[item.id],
      }));
    } catch (error) {
      console.error('좋아요 상태를 업데이트하는 데 실패했습니다:', error);
    }
  };

  const handleCardClick = (brandName) => {
    navigate(`/brand/${encodeURIComponent(brandName)}`);
  };
  

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
            <Title color="#A0A0A0" onClick={handleMystyleClick}>BOOKMARK</Title>
            <BottomBorder />
          </Section>
          <Section>
            <Title color="black" onClick={handleMyBrandClick} style={{ fontWeight: 'bold' }}>MY BRAND</Title>
            <BottomBorder active />
          </Section>
          <Section>
            <Title color="#A0A0A0" onClick={handleWishlistClick}>WISHLIST</Title>
            <BottomBorder />
          </Section>
        </HeaderContent>
      </HeaderBar>
      <MainContent>
        {styleData.map((item) => (
        <Card key={item.id} onClick={() => handleCardClick(item.brand_name_eng)}>
          <CardContainer>
            <CardImage>
              <img src={item.brand_logo_url} alt={`로고`} />
            </CardImage>
            <BrandNameKR>{item.brand_name_kr}</BrandNameKR>
            {/* <BrandNameEN>{item.brand_name_eng}</BrandNameEN> */}
            <HeartIconContainer onClick={(e) => { e.stopPropagation(); handleHeartClick(item); }}>
              {liked[item.id] ? <HeartIcon /> : <HeartWIcon />}
            </HeartIconContainer>
          </CardContainer>
        </Card>
        ))}
      </MainContent>
    </Container>
  );
}

export default MyBrand;
