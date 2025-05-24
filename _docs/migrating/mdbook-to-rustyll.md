---
title: Migrating from mdBook
permalink: /docs/migrating/mdbook-to-rustyll/
---

Migrating from mdBook to Rustyll? This guide will help you transition your Rust documentation project to Rustyll's more flexible platform while maintaining your content structure and style.

## Installation

Since both mdBook and Rustyll are Rust-based tools, you likely already have Rust installed. If not:

```sh
# Install Rust if you haven't already
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Rustyll
cargo install rustyll
```

## Automatic Migration

Rustyll provides a built-in migration tool for mdBook projects:

```sh
rustyll migrate --from mdbook --source ./my-mdbook-project --destination ./my-rustyll-site
```

This command will:
1. Copy all Markdown content files
2. Convert mdBook's directory structure to Rustyll collections
3. Transform mdBook's book.toml to Rustyll's _config.yml
4. Create appropriate Liquid templates
5. Generate a migration report

## Directory Structure Differences

| mdBook | Rustyll | Notes |
|--------|---------|-------|
| `src/` | Root directory | Content goes in the root folder in Rustyll |
| `src/SUMMARY.md` | `_data/toc.yml` | Table of contents becomes data file |
| `book.toml` | `_config.yml` | Configuration file |
| `theme/` | `_sass/` and `assets/` | Theme customizations |

## Content Structure

mdBook organizes content as chapters in a single book. In Rustyll, this converts to a documentation collection:

```yaml
# Rustyll collection configuration
collections:
  docs:
    output: true
    permalink: /docs/:path/
```

### SUMMARY.md Conversion

mdBook's SUMMARY.md becomes a structured YAML data file:

```markdown
# mdBook (SUMMARY.md)
# Summary

- [Introduction](README.md)
- [Getting Started](getting-started.md)
    - [Installation](getting-started/installation.md)
    - [Configuration](getting-started/configuration.md)
- [Advanced Topics](advanced.md)
```

Converts to:

```yaml
# Rustyll (_data/toc.yml)
- title: Introduction
  url: /docs/
- title: Getting Started
  url: /docs/getting-started/
  children:
    - title: Installation
      url: /docs/getting-started/installation/
    - title: Configuration
      url: /docs/getting-started/configuration/
- title: Advanced Topics
  url: /docs/advanced/
```

## Configuration Conversion

mdBook's TOML configuration converts to Rustyll's YAML:

```toml
# mdBook (book.toml)
[book]
title = "My Documentation"
authors = ["Author Name"]
description = "A guide to my project"

[output.html]
git-repository-url = "https://github.com/me/myproject"
edit-url-template = "https://github.com/me/myproject/edit/main/{path}"
```

Converts to:

```yaml
# Rustyll (_config.yml)
title: "My Documentation"
authors:
  - "Author Name"
description: "A guide to my project"
repository: "https://github.com/me/myproject"
edit_page_url: "https://github.com/me/myproject/edit/main/{path}"

# mdBook-specific features conversion
mdbook_compat:
  enabled: true  # Enable mdBook compatibility features
```

## mdBook-specific Features

Rustyll provides equivalents for mdBook's features:

| mdBook Feature | Rustyll Equivalent |
|----------------|-------------------|
| Code snippets with line numbers | Syntax highlighting with line numbers |
| Code snippets with highlighting | Syntax highlighting with emphasis |
| Search | Integrated search |
| Rust playground integration | Code execution blocks |
| Print page | Print-friendly stylesheets |

### Code Block Conversion

mdBook's code blocks with annotations convert to Rustyll format:

```markdown
# mdBook
```rust,edition2021,should_panic
fn main() {
    panic!("This will panic");
}
```

# Rustyll
```rust
fn main() {
    panic!("This will panic");
}
```

# Rustyll
{% raw %}`{% include note.html title="Note Title" content="This is a note" %}`{% endraw %}