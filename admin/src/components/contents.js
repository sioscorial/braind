import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import editIcon from '../assets/icons/edit.svg'; 
import calendarIcon from '../assets/icons/calendar.svg'; 
import refreshIcon from '../assets/icons/refresh.svg'; 
import flagIcon from '../assets/icons/flag-f.svg'; 
import moreHorizontalIcon from '../assets/icons/more-horizontal.svg'; 
import apiUrl from './utils/config';

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

const ContentContainer = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  background: #2c2c2c;
  overflow-y: auto;

  @media (min-width: 768px) {
    padding: 24px;
    gap: 24px;
  }
`;

const ContentHeader = styled.div`
  align-self: stretch;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #3a3a3a;
  padding-bottom: 16px;
`;

const ContentTitle = styled.div`
  color: #ffffff;
  font-size: 32px;
  font-weight: bold;
`;

const AddContentButton = styled.button`
  background: #0f62fe;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ContentList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  width: 100%;

  @media (min-width: 768px) {
    grid-column-gap: 24px;
    grid-row-gap: 24px;
  }
`;

const ContentItem = styled.div`
  width: 100%;
  max-width: 280px;
  padding: 16px;
  background: #3a3a3a;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.75em;
  position: relative;
  justify-content: space-between;
  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: 100%;
  }
`;

const ContentDateBox = styled.div`
  background: #2c2c2c;
  padding: 4px;
  border-radius: 4px;
  color: #ffffff;
  font-size: 14px;
  font-family: Roboto;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const DateLabel = styled.div`
  color: #cccccc;
  font-size: 14px;
  font-weight: bold;
`;

const DateValue = styled.div`
  color: #ffffff;
  font-size: 14px;
`;

const ContentCaption = styled.div`
  color: #cccccc;
  font-size: 14px;
  font-family: Roboto;
  font-weight: 400;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
`;

const ContentImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  align-self: center;
  cursor: pointer;
`;

const ContentBrands = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #cccccc;
  font-size: 12px;
  margin-top: 8px;
`;

const BrandContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 4px;
  border-radius: 4px;
`;

const BrandLogo = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background: #ffffff;
  border: 1px solid #dde1e6;
  cursor: pointer;
`;

const IconRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`; 
const LeftIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  background-color: #cccccc;
  border-radius: 50%;
  cursor: pointer;
`;

const MoreOptionsButton = styled.div`
  width: 24px;
  height: 24px;
  background: url(${moreHorizontalIcon}) no-repeat center center;
  background-size: 16px 16px;
  cursor: pointer;
  margin-left: auto;
`;

const DeleteButtonContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 8px;
  right: 8px;
  gap: 8px;
  z-index: 1;
`;

const DeleteButton = styled.button`
  background: #f44336;
  color: #ffffff;
  padding: 8px 4px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
`;

const CloseButton = styled.div`
  color: #ffffff;
  background: #000000;
  padding: 7px 6px;
  border-radius: 4px;
  cursor: pointer;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
`;

const PageButton = styled.button`
  background: ${(props) => (props.active ? '#a6c8ff' : '#0f62fe')};
  color: ${(props) => (props.active ? '#001d6c' : '#ffffff')};
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #5e5e5e;
  }
`;

const Contents = () => {
  const navigate = useNavigate();
  const location = useLocation();  
  const [contents, setContents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(null);
  const itemsPerPage = 9;
  const containerRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${apiUrl}/admin/getback`)
      .then((response) => {
        setContents(response.data.images);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const totalPages = Math.ceil(contents.length / itemsPerPage);
  const currentContents = contents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 한국 시간(KST)으로 변환하여 날짜 포맷
  const formatDate = (dateString) => {
    if (!dateString) return '';
  
    // 받은 UTC 시간을 KST로 변환
    const utcDate = new Date(dateString);
    const kstOffset = 9 * 60; // UTC+9 시간 차이 (분 단위)
    const kstDate = new Date(utcDate.getTime() + kstOffset * 60000);
  
    return kstDate.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const handleMoreOptionsClick = (contentId) => {
    setDeleteButtonVisible(deleteButtonVisible === contentId ? null : contentId);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };
  
  const handleDelete = async (contentId) => {
    const confirmDelete = window.confirm('삭제하겠습니까?');
    if (confirmDelete) {
      try {
        await axios.delete(`${apiUrl}/admin/delete/${contentId}`);
        // 삭제 성공 후 콘텐츠 목록을 다시 가져옵니다.
        const response = await axios.get(`${apiUrl}/admin/getback`);
        setContents(response.data.images);

        // 삭제 후 페이지에 데이터가 없는 경우 이전 페이지로 이동
        const totalPages = Math.ceil(response.data.images.length / itemsPerPage);
        if (currentPage > totalPages) {
          setCurrentPage(totalPages); // 이전 페이지로 이동
        }

        setDeleteButtonVisible(null); // 삭제 후 버튼 숨기기
      } catch (error) {
        console.error('Error deleting content:', error);
        alert('삭제에 실패했습니다.');
      }
    }
  };

  const navigateToModify = (id) => {
    navigate(`/modify/${id}`);
  };
  const handleLogoClick = () => {
    navigate('/'); // 홈 화면으로 이동
  };

  return (
    <Container ref={containerRef}>
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

      <ContentContainer>
        <ContentHeader>
          <ContentTitle>콘텐츠 관리</ContentTitle>
          <AddContentButton onClick={() => navigate('/post')}>
            + 신규 콘텐츠 등록
          </AddContentButton>
        </ContentHeader>

        <ContentList>
          {currentContents.map((content) => (
            <ContentItem key={content.id}>
            <ContentDateBox>
              <div>
                <DateLabel>등록된 날짜:</DateLabel>
                <DateValue>{formatDate(content.created_at)}</DateValue>
              </div>
              <div>
                <DateLabel>등록할 날짜:</DateLabel>
                <DateValue>{formatDate(content.scheduled_date)}</DateValue>
              </div>
            </ContentDateBox>
            <ContentCaption>{content.caption}</ContentCaption>
            <ContentImage 
              src={content.img_path} 
              alt={content.caption}
              onClick={() => navigateToModify(content.id)}
            />
            <ContentBrands>
              <BrandContainer>
                {content.brandDetails.slice(0, 5).map((brand) => (
                  <BrandLogo key={brand.id} src={brand.brand_logo_url} alt={brand.brand_name_eng} />
                ))}
              </BrandContainer>
              <div>총 {content.brandDetails.length}개 브랜드</div>
            </ContentBrands>
            <IconRow>
              <LeftIcons>
                <Icon 
                  style={{ background: `url(${editIcon}) no-repeat center center`, backgroundSize: '16px 16px' }} 
                  title="수정" 
                  onClick={() => navigateToModify(content.id)} 
                />
                <Icon style={{ background: `url(${calendarIcon}) no-repeat center center`, backgroundSize: '16px 16px' }} title="업로드 날짜 변경" />
                <Icon style={{ background: `url(${refreshIcon}) no-repeat center center`, backgroundSize: '16px 16px' }} title="모델 새로 돌리기" />
                <Icon style={{ background: `url(${flagIcon}) no-repeat center center`, backgroundSize: '16px 16px' }} title="커버 지정" />
              </LeftIcons>
              <MoreOptionsButton onClick={() => handleMoreOptionsClick(content.id)} />
              {deleteButtonVisible === content.id && (
                <DeleteButtonContainer>
                  <DeleteButton onClick={() => handleDelete(content.id)}>
                    삭제하기
                  </DeleteButton>
                  <CloseButton onClick={() => setDeleteButtonVisible(null)}>
                    X
                  </CloseButton>
                </DeleteButtonContainer>
              )}
            </IconRow>
          </ContentItem>
          ))}
        </ContentList>

        <PaginationContainer>
          {Array.from({ length: totalPages }, (_, index) => (
            <PageButton
              key={index + 1}
              active={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))}
        </PaginationContainer>
      </ContentContainer>
    </Container>
  );
};

export default Contents;
