import { useEffect, useRef, useState, type ReactNode } from "react";

export function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function Reveal({ children, className = "", as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" | "article" }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} data-visible={visible} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}

const btnBase =
  "inline-flex items-center gap-2 rounded-sm px-5 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
export const btn = {
  primary: `${btnBase} bg-foreground text-background hover:bg-primary`,
  outline: `${btnBase} border border-foreground/20 text-foreground hover:border-foreground hover:bg-secondary`,
};

export function ExternalButton({ href, children, variant = "outline" }: { href: string; children: ReactNode; variant?: keyof typeof btn }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={btn[variant]}>
      {children}
    </a>
  );
}

export function SectionHeader({ index, eyebrow, title, subtitle }: { index: string; eyebrow: string; title: string; subtitle?: string }) {
  return (
    <Reveal className="grid gap-6 md:grid-cols-12">
      <p className="label-mono md:col-span-3 md:pt-3">
        <span className="text-primary">{index}</span> — {eyebrow}
      </p>
      <div className="md:col-span-9">
        <h2 className="text-4xl font-semibold leading-[1.05] md:text-6xl">{title}</h2>
        {subtitle && <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{subtitle}</p>}
      </div>
    </Reveal>
  );
}
