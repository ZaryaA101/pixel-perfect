/* Hand-built SVG illustrations. Colors come from currentColor / CSS vars. */

export function HeroGraphic() {
  const lines = Array.from({ length: 9 }, (_, i) => i);
  return (
    <svg viewBox="0 0 400 480" className="h-full w-full text-foreground" aria-hidden="true">
      <g stroke="var(--color-border)" strokeWidth="1">
        {lines.map((i) => <line key={`h${i}`} x1="0" x2="400" y1={i * 60} y2={i * 60} />)}
        {lines.slice(0, 8).map((i) => <line key={`v${i}`} y1="0" y2="480" x1={i * 57} x2={i * 57} />)}
      </g>
      <rect x="57" y="60" width="171" height="240" fill="var(--color-secondary)" stroke="currentColor" strokeWidth="1" />
      <rect x="171" y="180" width="171" height="240" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="228" cy="240" r="60" fill="none" stroke="var(--color-primary)" strokeWidth="1.25" />
      <line x1="57" y1="420" x2="342" y2="60" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 5" />
      <rect x="224" y="236" width="8" height="8" fill="var(--color-primary)" />
      <text x="57" y="50" fontFamily="var(--font-mono)" fontSize="9" fill="var(--color-muted-foreground)">33.78° N</text>
      <text x="290" y="440" fontFamily="var(--font-mono)" fontSize="9" fill="var(--color-muted-foreground)">118.11° W</text>
    </svg>
  );
}

function Node({ x, y, w = 150, h = 54, label, sub, accent }: { x: number; y: number; w?: number; h?: number; label: string; sub: string; accent?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="3" fill="var(--color-background)" stroke={accent ? "var(--color-primary)" : "currentColor"} strokeWidth="1" />
      <text x={x + 12} y={y + 22} fontFamily="var(--font-display)" fontSize="13" fontWeight="600" fill="currentColor">{label}</text>
      <text x={x + 12} y={y + 40} fontFamily="var(--font-mono)" fontSize="9" fill="var(--color-muted-foreground)">{sub}</text>
    </g>
  );
}

export function ArchitectureDiagram() {
  return (
    <svg viewBox="0 0 560 420" className="h-auto w-full text-foreground" role="img" aria-label="Architecture: browser requests reach an AWS ECS service running a Docker container with the Flask app. Amazon ECR supplies the image. VPC, security groups and IAM surround the deployment.">
      <defs>
        <marker id="arw" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
        </marker>
      </defs>
      <Node x={20} y={60} w={120} label="User" sub="browser · HTTP" />
      {/* VPC boundary */}
      <rect x="170" y="24" width="370" height="290" rx="4" fill="none" stroke="var(--color-muted-foreground)" strokeDasharray="4 4" />
      <text x="184" y="44" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1" fill="var(--color-muted-foreground)">AWS · VPC</text>
      {/* security group */}
      <rect x="190" y="56" width="330" height="200" rx="3" fill="var(--color-secondary)" stroke="var(--color-border)" />
      <text x="204" y="74" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1" fill="var(--color-muted-foreground)">SECURITY GROUP · inbound rules</text>
      <Node x={210} y={88} w={140} label="ECS Service" sub="task scheduling" accent />
      <Node x={210} y={178} w={140} label="Docker Container" sub="task runtime" />
      <Node x={370} y={178} w={130} label="Flask App" sub="python · gunicorn" />
      <line x1="140" y1="87" x2="208" y2="112" stroke="currentColor" markerEnd="url(#arw)" />
      <line x1="280" y1="142" x2="280" y2="176" stroke="currentColor" markerEnd="url(#arw)" />
      <line x1="350" y1="205" x2="368" y2="205" stroke="currentColor" markerEnd="url(#arw)" />
      {/* IAM */}
      <rect x="190" y="270" width="330" height="30" rx="3" fill="none" stroke="var(--color-border)" />
      <text x="204" y="289" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1" fill="var(--color-muted-foreground)">IAM · task execution role &amp; permissions</text>
      {/* ECR */}
      <Node x={20} y={340} w={160} label="Amazon ECR" sub="container image registry" />
      <path d="M180 367 H 450 V 234" fill="none" stroke="var(--color-primary)" strokeDasharray="4 3" markerEnd="url(#arw)" />
      <text x="300" y="358" fontFamily="var(--font-mono)" fontSize="9" fill="var(--color-primary)">docker pull image</text>
      <text x="20" y="405" fontFamily="var(--font-mono)" fontSize="9" fill="var(--color-muted-foreground)">docker build → push</text>
    </svg>
  );
}

export function FlightVisual() {
  return (
    <svg viewBox="0 0 560 420" className="h-auto w-full text-foreground" role="img" aria-label="Conceptual illustration of a flight route map with a comparison panel.">
      <g stroke="var(--color-border)">
        {Array.from({ length: 12 }, (_, i) => <line key={`a${i}`} x1={i * 50} x2={i * 50} y1="0" y2="420" />)}
        {Array.from({ length: 9 }, (_, i) => <line key={`b${i}`} y1={i * 50} y2={i * 50} x1="0" x2="560" />)}
      </g>
      {/* heat cells */}
      <g fill="var(--color-primary)">
        <rect x="100" y="150" width="50" height="50" opacity="0.08" />
        <rect x="150" y="150" width="50" height="50" opacity="0.14" />
        <rect x="150" y="100" width="50" height="50" opacity="0.06" />
        <rect x="350" y="200" width="50" height="50" opacity="0.1" />
      </g>
      <path d="M90 270 Q 250 70 450 180" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" />
      <path d="M90 270 Q 270 180 450 180" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" opacity="0.5" />
      <circle cx="90" cy="270" r="5" fill="var(--color-background)" stroke="currentColor" />
      <circle cx="450" cy="180" r="5" fill="currentColor" />
      <text x="70" y="295" fontFamily="var(--font-mono)" fontSize="11" fill="currentColor">LAX</text>
      <text x="438" y="165" fontFamily="var(--font-mono)" fontSize="11" fill="currentColor">JFK</text>
      <path d="M262 118 l10 4 -10 4 2 -4z" fill="var(--color-primary)" transform="rotate(-8 266 122)" />
      {/* comparison panel */}
      <g>
        <rect x="300" y="262" width="236" height="134" rx="3" fill="var(--color-background)" stroke="currentColor" />
        <text x="316" y="286" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1" fill="var(--color-muted-foreground)">COMPARE · WEIGHTED</text>
        {[
          ["Option A", "price · time", 0.82],
          ["Option B", "lower CO₂", 0.64],
          ["Option C", "weather", 0.41],
        ].map(([n, s, w], i) => (
          <g key={n as string} transform={`translate(316 ${304 + i * 30})`}>
            <text y="8" fontFamily="var(--font-display)" fontSize="11" fontWeight="600" fill="currentColor">{n}</text>
            <text x="64" y="8" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-muted-foreground)">{s}</text>
            <rect x="140" y="2" width="64" height="5" fill="var(--color-secondary)" />
            <rect x="140" y="2" width={64 * (w as number)} height="5" fill={i === 0 ? "var(--color-primary)" : "currentColor"} opacity={i === 0 ? 1 : 0.35} />
          </g>
        ))}
      </g>
    </svg>
  );
}
