interface HashCascadeProps {
  hashCascade: string[];
  keccak: string;
}

export default function HashCascade({ hashCascade, keccak }: HashCascadeProps) {
  return (
    <div>
      <div className="text-xs text-ink-300 tracking-[0.2em] uppercase mb-3">
        XII. Keccak Hash Cascade
      </div>
      <div className="border border-ink-100 p-3">
        <div className="text-2xs text-ink-200 mb-2">
          Each row = KECCAK-256 of the previous row
        </div>
        <div className="space-y-px">
          <div className="flex items-baseline gap-2">
            <span className="w-5 text-2xs text-ink-200 text-right shrink-0">0</span>
            <span className="text-2xs tracking-wider font-medium break-all">
              {keccak.toUpperCase().match(/.{1,8}/g)?.join(' ')}
            </span>
          </div>
          {hashCascade.map((hash, i) => {
            const opacity = 1 - i * 0.08;
            return (
              <div key={i} className="flex items-baseline gap-2">
                <span className="w-5 text-2xs text-ink-200 text-right shrink-0">
                  {i + 1}
                </span>
                <span
                  className="text-2xs tracking-wider break-all"
                  style={{ opacity }}
                >
                  {hash.toUpperCase().match(/.{1,8}/g)?.join(' ')}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
