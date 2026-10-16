import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { GithubIcon } from "./ui";

const links = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach(({ id }) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 md:px-10" aria-label="Main">
        <a href="#top" className="font-display text-[15px] font-semibold tracking-tight">Zarya Amin</a>
        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} aria-current={active === l.id ? "true" : undefined}
              className={`link-underline text-sm transition-colors ${active === l.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {l.label}
            </a>
          ))}
          {site.github && (
            <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="text-muted-foreground transition-colors hover:text-foreground">
              <GithubIcon />
            </a>
          )}
        </div>
        <button className="label-mono md:hidden" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
          {open ? "Close" : "Menu"}
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t bg-background md:hidden">
          <ul className="mx-auto max-w-[1200px] px-6 py-4">
            {links.map((l, i) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={() => setOpen(false)} className="flex items-baseline gap-4 border-b py-4 font-display text-2xl font-medium last:border-0">
                  <span className="label-mono">0{i + 1}</span>{l.label}
                </a>
              </li>
            ))}
            {site.github && (
              <li><a href={site.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-4 text-sm"><GithubIcon /> GitHub</a></li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
