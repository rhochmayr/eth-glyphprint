interface NibbleMatrixProps {
  nibbleMatrix: number[][];
}

export default function NibbleMatrix({ nibbleMatrix }: NibbleMatrixProps) {
  const hexChars = '0123456789ABCDEF'.split('');
  const maxVal = Math.max(...nibbleMatrix.flat());

  return (
    <div>
      <div className="text-2xs text-ink-300 tracking-[0.2em] uppercase mb-3">
        XI. Nibble Transition Matrix
      </div>
      <div className="border border-ink-100 p-2">
        <div className="text-3xs text-ink-200 mb-1.5">
          Row = from nibble, Col = to nibble, Cell = transition count
        </div>
        <div className="overflow-x-auto">
          <div className="inline-block">
            <div className="flex">
              <span className="w-5 h-5 shrink-0" />
              {hexChars.map((c) => (
                <span
                  key={c}
                  className="w-5 h-5 shrink-0 text-3xs text-ink-300 text-center leading-5"
                >
                  {c}
                </span>
              ))}
            </div>
            {nibbleMatrix.map((row, r) => (
              <div key={r} className="flex">
                <span className="w-5 h-5 shrink-0 text-3xs text-ink-300 text-center leading-5">
                  {hexChars[r]}
                </span>
                {row.map((val, c) => {
                  const intensity = maxVal > 0 ? val / maxVal : 0;
                  return (
                    <span
                      key={c}
                      className="w-5 h-5 shrink-0 text-center leading-5 text-[5px]"
                      style={{
                        backgroundColor:
                          val > 0
                            ? `rgba(26,26,26,${0.1 + intensity * 0.8})`
                            : 'transparent',
                        color: intensity > 0.5 ? '#faf9f6' : '#1a1a1a',
                      }}
                    >
                      {val > 0 ? val : '\u00B7'}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
