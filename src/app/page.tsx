import { experience, profile, projects, skills } from "@/data/profile";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted">{title}</h2>
      {children}
    </section>
  );
}

export default function Home() {
  const nav = [
    profile.bio && { id: "about", label: "About" },
    projects.length > 0 && { id: "projects", label: "Projects" },
    experience.length > 0 && { id: "experience", label: "Experience" },
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
      <header className="flex items-center justify-between py-6">
        <a href="#top" className="font-semibold">
          {profile.name}
        </a>
        <nav className="flex gap-5 text-sm text-muted">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="hover:text-foreground">
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top" className="flex flex-col gap-20 pb-24 pt-16 sm:pt-24">
        <section>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{profile.name}</h1>
          {profile.role && <p className="mt-3 text-xl text-muted">{profile.role}</p>}
          {profile.location && <p className="mt-1 text-sm text-muted">{profile.location}</p>}
          <ul className="mt-8 flex flex-wrap gap-3">
            {profile.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-full border border-line px-4 py-1.5 text-sm hover:bg-surface"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {profile.bio && (
          <Section id="about" title="About">
            <p className="leading-relaxed">{profile.bio}</p>
            {skills.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li key={skill} className="rounded-md bg-surface px-3 py-1 text-sm">
                    {skill}
                  </li>
                ))}
              </ul>
            )}
          </Section>
        )}

        {projects.length > 0 && (
          <Section id="projects" title="Projects">
            <ul className="grid gap-4 sm:grid-cols-2">
              {projects.map((project) => (
                <li key={project.name} className="flex flex-col rounded-xl border border-line p-5">
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>
                  <p className="mt-4 text-xs text-muted">{project.tech.join(" · ")}</p>
                  <div className="mt-4 flex gap-4 text-sm font-medium">
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer" className="hover:underline">
                        Demo ↗
                      </a>
                    )}
                    {project.repo && (
                      <a href={project.repo} target="_blank" rel="noreferrer" className="hover:underline">
                        Source ↗
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {experience.length > 0 && (
          <Section id="experience" title="Experience">
            <ol className="flex flex-col gap-8">
              {experience.map((item) => (
                <li key={`${item.company}-${item.period}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold">
                      {item.role} · {item.company}
                    </h3>
                    <span className="text-sm text-muted">{item.period}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.summary}</p>
                </li>
              ))}
            </ol>
          </Section>
        )}
      </main>

      <footer className="border-t border-line py-8 text-sm text-muted">
        © {profile.name}
      </footer>
    </div>
  );
}
