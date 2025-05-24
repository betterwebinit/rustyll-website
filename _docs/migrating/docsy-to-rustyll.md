---
title: Migrating from Docsy
permalink: /docs/migrating/docsy-to-rustyll/
---

Migrating from Docsy (a Hugo documentation theme) to Rustyll? This guide will help you transition your documentation site while preserving its structure and features.

## Installation

First, install Rustyll using Cargo (Rust's package manager):

```sh
# Install Rust if you haven't already
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Rustyll
cargo install rustyll
```

## Automatic Migration

Rustyll provides a built-in migration tool for Docsy sites:

```sh
rustyll migrate --from docsy --source ./my-docsy-site --destination ./my-rustyll-site
```

This command will:
1. Copy all content files
2. Convert Hugo/Docsy-specific front matter to Rustyll format
3. Transform Hugo templates and Docsy components to Liquid templates
4. Adjust configuration settings
5. Generate a migration report

## Directory Structure Differences

| Docsy/Hugo | Rustyll | Notes |
|------------|---------|-------|
| `content/` | root directory | Content goes in the root folder in Rustyll |
| `layouts/` | `_layouts/` and `_includes/` | Templates are split between layouts and includes |
| `static/` | `assets/` | Static files go in the assets directory |
| `config.toml` | `_config.yml` | Configuration file (YAML format) |
| `themes/docsy/` | Built-in Rustyll docs theme | Docsy-specific components converted to Rustyll includes |

## Documentation Features

Docsy is specialized for documentation sites. Rustyll provides equivalent features:

| Docsy Feature | Rustyll Equivalent |
|---------------|-------------------|
| Section navigation | Hierarchical collections with navigation |
| Versioned docs | Collections with version prefixes |
| Search | Integrated search with rustyll-search plugin |
| Landing page components | Custom includes and layouts |
| Taxonomy for tags | Collections for categorization |

## Template Differences

### Docsy Shortcodes vs. Rustyll Includes

Docsy shortcodes are converted to Rustyll includes:

| Docsy/Hugo | Rustyll |
|------------|---------|
| {% raw %}`{{< alert >}}Content{{< /alert >}}`{% endraw %} | {% raw %}`{% include alert.html content="Content" %}`{% endraw %} |
| {% raw %}`{{< tabs >}}...{{< /tabs >}}`{% endraw %} | {% raw %}`{% include tabs.html %}...{% include tabs-end.html %}`{% endraw %} |
| {% raw %}`{{< cardpane >}}...{{< /cardpane >}}`{% endraw %} | {% raw %}`{% include cardpane.html %}...{% include cardpane-end.html %}`{% endraw %} |

### Template Language

Docsy uses Hugo's Go templates, while Rustyll uses Liquid:

| Docsy/Hugo | Rustyll |
|------------|---------|
| {% raw %}`{{ .Title }}`{% endraw %} | {% raw %}`{{ page.title }}`{% endraw %} |
| {% raw %}`{{ range .Pages }}`{% endraw %} | {% raw %}`{% for page in site.pages %}`{% endraw %} |
| {% raw %}`{{ end }}`{% endraw %} | {% raw %}`{% endfor %}`{% endraw %} |
| {% raw %}`{{ with .Site.Params.ui.feedback }}`{% endraw %} | {% raw %}`{% if site.ui.feedback %}`...`{% endif %}`{% endraw %} |
| {% raw %}`{{ partial "navbar.html" . }}`{% endraw %} | {% raw %}`{% include navbar.html %}`{% endraw %} |

## Front Matter Differences

```toml
# Docsy/Hugo
+++
title = "Getting Started"
weight = 1
description = "Getting started with Docsy"
+++

# Rustyll
---
title: Getting Started
weight: 1
description: Getting started with Rustyll
---
```

## Configuration Conversion

Docsy's configuration converts to Rustyll YAML:

```toml
# Docsy/Hugo (config.toml)
baseURL = "https://example.org/"
title = "My Documentation"

[params]
copyright = "The Authors"
github_repo = "https://github.com/me/myrepo"

[params.ui]
sidebar_menu_compact = true
breadcrumb_disable = false
```

Converts to:

```yaml
# Rustyll (_config.yml)
url: "https://example.org"
title: "My Documentation"
copyright: "The Authors"
github_repo: "https://github.com/me/myrepo"
ui:
  sidebar_menu_compact: true
  breadcrumb_disable: false
```

## Documentation Structure

Docsy's documentation structure with sections and subsections maps to Rustyll's collections:

```yaml
# Rustyll collection configuration
collections:
  docs:
    output: true
    permalink: /docs/:path/
    order:
      - getting-started.md
      - concepts.md
      - tutorials.md
  
  tutorials:
    output: true
    permalink: /tutorials/:path/
```

## Navigation

Docsy's sidebar navigation can be recreated in Rustyll:

```yaml
# _data/navigation.yml
docs:
  - title: Getting Started
    url: /docs/getting-started/
    children:
      - title: Installation
        url: /docs/installation/
      - title: Configuration
        url: /docs/configuration/
  
  - title: Concepts
    url: /docs/concepts/
```

## Search Implementation

Rustyll provides search capabilities for documentation sites:

```yaml
# _config.yml
search:
  enabled: true
  provider: lunr # Fast search engine
  index_fields:
    - title
    - content
    - tags
    - categories
```

## Landing Page

Docsy landing pages use blocks/sections which convert to Rustyll includes:

```html
<!-- Rustyll landing page -->
{% raw %}
{% include hero.html 
  title="My Documentation"
  description="Comprehensive guides for my project"
  button_text="Get Started"
  button_url="/docs/getting-started/"
%}

{% include feature-grid.html %}
{% endraw %}
```

## Performance Optimization

Rustyll offers superior performance compared to Hugo/Docsy:

```yaml
# Rustyll performance options
threads: auto  # Use all available CPU cores
incremental: true  # Enable incremental builds
cache:
  enabled: true
  strategy: aggressive
```

## Troubleshooting Common Issues

### Complex Docsy Components

Some complex Docsy components may require manual attention:

1. Check complex shortcodes like `swaggerui` or custom components
2. Review JavaScript interactions that may need adaptation
3. Verify that automatically created includes work as expected

### Multi-language Support

If your Docsy site uses multiple languages:

1. Configure Rustyll's language settings
2. Set up language-specific collections
3. Create language switcher include

## Migration Checklist

- [ ] Install Rust and Rustyll
- [ ] Back up your Docsy site
- [ ] Run the migration command
- [ ] Review converted templates and includes
- [ ] Test navigation structure
- [ ] Check search functionality
- [ ] Verify responsive design elements
- [ ] Test build with `rustyll build`
- [ ] Preview site with `rustyll serve`
- [ ] Verify all documentation renders correctly
- [ ] Update deployment workflows

## Need Help?

- [Rustyll Forum](https://forum.rustyll.com)
- [Rustyll Discord](https://discord.gg/rustyll)
- [GitHub Issues](https://github.com/rustyll/rustyll/issues) 