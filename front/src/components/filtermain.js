import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Bookmark from '../assets/icons/bookmark.svg';
import BookmarkFilled from '../assets/icons/bookmark-filled.svg';
import SearchIcon from '../assets/icons/searchi.png';
import ArrowDownIcon from '../assets/icons/arrowdown.svg';
import HeaderLogo from '../assets/icons/Logo.svg';
import apiUrl from './utils/config';
import {
  Container,
  ContentContainer,
  ImageSection,
  ImageBox,
  StyledImage,
  ImageOverlay,
  OverlayIconContainer,
  OverlayIconBox,
  OverlayIcon,
  InfoBox,
  InfoOverlay,
  BrandContent,
  BrandItem,
  BrandImageBox,
  BrandImaSize,
  BrandText,
  NewHeader,
  HeaderContent,
  HeaderInner,
  LogoContainer,
  Logo,
  MenuButton,
  MenuIconLines,
  MenuLine,
  PopupContainer,
  PopupContent,
  PopupHeader,
  PopupCloseButton,
  FilterGroup,
  FilterTitle,
  FilterOptionBox,
  ButtonContainer,
  ResetButton,
  ApplyButton,
  FilterOptionsContainer,
  NavContainer,
  NavItems,
  NavItem,
  NavText,
  ArrowIcon,
  MainBrandContainer,
  MainBrandContainerTitle,
  MainBrandIconContainer,
  MainBrandIconContent,
  MainBrandTitleText,
  MainBrandMoreLink,
  MainContent,
  ImageCaption
} from './newmain';

const FilterMain = () => {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [showHeader, setShowHeader] = useState(false); // 헤더 표시 여부 관리
  const [lastScrollY, setLastScrollY] = useState(0);   // 마지막 스크롤 위치 저장
  const [showPopup, setShowPopup] = useState(false);
  const [filters, setFilters] = useState({ gender_id: '', season_id: '', style_id: '' });
  const [bookmarkedItems, setBookmarkedItems] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  // 페이지가 로드될 때 스크롤을 맨 위로
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams(location.search);
      try {
        const response = await axios.get(`${apiUrl}/back/filter`, {
          params: Object.fromEntries(queryParams.entries())
        });
        setData(response.data);
        window.scrollTo(0, 0);  // 데이터를 가져온 후 스크롤을 맨 위로
      } catch (error) {
        console.error('Error fetching filtered data:', error);
      }
    };
    fetchData();
  }, [location.search]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // 스크롤 다운: 헤더 숨기기
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY) {
        // 스크롤 업: 헤더 보이기
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY); // 마지막 스크롤 위치 업데이트
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      axios
        .get(`${apiUrl}/likes/bookmarkAll`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const initialBookmarkedItems = response.data.data.reduce((acc, item) => {
            acc[item.backImgId] = true;
            return acc;
          }, {});
          setBookmarkedItems(initialBookmarkedItems);
        })
        .catch((error) => {
          console.error('Error fetching bookmarks:', error);
        });
    }
  }, []);

  const handleBookmarkClick = (event, item) => {
    event.stopPropagation();
    const isBookmarked = bookmarkedItems[item.id];
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      navigate('/login', { state: { from: location.pathname } });
    }

    axios
      .post(
        `${apiUrl}/likes/bookmark`,
        { backImgId: item.id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        }
      )
      .then((response) => {
        console.log(response.data.message);
        setBookmarkedItems((prevState) => ({
          ...prevState,
          [item.id]: !isBookmarked
        }));
      })
      .catch((error) => {
        console.error('Error toggling bookmark:', error);
      });
  };

  const handleStyleClick = () => {
    setShowPopup(true); // 필터링 팝업 열기
  };

  const handleClosePopup = () => {
    setShowPopup(false); // 필터링 팝업 닫기
  };

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => {
      const updatedValue = prevFilters[name]
        ? prevFilters[name].split(',').includes(value)
          ? prevFilters[name].split(',').filter((val) => val !== value).join(',')
          : [...prevFilters[name].split(','), value].join(',')
        : value;
      return { ...prevFilters, [name]: updatedValue };
    });
  };

  const isSelected = (name, value) => filters[name]?.split(',').includes(value);

  const handleMoreClick = (id) => {
    navigate(`/backdetail/${id}`);
  };

  const handleResetFilters = () => {
    setFilters({ gender_id: '', season_id: '', style_id: '' });
  };

  const handleToggle = (index) => {
    setExpanded((prevState) => ({ ...prevState, [index]: !prevState[index] }));
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    });
    navigate(`/filtermain?${params.toString()}`);
    setShowPopup(false); // 필터링 팝업 닫기
  };

  const handleBrandClick = async (brandNameEng) => {
    navigate(`/brand/${encodeURIComponent(brandNameEng)}`);
  };

  return (
    <Container>
      <NewHeader show={showHeader}>
        <HeaderContent>
          <HeaderInner>
            <LogoContainer onClick={() => navigate('/')}>
              <Logo>
                <img
                  src={HeaderLogo}
                  alt="logo"
                  style={{
                    width: '143px',
                    height: '33px'
                  }}
                />
              </Logo>
            </LogoContainer>
            <MenuButton>
              <MenuIconLines onClick={() => navigate('/menu')}>
                <MenuLine />
                <MenuLine />
                <MenuLine />
              </MenuIconLines>
            </MenuButton>
          </HeaderInner>
          <NavContainer>
            <NavItems>
              <NavItem onClick={handleStyleClick}>
                <NavText>
                  Style
                  <ArrowIcon src={ArrowDownIcon} alt="Arrow Down Icon" />
                </NavText>
              </NavItem>
              <NavItem onClick={() => navigate('/search')}>
                <NavText>Find brand</NavText>
              </NavItem>
            </NavItems>
          </NavContainer>
        </HeaderContent>
      </NewHeader>
      {showPopup && (
        <PopupContainer>
          <PopupContent>
            <PopupCloseButton onClick={handleClosePopup}>&times;</PopupCloseButton>
            <PopupHeader>STYLE</PopupHeader>
            <FilterGroup>
              <FilterTitle>성별</FilterTitle>
              <FilterOptionsContainer>
                <FilterOptionBox
                  selected={isSelected('gender_id', '1')}
                  onClick={() => handleFilterChange('gender_id', '1')}
                >
                  남성
                </FilterOptionBox>
                <FilterOptionBox
                  selected={isSelected('gender_id', '2')}
                  onClick={() => handleFilterChange('gender_id', '2')}
                >
                  여성
                </FilterOptionBox>
              </FilterOptionsContainer>
            </FilterGroup>
            <FilterGroup>
              <FilterTitle>계절</FilterTitle>
              <FilterOptionsContainer>
                <FilterOptionBox
                  selected={isSelected('season_id', '1')}
                  onClick={() => handleFilterChange('season_id', '1')}
                >
                  봄/가을
                </FilterOptionBox>
                <FilterOptionBox
                  selected={isSelected('season_id', '2')}
                  onClick={() => handleFilterChange('season_id', '2')}
                >
                  여름
                </FilterOptionBox>
                <FilterOptionBox
                  selected={isSelected('season_id', '3')}
                  onClick={() => handleFilterChange('season_id', '3')}
                >
                  겨울
                </FilterOptionBox>
              </FilterOptionsContainer>
            </FilterGroup>
            <FilterGroup>
              <FilterTitle>스타일</FilterTitle>
              <FilterOptionsContainer>
                <FilterOptionBox
                  selected={isSelected('style_id', '1')}
                  onClick={() => handleFilterChange('style_id', '1')}
                >
                  스트릿
                </FilterOptionBox>
                <FilterOptionBox
                  selected={isSelected('style_id', '2')}
                  onClick={() => handleFilterChange('style_id', '2')}
                >
                  뉴트로
                </FilterOptionBox>
                <FilterOptionBox
                  selected={isSelected('style_id', '3')}
                  onClick={() => handleFilterChange('style_id', '3')}
                >
                  미니멀
                </FilterOptionBox>
                <FilterOptionBox
                  selected={isSelected('style_id', '4')}
                  onClick={() => handleFilterChange('style_id', '4')}
                >
                  댄디
                </FilterOptionBox>
                <FilterOptionBox
                  selected={isSelected('style_id', '5')}
                  onClick={() => handleFilterChange('style_id', '5')}
                >
                  여성패션
                </FilterOptionBox>
                <FilterOptionBox
                  selected={isSelected('style_id', '6')}
                  onClick={() => handleFilterChange('style_id', '6')}
                >
                  스포츠
                </FilterOptionBox>
                <FilterOptionBox
                  selected={isSelected('style_id', '7')}
                  onClick={() => handleFilterChange('style_id', '7')}
                >
                  아메카지
                </FilterOptionBox>
                <FilterOptionBox
                  selected={isSelected('style_id', '8')}
                  onClick={() => handleFilterChange('style_id', '8')}
                >
                  캐주얼
                </FilterOptionBox>
              </FilterOptionsContainer>
            </FilterGroup>
            <ButtonContainer>
              <ResetButton onClick={handleResetFilters}>초기화</ResetButton>
              <ApplyButton onClick={handleApplyFilters}>적용</ApplyButton>
            </ButtonContainer>
          </PopupContent>
        </PopupContainer>
      )}

      <ContentContainer>
        {data &&
          data.map((item, index) => (
            <div key={index}>
              <MainContent>
                <ImageSection onClick={() => handleMoreClick(item.id)}>
                  <ImageBox>
                    <StyledImage src={item.img_path} alt={item.caption} />
                    <ImageOverlay>
                      <OverlayIconContainer onClick={(e) => handleBookmarkClick(e, item)}>
                        <OverlayIconBox>
                          <OverlayIcon
                            src={bookmarkedItems[item.id] ? BookmarkFilled : Bookmark}
                            alt="Bookmark Icon"
                          />
                        </OverlayIconBox>
                      </OverlayIconContainer>
                    </ImageOverlay>
                  </ImageBox>
                </ImageSection>
                <ImageCaption
                  item={item}
                  expanded={expanded[item.img_name]}
                  onToggle={() => handleToggle(item.img_name)}
                />
                <InfoBox>
                  <InfoOverlay />
                  <MainBrandContainer>
                    <MainBrandContainerTitle>
                      <MainBrandIconContainer>
                        <MainBrandIconContent>
                          <img src={SearchIcon} alt="Search Icon" width={24} height={24} />
                        </MainBrandIconContent>
                      </MainBrandIconContainer>
                      <MainBrandTitleText>느낌이 비슷한 브랜드 추천</MainBrandTitleText>
                    </MainBrandContainerTitle>
                    <MainBrandMoreLink onClick={() => handleMoreClick(item.id)}>더보기</MainBrandMoreLink>
                  </MainBrandContainer>
                  <BrandContent>
                    {item.brands
                      .slice(0, expanded[item.id] ? item.brands.length : 5)
                      .map((brand, idx) => (
                        <BrandItem key={idx}>
                          <div
                            style={{
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              gap: 8,
                              display: 'flex'
                            }}
                            onClick={() => handleBrandClick(brand.brand_name_eng)}
                          >
                            <BrandImageBox>
                              <BrandImaSize src={brand.brand_logo_url} alt={brand.brand_name_kr} />
                            </BrandImageBox>
                            <BrandText>{brand.brand_name_kr}</BrandText>
                          </div>
                        </BrandItem>
                      ))}
                  </BrandContent>
                </InfoBox>
              </MainContent>
            </div>
          ))}
      </ContentContainer>
    </Container>
  );
};

export default FilterMain;
