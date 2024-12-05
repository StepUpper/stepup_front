# Perfitt Finder - AI 신발 추천 도우미 웹 어플리케이션 개발

- StepUp팀 노션 : [TEAM 스텝업](https://www.notion.so/step-up-react/31d872cef31f4fd8881537ecc01576d3)
- Perfitt Finder 배포 주소 : [Perfitt Finder](https://stepupper.github.io/stepup_front/)

<br />


## 🚀 프로젝트 소개

Perfitt Finder는 챗봇과의 대화를 통해 원하는 신발을 찾아가는 서비스입니다. <br />

<div align="center">
  <img src="https://github.com/user-attachments/assets/833bb109-e5b2-44d2-8205-fc3711456fa3" width="160px" />
  <img src="https://github.com/user-attachments/assets/d28fc847-fe4c-447c-b7f8-1fdeb1ba9af1" width="160px" />
</div>

<br />
B2B 서비스인 Perfitt Size를 B2C로 확장하여 전문 쇼핑 어시스턴트와 함께하는 듯한 온라인 신발 구매 경험을 제공합니다. 이를 통해 판매 채널을 확장하고, 고객 만족도 및 충성도를 향상시키는 것을 목표로 합니다. <br />
<br />
*** 해당 프로젝트는 (주)펄핏에서 요청받아 협업하여 진행하였습니다.

<br /><br />


## 🕒 개발 일정
- MVP 개발 : 초기 기능 및 주요 로직 구현 완료 (2024.09.02 ~ 2024.09.27)
- 추가 기능 개발 : 구글 로그인 및 신발장 구현 완료 (~ 2024.11.21)

<br />


## 🛠️ 주요 기능

### 온보딩
> 온보딩 과정에서 처음 사용자를 위한 앱의 주요 기능을 소개하고, 이후 사용자는 챗봇 페이지로 안내됩니다. 이 과정을 통해 사용자가 앱의 핵심 기능을 쉽게 이해하고 사용할 수 있도록 돕습니다.

### 로그인
> 이메일로 회원가입한 사용자에게 맞춤형 신발 추천, 좋아요, 내 발 측정하기 기능을 제공합니다. 또한, 구글 로그인을 지원합니다.
  
### 회원가입
> 회원가입 시 신발 사이즈, 관심 키워드 등의 정보를 수집하여 사용자의 선호도에 맞는 맞춤형 서비스를 제공합니다. 개인화된 추천을 통해 사용자는 더 나은 쇼핑 경험을 누릴 수 있습니다.

### 챗봇
> 챗봇과 대화를 통해 사용자는 맞춤형 신발 추천을 받거나 신발 관련 유용한 정보를 얻을 수 있습니다. 챗봇은 사용자의 라이프스타일에 맞춘 추천을 제공하며, 개인화된 신발 추천을 제시합니다.

### 공유하기
> 사용자는 챗봇 대화 내용을 공유할 수 있으며, 공유된 링크를 통해 새로운 사용자를 유입할 수 있습니다. 이를 통해 서비스의 접근성을 높이고 사용자 경험을 확장합니다.

### PLP
> 사용자는 챗봇을 통해 추천받은 브랜드 및 상품 목록을 바텀시트를 통해 확인할 수 있습니다. 또한, 성별 카테고리 및 다양한 필터 기능을 사용하여 원하는 신발을 쉽게 찾을 수 있습니다.

### 브릿지
> 상품을 클릭하면 브릿지 페이지로 이동하여 해당 상품에 대한 상세 정보와 고객사 정보를 제공하며, 이후 고객사 페이지로 자동 리디렉션되어 신발 구매를 이어갈 수 있습니다.

### 사이드 메뉴
> 사이드 메뉴를 통해 채팅방 생성, 이동, 삭제 기능을 제공하며, 마이페이지, 좋아요, 최근 본 상품, 신발장, 내 발 측정하기 기능에 빠르게 접근할 수 있습니다. 계정 설정과 로그아웃도 사이드 메뉴에서 간편하게 이용할 수 있습니다.

### 마이페이지
> 사용자는 자신의 회원 정보, 좋아요 표시한 상품, 최근 본 상품을 확인할 수 있으며, 계정 설정을 수정할 수 있습니다. 사용자 맞춤형 정보를 확인하고 관리하는 데 최적화된 페이지입니다.

### 좋아요 / 최근본
> 사용자는 마음에 드는 신발에 좋아요를 표시할 수 있으며, 좋아요한 상품 목록은 마이페이지에서 쉽게 확인할 수 있습니다. 이를 통해 관심 있는 상품을 한눈에 관리할 수 있습니다.

> 최근 본 상품 기능을 통해 사용자가 이전에 본 신발을 쉽게 다시 찾아볼 수 있습니다. 마이페이지에서 최근 본 상품 목록을 제공하여 사용자가 놓친 신발을 다시 확인하고 선택할 수 있도록 돕습니다.

### 내 발 측정하기
> 내 발 측정하기 기능은 스마트폰 카메라를 통해 발 사이즈를 측정하고, 펄핏 SDK와 AI 기술을 연동하여 정확한 사이즈를 추천합니다. 이 기능은 온라인 신발 쇼핑에서 가장 큰 문제 중 하나인 사이즈 선택의 어려움을 혁신적으로 해결합니다.

### 신발장
> 사용자는 자신이 보유한 신발을 등록하고 관리할 수 있으며, 각 신발에 대한 평점 및 후기를 작성할 수 있습니다. 신발장을 통해 사용자 개인의 신발 컬렉션을 효율적으로 관리하고 추적할 수 있습니다. 또한, 사용자는 자신의 신발 컬렉션을 공유할 수 있습니다.

<br />


## 💻 기술 스택

### Frontend
<div>
  <img src="https://img.shields.io/badge/react-20232a.svg?style=for-the-badge&logo=react&logoColor=61DAFB" />&nbsp;
  <img src="https://img.shields.io/badge/typescript-007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />&nbsp;
  <img src="https://img.shields.io/badge/vite-646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" />&nbsp;
  <img src="https://img.shields.io/badge/yarn-2C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white" />&nbsp;
  <img src="https://img.shields.io/badge/zustand-181717.svg?style=for-the-badge&logo=zustand&logoColor=white" />&nbsp;
  <img src="https://img.shields.io/badge/axios-5A29E4.svg?style=for-the-badge&logo=axios&logoColor=white" />&nbsp;
  <img src="https://img.shields.io/badge/react--router-CA4245.svg?style=for-the-badge&logo=react-router&logoColor=white" />&nbsp;
  <img src="https://img.shields.io/badge/tailwindcss-06B6D4.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" />&nbsp;
  <img src="https://img.shields.io/badge/eslint-4B32C3.svg?style=for-the-badge&logo=eslint&logoColor=white" />&nbsp;
  <img src="https://img.shields.io/badge/prettier-F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=white" />&nbsp;
</div>

### DB
<div>
  <img src="https://img.shields.io/badge/firebase-FFCA28.svg?style=for-the-badge&logo=firebase&logoColor=black" />&nbsp;
</div>

### Deployment
<div>
  <img src="https://img.shields.io/badge/github%20pages-222222.svg?style=for-the-badge&logo=githubpages&logoColor=white" />&nbsp;<img src="https://img.shields.io/badge/github%20actions-2088FF.svg?style=for-the-badge&logo=githubactions&logoColor=white" />&nbsp;

</div>

### Communication
<div>
  <img src="https://img.shields.io/badge/github-181717.svg?style=for-the-badge&logo=github&logoColor=white" />&nbsp;
  <img src="https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white" />&nbsp;
  <img src="https://img.shields.io/badge/figma-F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white" />&nbsp;
  <img src="https://img.shields.io/badge/slack-4A154B.svg?style=for-the-badge&logo=slack&logoColor=white" />&nbsp;
  <img src="https://img.shields.io/badge/notion-000000.svg?style=for-the-badge&logo=notion&logoColor=white" />&nbsp;
</div>

<br />


## 🧑‍💻 팀 소개

안녕하세요, **스텝업** 입니다! 🙋‍♀️🙋‍♂️🙋‍♀️🙋‍♀️ <br />
사용자에게 직관적이고 편리한 인터페이스를 제공하여 서비스의 목적을 효과적으로 전달하는 것을 목표로 가지고 있습니다.

| <img src="https://avatars.githubusercontent.com/u/134491629?v=4" alt="SSUK-H" width="140px"/> | <img src="https://avatars.githubusercontent.com/u/159886577?v=4" alt="rlawlsdud1" width="140px"/> | <img src="https://avatars.githubusercontent.com/u/178988254?v=4" alt="june-saisquoi" width="140px"/> | <img src="https://avatars.githubusercontent.com/u/128772605?v=4" alt="oneju" width="140px"/> |
| :---------------------------------------: | :---------------------------------------: | :---------------------------------------: | :---------------------------------------: |
| [홍성숙](https://github.com/SSUK-H) <br /> (팀장) | [김진영](https://github.com/rlawlsdud1) <br /> (팀 대표자) | [전준혜](https://github.com/june-saisquoi) <br /> (팀원) | [노원주](https://github.com/oneju) <br /> (팀원) |
| PLP, 브릿지, 내 발 측정하기, 배포 담당 | 챗봇, DB 담당 | 사이드 메뉴, 마이페이지 담당 | 온보딩, 로그인/회원가입 담당 |

<br />


## ⁉️ FAQ



<br />


