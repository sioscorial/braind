import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes, css } from 'styled-components';
import { ReactComponent as BrandheartRIcon } from '../assets/icons/brand_heart_on.svg';
import { ReactComponent as BrandheartWIcon } from '../assets/icons/brand_heart.svg';
import { ReactComponent as ArrowRightIcon } from '../assets/icons/arrow.svg';
import { ReactComponent as MoreIcon } from '../assets/icons/expand_more.svg';
import { ReactComponent as FooterLogoSVG } from '../assets/icons/Logo_main.svg';
import { ReactComponent as NoBrandIcon } from '../assets/icons/nobrand.svg';
import { ReactComponent as InstagramLogo } from '../assets/icons/instagram_logo.svg';
import { ReactComponent as HeaderLogoSVG } from '../assets/icons/Logo.svg';
import { ReactComponent as XLogo } from '../assets/icons/x_logo.svg';
import SearchIcon from '../assets/icons/searchi.png';
import apiUrl from './utils/config';

const fadeOut = keyframes`
  0% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }
`;

// 스타일 컴포넌트 정의
const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 0; // Remove horizontal padding
`;

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 600px;
  position: fixed;
  top: 0;
  background: #fff;
  display: flex;
  justify-content: space-between; /* 로고와 메뉴 버튼을 양 끝으로 배치 */
  align-items: center;
  padding: 16px 24px;
  box-sizing: border-box;
  z-index: 1000;
  /* left: 50%; */
  /* transform: translateX(-50%); */ /* 중앙 정렬 제거 */
  overflow: hidden;
`;

const Logo = styled.div`
  width: 143px;
  height: 33px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const MenuButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
`;

// 헤더 끝

const Content = styled.div`
  margin-top: 65px;
  flex: 1;
`;

const ImageSection = styled.div`
  width: 100%;
  padding-bottom: 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: auto;
  background: #E6E6E6;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Caption = styled.div`
  width: calc(100% - 48px);
  max-width: 600px;
  color: black;
  font-size: 15px;
  font-family: 'Pretendard Variable';
  font-weight: 400;
  line-height: 24px;
  text-align: left; 
  margin: 0 24px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  padding: 0;
  margin: 0 24px;
  width: calc(100% - 48px);
`;

const Button = styled.div`
  padding: 8px;
  background: white;
  border-radius: 200px;
  border: 1px solid #404040;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const ButtonIcon = styled.div`
  width: 20px;
  height: 20px;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.div`
  color: #404040;
  font-size: 14px;
  font-family: 'Inter';
  font-weight: 500;
  line-height: 21px;
  letter-spacing: 0.3px;
`;

const RecommendationSection = styled.div`
  width: calc(100% - 48px); // Subtracting 48px to account for left and right margins
  margin: 40px 24px; // Added top/bottom and left/right margins
  box-sizing: border-box; // Added to include padding in width calculation
`;

const RecommendationHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 700;
  color: black;
`;

const IconWrapper = styled.div`
  width: 28px;
  height: 28px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const RecommendationList = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecommendationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
  background: white;
  position: relative;
  border-bottom: 1px solid #E0E0E0; 
`;

const BoldIndex = styled.div`
  font-weight: bold;
  font-size: 15px;
`;

const BrandLogoContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 0.5px solid #E0E0E0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BrandLogo = styled.img`
  width: 85%;
  height: 85%;
  object-fit: contain;
`;

const BrandInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
`;

const BrandNameHeartContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px; // This adds 4px spacing between BrandName and HeartIconContainer
`;

const BrandName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: black;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const HeartIconContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 768px) {
    right: 12px;
  }
`;

const MoreButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  color: black;
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0;
`;

const StyledMoreIcon = styled(MoreIcon)`
  width: 24px;
  height: 24px;
  margin-left: 8px;
`;

const StyleRecommendationSection = styled.div`
  width: calc(100% - 48px); // Full width of Container minus left and right margins
  margin: 40px 24px;
  box-sizing: border-box;
`;

const StyleRecommendationHeader = styled.div`
  margin-bottom: 24px;
  font-size: 20px;
  font-weight: 700;
  color: black;
`;

const StyleRecommendationList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // Two columns
  gap: 4px;
  width: 100%;
`;

const StyleImageContainer = styled.div`
  width: 100%;
  padding-top: ${(217 / 169) * 100}%; // Maintain 169:217 aspect ratio
  position: relative;
  overflow: hidden;
`;

const StyleImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FadeOutMessage = styled.div`
  animation: ${css`${fadeOut}`} 2s forwards;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  z-index: 1000;
`;

// 푸터 시작

const FooterWrapper = styled.footer`
  background-color: black;
  width: 100%;
  margin-top: 120px;
  padding: 24px 0;
`;

const FooterContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoContainer = styled.div`
  margin-bottom: 0px;
`;

const FooterLogo = styled(FooterLogoSVG)`
  width: 140px;
`;

const SocialMediaContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

const SocialButton = styled.a`
  cursor: pointer;
`;

const SocialIcon = styled.img`
  width: 50px;
  height: 50px;
`;

const TermsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TermButton = styled.a`
  color: #FFFFFF;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
`;

const Divider = styled.span`
  color: #515151;
`;
// NoBrandFound 컴포넌트
const NoBrandContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  padding: 40px 0;
`;

const NoBrandText = styled.div`
  text-align: center;
  color: black;
  font-size: 20px;
  font-family: 'Inter';
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
`;

const IconContainerNoBrand = styled.div`
  width: 180px;
  height: 180px;
  padding: 27.72px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 24px;
`;

const DescriptionText = styled.div`
  width: 343px;
  text-align: center;
  color: black;
  font-size: 14px;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0.3px;
  word-wrap: break-word;
`;

const RetryText = styled.div`
  text-align: center;
  color: #A0A0A0;
  font-size: 14px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0.3px;
  word-wrap: break-word;
  margin-top: 20px;
  cursor: pointer;
`;

// 푸터 끝

const NoBrandFound = () => {
  const navigate = useNavigate();

  const handleRetryClick = () => {
    navigate('/input'); // '/input' 경로로 이동
  };
  
  return (
    <NoBrandContainer>
      <NoBrandText>사진의 스타일과<br />유사한 브랜드가 없어요</NoBrandText>
      <DescriptionContainer>
        <IconContainerNoBrand>
          <NoBrandIcon width="127.69px" height="124.56px" />
        </IconContainerNoBrand>
        <DescriptionText>
          브래인드는 패션 브랜드들의 스타일 이미지를 학습해 사진의 스타일과 유사성을 예측해요.<br></br>
          스타일이 잘 드러나는 ‘전신 코디 사진’ 일수록 보다 잘 추천할 수 있어요
        </DescriptionText>
      </DescriptionContainer>
      <RetryText onClick={handleRetryClick}>다른 사진으로 다시 검색</RetryText>
    </NoBrandContainer>
  );
};

const Detail = () => {
  const navigate = useNavigate();
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleBrands, setVisibleBrands] = useState(10);
  const [brandLiked, setBrandLiked] = useState({});
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        navigate('/login', { state: { from: location.pathname } }); 
        return;
      }

      try {
        // 서버에서 데이터 받아오기
        const response = await axios.get(`${apiUrl}/style/latest`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        const filteredResults = response.data.data.results.filter(result => result.score >= 0.001);

        setImageData({ ...response.data.data, results: filteredResults });
        localStorage.setItem('imageData', JSON.stringify({ ...response.data.data, results: filteredResults })); // 로컬 스토리지에 최신 데이터 저장
        setLoading(false);
      } catch (error) {
        console.error('Error fetching image data:', error);
        // 서버에서 데이터를 받아오지 못한 경우, 로컬 스토리지에서 데이터를 불러오기
        const cachedImageData = localStorage.getItem('imageData');
        if (cachedImageData) {
          const parsedData = JSON.parse(cachedImageData);
          const filteredResults = parsedData.results.filter(result => result.score >= 0.001);
          setImageData({ ...parsedData, results: filteredResults });
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const fetchBrandLikeStatus = async () => {
      if (!imageData || !imageData.results) return;

      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) return;

      try {
        const likedStatuses = await Promise.all(
          imageData.results.map((brand) =>
            axios.get(`${apiUrl}/likes/brand/${brand.brand_id}`, {
              headers: { Authorization: `Bearer ${accessToken}` },
            })
          )
        );

        const newBrandLiked = likedStatuses.reduce((acc, response, index) => {
          acc[imageData.results[index].brand_id] = response.data.isLiked;
          return acc;
        }, {});

        setBrandLiked(newBrandLiked);
      } catch (error) {
        console.error('Failed to fetch brand like status:', error);
      }
    };

    fetchBrandLikeStatus();
  }, [imageData]);

  const handleHeartClick = async (brandId) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      navigate('/login', { state: { from: location.pathname } }); 
      return;
    }

    try {
      await axios.post(
        `${apiUrl}/likes/brand`,
        { brandId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      setBrandLiked((prevLiked) => ({
        ...prevLiked,
        [brandId]: !prevLiked[brandId],
      }));
    } catch (error) {
      console.error('Failed to update brand like status:', error);
    }
  };

  const handleShowMoreBrands = () => {
    setVisibleBrands((prevVisibleBrands) => prevVisibleBrands + 10);
  };

  const handleArrowClick = (brandNameEng) => {
    navigate(`/brand/${brandNameEng}`);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleMenuClick = () => {
    navigate('/menu');
  };

  const handleBrandNameClick = (brandNameEng) => {
    handleArrowClick(brandNameEng);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!imageData) {
    return <div>Error loading image data.</div>;
  }

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
      <Content>
        <ImageSection>
          <ImageContainer>
            <Image src={imageData.img_url} alt="Uploaded" />
          </ImageContainer>
        </ImageSection>

        {imageData.results && imageData.results.length > 0 ? (
          <RecommendationSection>
            <RecommendationHeader>
              <IconWrapper>
                <StyledImage src={SearchIcon} alt="Search Icon" />
              </IconWrapper>
              느낌이 비슷한 브랜드 추천
            </RecommendationHeader>
            <RecommendationList>
              {imageData.results.slice(0, visibleBrands).map((brand, index) => (
                <RecommendationItem key={brand.brand_id}>
                  <BrandInfo>
                    <BoldIndex>{index + 1}</BoldIndex> {/* 순위 번호 */}
                    <BrandLogoContainer>
                      <BrandLogo src={brand.brand_logo_url} alt={brand.brand} />
                    </BrandLogoContainer>
                    <BrandNameHeartContainer>
                      <BrandName onClick={() => handleBrandNameClick(brand.brand)}>
                        {brand.brand}
                      </BrandName>
                      <HeartIconContainer onClick={() => handleHeartClick(brand.brand_id)}>
                        {brandLiked[brand.brand_id] ? <BrandheartRIcon /> : <BrandheartWIcon />}
                      </HeartIconContainer>
                    </BrandNameHeartContainer>
                  </BrandInfo>
                  <ArrowButton onClick={() => handleArrowClick(brand.brand)}>
                    <ArrowRightIcon />
                  </ArrowButton>
                </RecommendationItem>
              ))}
            </RecommendationList>
            {imageData.results.length > visibleBrands && (
              <MoreButtonContainer>
                <MoreButton onClick={handleShowMoreBrands}>
                  브랜드 더보기
                  <StyledMoreIcon />
                </MoreButton>
              </MoreButtonContainer>
            )}
          </RecommendationSection>
        ) : (
          <NoBrandFound />
        )}
      </Content>
      <FooterWrapper>
        <FooterContent>
          <LogoContainer>
            <FooterLogo />
          </LogoContainer>
          <SocialMediaContainer>
            <SocialButton href="https://www.instagram.com/braind.mag" target="_blank" rel="noopener noreferrer">
              <SocialIcon as={InstagramLogo} />
            </SocialButton>
            <SocialButton href="https://x.com/braind_fashion" target="_blank" rel="noopener noreferrer">
              <SocialIcon as={XLogo} />
            </SocialButton>
          </SocialMediaContainer>
          <TermsContainer>
            <TermButton href="https://shell-memory-b8b.notion.site/BRAiND-AI-24e1c163ce814501a23f545c9572d122" target="_blank" rel="noopener noreferrer">
              서비스소개
            </TermButton>
            <Divider>|</Divider>
            <TermButton href="https://shell-memory-b8b.notion.site/61506121faf646dba7d64e6a7b60b118?pvs=4" target="_blank" rel="noopener noreferrer">
              이용약관
            </TermButton>
            <Divider>|</Divider>
            <TermButton href="https://shell-memory-b8b.notion.site/0391b1694a0d4b34a04a5a816ab1fd19?pvs=4" target="_blank" rel="noopener noreferrer">
              개인정보 처리방침
            </TermButton>
          </TermsContainer>
        </FooterContent>
      </FooterWrapper>
    </Container>
  );
};

export default Detail;
