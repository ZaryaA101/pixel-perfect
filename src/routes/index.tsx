import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Download, Mail } from "lucide-react";
import { site } from "@/config/site";
import { Nav } from "@/components/portfolio/Nav";
import { Reveal, SectionHeader, ExternalButton, GithubIcon, btn } from "@/components/portfolio/ui";
import { ArchitectureDiagram, FlightVisual } from "@/components/portfolio/visuals";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zarya Amin — Cloud, Software & Infrastructure" },
      { name: "description", content: "Portfolio of Zarya Amin, Computer Science graduate from CSU Long Beach working across cloud infrastructure, software development and IT systems." },
      { property: "og:title", content: "Zarya Amin — Cloud, Software & Infrastructure" },
      { property: "og:description", content: "Selected work, experience and credentials of Zarya Amin, CS graduate from CSU Long Beach." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const wrap = "mx-auto max-w-[1200px] px-6 md:px-10";

function Hero() {
  return (
    <section id="top" className={`${wrap} grid items-center gap-10 pb-16 pt-10 md:grid-cols-12 md:gap-12 md:pb-20 md:pt-14`}>
      <Reveal className="md:col-span-7">
        <p className="label-mono">Portfolio — 2026</p>
        <h1 className="mt-6 text-6xl font-semibold leading-[1.02] md:text-[88px]">
          Zarya<br />Amin
        </h1>
        <p className="mt-6 font-display text-xl font-medium md:text-2xl">Computer Science Graduate</p>
        <p className="mt-1 font-display text-xl text-muted-foreground md:text-2xl">Cloud · Software · Infrastructure</p>
        <p className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-muted-foreground">
          I'm a Computer Science graduate who enjoys building practical software, working with cloud infrastructure, and solving technical problems. My experience spans software development, IT systems, and hands-on engineering projects.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#projects" className={btn.primary}>Explore My Work <ArrowDown className="h-4 w-4" /></a>
          {site.resume ? (
            <a href={site.resume} download="Zarya_Amin_Resume.pdf" className={btn.outline}><Download className="h-4 w-4" /> Download Resume</a>
          ) : (
            <span aria-disabled="true" title="Resume coming soon" className={`${btn.outline} cursor-not-allowed opacity-50`}><Download className="h-4 w-4" /> Download Resume</span>
          )}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
          {site.github && <a className="link-underline" href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
          <a className="link-underline" href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="link-underline" href={`mailto:${site.email}`}>Email</a>
        </div>
        <p className="mt-8 border-l-2 border-gold pl-3 label-mono">
          Based in Southern California · Open to Opportunities
        </p>
      </Reveal>
      <Reveal className="mx-auto w-full max-w-[420px] md:col-span-5 md:pl-4">
        <figure className="border-b-2 border-gold pb-4">
          <img src={site.portrait} alt="Zarya Amin wearing her graduation cap and gown at CSU Long Beach" width={1170} height={1730} fetchPriority="high" className="block h-auto w-full rounded-sm" />
        </figure>
      </Reveal>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-t py-24 md:py-32">
      <div className={`${wrap} grid gap-12 md:grid-cols-12`}>
        <Reveal className="md:col-span-4">
          <p className="label-mono"><span className="text-primary">01</span> — About</p>
          <h2 className="mt-6 text-4xl font-semibold leading-[1.05] md:text-5xl">A little about me.</h2>
          <p className="mt-6 text-muted-foreground">CS graduate. Curious about how modern systems actually run.</p>
        </Reveal>
        <Reveal className="md:col-span-7 md:col-start-6">
          <div className="space-y-6 text-lg leading-relaxed">
            <p>I'm a Computer Science graduate from California State University, Long Beach, with an interest in the systems and technologies that make modern applications work.</p>
            <p className="text-muted-foreground">I enjoy working across different areas of technology, from developing software and configuring cloud infrastructure to troubleshooting complex technical issues.</p>
            <p className="text-muted-foreground">Through my IT internship, undergraduate research, and personal projects, I've learned to approach challenges with curiosity, patience, and a practical mindset.</p>
            <p className="text-muted-foreground">I'm looking for opportunities where I can keep learning, collaborate with talented people, and contribute to meaningful technical work.</p>
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-y-6 border-t pt-8 text-sm sm:grid-cols-3">
            <div><dt className="label-mono">School</dt><dd className="mt-2">CSU Long Beach</dd></div>
            <div><dt className="label-mono">Degree</dt><dd className="mt-2">B.S. Computer Science</dd></div>
            <div><dt className="label-mono">Graduated</dt><dd className="mt-2">May 2026</dd></div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

type ProjectProps = {
  num: string; title: string; category: string; summary: string; stack: string[]; highlights: string[];
  visual: React.ReactNode; caption: string; repo: string | null; live: string | null; liveLabel: string; note?: string; reverse?: boolean;
};

function Project(p: ProjectProps) {
  return (
    <article className="grid gap-12 border-t py-20 md:grid-cols-12 md:gap-16 md:py-28">
      <Reveal className={`md:col-span-7 ${p.reverse ? "md:order-2" : ""}`}>
        <figure className="border bg-secondary/60 p-6 md:p-10">
          {p.visual}
          <figcaption className="mt-6 border-t pt-4 label-mono">{p.caption}</figcaption>
        </figure>
      </Reveal>
      <Reveal className={`md:col-span-5 ${p.reverse ? "md:order-1" : ""}`}>
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-sm text-primary">{p.num}</span>
          <span className="label-mono">{p.category}</span>
        </div>
        <h3 className="mt-6 text-3xl font-semibold leading-tight md:text-4xl">{p.title}</h3>
        <p className="mt-5 leading-relaxed text-muted-foreground">{p.summary}</p>
        {p.note && <p className="mt-4 border-l-2 border-primary pl-4 text-sm text-muted-foreground">{p.note}</p>}
        <ul className="mt-8 space-y-3 text-[15px]">
          {p.highlights.map((h) => (
            <li key={h} className="grid grid-cols-[1.25rem_1fr]"><span className="text-primary">—</span>{h}</li>
          ))}
        </ul>
        <p className="mt-8 font-mono text-xs leading-relaxed text-muted-foreground">{p.stack.join("  /  ")}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {p.repo ? (
            <ExternalButton href={p.repo} variant="primary"><GithubIcon /> View on GitHub</ExternalButton>
          ) : (
            <span aria-disabled="true" title="Repository link coming soon" className={`${btn.primary} cursor-not-allowed opacity-40`}><GithubIcon /> View on GitHub</span>
          )}
          {p.live && <ExternalButton href={p.live}>{p.liveLabel} <ArrowUpRight className="h-4 w-4" /></ExternalButton>}
        </div>
      </Reveal>
    </article>
  );
}

function Projects() {
  return (
    <section id="projects" className="border-t pt-24 md:pt-32">
      <div className={wrap}>
        <SectionHeader index="02" eyebrow="Projects" title="Selected Work" subtitle="A selection of projects exploring software development, cloud infrastructure, and practical problem-solving." />
        <div className="mt-16">
          <Project num="01" category="Cloud / DevOps" title="Cloud-Native Portfolio Deployment"
            summary="Developed and containerized a Flask web application and deployed it using AWS cloud infrastructure, configuring container services, networking, access permissions, and public application connectivity."
            note="This portfolio site is part of the project — it's served by the Flask app in the deployment shown here."
            highlights={["Developed a Python Flask application", "Containerized the application using Docker", "Managed container images through Amazon ECR", "Deployed the application through Amazon ECS", "Configured networking, IAM permissions, and security groups", "Troubleshot application connectivity and container networking"]}
            stack={["Python", "Flask", "Docker", "AWS ECS", "Amazon ECR", "AWS IAM", "VPC", "Security Groups", "Linux"]}
            visual={<ArchitectureDiagram />} caption="Containerized application deployed on AWS."
            repo={site.projects.cloud.repo} live={site.projects.cloud.live} liveLabel="Live Website" />
          <Project num="02" reverse category="Full-Stack / Flight Planning" title="FlightSight"
            summary="Built flight-planning features designed to help users compare travel options through weighted recommendations, emissions calculations, weather information, and geographic visualizations."
            highlights={["Developed weighted flight recommendation functionality", "Implemented CO₂ emissions calculations", "Integrated Google Maps and weather data", "Built interactive heat map functionality", "Developed Saved Flights with PostgreSQL persistence"]}
            stack={["JavaScript", "Node.js", "Express.js", "PostgreSQL", "Neon", "REST APIs", "Google Maps API", "Open-Meteo"]}
            visual={<FlightVisual />} caption="JavaScript / Express.js / PostgreSQL"
            repo={site.projects.flightsight.repo} live={site.projects.flightsight.live} liveLabel="Live Demo" />
        </div>
      </div>
    </section>
  );
}

const experience = [
  { org: "NBCUniversal", role: "NBCUniversal Media Fellow", date: "Aug 2026", text: "Collaborated on a team case study for The Traitors, developing Gen Z-focused marketing, casting, and audience engagement recommendations." },
  { org: "California State University, Long Beach", role: "Undergraduate Research Assistant", date: "Jan 2026 – May 2026", text: "Conducted faculty-supervised research investigating AI-driven optimization techniques for Graphviz DOT layouts. Developed Python scripts to benchmark algorithm behavior, compare technical outputs, and analyze performance across experimental configurations." },
  { org: "Rolling Robots", role: "Robotics Instructor", date: "May 2025 – Aug 2025", text: "Led hands-on robotics instruction covering C++, Python, mechanical design, 3D modeling, and practical problem-solving." },
  { org: "OSI Systems, Inc.", role: "IT Intern", date: "Dec 2024 – Apr 2025", text: "Provided Tier 1 and Tier 2 technical support, troubleshooting hardware, software, network connectivity, and access issues. Assisted with Windows and Azure administration, device provisioning, deployments, and technical documentation." },
];

function Experience() {
  return (
    <section id="experience" className="border-t py-24 md:py-32">
      <div className={wrap}>
        <SectionHeader index="03" eyebrow="Experience" title="Experience" subtitle="Learning through research, collaboration, and hands-on technical work." />
        <ol className="mt-16 border-t">
          {experience.map((e) => (
            <Reveal as="li" key={e.role} className="grid gap-4 border-b py-10 md:grid-cols-12">
              <p className="label-mono md:col-span-3 md:pt-2">{e.date}</p>
              <div className="md:col-span-4">
                <h3 className="text-2xl font-semibold leading-snug">{e.org}</h3>
                <p className="mt-1 font-medium text-primary">{e.role}</p>
              </div>
              <p className="leading-relaxed text-muted-foreground md:col-span-5">{e.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

const skills = [
  ["Cloud & Infrastructure", ["AWS", "Amazon ECS", "Amazon ECR", "Docker", "AWS IAM", "VPC / Networking", "Linux", "Microsoft Azure"]],
  ["Programming & Development", ["Python", "C++", "JavaScript", "SQL", "Flask", "Node.js", "Express.js", "REST APIs", "Git / GitHub"]],
  ["Systems & IT", ["Windows Administration", "Technical Troubleshooting", "Jira", "Device Provisioning", "User Access Management", "Network Troubleshooting"]],
  ["Data & Tools", ["PostgreSQL", "pandas", "scikit-learn", "Excel"]],
] as const;

function Skills() {
  return (
    <section id="skills" className="skills-contrast border-t py-24 md:py-32">
      <div className={wrap}>
        <SectionHeader index="04" eyebrow="Skills" title="Technical Toolkit" subtitle="Languages, platforms, and tools I've worked with." />
        <div className="mt-16 grid border-l border-t sm:grid-cols-2 lg:grid-cols-4">
          {skills.map(([cat, items], i) => (
            <Reveal key={cat} className="border-b border-r p-8">
              <p className="font-mono text-xs text-primary">0{i + 1}</p>
              <h3 className="mt-3 text-lg font-semibold">{cat}</h3>
              <ul className="mt-6 space-y-2 text-[15px] text-muted-foreground">
                {items.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="border-t py-24 md:py-32">
      <div className={wrap}>
        <SectionHeader index="05" eyebrow="Education" title="Education & Credentials" />
        <div className="mt-16 grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <h3 className="text-2xl font-semibold">California State University, Long Beach</h3>
            <p className="mt-2">Bachelor of Science in Computer Science</p>
            <p className="mt-1 text-muted-foreground">Graduated May 2026 · GPA 3.64 / 4.0</p>
            <p className="mt-10 label-mono">Academic recognition</p>
            <ul className="mt-4 divide-y border-y text-[15px]">
              <li className="flex justify-between py-3"><span>President's Honor List</span><span className="font-mono text-xs text-muted-foreground">2026</span></li>
              <li className="flex justify-between py-3"><span>Dean's List</span><span className="font-mono text-xs text-muted-foreground">2023–2024</span></li>
            </ul>
          </Reveal>
          <Reveal className="md:col-span-5 md:col-start-8">
            <p className="label-mono">Certifications</p>
            <ul className="mt-4 divide-y border-y text-[15px]">
              <li className="py-4">
                <p className="font-medium">AWS Certified Cloud Practitioner</p>
                <p className="mt-1 flex justify-between font-mono text-xs text-muted-foreground"><span>CLF-C02</span><span className="text-primary">Earned · 2026</span></p>
              </li>
              <li className="py-4">
                <p className="font-medium text-muted-foreground">AWS Certified Solutions Architect – Associate</p>
                <p className="mt-1 flex justify-between font-mono text-xs text-muted-foreground"><span>SAA-C03</span><span className="rounded-sm border border-dashed px-2">In progress</span></p>
              </li>
            </ul>
            <p className="mt-12 label-mono">Leadership & community</p>
            <ul className="mt-4 space-y-5 text-[15px]">
              <li><p className="font-medium">Women in Computing — Treasurer</p><p className="mt-1 text-muted-foreground">Supported fundraising, financial requests, and student organization activities.</p></li>
              <li><p className="font-medium">MESA Outreach — Mentor</p><p className="mt-1 text-muted-foreground">Taught C++ to more than 20 pre-college students through hands-on projects and robotics activities.</p></li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t py-24 md:py-36">
      <div className={wrap}>
        <Reveal>
          <p className="label-mono"><span className="text-primary">06</span> — Contact</p>
          <h2 className="mt-6 text-5xl font-semibold leading-[1.05] md:text-7xl">Let's connect.</h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">I'm always open to connecting with people working on interesting technical challenges, discussing opportunities, or collaborating on meaningful projects.</p>
          <a href={`mailto:${site.email}`} className="link-underline mt-12 inline-block max-w-full break-words font-display text-xl font-medium text-primary sm:text-2xl md:text-4xl">{site.email}</a>
          <div className="mt-12 flex flex-wrap gap-3">
            <a href={`mailto:${site.email}`} className={btn.primary}><Mail className="h-4 w-4" /> Send an Email</a>
            <ExternalButton href={site.linkedin}>LinkedIn <ArrowUpRight className="h-4 w-4" /></ExternalButton>
            {site.github && <ExternalButton href={site.github}><GithubIcon /> GitHub</ExternalButton>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Index() {
  return (
    <>
      <Nav />
      <main>
        <Hero /><About /><Projects /><Experience /><Skills /><Education /><Contact />
      </main>
      <footer className="border-t">
        <div className={`${wrap} py-8 label-mono`}>© 2026 Zarya Amin</div>
      </footer>
    </>
  );
}
