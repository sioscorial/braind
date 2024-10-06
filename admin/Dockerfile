# 베이스 이미지 설정
FROM node:14

# 작업 디렉토리 설정
WORKDIR /app

# 종속성 설치
COPY package*.json ./
RUN npm install

# 애플리케이션 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 빌드된 애플리케이션을 제공할 웹 서버 설정
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# 웹 서버 포트 설정
EXPOSE 80
