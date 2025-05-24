---
title: Migrating from Cobalt
permalink: /docs/migrating/cobalt-to-rustyll/
---

Migrating from Rust-based Cobalt to Rustyll? This guide will help you transition between these two Rust-powered static site generators, retaining your content and gaining additional features with Rustyll.

## Installation

Since both Cobalt and Rustyll are Rust-based, you likely already have Rust installed. If not:

```sh
# Install Rust if you haven't already
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Rustyll
cargo install rustyll
```

## Automatic Migration

Rustyll provides a built-in migration tool for Cobalt sites:

```sh
rustyll migrate --from cobalt --source ./my-cobalt-site --destination ./my-rustyll-site
```

This command will:
1. Copy all content files
2. Convert Cobalt front matter to Rustyll format
3. Transform Liquid templates with Cobalt specifics to Rustyll's Liquid templates
4. Adjust configuration settings
5. Generate a migration report

## Directory Structure Differences

| Cobalt | Rustyll | Notes |
|--------|---------|-------|
| `posts/` | `_posts/` | Blog posts |
| `_layouts/` | `_layouts/` | Layout templates (same structure) |
| `_includes/` | `_includes/` | Include templates (same structure) |
| `_data/` | `_data/` | Data files (same structure) |
| `_defaults/` | Front matter defaults in `_config.yml` | Default front matter values |
| `assets/` | `assets/` | Static assets (same structure) |
| `_cobalt.yml` | `_config.yml` | Configuration file |
| `build/` | `_site/` | Generated site |

## Content Conversion

Cobalt pages and posts convert to Rustyll format:

```markdown
---
title: My First Post
layout: post
date: 2023-01-15
tags:
  - rust
  - static site
---

This is my first post.
```

This format works identically in Rustyll, though posts may need to be renamed to follow the `YYYY-MM-DD-title.md` format.

## Configuration Conversion

Cobalt's YAML configuration converts to Rustyll's format:

```yaml
# Cobalt (_cobalt.yml)
site:
  title: My Cobalt Site
  description: A static site built with Cobalt
  base_url: https://example.com
  data:
    author:
      name: Author Name
      
posts:
  dir: posts
  default:
    permalink: /blog/{year}/{month}/{slug}/

assets:
  sass:
    style: compressed
```

Converts to:

```yaml
# Rustyll (_config.yml)
title: My Cobalt Site
description: A static site built with Cobalt
url: https://example.com
author:
  name: Author Name

# Posts configuration
permalink: /blog/:year/:month/:slug/

# Sass configuration
sass:
  style: compressed
```

## Template Differences

Both Cobalt and Rustyll use Liquid templates, but with some differences:

| Cobalt (Liquid) | Rustyll (Liquid) |
|-----------------|------------------|
| `{% raw %}{{ page.title }}{% endraw %}` | `{% raw %}{{ page.title }}{% endraw %}` |
| `{% raw %}{% for post in posts %}{% endraw %}` | `{% raw %}{% for post in site.posts %}{% endraw %}` |
| `{% raw %}{% include "header.liquid" %}{% endraw %}` | `{% raw %}{% include header.html %}{% endraw %}` |
| `{% raw %}{{ page.permalink }}{% endraw %}` | `{% raw %}{{ page.url }}{% endraw %}` |
| `{% raw %}{{ post.slug }}{% endraw %}` | `{% raw %}{{ post.slug }}{% endraw %}` or `{% raw %}{{ post.path | slugify }}{% endraw %}` |

## Front Matter Defaults

Cobalt's default front matter in `_defaults/` converts to Rustyll's front matter defaults:

```yaml
# _defaults/pages.md in Cobalt
---
layout: page
---
```

Converts to:

```yaml
# Rustyll (_config.yml)
defaults:
  - scope:
      path: ""
      type: "pages"
    values:
      layout: "page"
```

## Syntax Highlighting

Both Cobalt and Rustyll use syntax highlighters, with slightly different configuration:

```yaml
# Cobalt (_cobalt.yml)
syntax_highlight:
  theme: "base16-ocean.dark"
```

```yaml
# Rustyll (_config.yml)
highlight:
  theme: "base16-ocean-dark"
  line_numbers: true
```

## Asset Handling

Both generators have similar asset handling capabilities:

| Cobalt | Rustyll | Notes |
|--------|---------|-------|
| SASS/SCSS processing | Built-in SASS processing | Similar functionality |
| File copying | Asset copying | Automatic handling |
| Syntax highlighting | Syntax highlighting | Both use fast engines |

## Performance Considerations

Both Cobalt and Rustyll are Rust-based and focus on performance, but Rustyll offers enhanced options:

```yaml
# Rustyll performance options
threads: auto  # Use all available CPU cores
incremental: true  # Enable incremental builds
cache:
  enabled: true
  strategy: aggressive
```

## Extended Features in Rustyll

Rustyll builds on Cobalt's foundation with additional features:

1. **Collections**: More flexible content organization beyond just posts and pages
2. **Live reload**: Automatic browser refresh during development
3. **Incremental builds**: Only rebuild changed files
4. **Plugin ecosystem**: Larger selection of plugins and extensions
5. **Multilingual support**: Better handling of multiple languages

## Troubleshooting Common Issues

### Liquid Template Differences

If you encounter template rendering issues:

1. Check for Cobalt-specific Liquid syntax
2. Verify page variable access (particularly with collections)
3. Update include statements to use `.html` extension

### Front Matter Variables

Some front matter variables work differently:

1. Cobalt uses `permalink` for custom URLs, Rustyll uses both `permalink` and site-wide permalink patterns
2. Rustyll uses `date` in posts front matter and filenames
3. Cobalt's custom data fields work the same in Rustyll

### Sass Import Paths

If you use Sass imports:

1. Check the `_sass` directory structure
2. Update import statements if needed
3. Configure Sass import paths in `_config.yml`

## Migration Checklist

- [ ] Install Rustyll
- [ ] Back up your Cobalt site
- [ ] Run the migration command
- [ ] Review content files and front matter
- [ ] Check templates and includes
- [ ] Verify asset processing (especially Sass)
- [ ] Configure front matter defaults
- [ ] Test build with `rustyll build`
- [ ] Preview site with `rustyll serve`
- [ ] Check for template rendering issues
- [ ] Optimize performance settings
- [ ] Update deployment workflows

## Need Help?

- [Rustyll Forum](https://forum.rustyll.com)
- [Rustyll Discord](https://discord.gg/rustyll)
- [GitHub Issues](https://github.com/rustyll/rustyll/issues) 