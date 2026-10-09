import Link from "next/link";
import { contacts, content, localePaths, type Locale } from "@/data/profile";

function Section({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <section id={id} className="grid gap-4 border-t border-line pt-8 md:grid-cols-[10rem_1fr] md:gap-8">
      <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent md:pt-1">{label}</h2>
      <div>{children}</div>
    </section>
  );
}

function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 flex flex-col gap-2">
      {items.map((item) => (
        <li key={item} className="relative pl-5 leading-relaxed before:absolute before:left-0 before:text-muted before:content-['–']">
          {item}
        </li>
      ))}
    </ul>
  );
}

const linkClass = "underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent";

export function Portfolio({ locale }: { locale: Locale }) {
  const c = content[locale];
  const otherLocale: Locale = locale === "en" ? "vi" : "en";

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-8">
      <header className="flex justify-end py-6 text-sm">
        <Link href={localePaths[otherLocale]} hrefLang={otherLocale} lang={otherLocale} className={linkClass}>
          {c.labels.switchLanguage}
        </Link>
      </header>

      <main className="flex flex-col gap-14 pb-20">
        <section className="pt-10 sm:pt-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">{c.name}</h1>
          <p className="mt-4 text-lg sm:text-xl">
            <span className="font-medium text-accent">{c.role}</span>
            <span className="text-muted"> · {c.location}</span>
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <a href={`mailto:${contacts.email}`} className={linkClass}>
                {contacts.email}
              </a>
            </li>
            <li>
              <a href={contacts.linkedin} target="_blank" rel="noreferrer" className={linkClass}>
                LinkedIn
              </a>
            </li>
            <li>
              <a href={contacts.github} target="_blank" rel="noreferrer" className={linkClass}>
                GitHub
              </a>
            </li>
          </ul>
        </section>

        <Section id="about" label={c.labels.about}>
          <p className="max-w-prose text-lg leading-relaxed">{c.summary}</p>
        </Section>

        <Section id="experience" label={c.labels.experience}>
          {c.experience.map((job) => (
            <div key={job.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-xl font-semibold">{job.company}</h3>
                <span className="text-sm text-muted">{job.period}</span>
              </div>
              <ol className="mt-6 flex flex-col gap-10 border-l-2 border-accent/25 pl-5 sm:pl-6">
                {job.roles.map((role) => (
                  <li key={role.title}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <h4 className="font-semibold">{role.title}</h4>
                      <span className="text-sm text-muted">{role.period}</span>
                    </div>
                    <p className="mt-1 italic text-muted">{role.intro}</p>
                    <Highlights items={role.highlights} />
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </Section>

        <Section id="projects" label={c.labels.projects}>
          <div className="flex flex-col gap-10">
            {c.projects.map((project) => (
              <article key={project.name}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <span className="text-sm text-muted">{project.period}</span>
                </div>
                <p className="mt-1 text-muted">
                  <a href={project.url} target="_blank" rel="noreferrer" className={linkClass}>
                    {project.url.replace(/^https?:\/\//, "")}
                  </a>
                  <span className="italic"> — {project.intro}</span>
                </p>
                <Highlights items={project.highlights} />
              </article>
            ))}
          </div>
        </Section>

        <Section id="skills" label={c.labels.skills}>
          <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-[13rem_1fr]">
            {c.skills.map((skill) => (
              <div key={skill.group} className="contents">
                <dt className="font-medium">{skill.group}</dt>
                <dd className="mb-2 leading-relaxed text-muted sm:mb-0">{skill.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="education" label={c.labels.education}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="font-semibold">{c.education.school}</h3>
            <span className="text-sm text-muted">{c.education.period}</span>
          </div>
          <p className="mt-1 text-muted">{c.education.degree}</p>
        </Section>

        <Section id="languages" label={c.labels.languages}>
          <ul className="flex flex-col gap-1">
            {c.languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </Section>
      </main>

      <footer className="flex flex-wrap justify-between gap-4 border-t border-line py-8 text-sm text-muted">
        <span>© {c.name}</span>
        <a href={`mailto:${contacts.email}`} className={linkClass}>
          {contacts.email}
        </a>
      </footer>
    </div>
  );
}
