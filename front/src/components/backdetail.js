import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation  } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes, css } from 'styled-components';
import { ReactComponent as BookmarkIcon } from '../assets/icons/bookmarkB.svg';
import { ReactComponent as BookmarkFilledIcon } from '../assets/icons/bookmark-filledB.svg';
import { ReactComponent as ShareIcon } from '../assets/icons/share.svg';
import { ReactComponent as BrandheartRIcon } from '../assets/icons/brand_heart_on.svg';
import { ReactComponent as BrandheartWIcon } from '../assets/icons/brand_heart.svg';
import { ReactComponent as ArrowRightIcon } from '../assets/icons/arrow_forward_resultpage.svg';
import { ReactComponent as MoreIcon } from '../assets/icons/expand_more.svg';
import { ReactComponent as HeaderLogoSVG } from '../assets/icons/Logo.svg';
import { ReactComponent as FooterLogoSVG } from '../assets/icons/Logo_main.svg';
import { ReactComponent as InstagramLogo } from '../assets/icons/instagram_logo.svg';
import { ReactComponent as XLogo } from '../assets/icons/x_logo.svg';
import SearchIcon from '../assets/icons/searchi.png';
import { useCopyToClipboard } from 'react-use';
import apiUrl from './utils/config';


const fadeOut = keyframes`
  0% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }
`;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 0; // Remove horizontal padding
`;

// 헤더 시작

const HeaderContainer = styled.div`
  width: 100%;
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
`;

// 헤더 끝


const Content = styled.div`
  margin-top: 65px;
  flex: 1;
`;

const ImageSection = styled.div`
  width: 100%;
  padding-bottom: 32px;
  border-bottom: 1px solid #BFBFBF;
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
  cursor: pointer;
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

// 푸터 끝


const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleBrands, setVisibleBrands] = useState(10);
  const [bookmarkedItems, setBookmarkedItems] = useState({});
  const [brandLiked, setBrandLiked] = useState({});
  const [styleImages, setStyleImages] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [, copyToClipboard] = useCopyToClipboard();
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0); // 페이지가 로드될 때 스크롤을 맨 위로 이동
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/back/img?id=${id}`);
            setImageData(response.data.data);

            const token = localStorage.getItem('accessToken');

            if (token) {
                // Access token이 있을 때만 북마크와 브랜드 찜 상태를 가져옵니다.
                const bookmarkResponse = await axios.get(`${apiUrl}/likes/bookmarkAll`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const initialBookmarkedItems = bookmarkResponse.data.data.reduce((acc, item) => {
                    acc[item.back_img_id] = true;
                    return acc;
                }, {});
                setBookmarkedItems(initialBookmarkedItems);

                const brandResponse = await axios.get(`${apiUrl}/likes/brandAll`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const initialBrandLiked = brandResponse.data.data.reduce((acc, item) => {
                    acc[item.id] = true; // `item.id`는 brand의 id를 의미합니다.
                    return acc;
                }, {});
                setBrandLiked(initialBrandLiked);
            }

        } catch (error) {
            console.error('Error fetching image data or liked brands:', error);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, [id]);


useEffect(() => {
  const fetchStyleImages = async () => {
    try {
      const response = await axios.get(`${apiUrl}/back`);
      const images = response.data.randomImg.map(item => ({
        id: item.id, // 고유 ID
        img_path: item.img_path // 이미지 경로
      }));
      setStyleImages(images);
    } catch (error) {
      console.error('Error fetching style images:', error);
    }
  };

  fetchStyleImages();
}, []);

const handleBookmarkClick = async () => {
  const isBookmarked = bookmarkedItems[id];
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    navigate('/login', { state: { from: location.pathname } }); 
    return;
  }

  try {
    await axios.post(
      `${apiUrl}/likes/bookmark`,
      { backImgId: id },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setBookmarkedItems((prevState) => ({
      ...prevState,
      [id]: !isBookmarked,
    }));
  } catch (error) {
    console.error('Error toggling bookmark:', error);
  }
};

  const handleShareClick = () => {
    copyToClipboard(window.location.href);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const handleHeartClick = async (brand_id) => {
    const accessToken = localStorage.getItem('accessToken');
  
    if (!accessToken) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
  
    try {
      await axios.post(
        `${apiUrl}/likes/brand`,
        { brandId: brand_id },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
  
      setBrandLiked((prevLiked) => ({
        ...prevLiked,
        [brand_id]: !prevLiked[brand_id],
      }));
    } catch (error) {
      console.error('Failed to update brand like status:', error);
    }
  };
  

  const handleShowMoreBrands = () => {
    setVisibleBrands((prevVisibleBrands) => prevVisibleBrands + 10);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!imageData) {
    return <div>Error loading image data.</div>;
  }

  const handleLogoClick = () => {
    navigate('/');
  };
  
  const handleMenuClick = () => {
    navigate('/menu');
  };

  const handleBrandNameClick = async (brand_name_eng) => {
    navigate(`/brand/${encodeURIComponent(brand_name_eng)}`);
};

  const handleStyleImageClick = (id) => {
    navigate(`/backdetail/${id}`);
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
      <Content>
        <ImageSection>
          <ImageContainer>
            <Image src={imageData.img_path} alt="Uploaded" />
          </ImageContainer>
          <Caption>{imageData.caption}</Caption>
          <ButtonGroup>
            <Button onClick={handleBookmarkClick}>
              <ButtonIcon>
                {bookmarkedItems[id] ? <BookmarkFilledIcon /> : <BookmarkIcon />}
              </ButtonIcon>
              <ButtonText>{bookmarkedItems[id] ? '북마크 해제' : '보관하기'}</ButtonText>
            </Button>
            <Button onClick={handleShareClick}>
              <ButtonIcon><ShareIcon /></ButtonIcon>
              <ButtonText>공유하기</ButtonText>
            </Button>
          </ButtonGroup>
        </ImageSection>
        <RecommendationSection>
          <RecommendationHeader>
          <IconWrapper>
            <StyledImage src={SearchIcon} alt="Search Icon" />
              </IconWrapper>
              느낌이 비슷한 브랜드 추천
              </RecommendationHeader>
          <RecommendationList>
  {imageData.brands &&
    imageData.brands.slice(0, visibleBrands).map((brand, index) => (
      <RecommendationItem key={brand.id} onClick={() => handleBrandNameClick(brand.brand_name_eng)}>
        <BrandInfo>
          <BoldIndex>{index + 1}</BoldIndex>  {/* 숫자 */}
          <BrandLogoContainer>
            <BrandLogo src={brand.brand_logo_url} alt={`${brand.brand_name_eng} logo`} />
          </BrandLogoContainer>
          <BrandNameHeartContainer>
          <BrandName>
            {brand.brand_name_kr}
          </BrandName>
          <HeartIconContainer onClick={(e) => {
        e.stopPropagation(); // 클릭이 부모로 전파되는 것을 막음
        handleHeartClick(brand.brand_id);
      }}>
        {brandLiked[brand.brand_id] ? <BrandheartRIcon /> : <BrandheartWIcon />}
      </HeartIconContainer>
        </BrandNameHeartContainer>
        </BrandInfo>
        <ArrowButton onClick={() => handleBrandNameClick(brand.brand_name_eng)}>
          <ArrowRightIcon />
        </ArrowButton>
      </RecommendationItem>
    ))}
</RecommendationList>

          {imageData.brands && imageData.brands.length > visibleBrands && (
            <MoreButtonContainer>
            <MoreButton onClick={handleShowMoreBrands}>
              브랜드 더보기
              <StyledMoreIcon />
            </MoreButton>
          </MoreButtonContainer>
          )}
        </RecommendationSection>
        <StyleRecommendationSection>
        <StyleRecommendationHeader>추천 스타일</StyleRecommendationHeader>
        <StyleRecommendationList>
          {styleImages.length > 0 &&
            styleImages
              .filter((styleImage) => styleImage.id !== imageData.id)  
              .slice(0, 10)
              .map(({ id, img_path }) => (
                <StyleImageContainer key={id} onClick={() => handleStyleImageClick(id)}>
                  <StyleImage src={img_path} alt={`Style ${id}`} />
                </StyleImageContainer>
              ))}
        </StyleRecommendationList>
      </StyleRecommendationSection>
      </Content>

      {showMessage && <FadeOutMessage>클립보드에 저장되었습니다.</FadeOutMessage>}

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