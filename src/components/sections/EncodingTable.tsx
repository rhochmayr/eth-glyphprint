interface EncodingTableProps {
  bare: string;
  decimal: string;
  octal: string;
  binary: string;
  base64: string;
  reversed: string;
}

function wrapLine(str: string, width: number): string[] {
  const lines: string[] = [];
  for (let i = 0; i < str.length; i += width) {
    lines.push(str.substring(i, i + width));
  }
  return lines;
}

export default function EncodingTable({
  bare,
  decimal,
  octal,
  binary,
  base64,
  reversed,
}: EncodingTableProps) {
  const encodings = [
    { label: 'HEX', value: bare.toUpperCase() },
    { label: 'DECIMAL', value: decimal },
    { label: 'OCTAL', value: octal },
    { label: 'BINARY', value: binary },
    { label: 'BASE64', value: base64 },
    { label: 'REVERSED', value: reversed.toUpperCase() },
  ];

  return (
    <div>
      <div className="text-xs text-ink-300 tracking-[0.2em] uppercase mb-3">
        II. Encodings
      </div>
      <div className="border border-ink-100">
        {encodings.map((enc, i) => (
          <div
            key={enc.label}
            className={`flex ${i < encodings.length - 1 ? 'border-b border-ink-100' : ''}`}
          >
            <div className="w-24 shrink-0 px-2 py-1.5 text-2xs text-ink-300 border-r border-ink-100 flex items-start">
              {enc.label}
            </div>
            <div className="px-2 py-1.5 text-2xs break-all leading-relaxed min-w-0">
              {wrapLine(enc.value, 80).map((line, j) => (
                <div key={j}>{line}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
