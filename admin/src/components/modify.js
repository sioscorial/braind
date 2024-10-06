import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Checkbox, MenuItem as MuiMenuItem, Select as MuiSelect, TextField, FormControl, InputLabel, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import apiUrl from './utils/config';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #121212;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Sidebar = styled.div`
  width: 256px;
  height: 100vh;
  padding: 24px 16px;
  background: #2c2c2c;
  border-left: 1px solid #3a3a3a;
  border-right: 1px solid #3a3a3a;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
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
  pointer: cursor;
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
  background: ${(props) => (props.active ? '#333333' : 'none')};
  border-left: ${(props) => (props.active ? '2px solid #ffffff' : 'none')};
  border-bottom: 1px solid #2c2c2c;
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
  background: #1e1e1e;
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
  padding: 24px;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
  background: #181818;
`;

const ContentHeader = styled.div`
  align-self: stretch;
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
`;

const ContentTitleContainer = styled.div`
  flex: 1;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 48px;
`;

const ContentTitle = styled.div`
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: white;
  font-size: 42px;
  font-family: Roboto;
  font-weight: 700;
  line-height: 46.2px;
`;

const ContentBody = styled.div`
  align-self: stretch;
  padding: 80px;
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
`;

const UploadCard = styled.div`
  width: 280px;
  background: #2e2e2e;
  border: 1px solid #3a3a3a;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const UploadCardBody = styled.div`
  align-self: stretch;
  height: 400px;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const UploadImagePlaceholder = styled.div`
  width: 144px;
  height: 144px;
  background: #3a3a3a;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const UploadImageIcon = styled.div`
  width: 72px;
  height: 72px;
  position: relative;
`;

const UploadImageBackground = styled.div`
  width: 60px;
  height: 60px;
  position: absolute;
  top: 6px;
  left: 6px;
  background: #4a4a4a;
`;

const ContentFormContainer = styled.div`
  padding: 16px;
  height: 100%;
  background: #1e1e1e;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;
`;

const ContentFormHeader = styled.div`
  align-self: stretch;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0px;
`;

const ContentFormTitle = styled.div`
  align-self: stretch;
  color: white;
  font-size: 42px;
  font-family: Roboto;
  font-weight: 700;
`;

const ContentFormBody = styled.div`
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
`;

const FormGroup = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

const Label = styled.div`
  align-self: stretch;
  color: grey;
  font-size: 14px;
  font-family: Roboto;
  font-weight: 400;
`;

const TextFieldStyled = styled(TextField)`
  width: 100%;
  background: #2e2e2e;
  & .MuiInputBase-input {
    color: #ffffff;
  }
  & .MuiInputLabel-root {
    color: #b3b3b3;
  }
  & .MuiOutlinedInput-root {
    fieldset {
      border-color: #3a3a3a;
    }
    &:hover fieldset {
      border-color: #0f62fe;
    }
    &.Mui-focused fieldset {
      border-color: #0f62fe;
    }
  }
`;

const DatePickerWrapper = styled.div`
  position: relative;
  z-index: 1000; /* z-index 값을 높여 다른 요소 위에 오버레이되도록 설정 */
  
  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container input {
    width: 100%;
    height: 48px;
    padding: 12px 16px;
    background: #2e2e2e; /* Darker background for date picker */
    border: 1px solid #3a3a3a; /* Darker border */
    font-size: 16px;
    color: #e0e0e0; /* Light gray text color */
  }

  .react-datepicker-popper {
    z-index: 1500 !important; /* DatePicker 팝업의 z-index 값을 높게 설정 */
  }
`;


const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
`;

const ActionButtons = styled.div`
  align-self: stretch;
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
`;

const CancelButton = styled(Button)`
  width: 86px;
  padding: 16px 12px;
  border: 2px solid #a6c8ff;
  background: #2e2e2e;
  color: #a6c8ff;
`;

const SubmitButton = styled(Button)`
  width: 121px;
  padding: 16px 12px;
  background: #0f62fe;
  color: white;
  &:hover {
    background: #005bb5;
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Modify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [gender, setGender] = useState(1); 
  const [season, setSeason] = useState([]);
  const [style, setStyle] = useState([]);
  const [coverImage, setCoverImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const styleMap = {
    '스트릿': 1,
    '뉴트로': 2,
    '미니멀': 3,
    '댄디': 4,
    '여성 패션': 5,
    '스포츠': 6,
    '아메카지': 7,
    '캐주얼': 8,
  };
  
  const seasonMap = {
    '봄/가을': 1,
    '여름': 2,
    '겨울': 3,
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSeasonChange = (event) => {
    const value = event.target.value;
    setSeason((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleStyleChange = (event) => {
    const value = styleMap[event.target.value];
    setStyle((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setUploadedImage(file);
    }
  };

  const handleFormSubmit = async () => {
    setLoading(true);
  
    const formData = new FormData();
    
    if (uploadedImage) {
      formData.append('image', uploadedImage);
    }
  
    formData.append('title', title);
    formData.append('caption', caption);
    formData.append('gender_id', gender);
    formData.append('seasons', JSON.stringify(season.map(seasonName => seasonMap[seasonName])));
    formData.append('styles', JSON.stringify(style));
    formData.append('coverImage', coverImage ? 1 : 0);
  
    // 사용자가 선택한 로컬 시간을 그대로 UTC로 변환하여 저장 (불필요한 변환 제거)
    if (selectedDate) {
      // 선택된 시간을 UTC로 직접 변환하여 저장
      const utcDate = selectedDate.toISOString(); // UTC 시간으로 변환
      formData.append('date', utcDate);
    } else {
      formData.append('date', '');
    }
  
    try {
      await axios.put(`${apiUrl}/admin/img/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      setOpenDialog(true);
    } catch (error) {
      setLoading(false);
      console.error('수정 중 오류가 발생했습니다:', error);
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    navigate('/contents');
  };

  const handleConfirmDialogClose = (confirmed) => {
    setOpenConfirmDialog(false);
    if (confirmed) {
      handleFormSubmit();
    }
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/admin/img?id=${id}`)
      .then((response) => {
        const data = response.data.data;
        setTitle(data.title);
        setCaption(data.caption);
        setGender(data.gender_id);
        setSeason(data.seasons.map(seasonId => Object.keys(seasonMap).find(key => seasonMap[key] === parseInt(seasonId, 10))));
        setStyle(data.styles.map(styleId => parseInt(styleId, 10)));
        setCoverImage(data.cover === 1);

        // 서버에서 받은 UTC 시간을 로컬 시간으로 변환
        const utcDate = new Date(data.scheduled_date);
        const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
        setSelectedDate(localDate);
        setImagePreview(data.img_path);
      })
      .catch((error) => {
        console.error('Error fetching content data:', error);
      });
  }, [id]);

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <Container>
      {loading && (
        <LoadingOverlay>
          <CircularProgress color="primary" />
        </LoadingOverlay>
      )}
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
          <SidebarMenuItem
            active={location.pathname === '/brand'}
            onClick={() => navigate('/brand')}
          >
            <MenuIcon />
            <MenuText>브랜드 관리</MenuText>
          </SidebarMenuItem>
          <SidebarMenuItem
            active={location.pathname === '/product'}
            onClick={() => navigate('/product')}
          >
            <MenuIcon />
            <MenuText>상품 관리</MenuText>
          </SidebarMenuItem>
          <SidebarMenuItem
            active={location.pathname === '/search'}
            onClick={() => navigate('/search')}
          >
            <MenuIcon />
            <MenuText>검색 데이터 관리</MenuText>
          </SidebarMenuItem>
          <SidebarMenuItem
            active={location.pathname === '/model'}
            onClick={() => navigate('/model')}
          >
            <MenuIcon />
            <MenuText>추천 모델 관리</MenuText>
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
          <ContentTitleContainer>
            <ContentTitle>콘텐츠 수정</ContentTitle>
          </ContentTitleContainer>
        </ContentHeader>
        <ContentBody>
        <UploadCard>
            <UploadCardBody>
              {imagePreview ? (
                <img src={imagePreview} alt="미리보기" style={{ width: '100%', height: '100%' }} />
              ) : (
                <UploadImagePlaceholder>
                  <UploadImageIcon>
                    <UploadImageBackground />
                  </UploadImageIcon>
                </UploadImagePlaceholder>
              )}
              <input type="file" onChange={handleImageUpload} />
            </UploadCardBody>
          </UploadCard>
          <ContentFormContainer>
            <ContentFormHeader>
              <ContentFormTitle>콘텐츠 수정</ContentFormTitle>
            </ContentFormHeader>
            <ContentFormBody>
              <FormGroup height="76px">
                <Label style={{ color: '#cccccc' }}>타이틀</Label>
                <TextFieldStyled
                  fullWidth
                  placeholder="타이틀 입력"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormGroup>
              <FormGroup height="124px">
                <Label style={{ color: '#cccccc' }}>캡션</Label>
                <TextFieldStyled
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="캡션 입력"
                  variant="outlined"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label style={{ color: '#cccccc' }}>성별</Label>
                <FormControl fullWidth>
                  <InputLabel style={{ color: '#cccccc' }}>성별 선택</InputLabel>
                  <MuiSelect
                    value={gender || ''}
                    onChange={handleGenderChange}
                    sx={{
                      color: '#ffffff',
                      '.MuiOutlinedInput-notchedOutline': {
                        borderColor: '#444444',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0f62fe',
                      },
                      '.MuiSvgIcon-root': {
                        color: '#cccccc',
                      },
                    }}
                  >
                    <MuiMenuItem value={1}>남성</MuiMenuItem>
                    <MuiMenuItem value={2}>여성</MuiMenuItem>
                    <MuiMenuItem value={3}>남성/여성</MuiMenuItem>
                  </MuiSelect>
                </FormControl>
              </FormGroup>
              <FormGroup>
                <Label style={{ color: '#cccccc' }}>게시 예약 일시</Label>
                <DatePickerWrapper>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="yyyy/MM/dd h:mm aa"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    placeholderText="날짜 및 시간 선택"
                  />
                </DatePickerWrapper>
              </FormGroup>

              <FormGroup>
                <Label style={{ color: '#cccccc' }}>계절</Label>
                <CheckboxContainer>
                  {Object.keys(seasonMap).map((seasonOption) => (
                    <div key={seasonOption} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <Checkbox
                        checked={season.includes(seasonOption)}
                        onChange={handleSeasonChange}
                        value={seasonOption}
                      />
                      <div style={{ color: '#cccccc' }}>{seasonOption}</div>
                    </div>
                  ))}
                </CheckboxContainer>
              </FormGroup>
              <FormGroup>
                <Label style={{ color: '#cccccc' }}>스타일</Label>
                <CheckboxContainer>
                  {Object.keys(styleMap).map((styleOption) => (
                    <div key={styleOption} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <Checkbox
                        checked={style.includes(styleMap[styleOption])}
                        onChange={handleStyleChange}
                        value={styleOption}
                      />
                      <div style={{ color: '#cccccc' }}>{styleOption}</div>
                    </div>
                  ))}
                </CheckboxContainer>
              </FormGroup>
              <FormGroup>
                <Label style={{ color: '#cccccc' }}>커버 이미지</Label>
                <CheckboxContainer>
                  <Checkbox
                    checked={coverImage}
                    onChange={(e) => setCoverImage(e.target.checked)}
                  />
                  <div style={{ color: '#cccccc' }}>커버 이미지로 등록</div>
                </CheckboxContainer>
              </FormGroup>
              <ActionButtons>
                <CancelButton
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate('/contents')}
                >
                  취소
                </CancelButton>
                <SubmitButton
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenConfirmDialog(true)}
                >
                  수정 완료
                </SubmitButton>
              </ActionButtons>
            </ContentFormBody>
          </ContentFormContainer>
        </ContentBody>
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>수정 완료</DialogTitle>
          <DialogContent>
            <DialogContentText>수정이 완료되었습니다!</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary" autoFocus>
              확인
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openConfirmDialog} onClose={() => handleConfirmDialogClose(false)}>
          <DialogTitle>수정 확인</DialogTitle>
          <DialogContent>
            <DialogContentText>수정하시겠습니까?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleConfirmDialogClose(false)} color="primary">
              취소
            </Button>
            <Button onClick={() => handleConfirmDialogClose(true)} color="primary" autoFocus>
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </ContentContainer>
    </Container>
  );
};

export default Modify;
