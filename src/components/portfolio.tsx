import Link from "next/link";
import { contacts, content, localePaths, type Locale } from "@/data/profile";

// Layout and styling follow DESIGN.md ("Ink & serif"). Read it before changing this file.

const sectionX = "px-4 sm:px-[clamp(16px,5vw,64px)]";
const mono = "font-mono";
const btnPrimary =
  "inline-flex min-h-[46px] items-center border border-accent-edge bg-accent px-5 font-medium text-white no-underline transition-colors hover:bg-[#3a7aee]";
const btnSecondary =
  "inline-flex min-h-[46px] items-center border border-line-strong px-[18px] font-medium text-ink no-underline transition-colors hover:border-faint";

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

  return (
    <div className="mx-auto max-w-[1200px] border-x border-line bg-panel text-base">
      {/* Pinned while scrolling. Phones: name + language on row 1, nav on row 2. */}
      <header
        className={`sticky top-0 z-20 flex flex-wrap items-center gap-x-6 border-b border-line bg-panel/90 px-4 py-2 text-[13px] backdrop-blur-md sm:px-[clamp(16px,3vw,28px)] md:py-3 ${mono}`}
      >
        <a href="#top" className="mr-auto py-1.5 font-serif text-[21px] italic leading-none tracking-[-0.01em] text-ink no-underline">
          {c.name}
        </a>
        <nav aria-label="Primary" className="order-last -ml-2.5 flex w-full items-center gap-x-1.5 md:order-none md:ml-0 md:w-auto">
          {(["work", "experience", "skills", "contact"] as const).map((key) => (
            <a key={key} href={`#${key}`} className="px-2.5 py-2 text-nav no-underline hover:text-ink md:py-2.5">
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
                className="px-2.5 py-[7px] text-faint no-underline hover:text-ink"
              >
                {l.toUpperCase()}
              </Link>
            ),
          )}
        </span>
      </header>

      <main>
        <section id="top" className={`animate-rise pb-[clamp(48px,6vw,64px)] pt-[clamp(64px,9vw,112px)] ${sectionX}`}>
          <p className={`m-0 mb-[22px] text-[13px] text-faint ${mono}`}>{c.kicker}</p>
          <h1 className="m-0 font-serif text-[clamp(56px,8.6vw,120px)] font-normal italic leading-[0.95] tracking-[-0.02em] text-heading">
            {c.name}
          </h1>
          <p className="m-0 mt-7 max-w-[680px] text-[clamp(18px,1.7vw,21px)] leading-[1.6] text-ink-2 [text-wrap:pretty]">
            {c.summary}
          </p>
          <p className={`m-0 mt-4 text-[13px] text-faint ${mono}`}>{c.currently}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href={`mailto:${contacts.email}`} className={btnPrimary}>
              {c.emailCta}
            </a>
            <a href={contacts.github} className={btnSecondary}>
              GitHub
            </a>
            <a href={contacts.linkedin} className={btnSecondary}>
              LinkedIn
            </a>
          </div>
        </section>

        <section id="work" className="border-t border-line">
          <div className={`pb-8 pt-[clamp(48px,6vw,72px)] ${sectionX}`}>
            <SerifHeading>{c.sections.work}</SerifHeading>
          </div>
          <div className="grid border-t border-line lg:grid-cols-3">
            {c.work.map((item) => (
              <article
                key={item.title}
                className="flex flex-col gap-3.5 border-b border-line p-[clamp(20px,3vw,32px)] lg:border-r lg:last:border-r-0"
              >
                <p className={`m-0 text-xs text-faint ${mono}`}>{item.meta}</p>
                <h3 className="m-0 text-xl font-semibold">{item.title}</h3>
                <p className="m-0 text-[15px] text-muted [text-wrap:pretty]">{item.body}</p>
                {item.link && (
                  <a
                    href={item.link.href}
                    className={`mt-auto inline-flex min-h-11 items-center gap-2 self-start text-[13px] text-link hover:text-link-hover ${mono}`}
                  >
                    {item.link.label}
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M4 10L10 4M5 4h5v5" />
                    </svg>
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className={`pt-[clamp(56px,7vw,88px)] ${sectionX}`}>
          <SerifHeading className="mb-9">{c.sections.experience}</SerifHeading>
          <div className="border border-line">
            <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-b border-line bg-panel-2 px-6 py-4">
              <h3 className="m-0 text-[17px] font-semibold">{c.company.name}</h3>
              <span className={`pt-[3px] text-xs text-faint ${mono}`}>{c.company.meta}</span>
            </div>
            {c.roles.map((role) => (
              <article key={role.title} className="flex flex-wrap border-b border-line last:border-b-0">
                <div className="grow basis-[260px] border-b border-line p-6 md:border-b-0 md:border-r">
                  <p className={`m-0 text-xs ${role.current ? "text-link" : "text-faint"} ${mono}`}>{role.period}</p>
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
        </section>

        <section id="skills" className={`pt-[clamp(56px,7vw,88px)] ${sectionX}`}>
          <SerifHeading className="mb-9">{c.sections.skills}</SerifHeading>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] border-l border-t border-line">
            {c.skills.map((skill) => (
              <div key={skill.label} className="border-b border-r border-line px-[22px] py-5">
                <p className={`m-0 mb-2 text-xs ${skill.primary ? "text-link" : "text-faint"} ${mono}`}>{skill.label}</p>
                <p className={`m-0 text-[15px] ${skill.primary ? "text-ink" : "text-ink-2"}`}>{skill.items}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="education-title" className={`pt-[clamp(56px,7vw,88px)] ${sectionX}`}>
          <SerifHeading id="education-title" className="mb-9">
            {c.sections.education}
          </SerifHeading>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] border-l border-t border-line">
            <div className="border-b border-r border-line px-[22px] py-5">
              <p className={`m-0 mb-1.5 text-xs text-faint ${mono}`}>{c.education.period}</p>
              <p className="m-0 font-semibold">{c.education.school}</p>
              <p className="m-0 mt-1 text-[15px] text-muted">{c.education.degree}</p>
            </div>
            <div className="border-b border-r border-line px-[22px] py-5">
              <p className={`m-0 mb-1.5 text-xs text-faint ${mono}`}>{c.languages.label}</p>
              {c.languages.items.map((language) => (
                <p key={language} className="m-0 font-semibold">
                  {language}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className={`mt-[clamp(56px,7vw,88px)] border-t border-line bg-[radial-gradient(520px_220px_at_0%_100%,rgba(47,111,224,0.14),transparent_70%)] py-[clamp(56px,7vw,88px)] ${sectionX}`}
        >
          <SerifHeading className="mb-5">{c.sections.contact}</SerifHeading>
          <a
            href={`mailto:${contacts.email}`}
            className="inline-block break-words text-[clamp(24px,3.4vw,40px)] font-medium tracking-[-0.02em] text-ink underline decoration-accent-rule underline-offset-[0.18em] hover:text-link-hover"
          >
            {contacts.email}
          </a>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={contacts.linkedin} className={`${btnSecondary} min-h-11`}>
              LinkedIn
            </a>
            <a href={contacts.github} className={`${btnSecondary} min-h-11`}>
              GitHub
            </a>
          </div>
        </section>
      </main>

      <footer
        className={`flex flex-wrap justify-between gap-3 border-t border-line px-4 py-[18px] text-xs text-faint sm:px-[clamp(16px,3vw,28px)] ${mono}`}
      >
        <span>
          © {new Date().getFullYear()} {c.name}
        </span>
        <span>Next.js · GitHub Pages</span>
      </footer>
    </div>
  );
}
