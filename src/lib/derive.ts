import { keccak256 } from 'js-sha3';

export interface ByteRow {
  index: number;
  hex: string;
  decimal: number;
  binary: string;
  octal: string;
  ascii: string;
}

export interface HexFrequency {
  char: string;
  count: number;
  bar: string;
}

export interface CoordinatePair {
  index: number;
  x: number;
  y: number;
}

export interface ChecksumNibble {
  char: string;
  isUpper: boolean;
  nibbleValue: number;
}

export interface NibbleTransition {
  from: string;
  to: string;
  count: number;
}

export interface AddressDerivations {
  original: string;
  checksummed: string;
  bare: string;
  decimal: string;
  octal: string;
  binary: string;
  base64: string;
  reversed: string;
  sha256: string;
  sha512: string;
  doubleSha256: string;
  keccak: string;
  keccakOfKeccak: string;
  bytes: ByteRow[];
  hexFrequency: HexFrequency[];
  bitGrid: number[][];
  checksumNibbles: ChecksumNibble[];
  coordinates: CoordinatePair[];
  entropy: number;
  byteMean: number;
  byteStdDev: number;
  moduloResidues: { prime: number; residue: string }[];
  binaryHashes: { label: string; binary: string }[];
  nibbleMatrix: number[][];
  hashCascade: string[];
  xorFold: string;
  byteDensity: number[];
  timestamp: string;
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

function toChecksumAddress(address: string): string {
  const bare = address.toLowerCase().replace('0x', '');
  const hash = keccak256(bare);
  let checksummed = '0x';
  for (let i = 0; i < bare.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      checksummed += bare[i].toUpperCase();
    } else {
      checksummed += bare[i];
    }
  }
  return checksummed;
}

function hexToBigDecimal(hex: string): string {
  let result = BigInt('0x' + hex);
  return result.toString(10);
}

function hexToBigOctal(hex: string): string {
  let result = BigInt('0x' + hex);
  return result.toString(8);
}

function hexToBinary(hex: string): string {
  return hex
    .split('')
    .map((c) => parseInt(c, 16).toString(2).padStart(4, '0'))
    .join('');
}

async function sha256Hex(data: Uint8Array): Promise<string> {
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function sha512Hex(data: Uint8Array): Promise<string> {
  const hash = await crypto.subtle.digest('SHA-512', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function safeAscii(byte: number): string {
  if (byte >= 33 && byte <= 126) return String.fromCharCode(byte);
  if (byte === 32) return 'SP';
  return '\u00B7';
}

function shannonEntropy(bytes: Uint8Array): number {
  const freq = new Map<number, number>();
  for (const b of bytes) {
    freq.set(b, (freq.get(b) || 0) + 1);
  }
  let entropy = 0;
  const len = bytes.length;
  for (const count of freq.values()) {
    const p = count / len;
    if (p > 0) entropy -= p * Math.log2(p);
  }
  return entropy;
}

function bigMod(hexStr: string, mod: number): string {
  const n = BigInt('0x' + hexStr);
  return (n % BigInt(mod)).toString();
}

export async function deriveAll(address: string): Promise<AddressDerivations> {
  const bare = address.toLowerCase().replace('0x', '');
  const checksummed = toChecksumAddress(address);
  const bytes = hexToBytes(bare);

  const binary = hexToBinary(bare);
  const decimal = hexToBigDecimal(bare);
  const octal = hexToBigOctal(bare);
  const base64 = bytesToBase64(bytes);
  const reversed = bare.split('').reverse().join('');

  const sha256Val = await sha256Hex(bytes);
  const sha512Val = await sha512Hex(bytes);
  const doubleSha256 = await sha256Hex(hexToBytes(sha256Val));
  const keccakVal = keccak256(Array.from(bytes));
  const keccakOfKeccak = keccak256(Array.from(hexToBytes(keccakVal)));

  const byteRows: ByteRow[] = Array.from(bytes).map((b, i) => ({
    index: i,
    hex: b.toString(16).padStart(2, '0').toUpperCase(),
    decimal: b,
    binary: b.toString(2).padStart(8, '0'),
    octal: b.toString(8).padStart(3, '0'),
    ascii: safeAscii(b),
  }));

  const hexChars = '0123456789abcdef'.split('');
  const hexFrequency: HexFrequency[] = hexChars.map((c) => {
    const count = bare.split('').filter((ch) => ch === c).length;
    return {
      char: c.toUpperCase(),
      count,
      bar: '\u2588'.repeat(count),
    };
  });

  const bitGrid: number[][] = [];
  for (let r = 0; r < 10; r++) {
    const row: number[] = [];
    for (let c = 0; c < 16; c++) {
      const idx = r * 16 + c;
      row.push(idx < binary.length ? parseInt(binary[idx]) : 0);
    }
    bitGrid.push(row);
  }

  const checksumBare = checksummed.replace('0x', '');
  const keccakHash = keccak256(bare);
  const checksumNibbles: ChecksumNibble[] = checksumBare.split('').map((ch, i) => ({
    char: ch,
    isUpper: ch === ch.toUpperCase() && /[a-fA-F]/.test(ch),
    nibbleValue: parseInt(keccakHash[i], 16),
  }));

  const coordinates: CoordinatePair[] = [];
  for (let i = 0; i < 20; i += 2) {
    coordinates.push({
      index: i / 2,
      x: bytes[i],
      y: bytes[i + 1],
    });
  }

  const byteMean = Array.from(bytes).reduce((s, b) => s + b, 0) / bytes.length;
  const byteVariance =
    Array.from(bytes).reduce((s, b) => s + (b - byteMean) ** 2, 0) / bytes.length;
  const byteStdDev = Math.sqrt(byteVariance);
  const entropy = shannonEntropy(bytes);

  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
  const moduloResidues = primes.map((p) => ({
    prime: p,
    residue: bigMod(bare, p),
  }));

  const binaryHashes = [
    { label: 'SHA-256', binary: hexToBinary(sha256Val) },
    { label: 'SHA-512', binary: hexToBinary(sha512Val) },
    { label: 'KECCAK-256', binary: hexToBinary(keccakVal) },
  ];

  const nibbleMatrix: number[][] = Array.from({ length: 16 }, () =>
    Array.from({ length: 16 }, () => 0)
  );
  for (let i = 0; i < bare.length - 1; i++) {
    const from = parseInt(bare[i], 16);
    const to = parseInt(bare[i + 1], 16);
    nibbleMatrix[from][to]++;
  }

  const hashCascade: string[] = [];
  let cascadeInput = bare;
  for (let i = 0; i < 8; i++) {
    cascadeInput = keccak256(cascadeInput);
    hashCascade.push(cascadeInput);
  }

  const halfLen = bytes.length / 2;
  const xorBytes: number[] = [];
  for (let i = 0; i < halfLen; i++) {
    xorBytes.push(bytes[i] ^ bytes[i + halfLen]);
  }
  const xorFold = xorBytes.map((b) => b.toString(16).padStart(2, '0')).join('');

  const allHashBytes = [
    ...Array.from(bytes),
    ...Array.from(hexToBytes(sha256Val)),
    ...Array.from(hexToBytes(sha512Val)),
    ...Array.from(hexToBytes(keccakVal)),
    ...Array.from(hexToBytes(doubleSha256)),
    ...Array.from(hexToBytes(keccakOfKeccak)),
    ...xorBytes,
  ];
  const byteDensity: number[] = Array.from({ length: 32 }, () => 0);
  for (const b of allHashBytes) {
    const bucket = Math.floor(b / 8);
    byteDensity[bucket]++;
  }

  return {
    original: address,
    checksummed,
    bare,
    decimal,
    octal,
    binary,
    base64,
    reversed,
    sha256: sha256Val,
    sha512: sha512Val,
    doubleSha256,
    keccak: keccakVal,
    keccakOfKeccak,
    bytes: byteRows,
    hexFrequency,
    bitGrid,
    checksumNibbles,
    coordinates,
    entropy,
    byteMean,
    byteStdDev,
    moduloResidues,
    binaryHashes,
    nibbleMatrix,
    hashCascade,
    xorFold,
    byteDensity,
    timestamp: new Date().toISOString(),
  };
}
