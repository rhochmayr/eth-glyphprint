import type { ByteRow } from '../../lib/derive';

interface ByteIndexTableProps {
  bytes: ByteRow[];
}

export default function ByteIndexTable({ bytes }: ByteIndexTableProps) {
  return (
    <div>
      <div className="text-2xs text-ink-300 tracking-[0.2em] uppercase mb-3">
        III. Byte Decomposition
      </div>
      <div className="border border-ink-100">
        <div className="flex border-b border-ink-200 bg-paper-100">
          <div className="w-8 shrink-0 px-1 py-1 text-3xs text-ink-300 text-center border-r border-ink-100">
            #
          </div>
          <div className="w-10 shrink-0 px-1 py-1 text-3xs text-ink-300 text-center border-r border-ink-100">
            HEX
          </div>
          <div className="w-10 shrink-0 px-1 py-1 text-3xs text-ink-300 text-center border-r border-ink-100">
            DEC
          </div>
          <div className="w-10 shrink-0 px-1 py-1 text-3xs text-ink-300 text-center border-r border-ink-100">
            OCT
          </div>
          <div className="flex-1 px-1 py-1 text-3xs text-ink-300 text-center border-r border-ink-100">
            BINARY
          </div>
          <div className="w-8 shrink-0 px-1 py-1 text-3xs text-ink-300 text-center">
            ASC
          </div>
        </div>
        {bytes.map((b, i) => (
          <div
            key={i}
            className={`flex ${i < bytes.length - 1 ? 'border-b border-ink-50' : ''} ${i % 2 === 0 ? 'bg-paper-50' : 'bg-paper-100/50'}`}
          >
            <div className="w-8 shrink-0 px-1 py-0.5 text-3xs text-ink-200 text-center border-r border-ink-50">
              {b.index.toString().padStart(2, '0')}
            </div>
            <div className="w-10 shrink-0 px-1 py-0.5 text-3xs text-center border-r border-ink-50 font-medium">
              {b.hex}
            </div>
            <div className="w-10 shrink-0 px-1 py-0.5 text-3xs text-center border-r border-ink-50">
              {b.decimal.toString().padStart(3, ' ')}
            </div>
            <div className="w-10 shrink-0 px-1 py-0.5 text-3xs text-center border-r border-ink-50 text-ink-300">
              {b.octal}
            </div>
            <div className="flex-1 px-1 py-0.5 text-3xs text-center border-r border-ink-50 tracking-wider">
              {b.binary}
            </div>
            <div className="w-8 shrink-0 px-1 py-0.5 text-3xs text-center text-ink-300">
              {b.ascii}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
