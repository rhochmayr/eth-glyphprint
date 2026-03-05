interface XorFoldBlockProps {
  bare: string;
  xorFold: string;
  byteDensity: number[];
}

export default function XorFoldBlock({ bare, xorFold, byteDensity }: XorFoldBlockProps) {
  const topHalf = bare.slice(0, 20).toUpperCase();
  const bottomHalf = bare.slice(20).toUpperCase();
  const result = xorFold.toUpperCase();
  const maxDensity = Math.max(...byteDensity);

  return (
    <div>
      <div className="text-2xs text-ink-300 tracking-[0.2em] uppercase mb-3">
        XIII. XOR Fold & Byte Density
      </div>

      <div className="border border-ink-100 p-2 mb-3">
        <div className="text-3xs text-ink-200 mb-2">
          First 10 bytes XOR last 10 bytes
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-8 text-3xs text-ink-200 text-right shrink-0">
              HI
            </span>
            <span className="text-3xs tracking-[0.15em]">{topHalf}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-8 text-3xs text-ink-200 text-right shrink-0">
              LO
            </span>
            <span className="text-3xs tracking-[0.15em]">{bottomHalf}</span>
          </div>
          <div className="flex items-center gap-2 border-t border-ink-100 pt-1">
            <span className="w-8 text-3xs text-ink-200 text-right shrink-0">
              XOR
            </span>
            <span className="text-3xs tracking-[0.15em] font-medium">{result}</span>
          </div>
        </div>
      </div>

      <div className="border border-ink-100 p-2">
        <div className="text-3xs text-ink-200 mb-2">
          Byte value density (32 buckets of 8)
        </div>
        <div className="flex items-end gap-px" style={{ height: '64px' }}>
          {byteDensity.map((count, i) => {
            const h = maxDensity > 0 ? Math.max(1, Math.round((count / maxDensity) * 64)) : 0;
            return (
              <div
                key={i}
                className="flex-1 bg-ink-500"
                style={{ height: `${h}px` }}
              />
            );
          })}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[5px] text-ink-200">0x00</span>
          <span className="text-[5px] text-ink-200">0x80</span>
          <span className="text-[5px] text-ink-200">0xFF</span>
        </div>
      </div>
    </div>
  );
}
