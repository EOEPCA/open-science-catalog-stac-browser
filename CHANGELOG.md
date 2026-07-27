# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Renamed SCSS variable `$logo-image-height` to `$logo-height` and CSS variable `--sb-logo-max-height` to `--sb-logo-height`
- Added SCSS variable `$header-background` to allow overriding the gradient background of the header via SCSS as well

### Fixed

- Use the Bootstrap z-index values to avoid overlay issues with the sticky header
- Fix logo size calculation, avoiding the site title wrapping into multiple lines

## [5.0.0-rc.2] - 2026-06-23

### Added
- The Browse menu also loads additional Collections on demand
- Minimal Docker build test and CI workflow.
- Docker: `pathPrefix` can be set at container startup via `SB_pathPrefix` when `DYNAMIC_CONFIG` is enabled (default)

### Changed
- `getBrowserPath` for STAC Objects is not available any longer, use `toBrowserPath` or other URL comparison mechanisms instead.
  Note: This is commonly used in `preprocessSTAC` config option, ensure to update your `config.js`.
- Internal rewrite of how API children are maintained
- Loaded collections are cached and no longer re-fetched when returning to a page
- Header stays at the top by default and has a different design. You can disable the sticky header in the `variables.scss` by setting `$header-position` to `static`.

### Fixed
- Alternate assets are considered as thumbnail and preview candidates if the original asset can't be shown in a browser
- Redirect bare `pathPrefix` URLs to their trailing-slash form in the Docker/nginx image (e.g. `/browser` → `/browser/`)
- Geometries that cross the antimeridian are split into multi-geometries so that footprints render correctly on the map
- Fix global error handling in certain edge-cases
- Improve speed of catalog/collection duplicate detection
- Fix search link detection
- The configured default collection and item sort is also applied to the Browse menu
- More requests that fail due to missing authentication are retried after login (incl. searches and downloads)
- A failed background load no longer switches the page after login
