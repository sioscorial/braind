import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as WishItemIcon } from '../assets/icons/wishitem.svg';
import { ReactComponent as WishItemWIcon } from '../assets/icons/wishitemW.svg';
import { ReactComponent as MusinsaIcon } from '../assets/icons/musinsa.svg';
import { ReactComponent as NaverIcon } from '../assets/icons/naverlink.svg';
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

// 위시리스트 시작

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
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
  background: white;
  border-bottom: 1px solid #E6E6E6;
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  gap: 16px;
  @media (max-width: 600px) {
    padding: 12px;
  }
`;

const BrandInfo = styled.div`
  width: 100%;
  height: 40px;
  position: relative;
`;

const BrandLogo = styled.div`
  width: 40px;
  height: 40px;
  left: 0;
  top: 0;
  position: absolute;
  background: white;
  border-radius: 100px;
  overflow: hidden;
  border: 0.5px solid #E6E6E6;
  justify-content: center;
  align-items: center;
  display: inline-flex;

  img {
    width: 85%;
    height: 85%;
    object-fit: contain;
  }
`;

const BrandNameKR = styled.div`
  left: 52px;
  top: 2px;
  position: absolute;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  display: inline-flex;
  color: black;
  font-size: 14px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0.3px;
  word-wrap: break-word;
`;

const BrandNameEN = styled.div`
  position: absolute;
  top: 20px;
  left: 52px;
  text-align: center;
  color: #575757;
  font-size: 10px;
  font-family: 'Inter';
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;

const ProductInfo = styled.div`
  width: 96%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardContent = styled.div`
  display: flex;
  gap: 16px; /* 이미지와 텍스트 사이 간격 */
`;


const ProductImage = styled.div`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  background: #BFBFBF;
  border-radius: 16px;
  overflow: hidden;

  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;


const ProductDetails = styled.div`
  flex-grow: 1;
  max-height: 100px;
  display: flex;
  flex-direction: column;
  gap: 0px;
  // justify-content: space-between;
`;

const ProductName = styled.div`
  color: black;
  font-size: 16px;
  font-family: 'Poppins';
  font-weight: 400;
  margin-bottom: 8px;
`;

const WishIconContainer = styled.div`
  position: absolute;
  top: 11px;
  right: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductGender = styled.div`
  color: #858585;
  font-size: 14px;
  font-family: 'Inter';
  font-weight: 400;
  margin-bottom: 8px;
`;

const ProductPrice = styled.div`
  color: black;
  font-size: 16px;
  font-family: 'Poppins';
  font-weight: 700;
  margin-bottom: 8px;
`;

const ShoppingLinks = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const ShoppingLink = styled.div`
  background: white;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const LinkInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 24px;
    height: 24px;
  }

  div {
    color: black;
    font-size: 12px;
    font-family: 'Inter';
    font-weight: 400;
  }
`;

// 위시리스트 끝

function Wishlist() {
  const navigate = useNavigate();
  const [containerHeight, setContainerHeight] = useState('100vh');
  const [containerWidth, setContainerWidth] = useState('100vw');
  const { userId, accessToken } = useUser();
  const [styleData, setStyleData] = useState([]);
  const [liked, setLiked] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


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
    const fetchItemLikes = async () => {
      if (!userId || !accessToken) return;

      try {
        const response = await axios.get(`${apiUrl}/likes/itemAll`, {
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
    fetchItemLikes();
  }, [userId, accessToken]);

  const handleLogoClick = () => navigate('/');
  const handleMenuClick = () => navigate('/menu');
  const handlemybookmarkClick = () => navigate('/mybookmark');
  const handleMyBrandClick = () => navigate('/mybrand');
  const handleWishlistClick = () => navigate('/wishlist');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCardClick = (brandName) => {
    navigate(`/brand/${encodeURIComponent(brandName)}`);
  };
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleWishClick = async (item) => {
    try {
      await axios.post(
        `${apiUrl}/likes/item`,
        { itemId: item.id },
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

  return (
    <Container>
      <HeaderContainer>
        <Logo onClick={() => navigate('/')}>
          <HeaderLogoSVG width="143" height="33" />
        </Logo>
        <MenuButton>
          <MenuIconLines onClick={() => navigate('/menu')}>
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
            <Title color="#A0A0A0" onClick={() => navigate('/mybookmark')}>BOOKMARK</Title>
            <BottomBorder />
          </Section>
          <Section>
            <Title color="#A0A0A0" onClick={() => navigate('/mybrand')}>MY BRAND</Title>
            <BottomBorder />
          </Section>
          <Section>
            <Title color="black" onClick={() => navigate('/wishlist')} style={{ fontWeight: 'bold' }}>WISHLIST</Title>
            <BottomBorder active />
          </Section>
        </HeaderContent>
      </HeaderBar>
      <MainContent>
        {styleData && styleData.length > 0 ? (
          styleData.map((item) => (
            <Card key={item.id} onClick={() => handleCardClick(item.brand_name_eng)}>
              <BrandInfo>
                <BrandLogo>
                  <img src={item.brand_logo_url} alt="로고" />
                </BrandLogo>
                <BrandNameKR>{item.brand_name_kr}</BrandNameKR>
                <BrandNameEN>{item.brand_name_eng}</BrandNameEN>
              </BrandInfo>
              <ProductInfo>
                <CardContent>
                  <ProductImage>
                    <img src={item.img_url} alt="상품 이미지" />
                  </ProductImage>
                  <ProductDetails>
                    <ProductName>{item.name}</ProductName>
                    <ProductGender>{item.gender}</ProductGender>
                    <ProductPrice>{formatPrice(item.price)}원</ProductPrice>
                  </ProductDetails>
                </CardContent>
                <ShoppingLinks>
                  <ShoppingLink as="a" href={item.musinsa_link} target="_blank">
                    <LinkInfo>
                      <MusinsaIcon />
                    </LinkInfo>
                  </ShoppingLink>
                  <ShoppingLink as="a" href={item.naver_link} target="_blank">
                    <LinkInfo>
                      <NaverIcon />
                    </LinkInfo>
                  </ShoppingLink>
                </ShoppingLinks>
              </ProductInfo>
              <WishIconContainer onClick={(e) => {
                e.stopPropagation(); 
                handleWishClick(item);
              }}>
                {liked[item.id] ? <WishItemIcon /> : <WishItemWIcon />}
              </WishIconContainer>
            </Card>
          ))
        ) : (
          <p>No WishList found.</p>
        )}
      </MainContent>
    </Container>
  );
}

export default Wishlist;
