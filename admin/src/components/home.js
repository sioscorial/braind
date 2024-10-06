import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiUrl from './utils/config';

// 색상 배열에 '기타 브랜드' 색상 추가
const colors = ['#A178F1', '#4EE2B5', '#2EC9FF', '#FFE200', '#E044A7', '#7F8C8D']; // 마지막 색상은 '기타 브랜드'용

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #1f1f1f;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row; /* 화면이 넓어지면 좌우 배치 */
  }
`;

const Sidebar = styled.div`
  width: 100%;
  height: auto;
  padding: 24px 16px;
  background: #2c2c2c;
  border-left: 1px solid #3a3a3a;
  border-right: 1px solid #3a3a3a;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;

  @media (min-width: 768px) {
    width: 256px; /* 넓은 화면에서는 고정 너비 */
    height: 100vh; /* 전체 높이를 차지 */
  }
`;

const ContentTitle = styled.div`
  color: #ffffff;
  font-size: 32px;
  font-weight: bold;
  margin-top: 0; /* 상단 마진 제거 */
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.div`
  width: 181px;
  height: 39px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
`;

const SidebarMenuItem = styled.div`
  padding: 12px 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  background: ${(props) => (props.active ? '#3a3a3a' : 'none')};
  border-left: ${(props) => (props.active ? '2px solid #ffffff' : 'none')};
  border-bottom: 1px solid #3a3a3a;
  cursor: pointer;
`;

const MenuIcon = styled.div`
  width: 24px;
  height: 24px;
`;

const MenuText = styled.div`
  color: #ffffff;
  font-size: 16px;
  font-family: Roboto;
  font-weight: 500;
  line-height: 16px;
  word-wrap: break-word;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-top: auto;
  margin-bottom: 24px;
`;

const LogoutButton = styled.div`
  width: 200px;
  height: 24px;
  padding: 16px 12px;
  border: 2px solid #0f62fe;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const LogoutText = styled.div`
  color: #0f62fe;
  font-size: 16px;
  font-family: Roboto;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.5px;
  word-wrap: break-word;
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 16px; /* 패딩을 24px에서 16px로 줄임 */
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: #2c2c2c;
  color: #ffffff;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 12px; /* 작은 화면에서는 패딩을 더 줄임 */
  }
`;

const StatBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex: 1 1 150px;
  min-width: 150px;
  padding-top: 0; /* 상단 패딩 제거 */
`;

const StatBox = ({ title, value, change }) => (
  <StatBoxWrapper>
    <StatBoxContainer>
      <StatTitle>{title}</StatTitle>
      {/* 받은 데이터를 그대로 표시 */}
      <StatValue>{value !== null && value !== undefined ? value.toLocaleString() : 'N/A'}</StatValue>
      <StatChangeBox change={change}>
        {change !== null && change !== undefined
          ? (change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`)
          : 'N/A'}
      </StatChangeBox>
    </StatBoxContainer>
  </StatBoxWrapper>
);

const StatBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 0; /* 상단 마진 제거 */
`;

const StatTitle = styled.div`
  color: #b3b3b3;  /* 어두운 배경에 맞춘 텍스트 색상 */
  font-size: 18px;  /* 글자 크기를 조금 더 키움 */
  font-family: 'Roboto';
  font-weight: 500;
  line-height: 1.5;
  text-align: center;  /* 텍스트 중앙 정렬 */
`;

const StatValue = styled.div`
  color: #ffffff;  /* 숫자를 잘 보이도록 흰색으로 설정 */
  font-size: 28px;  /* 숫자 크기를 키움 */
  font-family: 'Roboto';
  font-weight: 700;
  line-height: 1.2;
  text-align: center;  /* 숫자 중앙 정렬 */
`;

const StatChangeBox = styled.div`
  padding: 2px 12px;
  background: ${({ change }) => (change >= 0 ? '#f2f4f8' : '#697077')};
  border-radius: 12px;
  color: ${({ change }) => (change >= 0 ? '#21272a' : 'white')};
  font-size: 14px;
  font-family: 'Roboto';
  font-weight: 400;
  line-height: 19.6px;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column; /* 항상 세로 배치 */
  padding: 10px; /* 패딩을 20px에서 10px로 줄임 */
  margin-top: 0; /* 상단 마진 제거 */
`;

const BrandSection = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px; /* 하단 마진 추가 */

  @media (min-width: 768px) {
    width: 100%; /* 넓은 화면에서도 100% 너비 유지 */
    margin-bottom: 24px; /* 넓은 화면에서도 하단 마진 유지 */
  }
`;

const ItemSection = styled.div`
  width: 100%;
  text-align: left;
  padding-left: 16px;
`;

const BrandCircleContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* 내용을 왼쪽으로 정렬 */
  align-items: center;
  gap: 20px;
`;

const BrandCircle = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: conic-gradient(
    ${(props) => props.gradients}
  );
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* 퍼센티지 표시 위치를 위해 relative 설정 */
  color: white;
  font-weight: bold;
  font-size: 24px;
`;

const PercentageLabel = styled.div`
  position: absolute;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5); /* 배경을 반투명하게 */
  padding: 2px 6px;
  border-radius: 4px;
`;

const BrandColorBox = styled.div`
  width: 16px;
  height: 16px;
  background-color: ${(props) => props.color};
  margin-right: 8px;
`;

const RankWithColor = styled.div`
  display: flex;
  align-items: center;
`;

const BrandDetailsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 기본적으로 3열 */
  gap: 16px; /* 그리드 아이템 간 간격 */
  width: 100%;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 화면이 줄어들면 2열 */
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 매우 작은 화면에서는 1열 */
  }
`;

const BrandDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding: 8px;
  background: #3a3a3a;
  border-radius: 8px;
`;

const ItemDetails = styled.div`
  display: flex;
  justify-content: space-between; /* 요소들을 수평으로 나열 */
  gap: 16px; /* 각 항목 사이의 간격 조정 */
  width: 100%;
  align-items: center; /* 아이템을 가운데 정렬 */
`;

const Rank = styled.div`
  font-weight: bold;
  margin-right: 8px;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding: 8px 0;
  margin-top: 16px;
  border-bottom: 1px solid #ccc;
`;

const TopBrandItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 16px; /* 텍스트 크기를 조정하여 가독성 향상 */
  background: #3a3a3a;
  padding: 8px;
  border-radius: 8px;
`;

const HomeScreen = () => {
  const [dau, setDau] = useState(0);
  const [dauChange, setDauChange] = useState(0);
  const [mau, setMau] = useState(0);
  const [mauChange, setMauChange] = useState(0);
  const [pageViews, setPageViews] = useState(0);
  const [pageViewChange, setPageViewChange] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalMembersChange, setTotalMembersChange] = useState(0);
  const [newMembers, setNewMembers] = useState(0);
  const [newMembersChange, setNewMembersChange] = useState(0);
  const [topBrands, setTopBrands] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dailyDataResponse = await axios.get(`${apiUrl}/admin/getDaily`);
        const topClicksResponse = await axios.get(`${apiUrl}/admin/topbrand`);

        const {
          dau, dauChange, mau, mauChange, pageViews, pageViewChange, totalUsers,
          totalUsersChange, newUsers, newUsersChange,
        } = dailyDataResponse.data;

        setDau(dau || 0);
        setDauChange(dauChange || 0);
        setMau(mau || 0);
        setMauChange(mauChange || 0);
        setPageViews(pageViews || 0);
        setPageViewChange(pageViewChange || 0);
        setTotalMembers(totalUsers || 0);
        setTotalMembersChange(totalUsersChange || 0);
        setNewMembers(newUsers || 0);
        setNewMembersChange(newUsersChange || 0);

        let topBrandsData = topClicksResponse.data.data.topBrands || [];

        if (topBrandsData.length > 5) {
          const top5 = topBrandsData.slice(0, 5);
          const other = topBrandsData.slice(5);
          const otherClicks = other.reduce((acc, brand) => acc + parseInt(brand.clicks, 10), 0);
          const totalClicks = top5.reduce((acc, brand) => acc + parseInt(brand.clicks, 10), 0) + otherClicks;
          const otherPercentage = totalClicks > 0 ? ((otherClicks / totalClicks) * 100).toFixed(1) : '0.0';

          top5.push({
            brandName: '기타 브랜드',
            clicks: otherClicks.toString(),
            percentage: otherPercentage,
          });

          topBrandsData = top5;
        } else if (topBrandsData.length === 5) {
          // 상위 5개가 있고, 퍼센티지 합이 100%가 아닌 경우
          const sumPercentage = topBrandsData.reduce((sum, brand) => sum + parseFloat(brand.percentage), 0);
          const remainingPercentage = (100 - sumPercentage).toFixed(1);

          if (remainingPercentage > 0) {
            topBrandsData.push({
              brandName: '기타 브랜드',
              clicks: '0', // 실제 클릭수가 있다면 계산하여 설정
              percentage: remainingPercentage,
            });
          }
        }

        setTopBrands(topBrandsData);
        setTopProducts(topClicksResponse.data.data.topItems.slice(0, 5) || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const handleLogoClick = () => {
    navigate('/'); // 홈 화면으로 이동
  };

  const formatPercentage = (percentage) => {
    return parseFloat(percentage).toFixed(1);
  };

  // 퍼센티지 값들을 누적시켜 conic-gradient로 적용할 각 구역의 비율을 계산
  const getGradientString = () => {
    let cumulativePercent = 0;
    return topBrands
      .map((brand, index) => {
        const percentage = parseFloat(brand.percentage);
        const start = cumulativePercent;
        const end = cumulativePercent + percentage;
        cumulativePercent += percentage;
        return `${colors[index % colors.length]} ${start}% ${end}%`;
      })
      .join(', ');
  };

  // 퍼센트 라벨 위치 계산
  const getPercentageLabelPositions = () => {
    let cumulativePercent = 0;
    return topBrands.map((brand, index) => {
      const percentage = parseFloat(brand.percentage);
      const middlePercent = cumulativePercent + percentage / 2;
      const angle = (middlePercent / 100) * 360 - 90;
      const radius = 35; // 라벨 반지름 조정
      const top = 50 + radius * Math.sin((angle * Math.PI) / 180);
      const left = 50 + radius * Math.cos((angle * Math.PI) / 180);
      cumulativePercent += percentage;

      return { top, left, percentage: formatPercentage(percentage) };
    });
  };

  return (
    <Container>
      <Sidebar>
        <LogoContainer>
          <Logo onClick={handleLogoClick}>BRAIND</Logo>
        </LogoContainer>
        <Menu>
          <SidebarMenuItem
            active={location.pathname === '/'}
            onClick={() => navigate('/')}
          >
            <MenuIcon />
            <MenuText>HOME</MenuText>
          </SidebarMenuItem>
          <SidebarMenuItem
            active={location.pathname === '/post'}
            onClick={() => navigate('/post')}
          >
            <MenuIcon />
            <MenuText>콘텐츠 등록</MenuText>
          </SidebarMenuItem>
          <SidebarMenuItem
            active={location.pathname === '/contents'}
            onClick={() => navigate('/contents')}
          >
            <MenuIcon />
            <MenuText>콘텐츠 관리</MenuText>
          </SidebarMenuItem>
        </Menu>
        <ProfileContainer>
          <LogoutButton onClick={handleLogout}>
            <LogoutText>로그아웃</LogoutText>
          </LogoutButton>
        </ProfileContainer>
      </Sidebar>

      <MainContent>
        <ContentTitle>Home</ContentTitle>
        <StatBoxContainer>
          <StatBoxWrapper>
            <StatBox title="총 회원수" value={totalMembers} change={totalMembersChange} />
            <StatBox title="신규 회원수" value={newMembers} change={newMembersChange} />
            <StatBox title="Daily Active Users" value={dau} change={dauChange} />
            <StatBox title="Monthly Active Users" value={mau} change={mauChange} />
            <StatBox title="Page Views" value={pageViews} change={pageViewChange} />
          </StatBoxWrapper>
        </StatBoxContainer>
        <DashboardContainer>
          <BrandSection>
            <h2>최근 7일 클릭수 높은 브랜드</h2>
            {topBrands.length > 0 ? (
              <>
                <BrandCircleContainer>
                  <BrandCircle gradients={getGradientString()}>
                    {getPercentageLabelPositions().map((position, index) => (
                      <PercentageLabel
                        key={index}
                        top={position.top}
                        left={position.left}
                      >
                        {position.percentage}%
                      </PercentageLabel>
                    ))}
                  </BrandCircle>
                </BrandCircleContainer>
                <BrandDetailsContainer>
                  {topBrands.map((brand, index) => (
                    <TopBrandItem key={index}>
                      <RankWithColor>
                        <BrandColorBox color={colors[index % colors.length]} />
                        <Rank>{index + 1}.</Rank>
                      </RankWithColor>
                      <BrandDetails>
                        <p>{brand.brandName}</p>
                        <p>클릭수: {brand.clicks}</p>
                        <p>{formatPercentage(brand.percentage)}%</p>
                      </BrandDetails>
                    </TopBrandItem>
                  ))}
                </BrandDetailsContainer>
              </>
            ) : (
              <p>브랜드 데이터가 없습니다.</p>
            )}
          </BrandSection>

          <ItemSection>
            <h2>최근 7일 클릭수 높은 상품</h2>
            <ItemHeader>
              <span>브랜드명</span>
              <span>상품명</span>
              <span>클릭수</span>
              <span>퍼센트</span>
            </ItemHeader>
            {topProducts.length > 0 ? (
              topProducts.map((item, index) => (
                <TopBrandItem key={index}>
                  <Rank>{index + 1}.</Rank>
                  <ItemDetails>
                    <p>{item.brandName}</p>
                    <p>{item.itemName}</p>
                    <p>{item.clicks} 클릭</p>
                    <p>{Math.round(item.percentage)}%</p>
                  </ItemDetails>
                </TopBrandItem>
              ))
            ) : (
              <p>상품 데이터가 없습니다.</p>
            )}
          </ItemSection>
        </DashboardContainer>
      </MainContent>
    </Container>
  );
};

export default HomeScreen;
