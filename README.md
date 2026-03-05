# ETH Glyphprint

A typographic fingerprint generator for Ethereum addresses. Paste any valid `0x` address (or generate a random one) and the app produces a detailed, deterministic poster built entirely from the address's cryptographic properties -- hashes, byte distributions, bit grids, frequency charts, coordinate plots, and more.

Every element on the poster is derived from the input address, so the same address always yields the same print. The result can be downloaded as a high-resolution PNG.

## Stack

- React + TypeScript
- Vite
- Tailwind CSS
- `js-sha3` for Keccak hashing
- `html-to-image` for PNG export
