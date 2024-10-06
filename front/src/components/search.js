import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SearchIconSvg } from '../assets/icons/Search.svg';
import { ReactComponent as RightBrandIcon } from '../assets/icons/rightbrand.svg';
import { ReactComponent as BackIconSvg } from '../assets/icons/backbtn.svg';
import { ReactComponent as ScanIconSvg } from '../assets/icons/Scan.svg';
import axios from 'axios';
import apiUrl from './utils/config';

const consonants = [
  { label: 'ㄱ', startName: '가', endName: '나' },
  { label: 'ㄴ', startName: '나', endName: '다' },
  { label: 'ㄷ', startName: '다', endName: '라' },
  { label: 'ㄹ', startName: '라', endName: '마' },
  { label: 'ㅁ', startName: '마', endName: '바' },
  { label: 'ㅂ', startName: '바', endName: '사' },
  { label: 'ㅅ', startName: '사', endName: '아' },
  { label: 'ㅇ', startName: '아', endName: '자' },
  { label: 'ㅈ', startName: '자', endName: '차' },
  { label: 'ㅊ', startName: '차', endName: '카' },
  { label: 'ㅋ', startName: '카', endName: '타' },
  { label: 'ㅌ', startName: '타', endName: '파' },
  { label: 'ㅍ', startName: '파', endName: '하' },
  { label: 'ㅎ', startName: '하', endName: '히' },
];

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  position: relative;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 58px;
  overflow: hidden;
  margin: 0 auto;
`;

const SearchBar = styled.div`
  width: calc(100% - 24px);
  max-width: 600px;
  padding: 10px;
  left: 0;
  top: 0;
  position: absolute;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  margin: 0 auto;
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  padding: 8px;
  border: none;
  border-radius: 100px;
  background: #f2f2f2;
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background: #f2f2f2;
  flex-grow: 1;
  height: 20px;
`;

const StyledInput = styled.input`
  flex-grow: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 16px;
  color: black;
  opacity: 1;
`;

const SearchIcon = styled(SearchIconSvg)`
  margin-right: 8px;
  color: #bfbfbf;
  opacity: 0.3;
`;

const BackIcon = styled(BackIconSvg)`
  width: 48px;
  height: 48px;
  cursor: pointer;
`;

const ScanIcon = styled(ScanIconSvg)`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  margin-left: 10px;
  cursor: pointer;
`;

const BrandTitle = styled.div`
  top: 0px;
  z-index: 1;
  background-color: white;
  padding-bottom: 10px;
  margin-top: 0px;
  color: black;
  font-size: 16px;
  font-family: 'Inter';
  font-weight: 700;
  line-height: 19.2px;
  word-wrap: break-word;
  margin-left: 30px;
  margin-bottom: 10px;
`;

const BrandList = styled.div`
  width: 100%;
  padding: 20px 0; /* 위쪽 패딩을 20px로 조정 */
  padding-left: 24px; /* 왼쪽에 패딩 추가 */
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  z-index: 2;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BrandListContent = styled.div`
  width: calc(100% - 48px); /* 좌우 마진 24px 추가 */
  height: calc(100vh - 180px);
  position: relative;
  overflow-y: auto;
  padding-bottom: 40px;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 40px; /* 자음 리스트를 내렸으므로 이 패딩도 조정 */
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BrandItem = styled.div`
  min-width: 45px;
  height: 45px;
  position: relative;
  flex-shrink: 0;
  z-index: 2;
  /* margin-left 제거 */
`;

const BrandItemCircle = styled.div`
  width: 40px;
  height: 40px;
  left: 0;
  top: 0;
  position: absolute;
  background: ${(props) => (props.active ? 'black' : '#f2f2f2')};
  box-shadow: ${(props) =>
    props.active ? '0px 8px 16px rgba(0, 0, 0, 0.40)' : 'none'};
  border-radius: ${(props) => (props.active ? '25px' : '20px')};
  cursor: pointer;
`;

const BrandItemText = styled.div`
  left: ${(props) => (props.active ? '12px' : '13px')};
  top: 9px;
  position: absolute;
  text-align: center;
  color: ${(props) => (props.active ? 'white' : '#404040')};
  font-size: 14px;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.2px;
  word-wrap: break-word;
`;

const BrandItems = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding-bottom: 10px;
`;

const BrandItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 6px;
  cursor: pointer;
`;

const BrandItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 10px;
`;

const BrandItemInfo = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`;

const BrandItemLogo = styled.div`
  width: 32px;
  height: 32px;
  position: relative;
  background: white;
  border-radius: 50%;
  overflow: hidden;
  border: 1px #e6e6e6 solid;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  cursor: pointer;
`;

const BrandItemLogoImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const BrandItemLogoPlaceholder = styled.div`
  width: 30px;
  height: 14.76px;
  left: 5px;
  top: 13px;
  position: absolute;
  background: #c4c4c4;
`;

const BrandItemName = styled.div`
  color: black;
  font-size: 15px;
  font-family: 'Inter';
  font-weight: 500;
  line-height: 21px;
  letter-spacing: 0.3px;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  cursor: pointer;
`;

const BrandItemSeparator = styled.div`
  align-self: stretch;
  height: 0;
  border: 1px #e6e6e6 solid;
  opacity: 0.5;
`;

const RightBrandIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

function Search() {
  const navigate = useNavigate();
  const [containerHeight, setContainerHeight] = useState('100vh');
  const [brands, setBrands] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const [activeConsonant, setActiveConsonant] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');
  const listRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    function updateSize() {
      setContainerHeight(Math.min(window.innerHeight, 1133) + 'px');
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleConsonantClick = async (startName, endName, label) => {
    setActiveConsonant(label);
    setSelectedLabel(label);
    try {
      const response = await axios.get(`${apiUrl}/brand/search`, {
        params: { startName, endName },
      });
      setBrands(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching brands:', error);
      setBrands([]);
    }
  };

  const handleBrandClick = async (brandNameEng) => {
    navigate(`/brand/${encodeURIComponent(brandNameEng)}`);
  };

  useEffect(() => {
    handleConsonantClick('가', '나', 'ㄱ');
  }, []);

  const fetchBrands = async (query) => {
    try {
      const response = await axios.get(`${apiUrl}/search`, {
        params: { query },
      });
      
      const data = response.data.result || [];
      setBrands(data);
    } catch (error) {
      console.error('Error searching brands:', error);
      setBrands([]);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      fetchBrands(query);
    } else {
      handleConsonantClick('가', '나', 'ㄱ'); // 검색어가 없으면 ㄱ으로 초기화
    }
  };

  // 마우스 휠로 가로 스크롤 가능하도록 설정
  useEffect(() => {
    const handleWheel = (event) => {
      if (listRef.current) {
        event.preventDefault();
        listRef.current.scrollLeft += event.deltaY; // 세로 휠을 가로 스크롤로 변환
      }
    };

    const brandListElement = listRef.current;
    if (brandListElement) {
      brandListElement.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (brandListElement) {
        brandListElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  // 드래그로 스크롤 가능하게 설정
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - listRef.current.offsetLeft);
    setScrollLeft(listRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - listRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 스크롤 속도 조정
    listRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const brandListElement = listRef.current;
    if (brandListElement) {
      brandListElement.addEventListener('mousedown', handleMouseDown);
      brandListElement.addEventListener('mousemove', handleMouseMove);
      brandListElement.addEventListener('mouseup', handleMouseUp);
      brandListElement.addEventListener('mouseleave', handleMouseUp);
    }

    return () => {
      if (brandListElement) {
        brandListElement.removeEventListener('mousedown', handleMouseDown);
        brandListElement.removeEventListener('mousemove', handleMouseMove);
        brandListElement.removeEventListener('mouseup', handleMouseUp);
        brandListElement.removeEventListener('mouseleave', handleMouseUp);
      }
    };
  }, [isDragging]);

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

  return (
    <Container style={{ height: containerHeight }}>
      <SearchBar>
        <BackIcon onClick={handleBackClick} />
        <SearchInputContainer>
          <SearchInput>
            <SearchIcon />
            <StyledInput
              type="text"
              placeholder="브랜드를 찾아보세요"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </SearchInput>
        </SearchInputContainer>
        {searchQuery === '' && ( // 검색어가 없을 때만 ScanIcon을 표시
          <ScanIcon onClick={() => navigate('/input')} />
        )}
      </SearchBar>

      {searchQuery === '' && ( // 검색어가 없을 때만 자음 버튼을 표시
        <BrandList ref={listRef}>
          {consonants.map(({ label, startName, endName }) => (
            <BrandItem key={label}>
              <BrandItemCircle
                active={activeConsonant === label}
                onClick={() => handleConsonantClick(startName, endName, label)}
              >
                <BrandItemText active={activeConsonant === label}>
                  {label}
                </BrandItemText>
              </BrandItemCircle>
            </BrandItem>
          ))}
        </BrandList>
      )}

      <BrandListContent style={{ paddingTop: searchQuery === '' ? '10px' : '40px' }}>
        {searchQuery === '' && <BrandTitle>{selectedLabel}</BrandTitle>}
        <BrandItems>
          {brands.map((brand) => (
            <BrandItemContainer key={brand.brand_name_eng} onClick={() => handleBrandClick(brand.brand_name_eng)}>
              <BrandItemRow>
                <BrandItemInfo>
                  <BrandItemLogo $hasLogo={brand.brand_logo_url}>
                    {brand.brand_logo_url ? (
                      <BrandItemLogoImage src={brand.brand_logo_url} alt={brand.brand_name_eng} />
                    ) : (
                      <BrandItemLogoPlaceholder />
                    )}
                  </BrandItemLogo>
                </BrandItemInfo>
                <BrandItemName>{brand.brand_name_kr}</BrandItemName>
                <RightBrandIconContainer>
                  <RightBrandIcon />
                </RightBrandIconContainer>
              </BrandItemRow>
              <BrandItemSeparator />
            </BrandItemContainer>
          ))}
        </BrandItems>
      </BrandListContent>
    </Container>
  );
}

export default Search;
