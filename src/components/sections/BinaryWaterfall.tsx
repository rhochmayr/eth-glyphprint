interface BinaryWaterfallProps {
  binaryHashes: { label: string; binary: string }[];
  addressBinary: string;
}

function formatBinaryRows(binary: string, width: number): string[] {
  const rows: string[] = [];
  for (let i = 0; i < binary.length; i += width) {
    rows.push(binary.substring(i, i + width));
  }
  return rows;
}

export default function BinaryWaterfall({ binaryHashes, addressBinary }: BinaryWaterfallProps) {
  const allBinaries = [
    { label: 'ADDRESS', binary: addressBinary },
    ...binaryHashes,
  ];

  const rowWidth = 48;

  return (
    <div>
      <div className="text-xs text-ink-300 tracking-[0.2em] uppercase mb-3">
        X. Binary Waterfall
      </div>
      <div className="border border-ink-100 p-3 space-y-3">
        {allBinaries.map((item) => (
          <div key={item.label}>
            <div className="text-2xs text-ink-200 mb-0.5">{item.label}</div>
            <div className="font-mono leading-none">
              {formatBinaryRows(item.binary, rowWidth).map((row, i) => (
                <div key={i} className="flex">
                  {row.split('').map((bit, j) => (
                    <span
                      key={j}
                      className={`inline-block w-[8px] h-[10px] text-center text-3xs leading-[10px] ${
                        bit === '1' ? 'bg-ink-500 text-paper-50' : 'text-ink-100'
                      }`}
                    >
                      {bit}
                    </span>
                  ))}
                  <span className="text-2xs text-ink-100 ml-1">
                    {(i * rowWidth).toString().padStart(4, '0')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
