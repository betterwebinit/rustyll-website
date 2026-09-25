# Rustyll website

Source for [rustyll.better-web.org](https://rustyll.better-web.org). The site is built with Jekyll and uses compiled Tailwind CSS plus the authored styles in `assets/css/site.css`.

## Run locally

Install Node.js and Ruby/Bundler, then run:

```sh
npm ci
BUNDLE_PATH=vendor/bundle bundle install
npm run dev
```

Open [http://127.0.0.1:4001](http://127.0.0.1:4001). Port 4001 avoids collisions with other local sites. The Jekyll server watches source files; rerun `npm run build:css` after changing Tailwind classes.

## Verify changes

```sh
npm run build
npm run check:links
npm test
```

The browser tests use a local server and Google Chrome. They check all published HTML pages at mobile, tablet and desktop widths, plus search, menus, terminal, tutorial progress and representative accessibility checks.

## Design and content

See [the design system](maintenance/design-system.md) for tokens and page patterns. The public product version in `_config.yml` should match the [latest published Rustyll release](https://github.com/betterwebinit/rustyll/releases); update it and release news together. See [the editorial audit](maintenance/editorial-audit.md) before republishing historical claims, case studies or talks.
