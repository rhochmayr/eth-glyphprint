import type { HexFrequency } from '../../lib/derive';

interface FrequencyChartProps {
  hexFrequency: HexFrequency[];
}

export default function FrequencyChart({ hexFrequency }: FrequencyChartProps) {
  const maxCount = Math.max(...hexFrequency.map((f) => f.count));

  return (
    <div>
      <div className="text-xs text-ink-300 tracking-[0.2em] uppercase mb-3">
        VI. Hex Character Distribution
      </div>
      <div className="border border-ink-100 p-3">
        <div className="space-y-1">
          {hexFrequency.map((f) => {
            const width = maxCount > 0 ? (f.count / maxCount) * 100 : 0;
            return (
              <div key={f.char} className="flex items-center gap-2">
                <span className="w-5 text-2xs text-ink-300 text-right shrink-0">
                  {f.char}
                </span>
                <div className="flex-1 h-4 bg-paper-100 relative">
                  <div
                    className="h-full bg-ink-500 transition-all"
                    style={{ width: `${width}%` }}
                  />
                </div>
                <span className="w-5 text-2xs text-ink-300 text-right shrink-0">
                  {f.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
