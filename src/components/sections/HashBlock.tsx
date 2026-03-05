interface HashBlockProps {
  sha256: string;
  sha512: string;
  doubleSha256: string;
  keccak: string;
  keccakOfKeccak: string;
}

function formatHash(hash: string): string[] {
  const groups: string[] = [];
  for (let i = 0; i < hash.length; i += 8) {
    groups.push(hash.substring(i, i + 8).toUpperCase());
  }
  return groups;
}

export default function HashBlock({
  sha256,
  sha512,
  doubleSha256,
  keccak,
  keccakOfKeccak,
}: HashBlockProps) {
  const hashes = [
    { label: 'SHA-256', value: sha256, bits: 256 },
    { label: 'SHA-256\u00B2', value: doubleSha256, bits: 256 },
    { label: 'SHA-512', value: sha512, bits: 512 },
    { label: 'KECCAK-256', value: keccak, bits: 256 },
    { label: 'KECCAK-256\u00B2', value: keccakOfKeccak, bits: 256 },
  ];

  return (
    <div>
      <div className="text-xs text-ink-300 tracking-[0.2em] uppercase mb-3">
        IV. Cryptographic Hashes
      </div>
      <div className="space-y-3">
        {hashes.map((h) => (
          <div key={h.label}>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-2xs text-ink-300 tracking-wider">{h.label}</span>
              <span className="text-2xs text-ink-200">{h.bits} bit</span>
            </div>
            <div className="border border-ink-100 px-2 py-1.5">
              <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                {formatHash(h.value).map((group, i) => (
                  <span key={i} className="text-2xs tracking-wider">
                    {group}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
