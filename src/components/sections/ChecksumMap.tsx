import type { ChecksumNibble } from '../../lib/derive';

interface ChecksumMapProps {
  checksumNibbles: ChecksumNibble[];
}

export default function ChecksumMap({ checksumNibbles }: ChecksumMapProps) {
  return (
    <div>
      <div className="text-2xs text-ink-300 tracking-[0.2em] uppercase mb-3">
        VII. EIP-55 Checksum Map
      </div>
      <div className="border border-ink-100 p-2">
        <div className="grid grid-cols-[repeat(40,1fr)] text-3xs text-ink-200 mb-0.5">
          {checksumNibbles.map((_, i) => (
            <span key={i} className="text-center truncate">
              {i.toString().padStart(2, '0')}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-[repeat(40,1fr)]">
          {checksumNibbles.map((n, i) => (
            <span
              key={i}
              className={`text-center text-xs font-medium truncate ${
                n.isUpper ? 'text-ink-500' : 'text-ink-200'
              }`}
            >
              {n.char}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-[repeat(40,1fr)] mt-0.5">
          {checksumNibbles.map((n, i) => (
            <span
              key={i}
              className={`text-center text-3xs truncate ${
                n.isUpper ? 'text-ink-400' : 'text-ink-100'
              }`}
            >
              {n.nibbleValue.toString(16).toUpperCase()}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-[repeat(40,1fr)] mt-0.5">
          {checksumNibbles.map((n, i) => (
            <span
              key={i}
              className={`text-center text-3xs truncate ${
                n.isUpper ? 'text-ink-400' : 'text-ink-100'
              }`}
            >
              {n.nibbleValue >= 8 ? '\u2191' : '\u2193'}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
