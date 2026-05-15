# 🌐 NetProxy Index V2

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Pages-F38020?style=for-the-badge&logo=cloudflare)

**🚀 Landing Page hiện đại cho dịch vụ Proxy chất lượng cao**

[🌍 Demo](https://netproxy-index-v2.pages.dev) • [🛒 Hệ thống đại lý](https://seller.prx.network/) • [📡 API](https://api.prx.network)

</div>

---

## 📋 Mục lục

- [Giới thiệu](#-giới-thiệu)
- [Tính năng](#-tính-năng)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Cài đặt Local](#-cài-đặt-local)
- [Deploy lên Cloudflare Pages](#-deploy-lên-cloudflare-pages)
  - [Phương pháp 1: Kết nối GitHub](#-phương-pháp-1-kết-nối-github-khuyến-nghị)
  - [Cấu hình Compatibility Flags](#-cấu-hình-compatibility-flags-quan-trọng)
  - [Phương pháp 2: Deploy với Wrangler CLI](#-phương-pháp-2-deploy-thủ-công-với-wrangler-cli)
  - [Custom Domain](#-cấu-hình-custom-domain-tùy-chọn)
- [Tích hợp Hệ thống Đại lý](#-tích-hợp-hệ-thống-đại-lý)
- [Tùy chỉnh Website](#-tùy-chỉnh-website)
- [Tech Stack](#-tech-stack)
- [Liên hệ & Hỗ trợ](#-liên-hệ--hỗ-trợ)

---

## 🎯 Giới thiệu

**NetProxy Index V2** là landing page được xây dựng với công nghệ hiện đại nhất, tối ưu cho hiệu suất và SEO. Website hỗ trợ đa ngôn ngữ (14 ngôn ngữ) với giao diện đẹp mắt, hiệu ứng mượt mà và tương thích hoàn hảo với **Cloudflare Pages**.

Dự án này được thiết kế để kết hợp với **[Seller Portal](https://seller.prx.network/)** - hệ thống quản lý đại lý bán proxy chuyên nghiệp.

---

## ✨ Tính năng

| Tính năng | Mô tả |
|-----------|-------|
| 🌍 **Đa ngôn ngữ (i18n)** | Hỗ trợ 14 ngôn ngữ: Tiếng Việt, English, 中文, 日本語, 한국어, Русский, Español, ... |
| 🎬 **Hiệu ứng mượt mà** | Framer Motion, GSAP, Particles, Lenis Smooth Scroll |
| 📱 **Responsive Design** | Tương thích hoàn hảo trên Desktop, Tablet, Mobile |
| 🔍 **SEO Optimized** | Cấu trúc chuẩn SEO, meta tags, sitemap |
| 🌙 **Dark Theme** | Giao diện tối hiện đại, dễ nhìn |
| ⚡ **Edge Runtime** | Tối ưu cho Cloudflare Pages, tốc độ cực nhanh |
| 🧩 **Component-based** | Dễ dàng tùy chỉnh và mở rộng |

---

## 📁 Cấu trúc dự án

```
netproxy-index-v2/
│
├── 📂 app/
│   ├── 📂 [locale]/           # 🌍 Routes theo ngôn ngữ (vi, en, zh, ...)
│   │   ├── page.tsx           # Trang chủ
│   │   ├── privacy-policy/    # Chính sách bảo mật
│   │   ├── term-service/      # Điều khoản dịch vụ
│   │   └── ...
│   ├── 📂 fonts/              # Font files (Inter, Neue Kaine)
│   ├── globals.css            # Global styles
│   └── layout.tsx             # Root layout
│
├── 📂 components/
│   ├── 📂 Header/             # Navigation bar
│   ├── 📂 Hero/               # Hero section với particles
│   ├── 📂 Pricing/            # Bảng giá
│   ├── 📂 FAQs/               # Câu hỏi thường gặp
│   ├── 📂 Footer/             # Footer
│   ├── 📂 Contact/            # Form liên hệ
│   ├── 📂 TrustedBy/          # Logo đối tác
│   └── 📂 ui/                 # UI components (shadcn/ui)
│
├── 📂 messages/               # 🌍 File ngôn ngữ
│   ├── vi.json                # Tiếng Việt
│   ├── en.json                # English
│   ├── zh.json                # 中文
│   └── ...                    # 14 ngôn ngữ
│
├── 📂 i18n/                   # Cấu hình đa ngôn ngữ
├── 📂 lib/                    # Utilities & helpers
├── 📂 hooks/                  # Custom React hooks
├── 📂 public/                 # Static assets (images, icons)
│
├── .env.example               # Template biến môi trường
├── package.json               # Dependencies
└── README.md                  # Tài liệu này
```

---

## 💻 Cài đặt Local

### 📋 Yêu cầu hệ thống

- ✅ **Node.js** 18.17 trở lên
- ✅ **pnpm** (khuyến nghị) hoặc npm/yarn
- ✅ **Git**

### 🚀 Các bước cài đặt

#### Bước 1: Clone repository

```bash
git clone https://github.com/lebachhiep/netproxy-index-v2.git
cd netproxy-index-v2
```

#### Bước 2: Cài đặt dependencies

```bash
# Sử dụng pnpm (khuyến nghị)
pnpm install

# Hoặc npm
npm install

# Hoặc yarn
yarn install
```

#### Bước 3: Cấu hình môi trường

```bash
# Copy file môi trường mẫu
cp .env.example .env.local
```

Mở file `.env.local` và cấu hình:

```env
# API endpoint cho hệ thống proxy
NEXT_PUBLIC_API_BASE_URL=https://api.prx.network
```

#### Bước 4: Chạy development server

```bash
pnpm dev
# hoặc
npm run dev
```

#### Bước 5: Mở trình duyệt

Truy cập 👉 [http://localhost:3000](http://localhost:3000)

Website sẽ tự động chuyển hướng theo ngôn ngữ trình duyệt (`/vi` hoặc `/en`).

---

## ☁️ Deploy lên Cloudflare Pages

### 📌 Phương pháp 1: Kết nối GitHub (Khuyến nghị)

Đây là cách đơn giản nhất, Cloudflare sẽ tự động build và deploy mỗi khi bạn push code.

#### Bước 1: Đăng nhập Cloudflare

1. Truy cập 👉 [https://dash.cloudflare.com/](https://dash.cloudflare.com/)
2. Đăng nhập hoặc tạo tài khoản mới (miễn phí)

#### Bước 2: Tạo Pages Project

1. Từ sidebar, chọn **Workers & Pages**
2. Click nút **Create**
3. Chọn tab **Pages**
4. Click **Connect to Git**

#### Bước 3: Kết nối GitHub

1. Click **Connect GitHub**
2. Authorize Cloudflare truy cập GitHub của bạn
3. Chọn repository: `lebachhiep/netproxy-index-v2`
4. Click **Begin setup**

#### Bước 4: Cấu hình Build Settings

Điền các thông tin sau:

| Mục | Giá trị |
|-----|---------|
| **Project name** | `netproxy-index-v2` (hoặc tên bạn muốn) |
| **Production branch** | `main` |
| **Framework preset** | `Next.js` |
| **Build command** | `npx @cloudflare/next-on-pages@1` |
| **Build output directory** | `.vercel/output/static` |

#### Bước 5: Thêm Environment Variables

Click **Add variable** và thêm các biến sau:

| Variable Name | Value |
|---------------|-------|
| `NEXT_PUBLIC_API_BASE_URL` | `https://api.prx.network` |
| `NODE_VERSION` | `18` |

> 💡 **Tip:** Bạn có thể thay đổi `NEXT_PUBLIC_API_BASE_URL` thành API của riêng bạn nếu có.

#### Bước 6: Deploy

1. Click **Save and Deploy**
2. Đợi quá trình build hoàn tất (khoảng 2-5 phút)
3. Sau khi thành công, bạn sẽ nhận được URL như: `https://netproxy-index-v2.pages.dev`

✅ **Done!** Website của bạn đã online!

---

### ⚙️ Cấu hình Compatibility Flags (Quan trọng)

> ⚠️ **Bắt buộc:** Dự án này sử dụng **Pages + Workers** nên cần cấu hình Compatibility Flags để Node.js APIs hoạt động đúng.

#### Bước 1: Vào Settings của Project

1. Trong Cloudflare Dashboard, vào project của bạn
2. Click tab **Settings**
3. Chọn **Functions** từ menu bên trái

#### Bước 2: Thêm Compatibility Flags

Tìm phần **Compatibility flags** và thêm:

| Environment | Compatibility Flags |
|-------------|---------------------|
| **Production** | `nodejs_compat` |
| **Preview** | `nodejs_compat` |

#### Cách thêm:

1. Trong phần **Production compatibility flags**, click **Add**
2. Nhập: `nodejs_compat`
3. Click **Save**
4. Lặp lại cho **Preview compatibility flags**

#### Hoặc sử dụng `wrangler.toml`:

Tạo file `wrangler.toml` ở thư mục gốc:

```toml
name = "netproxy-index-v2"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

[vars]
NEXT_PUBLIC_API_BASE_URL = "https://api.prx.network"
```

> 💡 **Tại sao cần `nodejs_compat`?**
> - Next.js sử dụng một số Node.js APIs
> - Cloudflare Workers mặc định không hỗ trợ đầy đủ Node.js APIs
> - Flag `nodejs_compat` cho phép sử dụng các APIs như `Buffer`, `crypto`, `stream`, v.v.

#### Bước 3: Re-deploy

Sau khi thêm Compatibility Flags, bạn cần re-deploy:

1. Vào tab **Deployments**
2. Click **...** ở deployment mới nhất
3. Chọn **Retry deployment**

Hoặc push một commit mới để trigger auto-deploy.

---

### 📌 Phương pháp 2: Deploy thủ công với Wrangler CLI

Dành cho những ai muốn kiểm soát quá trình deploy.

#### Bước 1: Cài đặt Wrangler CLI

```bash
npm install -g wrangler
```

#### Bước 2: Đăng nhập Cloudflare

```bash
wrangler login
```

Trình duyệt sẽ mở ra, đăng nhập và authorize.

#### Bước 3: Build project

```bash
# Build Next.js
pnpm build

# Build cho Cloudflare Pages
npx @cloudflare/next-on-pages@1
```

#### Bước 4: Deploy

```bash
wrangler pages deploy .vercel/output/static --project-name=netproxy-index-v2
```

#### Bước 5: Cấu hình Environment Variables (nếu cần)

```bash
wrangler pages secret put NEXT_PUBLIC_API_BASE_URL
# Nhập giá trị: https://api.prx.network
```

---

### 🌐 Cấu hình Custom Domain (Tùy chọn)

Nếu bạn muốn sử dụng domain riêng thay vì `*.pages.dev`:

1. Trong Cloudflare Pages project, vào tab **Custom domains**
2. Click **Set up a custom domain**
3. Nhập domain của bạn (ví dụ: `proxy.yourdomain.com`)
4. Làm theo hướng dẫn cấu hình DNS:
   - Nếu domain đã trên Cloudflare: Tự động cấu hình
   - Nếu domain ở nơi khác: Thêm CNAME record

---

## 🛒 Tích hợp Hệ thống Đại lý

### 🎯 Giới thiệu Seller Portal

**[Seller Portal](https://seller.prx.network/)** là hệ thống quản lý đại lý bán proxy chuyên nghiệp. Landing page này được thiết kế để kết hợp hoàn hảo với Seller Portal.

### 🔗 Truy cập Seller Portal

👉 **URL:** [https://seller.prx.network/](https://seller.prx.network/)

### 📊 Tính năng Seller Portal

| Tính năng | Mô tả |
|-----------|-------|
| 📈 **Dashboard** | Tổng quan doanh thu, đơn hàng, khách hàng theo thời gian thực |
| 📦 **Quản lý sản phẩm** | Tạo gói proxy riêng, định giá linh hoạt theo ý bạn |
| 👥 **Quản lý khách hàng** | Theo dõi khách hàng, lịch sử mua hàng, hỗ trợ |
| 📊 **Báo cáo chi tiết** | Thống kê doanh thu, xuất báo cáo Excel/PDF |
| 🔌 **API Integration** | API để tích hợp tự động với website/app riêng |
| 🏷️ **White-label** | Tùy chỉnh thương hiệu, logo, màu sắc |

### 🔄 Quy trình hoạt động

```
┌─────────────────────┐
│   👤 Khách hàng     │
│   truy cập website  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  🌐 Landing Page    │
│  (NetProxy Index)   │
│  - Giới thiệu       │
│  - Bảng giá         │
│  - Tính năng        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  🛒 Seller Portal   │
│  seller.prx.network │
│  - Đăng ký/Login    │
│  - Mua proxy        │
│  - Quản lý đơn hàng │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  📡 PRX API         │
│  api.prx.network    │
│  - Xử lý đơn hàng   │
│  - Cấp phát proxy   │
│  - Quản lý IP       │
└─────────────────────┘
```

### 🚀 Bắt đầu làm đại lý

1. **📝 Đăng ký tài khoản** tại [seller.prx.network](https://seller.prx.network/)
2. **💰 Nạp tiền** vào tài khoản đại lý
3. **📦 Tạo gói sản phẩm** với giá bán riêng của bạn
4. **🌐 Deploy landing page** này với thông tin của bạn
5. **🔗 Liên kết** nút mua hàng đến Seller Portal
6. **📈 Bắt đầu kinh doanh** và theo dõi doanh thu!

---

## 🎨 Tùy chỉnh Website

### 📝 Thay đổi nội dung

Chỉnh sửa các file ngôn ngữ trong thư mục `messages/`:

```bash
messages/
├── vi.json    # Tiếng Việt
├── en.json    # English
└── ...
```

Ví dụ chỉnh sửa `messages/vi.json`:

```json
{
  "hero": {
    "title": "Tiêu đề của bạn",
    "description": "Mô tả của bạn"
  },
  "pricing": {
    "title": "Bảng giá"
  }
}
```

### 🖼️ Thay đổi Logo & Hình ảnh

```bash
public/images/
├── logo/           # Logo website
├── hero/           # Hình ảnh hero section
├── trusted-by/     # Logo đối tác
└── ...
```

### 🎨 Thay đổi màu sắc

Chỉnh sửa file `app/globals.css`:

```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
}
```

### 📞 Thay đổi thông tin liên hệ

Chỉnh sửa trong `components/Footer/` và `components/Contact/`.

---

## 🛠️ Tech Stack

| Công nghệ | Phiên bản | Mô tả |
|-----------|-----------|-------|
| ⚛️ [Next.js](https://nextjs.org/) | 16.0 | React Framework với App Router |
| 📱 [React](https://react.dev/) | 19.2 | UI Library |
| 📝 [TypeScript](https://www.typescriptlang.org/) | 5.x | Type Safety |
| 🎨 [Tailwind CSS](https://tailwindcss.com/) | 4.0 | Utility-first CSS |
| 🎬 [Framer Motion](https://www.framer.com/motion/) | 12.x | Animations |
| 🎭 [GSAP](https://greensock.com/gsap/) | 3.x | Advanced Animations |
| 🌍 [next-intl](https://next-intl-docs.vercel.app/) | 4.x | Internationalization |
| 🧩 [Radix UI](https://www.radix-ui.com/) | Latest | Headless UI Components |
| 🖱️ [Lenis](https://lenis.studiofreight.com/) | 1.x | Smooth Scrolling |
| ✨ [tsparticles](https://particles.js.org/) | 2.x | Particle Effects |

---

## 📜 Scripts

| Command | Mô tả |
|---------|-------|
| `pnpm dev` | 🚀 Chạy development server |
| `pnpm build` | 📦 Build production |
| `pnpm start` | ▶️ Chạy production server |
| `pnpm lint` | 🔍 Kiểm tra lỗi ESLint |

---

## 📞 Liên hệ & Hỗ trợ

Nếu bạn cần hỗ trợ hoặc có câu hỏi:

| Kênh | Thông tin |
|------|-----------|
| 📧 **Email** | [ketoan@upgo.io](mailto:ketoan@upgo.io) |
| 💬 **Telegram** | [@NetProxy_Support](https://t.me/NetProxy_Support) |
| 🛒 **Seller Portal** | [seller.prx.network](https://seller.prx.network/) |
| 📡 **API Docs** | [api.prx.network](https://api.prx.network) |

---

## 📄 License

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

---

<div align="center">

### ⭐ Nếu dự án hữu ích, hãy cho một Star!

**Made with ❤️ by [NetProxy Team](https://netproxy.io)**

</div>