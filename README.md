# IT Job Search - Frontend (fe)

Frontend cho dự án **IT Job Search**, xây dựng bằng [Next.js](https://nextjs.org/) và các công nghệ web hiện đại.  
Ứng dụng cung cấp giao diện thân thiện để tìm kiếm, lọc và quản lý việc làm trong ngành CNTT.

![Trang chủ](https://res.cloudinary.com/dlhxktrw3/image/upload/v1756300795/itjobsearch_l3g3uz.png)

---

## Mục lục
- [Giới thiệu](#giới-thiệu)
- [Tính năng](#tính-năng)
- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Cài đặt](#cài-đặt)
- [Biến môi trường](#biến-môi-trường)
- [Cách sử dụng](#cách-sử-dụng)
- [Cấu trúc thư mục dự án](#cấu-trúc-thư-mục-dự-án)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Deploy on Vercel](#deploy-on-vercel)
- [Tác giả](#tác-giả)

---

## Giới thiệu
- Đây là phần **Frontend** của dự án IT Job Search.  
- Kết nối tới Backend để hiển thị danh sách việc làm, tìm kiếm, đăng nhập, và quản lý hồ sơ ứng viên.  
- Giao diện được tối ưu **Responsive** cho cả desktop và mobile.  

---

## Tính năng

**Ứng viên**  
- Tìm kiếm và lọc việc làm theo từ khóa, vị trí, chuyên môn, tên công ty
- Đăng ký / Đăng nhập, quản lý hồ sơ cá nhân và CV  
- Xem chi tiết tin tuyển dụng và nộp đơn ứng tuyển  
- Theo dõi tương tác của ứng viên để đề xuất các công việc phù hợp

**Nhà tuyển dụng**  
- Đăng tin tuyển dụng, quản lý danh sách công việc   
- Đăng ký / Đăng nhập, quản lý thông tin công ty  
- Theo dõi và quản lý danh sách ứng viên ứng tuyển  

**Tính năng chung**  
- Giao diện thân thiện, tối ưu cho cả desktop và mobile (Responsive Design)  
- Hệ thống xác thực an toàn  
- Hiệu năng cao nhờ sử dụng Next.js và API backend riêng biệt  
- Hỗ trợ đa ngôn ngữ (tiếng Việt, tiếng Anh) trên toàn hệ thống  
- Dễ dàng mở rộng thêm tính năng trong tương lai

---

## Yêu cầu hệ thống
- Node --version: **v22.11.0**
- npm / yarn 
- Backend API (chạy từ folder backend: [project-ITJobSearch-be](https://github.com/NguyenKhacPhuocc/project-ITJobSearch-be))

---

## Cài đặt
Clone dự án và cài đặt dependencies:

```bash
git clone https://github.com/NguyenKhacPhuocc/project-ITJobSearch-fe.git
cd project-ITJobSearch-fe #tên thư mục chứa fe
yarn install
```
Chạy ở môi trường dev
```bash
yarn dev
```
Build production
```bash
yarn build
```

---

## Biến môi trường
Tạo file .env.local tại thư mục gốc:
```env
NEXT_PUBLIC_API_URL = "http://localhost:8000"
NEXT_PUBLIC_API_TYNIMCE = "lm8i5n0ln8hefkv52jxaffijw4pxpk2vyx472sb3o9gugndi"
```
---

## Cách sử dụng
Sau khi chạy yarn dev, mở trình duyệt tại:
```bash
http://localhost:3000
```

---

## Cấu trúc thư mục dự án
```bash
project-ITJobSearch-fe/
│   .env.local
│   .gitignore
│   eslint.config.mjs
│   next-env.d.ts
│   next.config.ts
│   package.json
│   postcss.config.mjs
│   README.md
│   tailwind.config.ts
│   tree.txt
│   tsconfig.json
│   yarn.lock
│   
├───messages
│       en.json
│       vi.json
│
├───public
│   │   file.svg
│   │   globe.svg
│   │   next.svg
│   │   vercel.svg
│   │   window.svg
│   │   
│   └───assets
│       └───images
│               card-bg.svg
│               demo-banner-1.jpg
│               demo-banner-2.jpg
│               demo-banner-3.jpg
│               demo-cong-ty-1.png
│               demo-cong-ty-2.jpg
│               
└───src
    │   middleware.ts
    │   
    ├───app
    │   │   favicon.ico
    │   │   globals.css
    │   │   layout.tsx
    │   │   page.tsx
    │   │   
    │   ├───components
    │   │   ├───button
    │   │   │       ButtonDelete.tsx
    │   │   │       
    │   │   ├───card
    │   │   │       CardCompanyItem.tsx
    │   │   │       CardJobItem.tsx
    │   │   │       JobCardSkeleton.tsx
    │   │   │       
    │   │   ├───editor
    │   │   │       TinyMCE.tsx
    │   │   │       
    │   │   ├───footer
    │   │   │       Footer.tsx
    │   │   │       
    │   │   └───header
    │   │           Header.tsx
    │   │           HeaderAccount.tsx
    │   │           HeaderMenu.tsx
    │   │           
    │   ├───lib
    │   │       generateMetadata.ts
    │   │       
    │   └───[locale]
    │       │   layout.tsx
    │       │   page.tsx
    │       │   
    │       ├───(auth)
    │       │   ├───company
    │       │   │   ├───login
    │       │   │   │       LoginForm.tsx
    │       │   │   │       page.tsx
    │       │   │   │       
    │       │   │   └───register
    │       │   │           FormRegister.tsx
    │       │   │           page.tsx
    │       │   │           
    │       │   └───user
    │       │       ├───login
    │       │       │       LoginForm.tsx
    │       │       │       page.tsx
    │       │       │       
    │       │       └───register
    │       │               FormRegister.tsx
    │       │               page.tsx
    │       │               
    │       ├───(home)
    │       │       page.tsx
    │       │       RecommendedJob.tsx
    │       │       Section-1.tsx
    │       │       Section-2.tsx
    │       │       
    │       ├───company
    │       │   ├───detail
    │       │   │   └───[slug]
    │       │   │           page.tsx
    │       │   │           
    │       │   └───list
    │       │           ContentPage.tsx
    │       │           page.tsx
    │       │           
    │       ├───company-manage
    │       │   ├───cv
    │       │   │   ├───detail
    │       │   │   │   └───[id]
    │       │   │   │           page.tsx
    │       │   │   │           
    │       │   │   └───list
    │       │   │           CVItem.tsx
    │       │   │           CVList.tsx
    │       │   │           page.tsx
    │       │   │           
    │       │   ├───job
    │       │   │   ├───create
    │       │   │   │       CreateForm.tsx
    │       │   │   │       page.tsx
    │       │   │   │       
    │       │   │   ├───edit
    │       │   │   │   └───[slug]
    │       │   │   │           EditForm.tsx
    │       │   │   │           page.tsx
    │       │   │   │           
    │       │   │   └───list
    │       │   │           JobList.tsx
    │       │   │           page.tsx
    │       │   │           
    │       │   └───profile
    │       │           page.tsx
    │       │           ProfileForm.tsx
    │       │           
    │       ├───job
    │       │   ├───detail
    │       │   │   └───[slug]
    │       │   │           ApplyForm.tsx
    │       │   │           JobClickTracker.tsx
    │       │   │           page.tsx
    │       │   │           
    │       │   ├───job-by-city
    │       │   │   │   JobByCity.tsx
    │       │   │   │   page.tsx
    │       │   │   │   
    │       │   │   └───[slug]
    │       │   │           ContentPage.tsx
    │       │   │           page.tsx
    │       │   │           
    │       │   ├───job-by-expertise
    │       │   │   │   JobByExpertise.tsx
    │       │   │   │   page.tsx
    │       │   │   │   
    │       │   │   └───[slug]
    │       │   │           ContentPage.tsx
    │       │   │           page.tsx
    │       │   │           
    │       │   └───job-by-skill
    │       │       │   page.tsx
    │       │       │   
    │       │       └───[slug]
    │       │               ContentPage.tsx
    │       │               page.tsx
    │       │               
    │       ├───search
    │       │       page.tsx
    │       │       SearchContent.tsx
    │       │       
    │       └───user-manage
    │           ├───cv
    │           │   └───list
    │           │           CVList.tsx
    │           │           CVPopup.tsx
    │           │           page.tsx
    │           │           
    │           └───profile
    │                   page.tsx
    │                   ProfileForm.tsx
    │                   
    ├───config
    │       variable.ts
    │       
    ├───hooks
    │       useAuth.ts
    │       useCities.ts
    │       useCompanies.ts
    │       
    ├───i18n
    │       navigation.ts
    │       request.ts
    │       routing.ts
    │       
    └───types
            just-validate.d.ts

```

---

## Công nghệ sử dụng
Dự án được xây dựng với các công nghệ chính sau:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Turbo)  
- **Ngôn ngữ**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)  
- **UI & Animation**: [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)  
- **Quản lý dữ liệu**: [SWR](https://swr.vercel.app/)  
- **Đa ngôn ngữ (i18n)**: [next-intl](https://next-intl-docs.vercel.app/)  
- **Upload & Preview file**: [FilePond](https://pqina.nl/filepond/)  
- **Soạn thảo văn bản**: [TinyMCE](https://www.tiny.cloud/)  
- **Thông báo UI**: [Sonner](https://sonner.emilkowal.ski/)

---

## Deploy on Vercel
Deploy link: [it-job-search](https://it-job-search-silk.vercel.app/vi)

---

## Tác giả
Nguyễn Khắc Phước – GitHub: [NguyenKhacPhuocc](https://github.com/NguyenKhacPhuocc)
