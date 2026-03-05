import type { CoordinatePair } from '../../lib/derive';

interface CoordinatePointsProps {
  coordinates: CoordinatePair[];
}

export default function CoordinatePoints({ coordinates }: CoordinatePointsProps) {
  return (
    <div>
      <div className="text-xs text-ink-300 tracking-[0.2em] uppercase mb-3">
        VIII. Derived Coordinates
      </div>
      <div className="border border-ink-100">
        <div className="flex border-b border-ink-200 bg-paper-100">
          <div className="w-10 px-1 py-1 text-2xs text-ink-300 text-center border-r border-ink-100">
            PT
          </div>
          <div className="w-14 px-1 py-1 text-2xs text-ink-300 text-center border-r border-ink-100">
            X
          </div>
          <div className="w-14 px-1 py-1 text-2xs text-ink-300 text-center border-r border-ink-100">
            Y
          </div>
          <div className="flex-1 px-1 py-1 text-2xs text-ink-300 text-center">
            (X, Y) NORMALIZED
          </div>
        </div>
        {coordinates.map((coord, i) => (
          <div
            key={i}
            className={`flex ${i < coordinates.length - 1 ? 'border-b border-ink-50' : ''}`}
          >
            <div className="w-10 px-1 py-0.5 text-2xs text-ink-200 text-center border-r border-ink-50">
              P{coord.index}
            </div>
            <div className="w-14 px-1 py-0.5 text-2xs text-center border-r border-ink-50">
              {coord.x.toString().padStart(3, ' ')}
            </div>
            <div className="w-14 px-1 py-0.5 text-2xs text-center border-r border-ink-50">
              {coord.y.toString().padStart(3, ' ')}
            </div>
            <div className="flex-1 px-1 py-0.5 text-2xs text-center text-ink-300">
              ({(coord.x / 255).toFixed(4)}, {(coord.y / 255).toFixed(4)})
            </div>
          </div>
        ))}
      </div>

      <div className="border border-ink-100 mt-3 p-3">
        <div className="text-2xs text-ink-200 mb-1">COORDINATE PLOT (256 x 256)</div>
        <div className="relative w-full bg-paper-100 border border-ink-50" style={{ height: '340px' }}>
          {coordinates.map((coord, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${(coord.x / 255) * 100}%`,
                top: `${(coord.y / 255) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="w-1.5 h-1.5 bg-ink-500 rounded-full" />
              <span className="absolute top-2 left-2 text-2xs text-ink-300">
                {i}
              </span>
            </div>
          ))}
          <div className="absolute inset-0 border border-ink-50" style={{
            backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)',
            backgroundSize: '25% 25%',
          }} />
        </div>
      </div>
    </div>
  );
}
