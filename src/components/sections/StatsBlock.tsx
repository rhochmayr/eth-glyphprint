interface StatsBlockProps {
  entropy: number;
  byteMean: number;
  byteStdDev: number;
  moduloResidues: { prime: number; residue: string }[];
}

export default function StatsBlock({
  entropy,
  byteMean,
  byteStdDev,
  moduloResidues,
}: StatsBlockProps) {
  const stats = [
    { label: 'SHANNON ENTROPY', value: `${entropy.toFixed(6)} bits` },
    { label: 'BYTE MEAN', value: `${byteMean.toFixed(4)} / 255` },
    { label: 'BYTE STD DEV', value: byteStdDev.toFixed(4) },
    { label: 'MEAN RATIO', value: `${(byteMean / 255).toFixed(6)}` },
    { label: 'MAX ENTROPY', value: `${Math.log2(256).toFixed(6)} bits` },
    { label: 'ENTROPY RATIO', value: `${(entropy / Math.log2(256)).toFixed(6)}` },
  ];

  return (
    <div>
      <div className="text-2xs text-ink-300 tracking-[0.2em] uppercase mb-3">
        IX. Statistical Properties
      </div>
      <div className="border border-ink-100">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex justify-between px-2 py-1 ${
              i < stats.length - 1 ? 'border-b border-ink-50' : ''
            }`}
          >
            <span className="text-3xs text-ink-300">{s.label}</span>
            <span className="text-3xs font-medium">{s.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <div className="text-3xs text-ink-300 mb-1.5">MODULAR RESIDUES</div>
        <div className="border border-ink-100">
          <div className="flex flex-wrap">
            {moduloResidues.map((m, i) => (
              <div
                key={m.prime}
                className={`flex-1 min-w-[25%] px-2 py-1 text-center ${
                  i < moduloResidues.length - 1 ? 'border-r border-ink-50' : ''
                } ${i < 8 ? 'border-b border-ink-50' : ''}`}
              >
                <div className="text-3xs text-ink-200">mod {m.prime}</div>
                <div className="text-3xs font-medium">{m.residue}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
