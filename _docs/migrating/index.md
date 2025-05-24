---
title: Migrating to Rustyll
permalink: /docs/migrating/
---

Rustyll makes it easy to migrate from other static site generators. Use the `rustyll migrate` command to automate the conversion process.

## Available Migrators

Rustyll can migrate from these static site generators:

- [Jekyll](/docs/migrating/jekyll-to-rustyll/) - Ruby-based static site generator
- [Hugo](/docs/migrating/hugo-to-rustyll/) - Go-based static site generator
- [Zola](/docs/migrating/zola-to-rustyll/) - Rust-based static site generator
- [Eleventy](/docs/migrating/eleventy-to-rustyll/) - JavaScript-based static site generator
- [Gatsby](/docs/migrating/gatsby-to-rustyll/) - React-based static site framework
- [Docsy](/docs/migrating/docsy-to-rustyll/) - Hugo documentation theme
- [mdBook](/docs/migrating/mdbook-to-rustyll/) - Rust-based documentation tool
- [MkDocs](/docs/migrating/mkdocs-to-rustyll/) - Python-based documentation generator
- [GitBook](/docs/migrating/gitbook-to-rustyll/) - JavaScript-based documentation platform
- [Slate](/docs/migrating/slate-to-rustyll/) - API documentation generator
- [Pelican](/docs/migrating/pelican-to-rustyll/) - Python-based static site generator
- [Nanoc](/docs/migrating/nanoc-to-rustyll/) - Ruby-based static site generator
- [Middleman](/docs/migrating/middleman-to-rustyll/) - Ruby-based static site generator
- [Assemble](/docs/migrating/assemble-to-rustyll/) - Node.js static site generator
- [Bridgetown](/docs/migrating/bridgetown-to-rustyll/) - Ruby-based static site generator
- [Cobalt](/docs/migrating/cobalt-to-rustyll/) - Rust-based static site generator
- [Fresh](/docs/migrating/fresh-to-rustyll/) - Deno-based web framework
- [Harp](/docs/migrating/harp-to-rustyll/) - Node.js static site generator
- [Jigsaw](/docs/migrating/jigsaw-to-rustyll/) - PHP-based static site generator
- [Metalsmith](/docs/migrating/metalsmith-to-rustyll/) - Node.js static site generator
- [Nikola](/docs/migrating/nikola-to-rustyll/) - Python-based static site generator
- [Octopress](/docs/migrating/octopress-to-rustyll/) - Jekyll-based blogging framework

## Using the Migration Command

The basic syntax for migrating is:

```bash
rustyll migrate --from <generator> --source /path/to/source --destination /path/to/destination
```

For example, to migrate from Jekyll:

```bash
rustyll migrate --from jekyll --source ./my-jekyll-site --destination ./my-rustyll-site
```

Run `rustyll migrate --help` for all available options.

## Common Migration Process

While each generator has its own specific migration steps (detailed in the individual guides), the general process is:

1. Install Rustyll: `cargo install rustyll`
2. Back up your existing site
3. Run the migration command
4. Review the migration report
5. Test the migrated site
6. Fix any issues (consult the specific migration guide)
7. Deploy your new Rustyll site

## Migration Success Rate

Migration success depends on how closely your source site follows standard patterns. Sites with:

- Standard directory structures
- Common templating patterns
- Typical content formats

...will migrate more smoothly than highly customized sites with custom plugins or non-standard configurations.