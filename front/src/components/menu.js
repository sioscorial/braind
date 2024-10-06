import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation  } from 'react-router-dom';
import { ReactComponent as RightarrowIcon } from '../assets/icons/arrow_forward.svg';
import { ReactComponent as StyleSearch } from '../assets/icons/Scan.svg';
import { ReactComponent as MyBrandIcon } from '../assets/icons/favorite_border.svg';
import { ReactComponent as WishIcon } from '../assets/icons/Bag 3.svg';
import { ReactComponent as MyStyleIcon } from '../assets/icons/bookmark_border.svg';
import { ReactComponent as SearchIconSvg } from '../assets/icons/Search.svg';
import { useUser } from './UserContext';
import HeaderLogo from '../assets/icons/Logo.svg';
import CloseButton from '../assets/icons/CloseButton.svg';
import { ReactComponent as MailIcon } from '../assets/icons/mail.svg';

const Container = styled.div`
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

const Header = styled.div`
  width: 100%;
  max-width: 100vw;
  padding-top: 15px;
  padding-bottom: 40px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const HeaderContent = styled.div`
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

const HeaderInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Logo = styled.div`
  width: 143px;
  height: 33px;
  display: flex;
  justify-content: left;
  align-items: left;
`;

const IconPlaceholder = styled.div`
  border-radius: 1200px;
  border: 1.2px solid #E6E6E6;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CloseButtonIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: right;
  align-items: right;
`;

const Menu = styled.div`
  width: calc(100% - 32px);
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  box-sizing: border-box;
`;

const MenuGroup = styled.div`
  width: 100%;  
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
  gap: 16px;
  box-sizing: border-box;
`;

const MenuLabel = styled.div`
  width: 100%;
  color: #191A1D;
  font-size: 19px;
  font-family: 'Inter';
  font-weight: 700;
  line-height: 22.8px;
  word-wrap: break-word;
  text-align: left;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
`;

const ItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-grow: 1;
`;

const StyledRankingIcon = styled(StyleSearch)`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  padding: 10px;
  border: 1px solid;
  border-color: #E6E6E6;
  border-radius: 1000px;
`;

const ItemLabel = styled.div`
  color: black;
  font-size: 21px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 29.4px;
  letter-spacing: 0.36px;
  word-wrap: break-word;
  cursor: pointer;
`;

const ArrowIcon = styled(RightarrowIcon)`
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: auto;
`;

const Divider = styled.div`
  width: calc(100% - 8px);
  height: 0;
  border: 1px solid #E6E6E6;
`;

const StyledMyStyleIcon = styled(MyStyleIcon)`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  padding: 10px;
  border: 1px solid;
  border-color: #E6E6E6;
  border-radius: 1000px;
`;

const StyledMyBrandIcon = styled(MyBrandIcon)`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  padding: 10px;
  border: 1px solid;
  border-color: #E6E6E6;
  border-radius: 1000px;
`;

const StyledWishIcon = styled(WishIcon)`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  padding: 10px;
  border: 1px solid;
  border-color: #E6E6E6;
  border-radius: 1000px;
`;

const StyledSearchIcon = styled(SearchIconSvg)`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  padding: 10px;
  border: 1px solid;
  border-color: #E6E6E6;
  border-radius: 1000px;
`;

const InfoGroup = styled.div`
  width: 100%;  
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
  gap: 16px;
  box-sizing: border-box;
`;

const Info = styled.div`
  width: 100%;
  color: black;
  font-size: 19px;
  font-family: 'Inter';
  font-weight: 700;
  line-height: 22.8px;
  word-wrap: break-word;
  text-align: left;
`;

const InfoItem = styled.a`
  width: 100%;
  color: black;
  font-size: 15px;
  font-family: 'Inter';
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.36px;
  word-wrap: break-word;
  cursor: pointer;
  text-decoration: none;
`;

const MailInfoItem = styled.a`
  width: 100%;
  color: black;
  font-size: 15px;
  font-family: 'Inter';
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.36px;
  word-wrap: break-word;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
`;

const MailItemText = styled.div`
  flex-grow: 1;
  text-align: left;
`;

const StyledMailIcon = styled(MailIcon)`
  width: 20px;
  height: 20px;
`;

function MyComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [containerHeight, setContainerHeight] = useState('100vh');
  const { setAccessToken, setUserId } = useUser();

  useEffect(() => {
    // 메뉴 페이지에 진입하기 전의 페이지 경로를 저장
    const previousPage = location.state?.from || location.pathname;
    localStorage.setItem('previousNonMenuPage', previousPage);
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('accessToken');
      setIsLoggedIn(!!token);
    };
    checkLoginStatus();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleResize() {
    const maxHeight = 1133;
    const minHeight = 578;
    const windowHeight = window.innerHeight;
    const newHeight = Math.min(Math.max(windowHeight, minHeight), maxHeight);
    setContainerHeight(`${newHeight}px`);
  }

  function handleLogout() {
    // 로그아웃 처리 및 이전 페이지로 이동
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    setAccessToken(null);
    setUserId(null);
    setIsLoggedIn(false);

    // 로그아웃 후 저장된 이전 페이지로 이동
    const previousPage = localStorage.getItem('previousPage') || '/';
    navigate(previousPage);
  }

  const handleLogoClick = () => {
    // X 버튼 클릭 시 메뉴 이전 페이지로 이동
    const previousPage = localStorage.getItem('previousPage') || '/';
    navigate(previousPage);
  };

  const handleLoginClick = () => {
    // 로그인 페이지로 이동하기 전 메뉴가 아닌 이전 페이지만 저장
    const previousPage = localStorage.getItem('previousPage') || '/';
    navigate('/login', { state: { from: previousPage } });
  };

  const handleRankingClick = () => navigate('/input');
  const handlemybookmarkClick = () => navigate('/mybookmark');
  const handleMyBrandClick = () => navigate('/mybrand');
  const handleWishItemClick = () => navigate('/wishlist');
  const handleBrandSearchClick = () => navigate('/search');

  return (
    <Container style={{ height: containerHeight }}>
      <Header>
        <HeaderContent>
          <HeaderInner>
            <LogoContainer onClick={() => window.location.href = '/'}>
              <Logo>
                <img 
                  src={HeaderLogo} 
                  alt="logo" 
                  style={{ width: '143', height: '33' }} 
                />
              </Logo>
            </LogoContainer>
            <CloseButtonContainer onClick={handleLogoClick}>
              <CloseButtonIcon>
                <img 
                  src={CloseButton} 
                  alt="CloseButton" 
                  style={{ width: '24', height: '24' }} 
                />
              </CloseButtonIcon>
            </CloseButtonContainer>
          </HeaderInner>
        </HeaderContent>
      </Header>
      <Menu>
        <MenuGroup>
          <MenuLabel>MENU</MenuLabel>
          <MenuItem onClick={handleRankingClick}>
            <ItemContent>
              <StyledRankingIcon />
              <ItemLabel >STYLE SEARCH</ItemLabel>
            </ItemContent>
            <ArrowIcon  />
            <IconPlaceholder />
          </MenuItem>
          <Divider />
          <MenuItem onClick={handlemybookmarkClick}>
            <ItemContent>
              <StyledMyStyleIcon />
              <ItemLabel>BOOK MARK</ItemLabel>
            </ItemContent>
            <ArrowIcon/>
            <IconPlaceholder />
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMyBrandClick}>
            <ItemContent>
              <StyledMyBrandIcon />
              <ItemLabel>MY BRAND</ItemLabel>
            </ItemContent>
            <ArrowIcon/>
            <IconPlaceholder />
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleWishItemClick}>
            <ItemContent>
              <StyledWishIcon />
              <ItemLabel>WISHLIST</ItemLabel>
            </ItemContent>
            <ArrowIcon/>
            <IconPlaceholder />
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleBrandSearchClick}>
            <ItemContent>
              <StyledSearchIcon />
              <ItemLabel>FIND BRAND</ItemLabel>
            </ItemContent>
            <ArrowIcon/>
            <IconPlaceholder />
          </MenuItem>
          <Divider />
        </MenuGroup>
        <InfoGroup>
          <Info>INFO</Info>
          <InfoItem href="https://shell-memory-b8b.notion.site/BRAiND-AI-24e1c163ce814501a23f545c9572d122" target="_blank" rel="noopener noreferrer">
            프로젝트소개
          </InfoItem>
          <Divider />
          <MailInfoItem href="mailto:brain.fashion@gmail.com">
          <MailItemText>Contact Us</MailItemText>
          <StyledMailIcon src={MailIcon} alt="Mail Icon"/>
        </MailInfoItem>
          <Divider />
          <InfoItem href="https://shell-memory-b8b.notion.site/61506121faf646dba7d64e6a7b60b118?pvs=4" target="_blank" rel="noopener noreferrer">
            이용 약관
          </InfoItem>
          <Divider />
          <InfoItem href="https://shell-memory-b8b.notion.site/0391b1694a0d4b34a04a5a816ab1fd19?pvs=4" target="_blank" rel="noopener noreferrer">
            개인정보 처리방침
          </InfoItem>
          <Divider />
          <InfoItem onClick={isLoggedIn ? handleLogout : handleLoginClick}>
            {isLoggedIn ? '로그아웃' : '로그인'}
          </InfoItem>
        </InfoGroup>
      </Menu>
    </Container>
  );
};

export default MyComponent;