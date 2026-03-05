interface BitfieldGridProps {
  bitGrid: number[][];
  binary: string;
}

export default function BitfieldGrid({ bitGrid, binary }: BitfieldGridProps) {
  return (
    <div>
      <div className="text-xs text-ink-300 tracking-[0.2em] uppercase mb-3">
        V. Bitfield Matrix
      </div>
      <div className="border border-ink-100 p-3">
        <div className="flex justify-between mb-2">
          <span className="text-2xs text-ink-200">10 x 16 = 160 bits</span>
          <span className="text-2xs text-ink-200">
            {'\u03A3'} = {binary.split('').filter((b) => b === '1').length} ones
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex text-2xs text-ink-200 mb-0.5">
            <span className="w-5"></span>
            {Array.from({ length: 16 }, (_, i) => (
              <span key={i} className="w-5 text-center">
                {i.toString(16).toUpperCase()}
              </span>
            ))}
          </div>
          {bitGrid.map((row, r) => (
            <div key={r} className="flex">
              <span className="w-5 text-2xs text-ink-200 text-right pr-1">
                {r.toString(16).toUpperCase()}
              </span>
              {row.map((bit, c) => (
                <span
                  key={c}
                  className={`w-5 h-5 text-center text-2xs leading-5 ${
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
