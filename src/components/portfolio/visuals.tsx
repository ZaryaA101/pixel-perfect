/* Lightweight technical architecture and project information. */

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
  const features = [
    ["01", "Weighted recommendations", "Compare travel options"],
    ["02", "Emissions calculations", "CO₂ estimates"],
    ["03", "Maps & weather", "Google Maps · Open-Meteo"],
    ["04", "Saved Flights", "PostgreSQL persistence"],
  ];
  return (
    <div className="flex min-h-[320px] flex-col justify-center">
      <p className="label-mono">Flight planning / Full-stack</p>
      <p className="mt-5 font-display text-3xl font-semibold text-heading">FlightSight</p>
      <dl className="mt-8 border-t">
        {features.map(([number, title, detail]) => (
          <div key={number} className="grid grid-cols-[2rem_1fr] gap-3 border-b py-4">
            <span className="font-mono text-xs text-primary">{number}</span>
            <div><dt className="text-sm font-medium">{title}</dt><dd className="mt-1 text-xs text-muted-foreground">{detail}</dd></div>
          </div>
        ))}
      </dl>
    </div>
  );
}
