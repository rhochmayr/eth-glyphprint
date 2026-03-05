interface BitfieldGridProps {
  bitGrid: number[][];
  binary: string;
}

export default function BitfieldGrid({ bitGrid, binary }: BitfieldGridProps) {
  return (
    <div>
      <div className="text-2xs text-ink-300 tracking-[0.2em] uppercase mb-3">
        V. Bitfield Matrix
      </div>
      <div className="border border-ink-100 p-2">
        <div className="flex justify-between mb-2">
          <span className="text-3xs text-ink-200">10 x 16 = 160 bits</span>
          <span className="text-3xs text-ink-200">
            \u03A3 = {binary.split('').filter((b) => b === '1').length} ones
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex text-3xs text-ink-200 mb-0.5">
            <span className="w-4"></span>
            {Array.from({ length: 16 }, (_, i) => (
              <span key={i} className="w-4 text-center">
                {i.toString(16).toUpperCase()}
              </span>
            ))}
          </div>
          {bitGrid.map((row, r) => (
            <div key={r} className="flex">
              <span className="w-4 text-3xs text-ink-200 text-right pr-1">
                {r.toString(16).toUpperCase()}
              </span>
              {row.map((bit, c) => (
                <span
                  key={c}
                  className={`w-4 h-4 text-center text-3xs leading-4 ${
                    bit === 1
                      ? 'bg-ink-500 text-paper-50'
                      : 'bg-paper-100 text-ink-200'
                  }`}
                >
                  {bit}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
