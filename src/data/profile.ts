// All portfolio content lives here, in English and Vietnamese.
// Each fact appears in exactly one section — see DESIGN.md, "Content rules".

export type Locale = "en" | "vi";

export type WorkItem = {
  meta: string;
  title: string;
  body: string;
  link?: { href: string; label: string };
};

export type Role = {
  period: string;
  title: string;
  about: string;
  current: boolean;
  // Optional lead-in that points to Selected work instead of repeating it.
  intro?: { before: string; linkText: string; after: string };
  highlights: string[];
};

export type Content = {
  name: string;
  role: string;
  kicker: string;
  summary: string;
  currently: string;
  nav: { work: string; experience: string; skills: string; contact: string };
  sections: { work: string; experience: string; skills: string; education: string; contact: string };
  emailCta: string;
  languageLabel: string;
  work: WorkItem[];
  company: { name: string; meta: string };
  roles: Role[];
  skills: { label: string; items: string; primary: boolean }[];
  education: { period: string; school: string; degree: string };
  languages: { label: string; items: string[] };
};

export const siteUrl = "https://twan-nguyen.github.io";

export const contacts = {
  email: "twan.nguyenba@gmail.com",
  linkedin: "https://www.linkedin.com/in/twannguyen/",
  github: "https://github.com/twan-nguyen",
};

export const localePaths: Record<Locale, string> = { en: "/", vi: "/vi/" };

const vanXuanLink = { href: "https://thptvanxuan-hoaiduc.edu.vn", label: "thptvanxuan-hoaiduc.edu.vn" };

export const content: Record<Locale, Content> = {
  en: {
    name: "Nguyen Ba Tuan",
    role: "Frontend Developer",
    kicker: "Frontend Developer · Hanoi, Vietnam",
    summary:
      "Frontend developer with 3+ years in B2B SaaS, the last two in React and TypeScript. I specialise in complex, configurable interfaces and data visualisation — report builders and drag-and-drop dashboards.",
    currently: "Currently at Stringee JSC, on the Cogover low-code platform.",
    nav: { work: "Work", experience: "Experience", skills: "Skills", contact: "Contact" },
    sections: {
      work: "Selected work",
      experience: "Experience",
      skills: "Skills",
      education: "Education & languages",
      contact: "Contact",
    },
    emailCta: "Email me",
    languageLabel: "Language",
    work: [
      {
        meta: "Cogover · 2024 — now · module owner",
        title: "Report Builder & Dashboard",
        body: "Lets users build reports across multiple data tables — with pivot tables, charts and custom formulas — and arrange them into drag-and-drop dashboards.",
      },
      {
        meta: "Cogover · 2024 — now · micro-frontends",
        title: "App shell & UI component library",
        body: "The micro-frontend app shell — routing, permissions, real-time notifications over WebSocket — and the in-house component library (form builder, field components, rich text editor, dark mode), shipped as one npm package every app shares.",
      },
      {
        meta: "Freelance · Jul — Aug 2026 · live",
        title: "Van Xuan High School website",
        body: "The school's official site, built and deployed end to end with Next.js, React 19, TypeScript, Tailwind CSS and Cloudflare Workers. Staff publish through Cogover as a headless CMS; the contact form is protected by Cloudflare Turnstile.",
        link: vanXuanLink,
      },
    ],
    company: { name: "Stringee JSC", meta: "Hanoi · Apr 2023 — present" },
    roles: [
      {
        period: "Sep 2024 — present",
        title: "Frontend Developer, Cogover",
        about: "A low-code platform for building business management apps.",
        current: true,
        intro: { before: "Report Builder, app shell and component library — see ", linkText: "Selected work", after: ". Also:" },
        highlights: [
          "Features for Cogover's Next.js landing page, developer docs and marketplace.",
          "Unit tests with Vitest; code held to SonarQube Quality Gates.",
          "A platform knowledge base for AI coding agents (Claude Code, Codex).",
        ],
      },
      {
        period: "Apr 2023 — Aug 2024",
        title: "Full-stack Developer, StringeeX",
        about: "An omnichannel contact center and CRM: calls, chat, email, tickets.",
        current: false,
        highlights: [
          "Vue.js features: call reports, ticketing, email channel, per-customer portal configuration, payment integration.",
          "PHP REST APIs for the call center: automated call campaigns, hotline management, webhooks.",
          "Migrated the reporting service's data source from Solr to Elasticsearch.",
          "Developer portal: phone numbers, devices, account permissions.",
          "Unit tests with Jest and PHPUnit.",
        ],
      },
    ],
    skills: [
      {
        label: "frontend",
        items: "React, Next.js, Vue.js, Redux Toolkit, TanStack Query, React Hook Form, Tailwind CSS, SCSS",
        primary: true,
      },
      {
        label: "architecture & practices",
        items:
          "Micro-frontends (Module Federation), UI component libraries, SSR, SEO, RESTful APIs, WebSocket, i18n, responsive design",
        primary: true,
      },
      { label: "languages · testing", items: "JavaScript, TypeScript, HTML, CSS · Vitest, Jest", primary: true },
      { label: "backend · working knowledge", items: "PHP, MySQL, MongoDB, Elasticsearch", primary: false },
      {
        label: "tools",
        items: "Git, Docker, Vite, Webpack, Cloudflare, Jira, SonarQube, Claude Code, Codex",
        primary: false,
      },
    ],
    education: {
      period: "2020 — 2024",
      school: "University of Transport and Communications",
      degree: "Engineer's Degree in Information Technology · GPA 3.27/4.0 (Very Good)",
    },
    languages: { label: "languages", items: ["Vietnamese — native", "English — upper-intermediate (B2)"] },
  },
  vi: {
    name: "Nguyễn Bá Tuấn",
    role: "Frontend Developer",
    kicker: "Frontend Developer · Hà Nội",
    summary:
      "Frontend Developer với hơn 3 năm kinh nghiệm phát triển sản phẩm SaaS B2B, trong đó 2 năm gần đây chuyên về React và TypeScript. Thế mạnh là các giao diện cấu hình phức tạp và trực quan hoá dữ liệu — công cụ tạo báo cáo (report builder) và dashboard kéo thả.",
    currently: "Hiện làm tại Stringee JSC, trên nền tảng low-code Cogover.",
    nav: { work: "Dự án", experience: "Kinh nghiệm", skills: "Kỹ năng", contact: "Liên hệ" },
    sections: {
      work: "Dự án tiêu biểu",
      experience: "Kinh nghiệm",
      skills: "Kỹ năng",
      education: "Học vấn & ngoại ngữ",
      contact: "Liên hệ",
    },
    emailCta: "Gửi email",
    languageLabel: "Ngôn ngữ",
    work: [
      {
        meta: "Cogover · 2024 — nay · phụ trách chính",
        title: "Report Builder & Dashboard",
        body: "Công cụ để người dùng tự tạo báo cáo từ nhiều bảng dữ liệu — có bảng pivot, biểu đồ và công thức tính toán — rồi sắp xếp thành dashboard kéo thả.",
      },
      {
        meta: "Cogover · 2024 — nay · micro-frontend",
        title: "App shell & thư viện UI component",
        body: "App shell theo kiến trúc micro-frontend — routing, phân quyền, thông báo realtime qua WebSocket — cùng thư viện UI component nội bộ (form builder, các loại field, rich text editor, dark mode), đóng gói thành npm package dùng chung cho mọi ứng dụng.",
      },
      {
        meta: "Freelance · 07 — 08/2026 · đang hoạt động",
        title: "Website THPT Vạn Xuân – Hoài Đức",
        body: "Website chính thức của trường, tự phát triển và triển khai toàn bộ bằng Next.js, React 19, TypeScript, Tailwind CSS và Cloudflare Workers. Nhà trường tự đăng bài qua Cogover (headless CMS); form liên hệ được chống spam bằng Cloudflare Turnstile.",
        link: vanXuanLink,
      },
    ],
    company: { name: "Stringee JSC", meta: "Hà Nội · 04/2023 — nay" },
    roles: [
      {
        period: "09/2024 — nay",
        title: "Frontend Developer, sản phẩm Cogover",
        about: "Nền tảng low-code để doanh nghiệp tự xây dựng ứng dụng quản trị.",
        current: true,
        intro: { before: "Report Builder, app shell và thư viện component — xem ", linkText: "Dự án tiêu biểu", after: ". Ngoài ra:" },
        highlights: [
          "Xây dựng tính năng cho các website Next.js của Cogover: landing page, trang tài liệu cho developer và marketplace.",
          "Viết unit test bằng Vitest, giữ code đạt chuẩn SonarQube Quality Gate.",
          "Xây dựng knowledge base mô tả hệ thống cho AI coding agent (Claude Code, Codex).",
        ],
      },
      {
        period: "04/2023 — 08/2024",
        title: "Fullstack Developer, sản phẩm StringeeX",
        about: "Nền tảng contact center và CRM đa kênh: cuộc gọi, chat, email, ticket.",
        current: false,
        highlights: [
          "Phát triển ứng dụng web bằng Vue.js: báo cáo cuộc gọi, ticket, kênh email, cấu hình portal riêng cho từng khách hàng và tích hợp thanh toán.",
          "Xây dựng REST API bằng PHP cho hệ thống tổng đài: chiến dịch gọi tự động, quản lý hotline, webhook.",
          "Chuyển nguồn dữ liệu của dịch vụ báo cáo từ Solr sang Elasticsearch.",
          "Bổ sung tính năng cho developer portal: quản lý số điện thoại, thiết bị và phân quyền tài khoản.",
          "Viết unit test bằng Jest và PHPUnit.",
        ],
      },
    ],
    skills: [
      {
        label: "frontend",
        items: "React, Next.js, Vue.js, Redux Toolkit, TanStack Query, React Hook Form, Tailwind CSS, SCSS",
        primary: true,
      },
      {
        label: "kiến trúc & kỹ thuật",
        items:
          "Micro-frontend (Module Federation), UI component library, SSR, SEO, RESTful API, WebSocket, i18n, Responsive Design",
        primary: true,
      },
      { label: "ngôn ngữ · testing", items: "JavaScript, TypeScript, HTML, CSS · Vitest, Jest", primary: true },
      { label: "backend · cơ bản", items: "PHP, MySQL, MongoDB, Elasticsearch", primary: false },
      {
        label: "công cụ",
        items: "Git, Docker, Vite, Webpack, Cloudflare, Jira, SonarQube, Claude Code, Codex",
        primary: false,
      },
    ],
    education: {
      period: "2020 — 2024",
      school: "Trường Đại học Giao thông Vận tải",
      degree: "Kỹ sư Công nghệ thông tin · Tốt nghiệp loại Giỏi · GPA 3.27/4.0",
    },
    languages: { label: "ngoại ngữ", items: ["Tiếng Việt — bản ngữ", "Tiếng Anh — B2"] },
  },
};
