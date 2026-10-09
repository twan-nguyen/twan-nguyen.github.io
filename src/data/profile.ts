// All portfolio content lives here, in English and Vietnamese.

export type Locale = "en" | "vi";

export type Role = {
  title: string;
  period: string;
  intro: string;
  highlights: string[];
};

export type Job = {
  company: string;
  period: string;
  roles: Role[];
};

export type Project = {
  name: string;
  period: string;
  url: string;
  intro: string;
  highlights: string[];
};

export type Content = {
  name: string;
  role: string;
  location: string;
  summary: string;
  labels: {
    about: string;
    experience: string;
    projects: string;
    skills: string;
    education: string;
    languages: string;
    contact: string;
    switchLanguage: string;
  };
  skills: { group: string; items: string[] }[];
  experience: Job[];
  projects: Project[];
  education: { school: string; period: string; degree: string };
  languages: string[];
};

export const siteUrl = "https://twan-nguyen.github.io";

export const contacts = {
  email: "twan.nguyenba@gmail.com",
  linkedin: "https://www.linkedin.com/in/twannguyen/",
  github: "https://github.com/twan-nguyen",
};

export const localePaths: Record<Locale, string> = { en: "/", vi: "/vi/" };

export const content: Record<Locale, Content> = {
  en: {
    name: "Nguyen Ba Tuan",
    role: "Frontend Developer",
    location: "Hanoi, Vietnam",
    summary:
      "Frontend Developer with 3+ years of experience building B2B SaaS products, with the last 2 years focused on React and TypeScript. Experienced in micro-frontend architecture and developing in-house UI component libraries. Specializes in complex, configurable UIs and data visualization, such as report builders and drag-and-drop dashboards. Background in full-stack development with Vue.js and PHP, enabling close collaboration with backend teams on API design and integration.",
    labels: {
      about: "About",
      experience: "Experience",
      projects: "Freelance",
      skills: "Skills",
      education: "Education",
      languages: "Languages",
      contact: "Contact",
      switchLanguage: "Tiếng Việt",
    },
    skills: [
      { group: "Languages", items: ["JavaScript", "TypeScript", "HTML", "CSS"] },
      {
        group: "Frontend",
        items: ["React", "Next.js", "Vue.js", "Redux Toolkit", "TanStack Query", "React Hook Form", "Tailwind CSS", "SCSS"],
      },
      {
        group: "Architecture & Practices",
        items: [
          "Micro-frontends (Module Federation)",
          "UI component libraries",
          "SSR",
          "SEO",
          "RESTful APIs",
          "WebSocket",
          "i18n",
          "Responsive Design",
        ],
      },
      { group: "Testing", items: ["Vitest", "Jest"] },
      { group: "Backend (working knowledge)", items: ["PHP", "MySQL", "MongoDB", "Elasticsearch"] },
      {
        group: "Tools",
        items: ["Git", "Docker", "Vite", "Webpack", "Cloudflare", "Jira", "SonarQube", "Claude Code", "Codex"],
      },
    ],
    experience: [
      {
        company: "Stringee JSC",
        period: "Apr 2023 – Present",
        roles: [
          {
            title: "Frontend Developer, Cogover",
            period: "Sep 2024 – Present",
            intro: "Cogover is a low-code platform that lets companies build their own business management apps.",
            highlights: [
              "Own development of the Report Builder & Dashboard module, which lets users build reports across multiple data tables with pivot tables, charts, custom formulas, and drag-and-drop dashboards.",
              "Develop the app shell and business applications in a micro-frontend architecture, including routing, permissions, and WebSocket-based real-time notifications.",
              "Maintain and extend the in-house UI component library (form builder, field components, rich text editor, dark mode support), distributed as an npm package shared across all platform apps.",
              "Build features for Cogover's Next.js websites, including the landing page, developer documentation site, and marketplace.",
              "Write unit tests with Vitest and keep code passing SonarQube Quality Gates.",
              "Maintain a knowledge base documenting the platform for AI coding agents (Claude Code, Codex) to use during development.",
            ],
          },
          {
            title: "Full-stack Developer, StringeeX",
            period: "Apr 2023 – Aug 2024",
            intro: "StringeeX is an omnichannel contact center and CRM platform (calls, chat, email, tickets).",
            highlights: [
              "Developed web application features with Vue.js: call reports, ticketing, email channel, per-customer portal configuration, and payment integration.",
              "Built REST APIs in PHP for the call center system: automated call campaigns, hotline management, and webhooks.",
              "Migrated the reporting service's data source from Solr to Elasticsearch.",
              "Added developer portal features: phone number management, device management, and account permissions.",
              "Wrote unit tests with Jest and PHPUnit.",
            ],
          },
        ],
      },
    ],
    projects: [
      {
        name: "Van Xuan High School Website (Hoai Duc, Hanoi)",
        period: "Jul 2026 – Aug 2026",
        url: "https://thptvanxuan-hoaiduc.edu.vn",
        intro: "Official school website, currently live.",
        highlights: [
          "Handled end-to-end development and deployment using Next.js (App Router), React 19, TypeScript, Tailwind CSS, and Cloudflare Workers.",
          "Integrated Cogover as a headless CMS, allowing school staff to update news, announcements, categories, and images without code changes.",
          "Built a contact form with Cloudflare Turnstile spam protection and server-side verification, storing submissions in Cogover.",
          "Optimized SEO, image delivery, and SSR performance, with a fully responsive layout across screen sizes.",
        ],
      },
    ],
    education: {
      school: "University of Transport and Communications",
      period: "2020 – 2024",
      degree: "Engineer's Degree in Information Technology · GPA 3.27/4.0 (Very Good)",
    },
    languages: ["Vietnamese: Native", "English: Upper-intermediate (B2)"],
  },
  vi: {
    name: "Nguyễn Bá Tuấn",
    role: "Frontend Developer",
    location: "Hà Nội",
    summary:
      "Frontend Developer với hơn 3 năm kinh nghiệm phát triển sản phẩm SaaS B2B, trong đó 2 năm gần đây chuyên về React và TypeScript. Có kinh nghiệm làm việc với kiến trúc micro-frontend và phát triển thư viện UI component nội bộ. Thế mạnh là các giao diện cấu hình phức tạp và trực quan hoá dữ liệu, như công cụ tạo báo cáo (report builder) và dashboard kéo thả. Từng làm fullstack với Vue.js và PHP, nên chủ động phối hợp với backend khi thiết kế và tích hợp API.",
    labels: {
      about: "Giới thiệu",
      experience: "Kinh nghiệm",
      projects: "Freelance",
      skills: "Kỹ năng",
      education: "Học vấn",
      languages: "Ngoại ngữ",
      contact: "Liên hệ",
      switchLanguage: "English",
    },
    skills: [
      { group: "Ngôn ngữ", items: ["JavaScript", "TypeScript", "HTML", "CSS"] },
      {
        group: "Frontend",
        items: ["React", "Next.js", "Vue.js", "Redux Toolkit", "TanStack Query", "React Hook Form", "Tailwind CSS", "SCSS"],
      },
      {
        group: "Kỹ thuật",
        items: [
          "Micro-frontend (Module Federation)",
          "UI component library",
          "SSR",
          "SEO",
          "RESTful API",
          "WebSocket",
          "i18n",
          "Responsive Design",
        ],
      },
      { group: "Testing", items: ["Vitest", "Jest"] },
      { group: "Backend (cơ bản)", items: ["PHP", "MySQL", "MongoDB", "Elasticsearch"] },
      {
        group: "Công cụ",
        items: ["Git", "Docker", "Vite", "Webpack", "Cloudflare", "Jira", "SonarQube", "Claude Code", "Codex"],
      },
    ],
    experience: [
      {
        company: "Stringee JSC",
        period: "04/2023 – nay",
        roles: [
          {
            title: "Frontend Developer, sản phẩm Cogover",
            period: "09/2024 – nay",
            intro: "Cogover là nền tảng low-code để doanh nghiệp tự xây dựng ứng dụng quản trị.",
            highlights: [
              "Phụ trách chính module Report Builder & Dashboard: công cụ để người dùng tự tạo báo cáo từ nhiều bảng dữ liệu, có bảng pivot, biểu đồ, công thức tính toán và dashboard kéo thả.",
              "Phát triển app shell và các ứng dụng nghiệp vụ theo kiến trúc micro-frontend, gồm routing, phân quyền và thông báo realtime qua WebSocket.",
              "Bảo trì và mở rộng thư viện UI component nội bộ (form builder, các loại field, rich text editor, dark mode), đóng gói thành npm package dùng chung cho mọi ứng dụng của nền tảng.",
              "Xây dựng tính năng cho các website Next.js của sản phẩm: landing page, trang tài liệu cho developer và marketplace.",
              "Viết unit test bằng Vitest và giữ code đạt chuẩn SonarQube Quality Gate.",
              "Xây dựng knowledge base mô tả hệ thống để dùng cùng AI coding agent (Claude Code, Codex) trong quá trình phát triển.",
            ],
          },
          {
            title: "Fullstack Developer, sản phẩm StringeeX",
            period: "04/2023 – 08/2024",
            intro: "StringeeX là nền tảng contact center và CRM đa kênh (cuộc gọi, chat, email, ticket).",
            highlights: [
              "Phát triển ứng dụng web bằng Vue.js: báo cáo cuộc gọi, ticket, kênh email, cấu hình portal riêng cho từng khách hàng và tích hợp thanh toán.",
              "Xây dựng REST API bằng PHP cho hệ thống tổng đài: chiến dịch gọi tự động, quản lý hotline, webhook.",
              "Chuyển nguồn dữ liệu của dịch vụ báo cáo từ Solr sang Elasticsearch.",
              "Bổ sung tính năng cho developer portal: quản lý số điện thoại, thiết bị và phân quyền tài khoản.",
              "Viết unit test bằng Jest và PHPUnit.",
            ],
          },
        ],
      },
    ],
    projects: [
      {
        name: "Website THPT Vạn Xuân – Hoài Đức",
        period: "07/2026 – 08/2026",
        url: "https://thptvanxuan-hoaiduc.edu.vn",
        intro: "Website chính thức của trường, hiện đang hoạt động.",
        highlights: [
          "Đảm nhận toàn bộ việc phát triển và triển khai, dùng Next.js (App Router), React 19, TypeScript, Tailwind CSS và Cloudflare Workers.",
          "Dùng Cogover làm headless CMS, để nhà trường tự cập nhật tin tức, thông báo, danh mục và hình ảnh mà không cần sửa code.",
          "Xây dựng form liên hệ chống spam bằng Cloudflare Turnstile, xác minh phía server rồi lưu yêu cầu về Cogover.",
          "Tối ưu SEO, hình ảnh và hiệu năng SSR. Giao diện hiển thị tốt trên mọi kích thước màn hình.",
        ],
      },
    ],
    education: {
      school: "Trường Đại học Giao thông Vận tải",
      period: "2020 – 2024",
      degree: "Kỹ sư Công nghệ thông tin · Tốt nghiệp loại Giỏi · GPA 3.27/4.0",
    },
    languages: ["Tiếng Anh: B2"],
  },
};
