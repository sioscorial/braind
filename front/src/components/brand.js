import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams, useNavigate, useLocation  } from 'react-router-dom';
import { ReactComponent as WishItemIcon } from '../assets/icons/wishitem.svg';
import { ReactComponent as WishItemWIcon } from '../assets/icons/wishitemW.svg';
import { ReactComponent as MusinsaIcon } from '../assets/icons/musinsa.svg';
import { ReactComponent as NaverIcon } from '../assets/icons/naverlink.svg';
import { ReactComponent as BrandheartRIcon } from '../assets/icons/heart-on.svg';
import { ReactComponent as BrandheartWIcon } from '../assets/icons/favorite_border.svg';
import { ReactComponent as HeaderLogoSVG } from '../assets/icons/Logo_main.svg';
import { useUser } from './UserContext';
import apiUrl from './utils/config';


const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  height: 100%;
  position: relative;
  background: white;
  display: flex;
  flex-direction: column;
  // justify-content: flex-start;
  align-items: center;
  padding-bottom: 10px;
`;



const Wrapper = styled.div`
  width: 100%; /* 화면 너비와 같게 설정 */
  max-width: 600px;
  height: 320px; /* 고정된 높이로 설정 (예시로 600px로 설정) */
  background: black;
  padding-bottom: 20px;
  margin: 0; /* 자동 마진 제거 */
  box-sizing: border-box; /* 패딩과 테두리를 너비에 포함시킴 */
  position: relative; /* 부모 요소와의 위치 관계를 설정 */
`;

// 헤더 시작

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
  background: white;
`

const HeaderContainer = styled.div`
  width: 100%; /* 화면 크기에 맞게 설정 */
  max-width: 600px;
  position: fixed;
  top: 0;
  background: black;
  display: flex;
  align-items: center;
  padding: 16px 24px;
  box-sizing: border-box;
  z-index: 1000;
  overflow: hidden;
  /* 중앙 정렬을 위해 transform 제거 */
`;

const Logo = styled.div`
  width: 143px;
  height: 33px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: auto; /* 로고를 왼쪽으로 고정 */
`;

// 헤더 끝

// 브랜드 정보 시작


const ProfileWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  padding-top: 80px; /* 상단 패딩을 96px로 조정 */
  padding-left: 24px;
  // margin: 10px 10px 0 10px; /* 기존 상단 여백 제거 */
`;


const ProfileImage = styled.div`
  width: 100px; /* 이미지 가로 크기 고정 */
  height: 100px; /* 이미지 세로 크기 고정 */
  padding: 0; 
  background: white;
  border-radius: 50%; 
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  flex-shrink: 0; 

  img {
    width: 85%;
    height: 85%;
    object-fit: contain; /* 이미지 비율을 유지하면서 전체 공간 채우기 */
  }
`;

const ProfileInfo = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 15px; /* 위쪽 여백은 유지, 필요에 따라 조정 */
  margin-bottom: 5px; /* 하단 여백을 줄여 텍스트와 버튼 사이의 간격을 줄임 */
`;

const ProfileName = styled.div`
  width: 100%;
  color: white;
  font-size: 22px; /* 폰트 크기 */
  font-family: 'Inter';
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
  margin-top: 0; /* 위쪽 여백 제거 */
`;


const ProfileBrand = styled.div`
  width: 100%;
  color: white;
  font-size: 16px; /* 영어 브랜드명 폰트 크기 */
  font-family: 'Inter';
  font-weight: 500;
  line-height: 22.4px;
  letter-spacing: 0.2px;
  word-wrap: break-word;
  margin-top: 10px; /* 위쪽 여백 추가 */
`;

const ProfileYear = styled.div`
  width: 100%;
  color: white;
  font-size: 16px; /* 'Since' 폰트 크기 */
  font-family: 'Inter';
  font-weight: 500;
  line-height: 21px;
  letter-spacing: 0.3px;
  word-wrap: break-word;
  margin-top: 6px; /* 위쪽 여백 추가 */
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px; 
  width: calc(100% - 48px); /* 좌우 패딩을 고려하여 width 계산 */
  padding: 0 24px; /* 좌우 패딩 24px 적용 */
  padding-bottom: 24px; /* 하단 패딩 40px 적용 */
  cursor: pointer;
`;

const Button = styled.div`
  height: 48px; /* 버튼 크기 */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* 버튼을 전체 가로로 확장 */
  margin-top: 0; /* 여백을 제거 또는 줄임 */
`;

const ButtonInner = styled.div`
  width: 100%;
  height: 40px;
  padding: 8px;
  background: white;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 0; /* 여백을 제거하거나 줄임 */
`;

const ButtonIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;

  svg {
    width: 100%;
    height: 100%;
  }
`;


const WrapperW = styled.div`
  width: 100%;
  max-width: 600px; /* 가로 최대 600px로 제한 */
  height: auto;
  background: white;
  padding-bottom: 20px;
  margin: 0 auto;
`;


const ItemWrapper = styled.div`
  width: 100% /* 화면 너비에 맞게 조정 */
  max-width: 600px; /* 화면 너비를 초과하지 않도록 설정 */
  background: white;
  padding: 24px;
  display: flex;
  justify-content: space-between; /* 제목과 버튼을 양 끝에 배치 */
  align-items: center; /* 세로 정렬 */
  box-sizing: border-box;
`;

const ItemTitle = styled.div`
  color: black;
  font-size: 20px;
  font-family: 'Inter';
  font-weight: 700;
  line-height: 19.2px;
  word-wrap: break-word;
`;

const ItemSortWrapper = styled.div`
  align-self: stretch;
  display: inline-flex;
  background: white;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
`;

const ItemSortLatest = styled.div`
  color: black;
  font-size: 14px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0.3px;
  word-wrap: break-word;
`;

const ItemSortPopular = styled.div`
  color: #A0A0A0;
  font-size: 14px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0.3px;
  word-wrap: break-word;
`;

const CategoryWrapper = styled.div`
  width: calc(100% - 32px);
  max-width: 600px;
  // width: 100%; /* 화면 너비에 맞게 조정 */
  padding: 0px 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: white;
`;

const CategoryList = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  overflow-x: auto; /* 좌우 스크롤 활성화 */
  white-space: nowrap; /* 버튼들이 한 줄로 나열되도록 설정 */
`;

const CategoryButton = styled.div`
  padding: 10px 20px;
  background: ${props => props.active ? 'black' : '#FAFAFB'};
  border-radius: 20px;
  border: 1px ${props => props.active ? 'black' : '#E6E6E6'} solid;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%; /* 고정된 너비 */
  box-sizing: border-box; /* 패딩과 테두리 포함하여 너비 계산 */
`;

const CategoryText = styled.div`
  text-align: center;
  color: ${props => props.active ? '#FAFAFB' : '#A0A0A0'};
  font-size: 12px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0.3px;
  word-wrap: break-word;
`;

const PaginationWrapper = styled.div`
  width: (100% - 32px);
  max-width: 600px;
  height: 100%;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 13px;
`;

const PageNumber = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const PageNumberBackground = styled.div`
  width: 45px;
  height: 45px;
  left: 0;
  top: 0;
  position: absolute;
  background: ${({ active }) => (active ? 'black' : '#F2F2F2')};
  box-shadow: ${({ active }) => (active ? '0px 8px 16px rgba(0, 0, 0, 0.40)' : 'none')};
  border-radius: ${({ active }) => (active ? '30px' : '22.50px')};
`;

const PageNumberText = styled.div`
  left: ${({ number }) => (number >= 10 ? '14px' : '18px')};
  top: 11px;
  position: absolute;
  text-align: center;
  color: ${({ active }) => (active ? 'white' : '#404040')};
  font-size: 16px;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.3px;
  word-wrap: break-word;
`;

const NextButton = styled.div`
  width: 45px;
  height: 45px;
  background: #F2F2F2;
  border-radius: 22.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const NextButtonText = styled.div`
  color: #404040;
  font-size: 24px;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.3px;
`;

const MainContent = styled.div`
  width: (100% - 32px);
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
  padding: 16px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
  background: white;
  border-bottom: 1px solid #E6E6E6; /* 추가된 하단 회색 보더 */
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  gap: 16px;

  @media (max-width: 600px) {
    padding: 12px;
  }
`;
const CardContent = styled.div`
  display: flex;
  gap: 16px; /* 이미지와 텍스트 사이 간격 */
`;

const ProductInfo = styled.div`
  flex-grow: 1;
  max-height: 100px;
  display: flex;
  flex-direction: column;
  gap: 0px;
  // justify-content: space-between;
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
  width: 96%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  margin-bottom: 8px; /* 가격과 링크 버튼 사이에 여백 추가 */
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

// 아이템 리스트 끝

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];
  
  // 현재 페이지 그룹 계산
  const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);

  // 페이지 번호 렌더링
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(
      <PageNumber key={i} onClick={() => onPageChange(i)}>
        <PageNumberBackground active={currentPage === i} />
        <PageNumberText active={currentPage === i} number={i}>
          {i}
        </PageNumberText>
      </PageNumber>
    );
  }

  // 화살표 클릭 핸들러
  const handleNextGroupClick = () => {
    if (endPage < totalPages) {
      onPageChange(startPage + 10);
    }
  };

  const handlePreviousGroupClick = () => {
    if (startPage > 1) {
      onPageChange(startPage - 10);
    }
  };

  return (
    <PaginationWrapper>
      {startPage > 1 && (
        <NextButton onClick={handlePreviousGroupClick}>
          <NextButtonText>&lt;</NextButtonText>
        </NextButton>
      )}
      {pageNumbers}
      {endPage < totalPages && (
        <NextButton onClick={handleNextGroupClick}>
          <NextButtonText>&gt;</NextButtonText>
        </NextButton>
      )}
    </PaginationWrapper>
  );
};

function App() {
  const navigate = useNavigate();
  const [brandInfo, setBrandInfo] = useState(null);  // 브랜드 정보를 저장할 상태
  const [items, setItems] = useState([]); 
  const [filteredItems, setFilteredItems] = useState([]); 
  const [currentItems, setCurrentItems] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('latest');
  const { brandName } = useParams(); 
  const { accessToken } = useUser();
  const [liked, setLiked] = useState({});
  const [brandLiked, setBrandLiked] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const sendClickEvent = async () => {
      if (!brandInfo || !brandInfo.brandId) return;
  
      try {
        await axios.post(`${apiUrl}/admin/clicks`, {
          type: 'brand',  // 'brand' 타입으로 설정
          id: brandInfo.brandId  // brandId를 보냄
        });
      } catch (error) {
        console.error('Failed to send brand click event:', error);
      }
    };
  
    // 브랜드 정보가 로드된 후에 클릭 이벤트 전송
    if (brandInfo) {
      sendClickEvent();
    }
  }, [brandInfo]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!brandName) return;

    const fetchBrandData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/brand/${encodeURIComponent(brandName)}/filter`, {
          params: {
            bigCategory: selectedCategory === '전체' ? null : selectedCategory,
            sortOrder: sortOrder,
          }
        });

        const data = response.data.data;
        if (data) {
          setBrandInfo({
            brandId: data.brandId,
            logoUrl: data.brandLogoUrl,
            nameKr: data.brandNameKr,
            nameEng: data.brandNameEng,
            since: data.brandSince,
             // info: data.brandInfo, 
            itemsCount: data.brandItemsCounts
          });
          setItems(data.items);  // 아이템 목록 저장
          setFilteredItems(data.items);  // 초기 필터링 데이터를 전체로 설정
          setCurrentItems(data.items.slice(0, 10));  // 첫 페이지의 아이템만 설정
        } else {
          setItems([]);  // 데이터가 없을 경우 빈 배열 설정
          setFilteredItems([]);
          setCurrentItems([]);
        }
      } catch (error) {
        console.error('Failed to fetch brand data:', error);
      }
    };
  
    fetchBrandData();
  }, [brandName, selectedCategory, sortOrder]);

  useEffect(() => {
    const fetchBrandLikeStatus = async () => {
        if (!brandInfo || !brandInfo.brandId) {
            console.warn('brandInfo or brandId is not available');
            return;
        }

        try {
            const token = localStorage.getItem('accessToken');
            
            if (token) {
                const response = await axios.get(`${apiUrl}/likes/brand/${brandInfo.brandId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBrandLiked(response.data.isLiked);
            } else {
                setBrandLiked(false); // 로그인하지 않은 경우 기본값을 설정
            }
        } catch (error) {
            console.error('Failed to fetch brand like status:', error);
            setBrandLiked(false); // 오류가 발생한 경우에도 기본값을 설정
        }
    };

    fetchBrandLikeStatus();
}, [brandInfo]);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * 5;
    const endIndex = startIndex + 5;
    setCurrentItems(filteredItems.slice(startIndex, endIndex));
  }, [filteredItems]);

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const filterItemsByCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 페이지를 첫 페이지로 초기화
  };

  const handleLogoClick = () => navigate('/');
  
  const handleBrandHeartClick = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/login', { state: { from: location.pathname } }); // 현재 경로를 저장해서 전달
      return;
    }
  
    if (!brandInfo || !brandInfo.brandId) {
      console.warn('Cannot like the brand: brandId is not defined');
      return;
    }
  
    try {
      await axios.post(
        `${apiUrl}/likes/brand`,
        { brandId: brandInfo.brandId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setBrandLiked((prevLiked) => !prevLiked);
    } catch (error) {
      console.error('Failed to update brand like status:', error);
    }
  };

  const handleWishClick = async (item) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/login', { state: { from: location.pathname } }); // 현재 경로를 저장해서 전달
      return;
    }
  
    try {
      const isLiked = liked[item.id];
  
      // 좋아요 클릭 또는 취소 이벤트 처리
      await axios.post(
        `${apiUrl}/likes/item`,
        { itemId: item.id },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
  
      // 좋아요 상태 업데이트
      setLiked((prevLiked) => ({
        ...prevLiked,
        [item.id]: !prevLiked[item.id],
      }));
  
      // 좋아요가 추가될 때만 클릭 이벤트 API 호출
      if (!isLiked) {
        await axios.post(
          `${apiUrl}/admin/clicks`,
          { type: 'item', id: item.id },  // type을 'item'으로 설정하고, item의 id를 보냄
        );
      }
  
    } catch (error) {
      console.error('좋아요 상태를 업데이트하는 데 실패했습니다:', error);
    }
  };
  

  const formatPrice = (price) => {
    const roundedPrice = Math.round(price * 100) / 100; // 소수점 둘째 자리까지 반올림
    return roundedPrice.toLocaleString('ko-KR'); // 한국식 천 단위 구분 쉼표
  };

  const totalPages = Math.ceil(filteredItems.length / 10);

  return (
    <Container>
      <Wrapper>
        <HeaderContainer>
          {/* 텍스트 로고를 HeaderLogoSVG 이미지로 교체 */}
          <Logo onClick={handleLogoClick}>
            <HeaderLogoSVG width="143" height="33" />
          </Logo>
          <MenuButton>
              {/* 메뉴 버튼 크기 24px로 설정 */}
              <MenuIconLines onClick={() => navigate('/menu')}>
                <MenuLine />
                <MenuLine />
                <MenuLine />
              </MenuIconLines>
          </MenuButton>
        </HeaderContainer>
        <ProfileWrapper>
          <ProfileImage>
            {brandInfo && (
              <img src={brandInfo.logoUrl} alt="Profile" />
            )}
          </ProfileImage>
          <ProfileInfo>
            <ProfileName>{brandInfo?.nameKr}</ProfileName>
            <ProfileBrand>{brandInfo?.nameEng}</ProfileBrand>
            <ProfileYear>{brandInfo?.since}</ProfileYear>
            <p>{brandInfo?.info}</p>
          </ProfileInfo>
        </ProfileWrapper>
        <ButtonWrapper>
          <Button onClick={handleBrandHeartClick}>
            <ButtonInner style={{ display: 'flex', alignItems: 'center' }}>
              <ButtonIcon>
                {brandLiked ? <BrandheartRIcon /> : <BrandheartWIcon />}
              </ButtonIcon>
              <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '5px', color: 'black' }}>브랜드 찜하기</span>
            </ButtonInner>
          </Button>
        </ButtonWrapper>
        
      </Wrapper>
      <WrapperW>
        <ItemWrapper>
          <ItemTitle>아이템</ItemTitle>
          <ItemSortWrapper>
            <ItemSortLatest
              onClick={() => handleSortChange('latest')}
              style={{ color: sortOrder === 'latest' ? 'black' : '#A0A0A0' }}
            >
              최신순
            </ItemSortLatest>
            <ItemSortPopular
              onClick={() => handleSortChange('popular')}
              style={{ color: sortOrder === 'popular' ? 'black' : '#A0A0A0' }}
            >
              인기순
            </ItemSortPopular>
          </ItemSortWrapper>
        </ItemWrapper>
        <CategoryWrapper>
          <CategoryList>
            <CategoryButton active={selectedCategory === '전체'} onClick={() => filterItemsByCategory('전체')}>
              <CategoryText active={selectedCategory === '전체'}>전체</CategoryText>
            </CategoryButton>
            <CategoryButton active={selectedCategory === '상의'} onClick={() => filterItemsByCategory('상의')}>
              <CategoryText active={selectedCategory === '상의'}>상의</CategoryText>
            </CategoryButton>
            <CategoryButton active={selectedCategory === '하의'} onClick={() => filterItemsByCategory('하의')}>
              <CategoryText active={selectedCategory === '하의'}>하의</CategoryText>
            </CategoryButton>
            <CategoryButton active={selectedCategory === '아우터'} onClick={() => filterItemsByCategory('아우터')}>
              <CategoryText active={selectedCategory === '아우터'}>아우터</CategoryText>
            </CategoryButton>
            <CategoryButton active={selectedCategory === '원피스'} onClick={() => filterItemsByCategory('원피스')}>
              <CategoryText active={selectedCategory === '원피스'}>원피스</CategoryText>
            </CategoryButton>
            <CategoryButton active={selectedCategory === '스커트'} onClick={() => filterItemsByCategory('스커트')}>
              <CategoryText active={selectedCategory === '스커트'}>스커트</CategoryText>
            </CategoryButton>
          </CategoryList>
        </CategoryWrapper>
        <MainContent>
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <Card key={item.id}>
                <ProductDetails>
                  <CardContent>
                    <ProductImage>
                      <img src={item.img_url} alt={item.name} />
                    </ProductImage>
                      <ProductInfo>
                        <ProductName>{item.name}</ProductName>
                        <ProductGender>{item.gender}</ProductGender>
                        <ProductPrice>{formatPrice(item.price)}원</ProductPrice>
                      </ProductInfo>
                  </CardContent>
                  <ShoppingLinks>
                    <ShoppingLink as="a" href={item.musinsa_link} target="_blank" onClick={async () => {
                      try {
                        await axios.post(`${apiUrl}/admin/clicks`, {
                          type: 'item',
                          id: item.id  // item의 id를 보냄
                        });
                      } catch (error) {
                        console.error('Failed to send item click event:', error);
                      }
                    }}>
                      <LinkInfo>
                        <MusinsaIcon />
                      </LinkInfo>
                    </ShoppingLink>
                    
                    <ShoppingLink as="a" href={item.naver_link} target="_blank" onClick={async () => {
                      try {
                        await axios.post(`${apiUrl}/admin/clicks`, {
                          type: 'item',
                          id: item.id  // item의 id를 보냄
                        });
                      } catch (error) {
                        console.error('Failed to send item click event:', error);
                      }
                    }}>
                      <LinkInfo>
                        <NaverIcon />
                      </LinkInfo>
                    </ShoppingLink>
                  </ShoppingLinks>

                </ProductDetails>
                <WishIconContainer onClick={() => handleWishClick(item)}>
                  {liked[item.id] ? <WishItemIcon /> : <WishItemWIcon />}
                </WishIconContainer>
              </Card>
                          ))
                        ) : (
                          <p>해당하는 제품이 없습니다</p>
                        )}
          </MainContent>
                      {currentItems.length > 0 && (
                        <Pagination
                          totalPages={totalPages}
                          currentPage={currentPage}
                          onPageChange={handlePageChange}
                        />
                      )}
        </WrapperW>
    </Container>
  );
}

export default App;
