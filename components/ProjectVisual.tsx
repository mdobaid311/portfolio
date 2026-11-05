import Image from "next/image";
import type { ProjectVisual } from "@/lib/data";

function Box({ x, y, w, h, title, sub }: { x: number; y: number; w: number; h: number; title: string; sub?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} className="fill-panel-2 stroke-dim" />
      <text x={x + 12} y={y + (sub ? 22 : h / 2 + 4)} className="fill-bone text-[12px]">
        {title}
      </text>
      {sub && (
        <text x={x + 12} y={y + 40} className="fill-dim text-[10px]">
          {sub}
        </text>
      )}
    </g>
  );
}

// Drawn from the MiniURL description in lib/data.ts: three services, ZooKeeper for
// Base62 code ranges, Redis for hot URLs, a MongoDB replica set, all on Kubernetes.
function MiniUrlDiagram() {
  return (
    <svg
      viewBox="0 0 640 230"
      role="img"
      aria-label="MiniURL architecture: a client calls three microservices, which use ZooKeeper for collision-free Base62 codes, Redis for hot URLs and a MongoDB replica set, all running on a Kubernetes cluster."
      className="font-mono"
    >
      <rect x="150" y="12" width="478" height="206" strokeDasharray="4 4" className="fill-none stroke-faint" />
      <text x="162" y="30" className="fill-faint text-[10px] uppercase tracking-widest">
        Self-hosted Kubernetes, multi-node, autoscaling
      </text>

      <Box x={12} y={88} w={96} h={54} title="Client" />
      <path d="M108 115 H178" className="fill-none stroke-acid" />

      {[0, 1, 2].map((i) => (
        <Box key={i} x={178} y={52 + i * 54} w={150} h={42} title={`Service ${i + 1}`} />
      ))}

      <Box x={430} y={44} w={186} h={46} title="ZooKeeper" sub="collision-free Base62 codes" />
      <Box x={430} y={102} w={186} h={46} title="Redis" sub="cache for hot URLs" />
      <Box x={430} y={160} w={186} h={46} title="MongoDB" sub="replica set" />

      {[67, 125, 183].map((y) => (
        <path key={y} d={`M328 126 H380 V${y} H430`} className="fill-none stroke-acid" />
      ))}
    </svg>
  );
}

export default function ProjectVisual({ visual }: { visual: ProjectVisual }) {
  return (
    <div className="relative mt-2 max-w-3xl border border-line bg-panel p-3 md:mb-2">
      {visual.type === "image" ? (
        <Image
          src={visual.src}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          sizes="(min-width: 768px) 768px, 100vw"
          className="aspect-[16/8] w-full object-cover object-top"
        />
      ) : (
        <MiniUrlDiagram />
      )}
    </div>
  );
}
