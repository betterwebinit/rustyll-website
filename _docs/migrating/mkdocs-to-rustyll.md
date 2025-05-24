---
title: Migrating from MkDocs
permalink: /docs/migrating/mkdocs-to-rustyll/
---

Migrating from Python-based MkDocs to Rustyll? This guide will help you transition your documentation site while preserving content and structure, all with Rustyll's superior performance.

## Installation

First, install Rustyll using Cargo (Rust's package manager):

```sh
# Install Rust if you haven't already
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Rustyll
cargo install rustyll
```

## Automatic Migration

Rustyll provides a built-in migration tool for MkDocs sites:

```sh
rustyll migrate --from mkdocs --source ./my-mkdocs-site --destination ./my-rustyll-site
```

This command will:
1. Copy all documentation files
2. Convert MkDocs-specific front matter to Rustyll format
3. Transform MkDocs theme templates to Liquid templates
4. Convert mkdocs.yml to Rustyll's _config.yml
5. Generate a migration report

## Directory Structure Differences

| MkDocs | Rustyll | Notes |
|--------|---------|-------|
| `docs/` | Root directory | Content goes in the root folder in Rustyll |
| `mkdocs.yml` | `_config.yml` | Configuration file (YAML format) |
| Custom theme in `theme/` | `_layouts/` and `_includes/` | Theme customizations |
| `docs/assets/` | `assets/` | Static assets |

## Configuration Conversion

MkDocs YAML configuration converts to Rustyll format:

```yaml
# MkDocs (mkdocs.yml)
site_name: My Documentation
site_url: https://example.com
repo_url: https://github.com/me/myproject
theme: material

nav:
  - Home: index.md
  - Getting Started: getting-started.md
  - User Guide:
    - Installation: guide/installation.md
    - Configuration: guide/configuration.md
```

Converts to:

```yaml
# Rustyll (_config.yml)
title: My Documentation
url: https://example.com
repository: https://github.com/me/myproject
theme: docs-material

# Navigation structure
```

The navigation structure is converted to:

```yaml
# _data/navigation.yml
docs:
  - title: Home
    url: /
  - title: Getting Started
    url: /getting-started/
  - title: User Guide
    children:
      - title: Installation
        url: /guide/installation/
      - title: Configuration
        url: /guide/configuration/
```

## Theme Conversion

MkDocs themes are converted to Rustyll themes:

| MkDocs Theme | Rustyll Equivalent |
|--------------|-------------------|
| Material | rustyll-docs-material |
| ReadTheDocs | rustyll-docs-readthedocs |
| MkDocs (default) | rustyll-docs-default |
| Custom | Converted to Liquid templates |

## Front Matter Differences

MkDocs pages typically have minimal front matter, but Rustyll may add more:

```yaml
# MkDocs (often minimal/none)
---
title: Getting Started
---

# Rustyll
---
title: Getting Started
permalink: /getting-started/
layout: docs
---
```

## Markdown Extensions

MkDocs markdown extensions have Rustyll equivalents:

| MkDocs Extension | Rustyll Equivalent |
|------------------|-------------------|
| Admonitions | Alert includes |
| CodeHilite | Syntax highlighting |
| TOC | Table of contents tag |
| Footnotes | Markdown footnotes |
| Metadata | Front matter |

### Admonition Conversion

MkDocs-style admonitions are converted to Rustyll includes:

```markdown
# MkDocs
!!! note "Note Title"
    This is a note

# Rustyll
{% raw %}`{% include note.html title="Note Title" content="This is a note" %}`{% endraw %}
```

## Features and Plugins

Popular MkDocs plugins have Rustyll equivalents:

| MkDocs Plugin | Rustyll Equivalent |
|---------------|-------------------|
| Search | Built-in search |
| MathJax | rustyll-mathjax |
| PDF Export | rustyll-pdf |
| Redirects | rustyll-redirect-from |
| Social | rustyll-social |
| Git revision date | rustyll-git-metadata |

## Material Theme Features

If you're using MkDocs Material theme, Rustyll provides equivalent features:

| Material Feature | Rustyll Equivalent |
|------------------|-------------------|
| Dark mode | Theme with dark mode |
| Search highlighting | Built-in search with highlighting |
| Content tabs | Tabs include |
| Annotations | Margin notes |
| Icons | SVG icons library |

## Performance Improvements

Rustyll offers significant performance advantages over Python-based MkDocs:

1. **Build Speed**: 10-20x faster builds
2. **Memory Usage**: Significantly lower resource consumption
3. **Parallelism**: Utilizes all CPU cores efficiently
4. **Incremental Builds**: Only rebuilds changed files

```yaml
# Rustyll performance options
threads: auto  # Use all available CPU cores
incremental: true  # Enable incremental builds
cache:
  enabled: true
  strategy: aggressive
```

## Navigation Structure

MkDocs navigation is explicitly defined in mkdocs.yml. In Rustyll, you have options:

1. **Data file**: Define navigation in `_data/navigation.yml`
2. **Automatic**: Generate from front matter and collection structure
3. **Hybrid**: Combine automatic with manual ordering

## Search Implementation

MkDocs search is replaced with Rustyll's search system:

```yaml
# _config.yml
search:
  enabled: true
  provider: lunr  # Fast search engine
  index_fields:
    - title
    - content
    - tags
    - categories
```

## Troubleshooting Common Issues

### Python Extensions

If you rely on Python-specific plugins or extensions:

1. Look for Rustyll equivalents in the plugin ecosystem
2. Consider creating custom includes for unique functionality
3. Use the preprocessing phase of migration for complex conversions

### Theme Customization

For heavily customized MkDocs themes:

1. Review the converted theme files
2. Adjust Liquid templates as needed
3. Update SCSS/CSS in the `_sass` directory

## Migration Checklist

- [ ] Install Rust and Rustyll
- [ ] Back up your MkDocs site
- [ ] Run the migration command
- [ ] Review configuration and navigation structure
- [ ] Check converted templates and includes
- [ ] Test admonitions and other special content
- [ ] Verify code syntax highlighting
- [ ] Test search functionality
- [ ] Build with `rustyll build`
- [ ] Preview site with `rustyll serve`
- [ ] Fix any styling issues
- [ ] Update deployment workflows

## Need Help?

- [Rustyll Forum](https://forum.rustyll.com)
- [Rustyll Discord](https://discord.gg/rustyll)
- [GitHub Issues](https://github.com/rustyll/rustyll/issues) 