import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Checkbox, MenuItem as MuiMenuItem, Select as MuiSelect, TextField, FormControl, InputLabel, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import apiUrl from './utils/config';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #121212; /* Dark background */
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Sidebar = styled.div`
  width: 256px;
  height: 100vh; /* Full viewport height */
  padding: 24px 16px;
  background: #2c2c2c; /* Darker background for sidebar */
  border-left: 1px solid #3a3a3a; /* Dark border color */
  border-right: 1px solid #3a3a3a; /* Dark border color */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Ensure space is between items and the bottom */
  overflow: hidden; /* Prevent scrolling inside the sidebar */
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
  color: #ffffff; /* White text color *
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
  background: ${(props) => (props.active ? '#333333' : 'none')}; /* Darker background for active item */
  border-left: ${(props) => (props.active ? '2px solid #ffffff' : 'none')}; /* White border for active item */
  border-bottom: 1px solid #2c2c2c; /* Dark border color */
  cursor: pointer;
`;

const MenuIcon = styled.div`
  width: 24px;
  height: 24px;
`;

const MenuText = styled.div`
  color: #ffffff; /* White text color */
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
  margin-top: auto; /* Pushes the profile section to the bottom */
  margin-bottom: 24px; /* Adjust this value to move it higher */
`;

const LogoutButton = styled.div`
  width: 200px; /* Set the width as needed */
  height: 24px;
  padding: 16px 12px;
  border: 2px solid #0f62fe; /* Blue border color */
  background: #1e1e1e; /* Match sidebar background */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const LogoutText = styled.div`
  color: #0f62fe; /* Blue text color */
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
  background: #181818; /* Dark background for content area */
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
  color: #ffffff;
  font-size: 32px;
  font-weight: bold;
`;

const ContentBody = styled.div`
  align-self: stretch;
  height: 764px;
  padding: 80px;
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
`;

const UploadCard = styled.div`
  width: 280px;
  background: #2e2e2e; /* Dark background */
  border: 1px solid #3a3a3a; /* Darker border color */
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
    object-fit: contain; /* Adjust as needed */
  }
`;

const UploadImagePlaceholder = styled.div`
  width: 144px;
  height: 144px;
  background: #3a3a3a; /* Darker background */
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
  background: #4a4a4a; /* Darker background */
`;

const ContentFormContainer = styled.div`
  padding: 16px;
  height: 100%;
  background: #1e1e1e; /* Dark background */
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;
`;

const ContentFormHeader = styled.div`
  align-self: stretch;
  height: 79px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0px;
`;

const ContentFormTitle = styled.div`
  align-self: stretch;
  height: 46px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  color: white;
  font-size: 42px;
  font-family: Roboto;
  font-weight: 700;
  line-height: 46.2px;
  word-wrap: break-word;
`;

const ContentFormSubtitle = styled.div`
  align-self: stretch;
  color: #b3b3b3; /* Light gray text color */
  font-size: 18px;
  font-family: Roboto;
  font-weight: 400;
  line-height: 25.2px;
  word-wrap: break-word;
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
  height: ${(props) => props.height || 'auto'};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

const Label = styled.div`
  align-self: stretch;
  color: grey; /* Light gray text color */
  font-size: 14px;
  font-family: Roboto;
  font-weight: 400;
  line-height: 19.6px;
  word-wrap: break-word;
`;

const TextFieldStyled = styled(TextField)`
  width: 100%;
  background: #2e2e2e; /* Darker background for input fields */
  & .MuiInputBase-input {
    color: #ffffff; /* White text color */
  }
  & .MuiInputLabel-root {
    color: #b3b3b3; /* Light gray text color */
  }
  & .MuiOutlinedInput-root {
    fieldset {
      border-color: #3a3a3a; /* Darker border color */
    }
    &:hover fieldset {
      border-color: #0f62fe; /* Blue border color on hover */
    }
    &.Mui-focused fieldset {
      border-color: #0f62fe; /* Blue border color when focused */
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
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  display: flex;
  color: white;
`;

const Toggle = styled.div`
  width: 32px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ToggleBackground = styled.div`
  width: 32px;
  height: 16px;
  padding: 2px;
  background: #3a3a3a; /* Darker background */
  border-radius: 33px;
  display: inline-flex;
  justify-content: center;
  align-items: flex-start;
`;

const ToggleCircle = styled.div`
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 9999px;
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
  background: #2e2e2e; /* Dark background for button */
  color: #a6c8ff; /* Light blue text color */
`;

const CancelText = styled.div`
  padding: 0 16px;
  color: #a6c8ff; /* Light blue text color */
  font-size: 16px;
  font-family: Roboto;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.5px;
  word-wrap: break-word;
`;

const SubmitButton = styled(Button)`
  width: 121px;
  padding: 16px 12px;
  background: #0f62fe;
  color: white;
  &:hover {
    background: #005bb5; /* Darker blue on hover */
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [gender, setGender] = useState('');
  const [season, setSeason] = useState([]);
  const [style, setStyle] = useState([]);
  const [coverImage, setCoverImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

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
  
  const genderMap = {
    '남성': 1,
    '여성': 2,
    '남성/여성': 3,
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
    formData.append('image', uploadedImage);
    formData.append('title', title);
    formData.append('caption', caption);
    formData.append('gender', genderMap[gender]);
  
    formData.append('seasons', JSON.stringify(season.map(seasonName => seasonMap[seasonName])));
    formData.append('styles', JSON.stringify(style));
  
    formData.append('coverImage', coverImage ? 1 : 0);
  
    // 선택된 날짜를 UTC로 변환해 서버로 전송
    if (selectedDate) {
      const utcDate = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000)); 
      const formattedDate = utcDate.toISOString().slice(0, 19).replace('T', ' '); // MySQL datetime 형식으로 변환
      formData.append('date', formattedDate);
    }
  
    // API 요청 보내기
    try {
      const response = await axios.post(`${apiUrl}/admin/img`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      console.log('서버 응답:', response); // 서버 응답을 로그로 확인
      setLoading(false);
      setOpenDialog(true);
    } catch (error) {
      setLoading(false);
      console.error('등록 중 오류가 발생했습니다:', error);
    }
  };
  
  
  const handleDialogClose = () => {
    setOpenDialog(false);
    navigate('/contents');
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const handleLogoClick = () => {
    navigate('/'); // 홈 화면으로 이동
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
    <ContentTitle>콘텐츠 등록</ContentTitle>
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
      <ContentFormTitle>신규 콘텐츠 등록</ContentFormTitle>
    </ContentFormHeader>
    <ContentFormBody>
      <FormGroup height="76px">
        <Label style={{ color: '#cccccc' }}>타이틀</Label>
        <TextFieldStyled
          fullWidth
          placeholder="타이틀 입력"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            '& .MuiInputBase-root': {
              color: '#ffffff', // 입력된 텍스트 색상
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#444444', // 테두리 색상
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#888888', // 호버 시 테두리 색상
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#0f62fe', // 포커스 시 테두리 색상
            },
          }}
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
          sx={{
            '& .MuiInputBase-root': {
              color: '#ffffff', // 입력된 텍스트 색상
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#444444', // 테두리 색상
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#888888', // 호버 시 테두리 색상
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#0f62fe', // 포커스 시 테두리 색상
            },
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label style={{ color: '#cccccc' }}>성별</Label>
        <FormControl fullWidth>
          <InputLabel sx={{ color: '#cccccc' }}>성별 선택</InputLabel>
          <MuiSelect
            value={gender}
            onChange={handleGenderChange}
            sx={{
              color: '#ffffff', // 선택된 텍스트 색상
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: '#444444', // 테두리 색상
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#0f62fe', // 포커스 시 테두리 색상
              },
              '.MuiSvgIcon-root': {
                color: '#cccccc', // 드롭다운 아이콘 색상
              },
            }}
          >
            <MuiMenuItem value={'남성'}>남성</MuiMenuItem>
            <MuiMenuItem value={'여성'}>여성</MuiMenuItem>
            <MuiMenuItem value={'남성/여성'}>남성/여성</MuiMenuItem>
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
          {['봄/가을', '여름', '겨울'].map((seasonOption) => (
            <div key={seasonOption} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Checkbox
                checked={season.includes(seasonOption)}
                onChange={handleSeasonChange}
                value={seasonOption}
                sx={{
                  color: '#d3d3d3', // Unchecked state color
                  '&.Mui-checked': {
                    color: '#d3d3d3', // Checked state color
                  },
                }}
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
                sx={{
                  color: '#cccccc', // Unchecked state color
                  '&.Mui-checked': {
                    color: '#cccccc', // Checked state color
                  },
                }}
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
            sx={{
              color: '#cccccc', // Unchecked state color
              '&.Mui-checked': {
                color: '#cccccc', // Checked state color
              },
            }}
          />
          <div style={{ color: '#cccccc' }}>커버 이미지로 등록</div>
        </CheckboxContainer>
      </FormGroup>
      <ActionButtons>
        <CancelButton
          variant="outlined"
          color="primary"
          sx={{
            borderColor: '#888888',
            color: '#cccccc',
            '&:hover': {
              borderColor: '#0f62fe',
              color: '#ffffff',
            },
          }}
          onClick={() => navigate('/')}
        >
          취소
        </CancelButton>
        <SubmitButton
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: '#0f62fe',
            '&:hover': {
              backgroundColor: '#0053b3',
            },
          }}
          onClick={handleFormSubmit}
        >
          신규 등록
        </SubmitButton>
      </ActionButtons>
    </ContentFormBody>
  </ContentFormContainer>
</ContentBody>
<Dialog open={openDialog} onClose={handleDialogClose}>
  <DialogTitle>등록 완료</DialogTitle>
  <DialogContent>
    <DialogContentText>등록되었습니다!</DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleDialogClose} color="primary" autoFocus>
      확인
    </Button>
  </DialogActions>
</Dialog>
      </ContentContainer>
    </Container>
  );
};

export default App;
