# nestjs-extras-w

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Extra utilities for [NestJS](https://nestjs.com): HTTP listen with port fallback and graceful shutdown, microservice setup with env-expanded options, CORS and Swagger helpers, and BigInt/Decimal serialization fixes.

## Usage

- **`withNestjsListen`** — Start the app on a port (from env or default 3000), auto-try next port if in use, handle SIGINT and log microservice status.
- **`withNestjsMicroservice`** — Connect a microservice with options parsed through `dotenv-expand`.
- **`withNestjsCors`** — Enable CORS with common defaults (methods, headers, credentials).
- **`withSwagger`** — Configure Swagger UI and JSON doc (e.g. `/swagger/website`, `/swagger/json`).
- **`withDecimalRepair`** — Patch BigInt and Decimal `toJSON`/`toString` for correct API serialization.

Re-exported **`context`** holds app instance, port, computed URL, and microservice/swagger config for use across these helpers.

## Note for Developers

This starter recommands using [npm Trusted Publisher](https://github.com/e18e/ecosystem-issues/issues/201), where the release is done on CI to ensure the security of the packages.

To do so, you need to run `pnpm publish` manually for the very first time to create the package on npm, and then go to `https://www.npmjs.com/package/<your-package-name>/access` to set the connection to your GitHub repo.

Then for the future releases, you can run `pnpm run release` to do the release and the GitHub Actions will take care of the release process.

## License

[MIT](./LICENSE) License © [hairyf](https://github.com/hairyf)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nestjs-extras-w?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/nestjs-extras-w
[npm-downloads-src]: https://img.shields.io/npm/dm/nestjs-extras-w?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/nestjs-extras-w
[bundle-src]: https://img.shields.io/bundlephobia/minzip/nestjs-extras-w?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=nestjs-extras-w
[license-src]: https://img.shields.io/github/license/hairyf/nestjs-extras-w.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/hairyf/nestjs-extras-w/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/nestjs-extras-w
