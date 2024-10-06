import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ArrowDownIcon from '../assets/icons/arrowdown.svg'
import SearchIcon from '../assets/icons/searchi.png';
import Bookmark from '../assets/icons/bookmark.svg';
import { useNavigate } from 'react-router-dom';
import MainLogo from '../assets/icons/Logo_main.svg';
import HeaderLogo from '../assets/icons/Logo.svg';
import BookmarkFilled from '../assets/icons/bookmark-filled.svg';
import apiUrl from './utils/config';
import { v4 as uuidv4 } from 'uuid';
import { useLocation  } from 'react-router-dom';
export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin: 0 auto;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Header Start

export const NewHeader = styled.div`
  width: 100%;
  max-width: 100vw;
  padding-top: 15px;
  padding-bottom: 16px;
  background: white;
  border-bottom: 1px rgba(255, 255, 255, 0.30) solid;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 10;
  box-sizing: border-box;
  transition: transform 0.3s ease-in-out;
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(-100%)')};
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 600px;
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
`;

export const HeaderInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const Logo = styled.div`
  width: 143px;
  height: 33px;
  display: flex;
  justify-content: left;
  align-items: left;
`;


export const MenuButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const MenuIconLines = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
`;

export const MenuLine = styled.div`
  width: 24px;
  height: 2px;
  background: black;
`;

export const NavContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const NavItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 96px;
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const NavText = styled.div`
  text-align: center;
  color: black;
  font-size: 13.90px;
  font-family: 'Helvetica Neue';
  font-weight: 400;
  text-transform: uppercase;
  line-height: 16.51px;
  letter-spacing: 0.74px;
  word-wrap: break-word;
  display: flex;
  align-items: center;
`;

export const ArrowIcon = styled.img`
  margin-left: 8px;
  width: 10px;
  height: 6px;
`;

// Header End

// Cover Start

export const CoverImageContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.15);
    z-index: 1;
  }
`;


export const CoverTextContainer = styled.div`
  width: 100%;
  position: relative;
  z-index: 3;
  top: 1%;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;


export const CoverText = styled.div`
  width: 100%;
  text-align: center;
  color: white;
  font-size: 48px;
  font-family: 'Inter';
  font-weight: 700;
`;

export const SubtitleText = styled.div`
  width: 100%;
  text-align: center;
  color: white;
  font-size: 20px;
  font-family: 'Helvetica Neue-bold', Helvetica;
  font-weight: 400;
  margin-top: 10px;
`;

// GradientBox Start

export const GradientBox = styled.div`
  width: calc(100% - 20px);
  height: auto;
  position: absolute;
  bottom: 20px;
  padding-bottom: 13px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--gradient2, conic-gradient(from 90deg at 50% 50%, #FEAC5E 0deg, #4BC0C8 135deg, #C779D0 225deg)); 
  box-shadow: 0px 0px 8px 8px rgba(0, 0, 0, 0.01);
  border-radius: 24px;
  overflow: hidden;
  z-index: 1;
  display: flex;
  flex-direction: column; /* 자식 요소들을 세로로 정렬 */
`;

export const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(87, 87, 87, 0.8);
  backdrop-filter: blur(40px);
  z-index: 1; 
  pointer-events: none; /* 배경이 클릭 이벤트를 차단하지 않도록 설정 */
`;

export const FlexContainer = styled.div`
  padding: 16px;
  position: relative;
  width: calc(100% - 32px);; /* 패딩만큼 폭을 줄여 GradientBox 내부에 맞춤 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2; 

`;

export const FlexItem = styled.div`
  display: flex;
  align-items: center;
`;

export const IconContainer = styled.div`
  width: 24px;
  height: 24px;
  padding: 1px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const IconContent = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
`;

export const FlexItemTitle = styled.div`
	color: #E6E6E6;
	text-align: justify;
	font-family: Inter;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	letter-spacing: 0.3px;
  margin-left: 6px;
`;

export const MoreLink = styled.div`
  color: white;
  font-size: 15px;
  font-family: 'Inter';
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.30px;
  cursor: pointer;
`;


export const CoverBrandsContainer = styled.div`
  width: calc(100% - 26px); /* 패딩만큼 폭을 줄여 GradientBox 내부에 맞춤 */
  padding: 0 13px; 
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  gap: 10px;
  justify-content: center; /* 그리드 요소를 가운데 정렬 */
  position: relative; 
  bottom: 0; 
  left: 0;
  z-index: 2; 
`;


export const CoverBrandCard = styled.div`
  width: auto;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  display: flex;
  text-align: center;
`;


export const CoverBrandImageContainer = styled.div`
  width: 62px;
  height: 62px;
  background: white;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CoverBrandImage = styled.img`
  width: 80%;
  height: 80%;
  object-fit: contain;  // 이미지가 잘리지 않고 비율을 유지하면서 크기에 맞춰집니다.
  align-items: center;
  justify-content: center;
`;

export const CoverBrandName = styled.div`
  margin-top: 8px;
  font-size: 13px;
  color: #FFFFFF;
  align-items: center;
  justify-content: center;
`;



// GradientBox End

// Cover End


export const BrandsContainer = styled.div`
  width: 100%;
  padding: 0 13px; 
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  gap: 16px;
  position: relative; 
  bottom: 0; 
  left: 0;
  z-index: 2; 
`;


export const BrandCard = styled.div`
  width: 62px;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  display: flex;
  text-align: center;
`;

export const BrandImageContainer = styled.div`
  width: 62px;
  height: 62px;
  background: white;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BrandImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const BrandName = styled.div`
  margin-top: 5px;
  font-size: 12px;
  color: #575757;
`;

export const AbsoluteContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const SearchContainer = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  margin-top: 20px;
`;

export const SearchBox = styled.div`
  height: 18px;
  padding: 16px;
  background: white;
  box-shadow: 0px 0px 20px 20px rgba(0, 0, 0, 0.04);
  border-radius: 600px;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin-top: 10px;
  width: calc(100% - 100px);
`;

export const SearchIconContainer = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchText = styled.div`
  text-align: justify;
  color: #575757;
  font-size: 14px;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;

export const SearchButtonContainer = styled.div`
  border-radius: 800px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const SearchButton = styled.div`
  height: 35px;
  padding-left: 19px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  background: #F2F2F2;
  border-radius: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin-top: 10px;
`;

export const SearchButtonText = styled.div`
  text-align: center;
  color: #A0A0A0;
  font-size: 16px;
  font-family: 'Inter';
  font-weight: 500;
  line-height: 22.40px;
  letter-spacing: 0.20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Main Content Start

export const MainContent = styled.div`
  width: 100%;
  max-width: 600px;
  height: auto;
  padding-top: 40px;
  align-items: center;
`;

export const ImageSection = styled.div`
  width: calc(100% - 0px);
  max-width: 100vw
  position: relative;
  margin-top: 20px;
`;

export const ImageBox = styled.div`
  width: 100%;
  max-width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
`;

export const StyledImage = styled.img`
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block;
`;

export const ImageOverlay = styled.div`
  left: 12px;
  top: 90%;
  max-width: 600px;
  position: absolute;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 14px;
  display: inline-flex;
`;

export const OverlayIconContainer = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  display: inline-flex;
  cursor: pointer;
`;

export const OverlayIconBox = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
`;

export const OverlayIcon = styled.img`
  width: 25px;
  height: 50px;
`;

export const InfoCardText = styled.div`
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;
  text-align: justify;
  color: #000000;
  font-size: 16px;
  font-family: "Pretendard Variable-Regular", Helvetica;
  font-weight: 400;
  height: auto; /* height도 자동으로 조정 */
  letter-spacing: 0.30px;
  word-wrap: break-word;
  overflow: visible; /* overflow 속성 수정 */
  cursor: pointer;
`;


export const ImageCaption = ({ item, expanded, onToggle }) => (
  <InfoCardContainer>
    <InfoCardText expanded={expanded} onClick={onToggle}>
      {item.caption}
    </InfoCardText>
  </InfoCardContainer>
);

export const InfoCardContainer = styled.div`
  width: calc(100% - 0px);
  padding-top: 16px;
  padding-bottom: 16px;
  overflow: hidden;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  display: flex;
`;

// Main Brand Strat

export const InfoBox = styled.div`
  width: width: calc(100% - 56px);
  margin: 0 24px;
  height: auto;
  background: var(--gradient2, conic-gradient(from 90deg at 50% 50%, #FEAC5E 0deg, #4BC0C8 135deg, #C779D0 225deg));
  border-radius: 24px;
  border: 1px #E6E6E6 solid;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 14px;
`;


export const InfoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.70);  /* 반투명 배경 */
  backdrop-filter: blur(40px);  /* 블러 효과 */
  -webkit-backdrop-filter: blur(40px);  /* iOS Safari 및 Chrome용 접두사 */
  pointer-events: none; /* 클릭 이벤트가 통과되도록 설정 */
`;


export const MainBrandContainer = styled.div`
  // padding: 16px;
  padding-top: 16px;
  padding-bottom: 10px;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  width: calc(100% - 32px); /* InfoBox의 width에서 좌우 -16px */
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2; 
`;

export const MainBrandContainerTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const MainBrandIconContainer = styled.div`
  width: 24px;
  height: 24px;
  padding: 1px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const MainBrandIconContent = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
`;

export const MainBrandTitleText = styled.div`
	color: #575757;
	text-align: justify;
	font-family: Inter;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	letter-spacing: 0.3px;
  margin-left: 6px;
`;

export const MainBrandMoreLink = styled.div`
  color: black;
  font-size: 15px;
  font-family: 'Inter';
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.30px;
  cursor: pointer;
`;


export const InfoHeader = styled.div`
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
  justify-content: space-between;
  align-items: flex-start;
  display: flex;
  width: 100%;
`;

export const InfoHeaderText = styled.div`
  color: #404040;
  font-size: 12px;
  font-family: 'Inter';
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80%;
`;

export const InfoHeaderLink = styled.div`
  text-align: right;
  color: black;
  font-size: 12px;
  font-family: 'Inter';
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
  cursor: pointer;
`;

export const ContentContainer = styled.div`
  width: 100%;
  position: relative;
  z-index: 2;
`;

export const StyledSection = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url(${props => props.bgImage});
`;

export const StyledOverlay = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
  background: rgba(0, 0, 0, 0.20);
`;

export const BrandContent = styled.div`
  width: calc(100% - 32px); /* InfoBox의 width에서 좌우 -16px */
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  display: flex;
  flex-wrap: wrap; /* 요소들이 길이를 초과하면 한 줄 아래로 배치 */
  gap: 10px;
`;

export const BrandItem = styled.div`
  width: auto;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 10px;
  padding-bottom: 10px;
  background: white;
  box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.02);
  border-radius: 32px;
  overflow: hidden;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
`;

export const BrandImageBox = styled.div`
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 200px;
  overflow: hidden;
  border: 1px #F2F2F2 solid;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const BrandImaSize = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain; // 비율을 유지하면서 잘리지 않도록 설정
  border-radius: 50%; // 원형으로 만들기 위한 속성
`;

export const BrandText = styled.div`
  text-align: justify;
  color: black;
  font-size: 15px;
  font-family: 'Inter';
  font-weight: 400;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;


export const BrandSection = styled.div`
  position: absolute;
  left: 16px;
  top: 13.73px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  display: inline-flex;
`;

export const BrandInfo = styled.div`
  align-self: stretch;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  display: inline-flex;
`;

export const BrandIcon = styled.div`
  width: 24px;
  height: 24px;
  padding: 1px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const BrandIconContent = styled.div`
  width: 22px;
  height: 22px;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
`;

export const BrandInnerBox = styled.div`
  width: 20.19px;
  height: 20.02px;
  position: relative;
`;

// Main Filter Start

export const PopupContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

export const PopupContent = styled.div`
width: 321px;
background: white;
padding: 20px;
display: flex;
flex-direction: column;
gap: 32px;
position: relative;
`;

export const PopupCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
`;

export const PopupHeader = styled.div`
font-size: 18px;
font-weight: 700;
text-align: center;
margin-bottom: 20px;
`;

export const FilterGroup = styled.div`
display: flex;
flex-direction: column;
gap: 14px;
margin-bottom: 8px;
`;

export const FilterTitle = styled.div`
font-size: 16px;
font-weight: 600;
margin-bottom: 5px;

`;


export const FilterOptionBox = styled.div`
flex: 1 1 calc(33.333% - 10px); // 3개씩 끊어서 표시
display: flex;
justify-content: center;
align-items: center;
padding: 10px;
cursor: pointer;
border: 1px solid #E6E6E6;
border-radius: 12px;
background-color: ${props => (props.selected ? 'black' : 'white')};
color: ${props => (props.selected ? 'white' : '#A0A0A0')};
`;

export const FilterOptionsContainer = styled.div`
display: flex;
flex-wrap: wrap;
gap: 10px;
`;

export const FilterOptionText = styled.div`
text-align: center;
color: ${(props) => (props.selected ? 'white' : '#A0A0A0')};
font-size: 12px;
font-family: 'Inter';
font-weight: ${(props) => (props.selected ? '700' : '500')};
line-height: 18px;
letter-spacing: 0.30px;
word-wrap: break-word;
`;

export const FilterCircle = styled.div`
width: auto;
height: 30px;
padding: 5px 15px;
border-radius: 20px;
border: 3px solid #007AFF;
display: flex;
justify-content: center;
align-items: center;
`;

export const ButtonContainer = styled.div`
padding-top: 8px;
display: inline-flex;
justify-content: center;
align-items: center;
gap: 16px;
`;

export const ResetButton = styled.button`
width: 128px;
height: 53px;
background: white;
border: 1px solid #191A1D;
border-radius: 32px;
cursor: pointer;
font-size: 16px;
color: #575757

&:hover {
    background: #f0f0f0; /* 호버 시 배경색 변경 */
    color: #333; /* 호버 시 글자색 변경 */
  }
`;

export const ApplyButton = styled.button`
width: 128px;
height: 53px;
background: black;
color: white;
border: none;
border-radius: 32px;
font-weight: bold;
cursor: pointer;
font-size: 16px;

&:hover {
    background: #333; /* 호버 시 배경색 변경 */
  }
`;

// Main Filter End


const MyComponent = () => {
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [showHeader, setShowHeader] = useState(false);
  const [showCoverText, setShowCoverText] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [filters, setFilters] = useState({ gender_id: [], season_id: [], style_id: [] });
  const [bookmarkedItems, setBookmarkedItems] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [visibleBrands, setVisibleBrands] = useState(5);
  const [initialScroll, setInitialScroll] = useState(true); 
  const navigate = useNavigate();
  const location = useLocation();
  
  // 페이지 로드 시 맨 위로 스크롤
  useEffect(() => {
    const recordVisit = async () => {
      try {
        let visitorId = localStorage.getItem('visitorId');
        if (!visitorId) {
          visitorId = uuidv4(); // UUID 생성
          localStorage.setItem('visitorId', visitorId); // 쿠키 대신 localStorage에 저장
        }
  
        const pageUrl = window.location.pathname; // 현재 페이지의 URL을 가져옴
  
        await axios.post(`${apiUrl}/admin/visits`, { visitorId, pageUrl });
      } catch (error) {
        console.error('Failed to record visit:', error);
      }
    };
  
    recordVisit();
  }, []);

  // 사용자 정보와 북마크 데이터 가져오기
  useEffect(() => {
    const fetchUserInfoAndBookmarks = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          setIsLoggedIn(true);

          try {
            const userInfoResponse = await axios.get(`${apiUrl}/users/info`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

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
          } catch (error) {
            console.error('Error fetching user info or bookmarks:', error);
            setIsLoggedIn(false); // 에러가 발생하면 로그인 상태를 false로 설정
          }
        } else {
          setIsLoggedIn(false); // 토큰이 없으면 로그인 상태를 false로 설정
        }

        // 로그인 여부와 상관없이 가져올 데이터
        const backResponse = await axios.get(`${apiUrl}/back`);
        setData(backResponse.data.randomImg);

      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchUserInfoAndBookmarks();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (initialScroll && currentScrollY > 0) {
        setShowHeader(true);
        setInitialScroll(false); // 첫 스크롤 후 초기 상태를 false로 설정
      } else {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setShowHeader(false);
        } else if (currentScrollY < lastScrollY) {
          setShowHeader(true);
        }

        if (currentScrollY === 0) {
          setShowCoverText(true);
          setShowHeader(false);
        } else {
          setShowCoverText(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateVisibleBrands);
    updateVisibleBrands();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateVisibleBrands);
    };
  }, [lastScrollY, initialScroll]);

  const handleBookmarkClick = (event, item) => {
    event.stopPropagation();
    const isBookmarked = bookmarkedItems[item.id];
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    axios.post(
      `${apiUrl}/likes/bookmark`, {
        backImgId: item.id
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then(response => {
        setBookmarkedItems(prevState => ({
          ...prevState,
          [item.id]: !isBookmarked
        }));
      })
      .catch(error => {
        console.error('Error toggling bookmark:', error);
      });
  };

  const handleMoreClick = (id) => {
    navigate(`/backdetail/${id}`);
  };

  const handleStyleClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleFilterChange = (type, value) => {
    setFilters(prevFilters => {
      const isSelected = prevFilters[type].includes(value);
      if (isSelected) {
        return {
          ...prevFilters,
          [type]: prevFilters[type].filter(item => item !== value),
        };
      } else {
        return {
          ...prevFilters,
          [type]: [...prevFilters[type], value],
        };
      }
    });
  };

  const isSelected = (type, value) => filters[type].includes(value);

  const handleResetFilters = () => {
    setFilters({ gender_id: [], season_id: [], style_id: [] });
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    Object.keys(filters).forEach(key => {
      if (filters[key].length > 0) {
        params.append(key, filters[key].join(','));
      }
    });

    navigate(`/filtermain?${params.toString()}`);
    setShowPopup(false);
  };

  const handleToggle = index => {
    setExpanded(prevState => ({ ...prevState, [index]: !prevState[index] }));
  };

  const updateVisibleBrands = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth < 368) {
      setVisibleBrands(4);
    } else {
      setVisibleBrands(5);
    }
  };

  const handleBrandClick = async (brandNameEng, brandId) => {
    navigate(`/brand/${encodeURIComponent(brandNameEng)}`);
};


  const parseBrands = (brands) => {
    return brands.split(',').map(brand => {
      const [brand_name, brand_logo] = brand.split('|');
      return { brand_name, brand_logo };
    });
  };

  return (
    <Container>
      <NewHeader show={showHeader}>
        <HeaderContent>
          <HeaderInner>
            <LogoContainer onClick={() => window.location.href = '/'}>
              <Logo>
                <img 
                  src={HeaderLogo} 
                  alt="logo" 
                  style={{ 
                    width: '143px',
                    height: '33px',
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

      {data && data.length > 0 && (
        <CoverImageContainer bgImage={data[0].img_path} onClick={() => handleMoreClick(data[0].id)}>
          <CoverTextContainer visible={showCoverText}>
            <img 
              src={MainLogo} 
              alt="logo" 
              style={{ 
                width: 'calc(100% - 48px)',
                height: 'auto'
              }} 
            />
            <SubtitleText>Fashion Brand Recommendation AI</SubtitleText>
          </CoverTextContainer>
          <GradientBox>
            <BackgroundOverlay />
            <FlexContainer>
              <FlexItem>
                <IconContainer>
                  <IconContent>
                    <img src={SearchIcon} alt="Search Icon" width={24} height={24} />
                  </IconContent>
                </IconContainer>
                <FlexItemTitle>느낌이 비슷한 브랜드 추천</FlexItemTitle>
              </FlexItem>
              <MoreLink onClick={() => handleMoreClick(data[0].id)}>
                더보기
              </MoreLink>
            </FlexContainer>
            <CoverBrandsContainer>
            {data[0].brandDetails.slice(0, visibleBrands).map((brand, idx) => (
              <CoverBrandCard key={idx}>
                <CoverBrandImageContainer 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    handleBrandClick(brand.brand_name_eng);
                  }}
                >
                  <CoverBrandImage src={brand.brand_logo_url} alt={brand.brand_name_kr} />
                </CoverBrandImageContainer>
                <CoverBrandName>{brand.brand_name_kr}</CoverBrandName>
              </CoverBrandCard>
            ))}
          </CoverBrandsContainer>

          </GradientBox>
        </CoverImageContainer>
      )}
      {data && data.slice(1).map((item, index) => (
        <div key={index}>
          <MainContent>
            <ImageSection onClick={() => handleMoreClick(item.id)}>
              <ImageBox>
                <StyledImage src={item.img_path} alt={item.img_name} />
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
                {item.brandDetails.slice(0, expanded[item.id] ? item.brandDetails.length : 5).map((brand, idx) => (
                  <BrandItem key={idx}>
                    <div 
                      style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex' }} 
                      onClick={() => handleBrandClick(brand.brand_name_eng)} // 여기서 brand.id가 브랜드 ID입니다.
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
    </Container>
  );
};

export default MyComponent;
