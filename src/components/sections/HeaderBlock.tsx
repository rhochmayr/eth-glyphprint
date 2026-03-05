interface HeaderBlockProps {
  address: string;
  checksummed: string;
  timestamp: string;
}

export default function HeaderBlock({ address, checksummed, timestamp }: HeaderBlockProps) {
  const chars = checksummed.replace('0x', '').split('');

  return (
    <div className="col-span-full border-b border-ink-200 pb-8 mb-2">
      <div className="flex items-baseline justify-between mb-6">
        <span className="text-2xs tracking-[0.3em] uppercase text-ink-300">
          ETH Glyphprint
        </span>
        <span className="text-2xs text-ink-200">
          {timestamp.split('T')[0]}
        </span>
      </div>

      <div className="mb-6">
        <div className="text-2xs text-ink-300 tracking-[0.2em] uppercase mb-3">
          I. Address
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-xs text-ink-300">0x</span>
          <div className="flex flex-wrap">
            {chars.map((c, i) => (
              <span
                key={i}
                className="text-xl md:text-2xl lg:text-3xl font-light tracking-[0.15em] leading-tight"
                style={{ opacity: 0.5 + (parseInt(c, 16) / 15) * 0.5 }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-8 gap-y-1 text-3xs text-ink-300">
        <span>CHECKSUM: {checksummed}</span>
        <span>LENGTH: {address.length} chars</span>
        <span>BYTES: 20</span>
        <span>BITS: 160</span>
      </div>
    </div>
  );
}
