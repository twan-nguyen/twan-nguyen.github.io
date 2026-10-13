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
  /** Footer credit for the visual inspiration; the link text is always "zed.dev". */
  inspiredBy: string;
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
      "Frontend developer with 3+ years in B2B SaaS, working in React and TypeScript.",
    currently: "Currently at Stringee JSC, working on Cogover, a low-code platform.",
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
    inspiredBy: "Design inspired by",
    work: [
      {
        meta: "Cogover · 2024 — present · module owner",
        title: "Report Builder & Dashboard",
        body: "A self-serve report builder. Users combine data from multiple tables, analyse it with pivot tables, charts and custom formulas, and arrange the results into drag-and-drop dashboards.",
      },
      {
        meta: "Cogover · 2024 — present · micro-frontends",
        title: "App shell & UI component library",
        body: "The shared shell that every Cogover app runs inside. Built on a micro-frontend architecture, it handles routing, permissions and real-time notifications over WebSocket. It ships together with an in-house component library (form builder, field components, rich text editor, dark mode) as a single npm package that every app shares.",
      },
      {
        meta: "Freelance · Jul — Aug 2026 · live",
        title: "Van Xuan High School website",
        body: "The school's official site, built and deployed end to end with Next.js, React 19, TypeScript, Tailwind CSS and Cloudflare Workers. Staff publish content through Cogover, used as a headless CMS; the contact form is protected from spam by Cloudflare Turnstile.",
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
        intro: { before: "Besides the Report Builder, app shell and component library (see ", linkText: "Selected work", after: "):" },
        highlights: [
          "Built features for Cogover's Next.js sites: the landing page, developer docs and marketplace.",
          "Wrote unit tests with Vitest and kept code passing SonarQube Quality Gates.",
          "Wrote a platform knowledge base that helps AI coding agents (Claude Code, Codex) work with Cogover.",
        ],
      },
      {
        period: "Apr 2023 — Aug 2024",
        title: "Full-stack Developer, StringeeX",
        about: "An omnichannel contact centre and CRM: calls, chat, email, tickets.",
        current: false,
        highlights: [
          "Built Vue.js features: call reports, ticketing, the email channel, per-customer portal settings and payment integration.",
          "Built PHP REST APIs for the call centre: automated call campaigns, hotline management and webhooks.",
          "Migrated the reporting service's data source from Solr to Elasticsearch.",
          "Added developer portal features for managing phone numbers, devices and account permissions.",
          "Wrote unit tests with Jest and PHPUnit.",
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
      degree: "Engineer's Degree in Information Technology · GPA 3.27/4.0",
    },
    languages: { label: "languages", items: ["Vietnamese — native", "English — B1"] },
  },
  vi: {
    name: "Nguyễn Bá Tuấn",
    role: "Frontend Developer",
    kicker: "Frontend Developer · Hà Nội",
    summary:
      "Frontend Developer với hơn 3 năm làm sản phẩm SaaS B2B, chuyên về React và TypeScript.",
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
    inspiredBy: "Thiết kế lấy cảm hứng từ",
    work: [
      {
        meta: "Cogover · 2024 — nay · phụ trách chính",
        title: "Report Builder & Dashboard",
        body: "Công cụ để người dùng tự tạo báo cáo từ nhiều bảng dữ liệu — có bảng pivot, biểu đồ và công thức tính toán — rồi sắp xếp thành dashboard kéo thả.",
      },
      {
        meta: "Cogover · 2024 — nay · micro-frontend",
        title: "Khung ứng dụng & thư viện UI component",
        body: "Phần khung chung mà mọi ứng dụng Cogover chạy bên trong, xây theo kiến trúc micro-frontend, đảm nhận routing, phân quyền và thông báo realtime qua WebSocket. Đi kèm là thư viện UI component nội bộ gồm form builder, các loại field, rich text editor và dark mode. Cả hai được đóng gói chung thành một npm package mà mọi ứng dụng đều dùng.",
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
        intro: { before: "Report Builder, khung ứng dụng và thư viện component — xem ", linkText: "Dự án tiêu biểu", after: ". Ngoài ra:" },
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
    languages: { label: "ngoại ngữ", items: ["Tiếng Việt — bản ngữ", "Tiếng Anh — B1"] },
  },
};
