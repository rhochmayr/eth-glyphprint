# ETH Glyphprint

A typographic fingerprint generator for Ethereum addresses. Paste any valid `0x` address (or generate a random one) and the app produces a detailed, deterministic poster built entirely from the address's cryptographic properties. The same address always yields the same print.

## What's on the poster

Each poster is a two-column layout containing the following sections, all derived purely from the 20 input bytes:

- **Encoding table** -- the address rendered as decimal, octal, binary, base64, and reversed hex
- **Byte index table** -- per-byte breakdown with hex, decimal, binary, octal, and ASCII mappings
- **Hash block** -- SHA-256, SHA-512, double-SHA-256, Keccak-256, and Keccak-of-Keccak digests
- **Bitfield grid** -- a 10x16 binary matrix visualizing every bit in the address
- **Hex frequency chart** -- character frequency distribution across the 16 hex digits
- **Checksum map** -- EIP-55 checksum visualization showing which nibbles are uppercased by the Keccak hash
- **Coordinate points** -- byte pairs plotted as (x, y) coordinates
- **Statistics block** -- Shannon entropy, byte mean, standard deviation, and modulo residues against the first 12 primes
- **Binary waterfall** -- side-by-side binary representations of the address's hash digests
- **Nibble matrix** -- a 16x16 transition frequency grid showing how consecutive hex characters follow one another
- **Hash cascade** -- eight rounds of iterated Keccak-256 hashing
- **XOR fold & byte density** -- the address XORed with itself and an aggregated byte density histogram

The result can be downloaded as a high-resolution 2x PNG.

## How it works

1. The 40-character hex string is parsed into 20 raw bytes.
2. Multiple hash functions (SHA-256, SHA-512, Keccak-256) are applied via the Web Crypto API and `js-sha3`.
3. Statistical, bitwise, and encoding transformations are computed from the raw bytes and their hashes.
4. A React component tree renders each derivation into a styled poster.
5. `html-to-image` converts the DOM node to a downloadable PNG at 2x resolution.

All computation happens client-side. No data leaves the browser.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- `js-sha3` for Keccak-256 hashing
- Web Crypto API for SHA-256 / SHA-512
- `html-to-image` for PNG export.
