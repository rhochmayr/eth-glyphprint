import { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { ArrowLeft, Download, Shuffle } from 'lucide-react';
import { deriveAll, type AddressDerivations } from './lib/derive';
import Poster from './components/Poster';

function isValidEthAddress(addr: string): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test(addr);
}

function randomAddress(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(20));
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return '0x' + hex;
}

export default function App() {
  const [input, setInput] = useState('');
  const [data, setData] = useState<AddressDerivations | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const posterRef = useRef<HTMLDivElement>(null);

  const generate = useCallback(async (address: string) => {
    if (!isValidEthAddress(address)) {
      setError('Enter a valid Ethereum address (0x + 40 hex characters)');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const derivations = await deriveAll(address);
      setData(derivations);
    } catch {
      setError('Failed to generate derivations');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate(input.trim());
  };

  const handleRandom = () => {
    const addr = randomAddress();
    setInput(addr);
    generate(addr);
  };

  const handleDownload = async () => {
    if (!posterRef.current) return;
    try {
      const source = posterRef.current;

      const container = document.createElement('div');
      container.style.cssText =
        'position:fixed;left:-20000px;top:0;width:1800px;overflow:visible;';
      document.body.appendChild(container);

      const clone = source.cloneNode(true) as HTMLElement;
      clone.style.margin = '0';
      clone.style.width = '1800px';
      clone.style.minWidth = '1800px';
      clone.style.height = '2700px';
      container.appendChild(clone);

      await new Promise((r) => requestAnimationFrame(r));

      const dataUrl = await toPng(clone, {
        pixelRatio: 2,
        backgroundColor: '#faf9f6',
        width: 1800,
        height: 2700,
        fontEmbedCSS: '',
        cacheBust: true,
      });

      document.body.removeChild(container);

      const link = document.createElement('a');
      link.download = `glyphprint_${data?.bare.slice(0, 8)}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed', err);
    }
  };

  const handleBack = () => {
    setData(null);
    setError('');
  };

  if (data) {
    return (
      <div className="min-h-screen bg-paper-100">
        <div className="sticky top-0 z-10 bg-paper-100/90 backdrop-blur-sm border-b border-ink-100">
          <div className="max-w-[1800px] mx-auto px-4 py-3 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-xs text-ink-300 hover:text-ink-500 transition-colors"
            >
              <ArrowLeft size={14} />
              Back
            </button>
            <span className="text-2xs text-ink-200 tracking-[0.2em] uppercase hidden sm:block">
              {data.original}
            </span>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-1.5 text-xs border border-ink-200 text-ink-400 hover:bg-ink-500 hover:text-paper-50 transition-colors"
            >
              <Download size={14} />
              Download PNG
            </button>
          </div>
        </div>
        <div className="py-8 overflow-x-auto">
          <Poster ref={posterRef} data={data} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-12">
          <h1 className="text-sm tracking-[0.4em] uppercase text-ink-400 mb-2">
            ETH Glyphprint
          </h1>
          <div className="w-16 h-px bg-ink-200 mx-auto mb-4" />
          <p className="text-xs text-ink-300 leading-relaxed max-w-sm mx-auto">
            Enter an Ethereum address to generate a unique typographic
            print derived entirely from its cryptographic properties.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-2xs text-ink-300 tracking-[0.2em] uppercase mb-2">
              Ethereum Address
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError('');
              }}
              placeholder="0x..."
              spellCheck={false}
              autoComplete="off"
              className="w-full bg-transparent border border-ink-200 px-3 py-2.5 text-sm font-mono tracking-wider placeholder:text-ink-100 focus:outline-none focus:border-ink-400 transition-colors"
            />
            {error && (
              <p className="text-2xs text-red-600 mt-1.5">{error}</p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 text-xs tracking-[0.2em] uppercase border border-ink-500 bg-ink-500 text-paper-50 hover:bg-ink-600 disabled:opacity-40 transition-colors"
            >
              {loading ? 'Generating...' : 'Generate'}
            </button>
            <button
              type="button"
              onClick={handleRandom}
              disabled={loading}
              className="px-3 py-2.5 border border-ink-200 text-ink-300 hover:border-ink-400 hover:text-ink-500 disabled:opacity-40 transition-colors"
              title="Random address"
            >
              <Shuffle size={16} />
            </button>
          </div>
        </form>

        <div className="mt-16 text-center">
          <p className="text-3xs text-ink-100 tracking-wider">
            Every element is deterministically derived from the input address.
            <br />
            The same address will always produce the same print.
          </p>
        </div>
      </div>
    </div>
  );
}
