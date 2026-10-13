import Image from "next/image";
import Link from "next/link";
import { contacts, content, localePaths, type Locale } from "@/data/profile";
import {
  ArrowUpRightIcon,
  CalendarIcon,
  GitHubIcon,
  GlobeIcon,
  GraduationIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/icons";

// Layout and styling follow DESIGN.md ("Ink & serif"). Read it before changing this file.

const sectionX = "px-4 sm:px-[clamp(16px,5vw,64px)]";
const mono = "font-mono";
const press = "transition-[background-color,border-color,box-shadow,transform] duration-150 active:translate-y-px";
const btnPrimary = `inline-flex min-h-[46px] items-center gap-2.5 border border-accent-edge bg-accent px-5 font-medium text-on-accent no-underline shadow-[inset_0_-2px_0_0_rgba(60,28,0,0.35)] hover:bg-accent-hover hover:shadow-none ${press}`;
const btnSecondary = `inline-flex min-h-[46px] items-center gap-2.5 border border-line-strong px-[18px] font-medium text-ink no-underline hover:border-faint ${press}`;

/** Contacts on the radar: angle clockwise from 12 o'clock, distance from the centre (SVG units). */
const blips = [
  { angle: 38, r: 300 },
  { angle: 152, r: 210 },
  { angle: 247, r: 370 },
  { angle: 318, r: 150 },
];

/** Circumference-based dash pattern that draws `count` radial ticks on a circle of radius `r`. */
function ticks(r: number, count: number, width: number) {
  return `${width} ${(2 * Math.PI * r) / count - width}`;
}

/**
 * The hero background, centred on the hero and kept faint: a fine engineering grid
 * and a still radar scope (range rings, ruler ticks, dashed crosshair). A beam sweeps
 * the grid, and small diamond contacts flare as it passes them. Decorative only.
 */
function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000_25%,transparent_75%)] md:opacity-100"
    >
      {/* 2400 = 40 major cells, so a major grid line crosses exactly at the centre. */}
      <div className="hero-grid absolute left-1/2 top-1/2 size-[2400px] -translate-x-1/2 -translate-y-1/2" />
      {/* The beam turns underneath a grid-shaped mask, so only the grid lines light up. */}
      <div className="hero-grid-mask absolute left-1/2 top-1/2 size-[2400px] -translate-x-1/2 -translate-y-1/2">
        <div className="hero-sweep absolute inset-0" />
      </div>
      <div className="hero-core absolute left-1/2 top-1/2 size-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <svg
        viewBox="-500 -500 1000 1000"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="absolute left-1/2 top-1/2 aspect-square h-[130%] -translate-x-1/2 -translate-y-1/2 text-heading"
      >
        <g opacity="0.14">
          {[120, 240, 360].map((r) => (
            <circle key={r} r={r} />
          ))}
          <circle r="470" strokeDasharray="4 4" />
          <path d="M-480 0h960M0-480v960" strokeDasharray="4 4" />
        </g>
        <circle r="482" strokeWidth="10" strokeDasharray={ticks(482, 72, 1)} opacity="0.16" />
        <circle r="480" strokeWidth="16" strokeDasharray={ticks(480, 12, 1.5)} opacity="0.22" />
        {blips.map(({ angle, r }) => {
          const rad = (angle * Math.PI) / 180;
          const [x, y] = [r * Math.sin(rad), -r * Math.cos(rad)];
          return (
            <path
              key={angle}
              className="blip"
              d={`M${x} ${y - 7} ${x + 7} ${y} ${x} ${y + 7} ${x - 7} ${y}Z`}
              fill="currentColor"
              stroke="none"
              style={{ "--turn": angle / 360 } as React.CSSProperties}
            />
          );
        })}
        <path d="M0-6 6 0 0 6-6 0Z" opacity="0.4" />
      </svg>
    </div>
  );
}

/** A registration mark (+) where a row's hairline crosses a vertical line, drawn brighter than the lines. */
function Node({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute -bottom-[6px] z-10 size-[11px] text-faint [background:linear-gradient(currentColor,currentColor)_center/1px_100%_no-repeat,linear-gradient(currentColor,currentColor)_center/100%_1px_no-repeat] ${className}`}
    />
  );
}

/**
 * A full-bleed band of the frame: dashed gutters either side of the ruled column,
 * closed by a hairline that spans the viewport, with nodes at each crossing.
 */
function Row({
  as: Tag = "section",
  className = "",
  surface = "bg-panel",
  cellClassName = "",
  closed = true,
  children,
  ...rest
}: {
  as?: "section" | "header" | "footer";
  surface?: string;
  cellClassName?: string;
  closed?: boolean;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag className={`flex frame:px-8 ${closed ? "border-b border-line" : ""} ${className}`} {...rest}>
      <div aria-hidden="true" className="gutter-l relative hidden flex-1 frame:block">
        {closed && <Node className="-left-[5px]" />}
      </div>
      <div className={`relative w-full min-w-0 max-w-[1200px] border-x border-line ${surface} ${cellClassName}`}>
        {children}
        {closed && (
          <>
            <Node className="-left-[6px] hidden frame:block" />
            <Node className="-right-[6px] hidden frame:block" />
          </>
        )}
      </div>
      <div aria-hidden="true" className="gutter-r relative hidden flex-1 frame:block">
        {closed && <Node className="-right-[5px]" />}
      </div>
    </Tag>
  );
}

function SerifHeading({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <h2
      id={id}
      className={`m-0 font-serif text-[clamp(36px,4.4vw,56px)] font-normal italic leading-[1.05] text-heading ${className}`}
    >
      {children}
    </h2>
  );
}

function Bullets({ items, current }: { items: string[]; current: boolean }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-2 p-0">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className={`${mono} ${current ? "text-accent-edge" : "text-dim"}`}>
            +
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Portfolio({ locale }: { locale: Locale }) {
  const c = content[locale];
  const sectionY = "py-[clamp(56px,7vw,88px)]";

  return (
    <div className="text-base">
      {/* Pinned while scrolling. Phones: name + language on row 1, nav on row 2. */}
      <Row
        as="header"
        className="sticky top-0 z-20 bg-bg/80 backdrop-blur-md"
        surface="bg-panel/90"
        cellClassName={`flex flex-wrap items-center gap-x-6 px-4 py-2 text-[13px] sm:px-[clamp(16px,3vw,28px)] md:py-3 ${mono}`}
      >
        <a href="#top" className="mr-auto py-1.5 font-serif text-[21px] italic leading-none tracking-[-0.01em] text-ink no-underline">
          {c.name}
        </a>
        <nav aria-label="Primary" className="order-last -ml-2.5 flex w-full items-center gap-x-1.5 md:order-none md:ml-0 md:w-auto">
          {(["work", "experience", "skills", "contact"] as const).map((key) => (
            <a key={key} href={`#${key}`} className="px-2.5 py-2 text-nav no-underline transition-colors hover:text-ink md:py-2.5">
              {c.nav[key]}
            </a>
          ))}
        </nav>
        <span role="group" aria-label={c.languageLabel} className="flex border border-[#2a3340] md:-ml-3">
          {(["en", "vi"] as const).map((l) =>
            l === locale ? (
              <span key={l} aria-current="true" className="bg-[#1a212b] px-2.5 py-[7px] text-ink">
                {l.toUpperCase()}
              </span>
            ) : (
              <Link
                key={l}
                href={localePaths[l]}
                hrefLang={l}
                lang={l}
                className="px-2.5 py-[7px] text-faint no-underline transition-colors hover:text-ink"
              >
                {l.toUpperCase()}
              </Link>
            ),
          )}
        </span>
      </Row>

      <main>
        <Row
          id="top"
          surface="bg-panel bg-[linear-gradient(to_top,rgba(217,134,58,0.06),transparent_55%)]"
          cellClassName={`pb-[clamp(48px,6vw,64px)] pt-[clamp(64px,9vw,112px)] ${sectionX}`}
        >
          <HeroBackdrop />
          <div className="relative">
            <p className={`animate-rise m-0 mb-[22px] text-[13px] text-faint ${mono}`}>{c.kicker}</p>
            <h1 className="animate-rise m-0 font-serif text-[clamp(56px,8.6vw,120px)] font-normal italic leading-[0.95] tracking-[-0.02em] text-heading [--i:1]">
              {c.name}
            </h1>
            <p className="animate-rise m-0 mt-7 max-w-[680px] text-[clamp(18px,1.7vw,21px)] leading-[1.6] text-ink-2 [--i:2] [text-wrap:pretty]">
              {c.summary}
            </p>
            <p className={`animate-rise m-0 mt-4 text-[13px] text-faint [--i:3] ${mono}`}>
              {c.currently}
              <span aria-hidden="true" className="caret ml-1.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-accent-edge" />
            </p>
            <div className="animate-rise mt-9 flex flex-wrap items-center gap-3 [--i:4]">
              <a href={`mailto:${contacts.email}`} className={`${btnPrimary} max-sm:w-full max-sm:justify-center`}>
                <MailIcon />
                {c.emailCta}
              </a>
              <a href={contacts.github} className={`${btnSecondary} max-sm:flex-1 max-sm:justify-center`}>
                <GitHubIcon />
                GitHub
              </a>
              <a href={contacts.linkedin} className={`${btnSecondary} max-sm:flex-1 max-sm:justify-center`}>
                <LinkedInIcon />
                LinkedIn
              </a>
            </div>
          </div>
        </Row>

        <Row id="work">
          <div className={`reveal pb-8 pt-[clamp(48px,6vw,72px)] ${sectionX}`}>
            <SerifHeading>{c.sections.work}</SerifHeading>
          </div>
          <div className="border-t border-line">
            {c.work.map((item) => (
              <article
                key={item.title}
                className="border-b border-line transition-colors duration-300 last:border-b-0 hover:bg-panel-hover"
              >
                <div className={`reveal flex flex-wrap gap-x-10 gap-y-3 py-[clamp(24px,3vw,36px)] ${sectionX}`}>
                  <div className="flex grow basis-[260px] flex-col gap-2">
                    <p className={`m-0 text-xs text-faint ${mono}`}>{item.meta}</p>
                    <h3 className="m-0 text-xl font-semibold">{item.title}</h3>
                    {item.link && (
                      <a
                        href={item.link.href}
                        className={`group inline-flex min-h-11 items-center gap-2 self-start text-[13px] text-link hover:text-link-hover ${mono}`}
                      >
                        {/* The site's own logo sits beside its address, like a favicon. */}
                        {item.image && <Image src={item.image.src} alt={item.image.alt} className="mr-1 size-8" />}
                        {item.link.label}
                        <ArrowUpRightIcon
                          size={13}
                          className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    )}
                  </div>
                  <div className="grow-[2.4] basis-[460px]">
                    <p className="m-0 text-[15px] text-muted [text-wrap:pretty]">{item.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Row>

        <Row id="experience" cellClassName={`${sectionY} ${sectionX}`}>
          <SerifHeading className="reveal mb-9">{c.sections.experience}</SerifHeading>
          <div className="reveal border border-line">
            <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-b border-line bg-panel-2 px-6 py-4">
              <h3 className="m-0 flex items-center">
                <Image src={c.company.logo} alt={c.company.name} className="h-7 w-auto" />
              </h3>
              <span className={`pt-[3px] text-xs text-faint ${mono}`}>{c.company.meta}</span>
            </div>
            {c.roles.map((role) => (
              <article key={role.title} className="flex flex-wrap border-b border-line last:border-b-0">
                <div className="grow basis-[260px] border-b border-line p-6 md:border-b-0 md:border-r">
                  <p className={`m-0 flex items-center gap-2 text-xs ${role.current ? "text-link" : "text-faint"} ${mono}`}>
                    <CalendarIcon size={13} />
                    {role.period}
                  </p>
                  <h4 className="m-0 mb-0.5 mt-2 text-[17px] font-semibold">{role.title}</h4>
                  <p className="m-0 text-sm text-muted">{role.about}</p>
                </div>
                <div className="grow-[2.4] basis-[460px] p-6 text-[15px] text-ink-2">
                  {role.intro && (
                    <p className="m-0 mb-3">
                      {role.intro.before}
                      <a href="#work" className="text-link hover:text-link-hover">
                        {role.intro.linkText}
                      </a>
                      {role.intro.after}
                    </p>
                  )}
                  <Bullets items={role.highlights} current={role.current} />
                </div>
              </article>
            ))}
          </div>
        </Row>

        <Row id="skills" cellClassName={`${sectionY} ${sectionX}`}>
          <SerifHeading className="reveal mb-9">{c.sections.skills}</SerifHeading>
          <div className="reveal grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] border-l border-t border-line">
            {c.skills.map((skill) => (
              <div key={skill.label} className="border-b border-r border-line px-[22px] py-5 transition-colors duration-300 hover:bg-panel-hover">
                <p className={`m-0 mb-2 text-xs ${skill.primary ? "text-link" : "text-faint"} ${mono}`}>{skill.label}</p>
                <p className={`m-0 text-[15px] ${skill.primary ? "text-ink" : "text-ink-2"}`}>{skill.items}</p>
              </div>
            ))}
          </div>
        </Row>

        <Row aria-labelledby="education-title" cellClassName={`${sectionY} ${sectionX}`}>
          <SerifHeading id="education-title" className="reveal mb-9">
            {c.sections.education}
          </SerifHeading>
          <div className="reveal grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] border-l border-t border-line">
            <div className="flex items-start gap-4 border-b border-r border-line px-[22px] py-5">
              <Image src={c.education.logo} alt="" className="size-[52px] shrink-0" />
              <div>
                <p className={`m-0 mb-1.5 flex items-center gap-2 text-xs text-faint ${mono}`}>
                  <GraduationIcon size={14} />
                  {c.education.period}
                </p>
                <p className="m-0 font-semibold">{c.education.school}</p>
                <p className="m-0 mt-1 text-[15px] text-muted">{c.education.degree}</p>
              </div>
            </div>
            <div className="border-b border-r border-line px-[22px] py-5">
              <p className={`m-0 mb-1.5 flex items-center gap-2 text-xs text-faint ${mono}`}>
                <GlobeIcon size={14} />
                {c.languages.label}
              </p>
              {c.languages.items.map((language) => (
                <p key={language} className="m-0 font-semibold">
                  {language}
                </p>
              ))}
            </div>
          </div>
        </Row>

        <Row
          id="contact"
          surface="bg-panel bg-[radial-gradient(520px_220px_at_0%_100%,rgba(217,134,58,0.12),transparent_70%)]"
          cellClassName={`${sectionY} ${sectionX}`}
        >
          <div className="reveal">
            <SerifHeading className="mb-5">{c.sections.contact}</SerifHeading>
            <a
              href={`mailto:${contacts.email}`}
              className="inline-block break-words text-[clamp(24px,3.4vw,40px)] font-medium tracking-[-0.02em] text-ink underline decoration-accent-rule underline-offset-[0.18em] transition-colors hover:text-link-hover"
            >
              {contacts.email}
            </a>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={contacts.linkedin} className={`${btnSecondary} min-h-11`}>
                <LinkedInIcon />
                LinkedIn
              </a>
              <a href={contacts.github} className={`${btnSecondary} min-h-11`}>
                <GitHubIcon />
                GitHub
              </a>
            </div>
          </div>
        </Row>
      </main>

      <Row
        as="footer"
        closed={false}
        cellClassName={`flex flex-wrap justify-between gap-3 px-4 py-[18px] text-xs text-faint sm:px-[clamp(16px,3vw,28px)] ${mono}`}
      >
        <span>
          © {new Date().getFullYear()} {c.name}
        </span>
        <span>
          {c.inspiredBy}{" "}
          <a href="https://zed.dev" className="text-faint underline decoration-line-strong underline-offset-2 transition-colors hover:text-ink">
            zed.dev
          </a>{" "}
          · Next.js · GitHub Pages
        </span>
      </Row>
    </div>
  );
}
