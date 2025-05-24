---
title: Migrating from GitBook
permalink: /docs/migrating/gitbook-to-rustyll/
---

Migrating from GitBook to Rustyll? This guide will help you transition from the JavaScript-based GitBook to Rust-powered Rustyll, keeping your documentation structure while gaining performance and flexibility.

## Installation

First, install Rustyll using Cargo (Rust's package manager):

```sh
# Install Rust if you haven't already
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Rustyll
cargo install rustyll
```

## Automatic Migration

Rustyll provides a built-in migration tool for GitBook sites:

```sh
rustyll migrate --from gitbook --source ./my-gitbook-site --destination ./my-rustyll-site
```

This command will:
1. Copy all content files
2. Convert GitBook's directory structure to Rustyll format
3. Transform GitBook's configuration to Rustyll's _config.yml
4. Convert GitBook plugins to Rustyll equivalents where possible
5. Generate a migration report

## Directory Structure Differences

| GitBook | Rustyll | Notes |
|---------|---------|-------|
| Root content files | Root directory | Most content stays in the same location |
| `book.json` | `_config.yml` | Configuration file |
| `SUMMARY.md` | `_data/toc.yml` | Table of contents becomes data file |
| `README.md` | `index.md` | Home page |
| `styles/` | `_sass/` | Custom styling |

## SUMMARY.md Conversion

GitBook's SUMMARY.md becomes a YAML data file in Rustyll:

```markdown
# GitBook (SUMMARY.md)
# Summary

* [Introduction](README.md)
* [Getting Started](getting-started.md)
  * [Installation](getting-started/installation.md)
  * [Configuration](getting-started/configuration.md)
* [Advanced Topics](advanced.md)
```

Converts to:

```yaml
# Rustyll (_data/toc.yml)
- title: Introduction
  url: /
- title: Getting Started
  url: /getting-started/
  children:
    - title: Installation
      url: /getting-started/installation/
    - title: Configuration
      url: /getting-started/configuration/
- title: Advanced Topics
  url: /advanced/
```

## Configuration Conversion

GitBook's JSON configuration converts to Rustyll's YAML:

```json
// GitBook (book.json)
{
  "title": "My Documentation",
  "description": "A comprehensive guide",
  "author": "Author Name",
  "plugins": ["search", "highlight", "github"],
  "pluginsConfig": {
    "github": {
      "url": "https://github.com/me/myproject"
    }
  }
}
```

Converts to:

```yaml
# Rustyll (_config.yml)
title: "My Documentation"
description: "A comprehensive guide"
author: "Author Name"
repository: "https://github.com/me/myproject"

# Plugin configuration
plugins:
  - rustyll-search
  - rustyll-highlight
  - rustyll-github
```

## GitBook Plugin Conversion

Many GitBook plugins have Rustyll equivalents:

| GitBook Plugin | Rustyll Equivalent |
|----------------|-------------------|
| search | Built-in search |
| highlight | Built-in syntax highlighting |
| github | rustyll-github |
| ga | rustyll-analytics |
| sharing | rustyll-social-share |
| fontsettings | Theme controls |
| lunr | Built-in search |

## Content Features

### Code Blocks

GitBook code blocks convert easily to Rustyll format:

````markdown
# Both formats support standard code blocks
```javascript
function hello() {
  console.log("Hello, world!");
}
```
````

### Hints and Callouts

GitBook hints convert to Rustyll includes:

```markdown
# GitBook
> **Hint:** This is a hint

# Rustyll
{% raw %}`{% include hint.html content="This is a hint" %}`{% endraw %}
```

## Page Front Matter

GitBook uses minimal front matter, which Rustyll expands:

```yaml
# GitBook (minimal or none)
---
description: Getting started guide
---

# Rustyll (expanded)
---
title: Getting Started
description: Getting started guide
permalink: /getting-started/
layout: docs
---
```

## Theme and Styling

GitBook's theming system is replaced with Rustyll's:

| GitBook Feature | Rustyll Equivalent |
|-----------------|-------------------|
| `styles/website.css` | `_sass/custom.scss` |
| Theme plugin | Theme configuration |
| Font settings | Typography settings |

## Multi-language Support

If your GitBook uses multiple languages:

```yaml
# _config.yml
languages:
  - code: en
    name: English
    default: true
  - code: es
    name: Español

# Collections for each language
collections:
  docs_en:
    output: true
    permalink: /en/:path/
  docs_es:
    output: true
    permalink: /es/:path/
```

## Performance Improvements

Rustyll offers significant performance improvements over GitBook:

```yaml
# Rustyll performance options
threads: auto  # Use all available CPU cores
incremental: true  # Enable incremental builds
cache:
  enabled: true
  strategy: aggressive
```

## API Documentation

If you're using GitBook for API documentation:

1. Use Rustyll's API documentation plugins
2. Consider OpenAPI/Swagger integration
3. Utilize code sample includes

```yaml
# _config.yml
plugins:
  - rustyll-openapi  # OpenAPI/Swagger support
```

## Search Functionality

GitBook's search is replaced with Rustyll's search system:

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

### Plugin Dependencies

If your GitBook relies heavily on plugins:

1. Check for Rustyll equivalents in the plugin ecosystem
2. Consider custom includes for simple plugin functionality
3. Use JavaScript for client-side features when needed

### Navigation Structure

If you have complex navigation:

1. Review the generated `_data/toc.yml`
2. Adjust the structure as needed
3. Consider adding weight/order values for precise control

## GitBook.com vs GitBook Legacy

This migration guide primarily addresses GitBook Legacy (open-source version):

1. For GitBook.com (cloud service) sites, export to Markdown first
2. Use the exported content with the migration tool
3. Review the structure and organization

## Migration Checklist

- [ ] Install Rust and Rustyll
- [ ] Back up your GitBook site
- [ ] Run the migration command
- [ ] Review the navigation structure
- [ ] Check converted templates and includes
- [ ] Update plugin functionality
- [ ] Test search and other interactive features
- [ ] Build with `rustyll build`
- [ ] Preview site with `rustyll serve`
- [ ] Fix any styling issues
- [ ] Update deployment workflows

## Need Help?

- [Rustyll Forum](https://forum.rustyll.com)
- [Rustyll Discord](https://discord.gg/rustyll)
- [GitHub Issues](https://github.com/rustyll/rustyll/issues) 