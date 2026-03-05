import { forwardRef } from 'react';
import type { AddressDerivations } from '../lib/derive';
import HeaderBlock from './sections/HeaderBlock';
import EncodingTable from './sections/EncodingTable';
import ByteIndexTable from './sections/ByteIndexTable';
import HashBlock from './sections/HashBlock';
import BitfieldGrid from './sections/BitfieldGrid';
import FrequencyChart from './sections/FrequencyChart';
import ChecksumMap from './sections/ChecksumMap';
import CoordinatePoints from './sections/CoordinatePoints';
import StatsBlock from './sections/StatsBlock';
import BinaryWaterfall from './sections/BinaryWaterfall';
import NibbleMatrix from './sections/NibbleMatrix';
import HashCascade from './sections/HashCascade';
import XorFoldBlock from './sections/XorFoldBlock';
import FooterBlock from './sections/FooterBlock';

interface PosterProps {
  data: AddressDerivations;
}

const Poster = forwardRef<HTMLDivElement, PosterProps>(({ data }, ref) => {
  return (
    <div
      ref={ref}
      className="bg-paper-50 mx-auto poster-root"
      style={{ fontFeatureSettings: '"tnum" 1, "zero" 1', width: '1200px', minWidth: '1200px' }}
    >
      <div className="p-14">
        <HeaderBlock
          address={data.original}
          checksummed={data.checksummed}
          timestamp={data.timestamp}
        />

        <div className="grid grid-cols-2 gap-10 mt-6">
          <div className="space-y-8">
            <EncodingTable
              bare={data.bare}
              decimal={data.decimal}
              octal={data.octal}
              binary={data.binary}
              base64={data.base64}
              reversed={data.reversed}
            />

            <ByteIndexTable bytes={data.bytes} />

            <BinaryWaterfall
              binaryHashes={data.binaryHashes}
              addressBinary={data.binary}
            />

            <NibbleMatrix nibbleMatrix={data.nibbleMatrix} />

            <HashCascade hashCascade={data.hashCascade} keccak={data.keccak} />

            <XorFoldBlock
              bare={data.bare}
              xorFold={data.xorFold}
              byteDensity={data.byteDensity}
            />
          </div>

          <div className="space-y-8">
            <HashBlock
              sha256={data.sha256}
              sha512={data.sha512}
              doubleSha256={data.doubleSha256}
              keccak={data.keccak}
              keccakOfKeccak={data.keccakOfKeccak}
            />

            <BitfieldGrid bitGrid={data.bitGrid} binary={data.binary} />

            <FrequencyChart hexFrequency={data.hexFrequency} />

            <ChecksumMap checksumNibbles={data.checksumNibbles} />

            <CoordinatePoints coordinates={data.coordinates} />

            <StatsBlock
              entropy={data.entropy}
              byteMean={data.byteMean}
              byteStdDev={data.byteStdDev}
              moduloResidues={data.moduloResidues}
            />
          </div>
        </div>

        <FooterBlock address={data.original} timestamp={data.timestamp} />
      </div>
    </div>
  );
});

Poster.displayName = 'Poster';

export default Poster;
