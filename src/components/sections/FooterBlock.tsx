interface FooterBlockProps {
  address: string;
  timestamp: string;
}

export default function FooterBlock({ address, timestamp }: FooterBlockProps) {
  return (
    <div className="col-span-full border-t border-ink-200 pt-4 mt-4">
      <div className="flex flex-wrap justify-between gap-4 text-3xs text-ink-200">
        <div className="space-y-0.5">
          <div>ETH GLYPHPRINT</div>
          <div>A deterministic typographic derivation</div>
          <div>of Ethereum address {address.slice(0, 10)}...{address.slice(-8)}</div>
        </div>
        <div className="space-y-0.5 text-right">
          <div>Generated {timestamp.replace('T', ' ').split('.')[0]} UTC</div>
          <div>SHA-256 / SHA-512 / KECCAK-256</div>
          <div>Every element is derived solely from the input address</div>
        </div>
      </div>
      <div className="mt-4 border-t border-ink-100 pt-2 text-center">
        <span className="text-3xs text-ink-100 tracking-[0.5em] uppercase">
          This artwork is unique and unrepeatable for any other address
        </span>
      </div>
    </div>
  );
}
