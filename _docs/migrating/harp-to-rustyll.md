---
title: Migrating from Harp
permalink: /docs/migrating/harp-to-rustyll/
---

Migrating from Node.js-based Harp to Rustyll? This guide will help you transition your site to high-performance Rust-powered Rustyll while preserving your content structure and preprocessing capabilities.

## Installation

First, install Rustyll using Cargo (Rust's package manager):

```sh
# Install Rust if you haven't already
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Rustyll
cargo install rustyll
```

## Automatic Migration

Rustyll provides a built-in migration tool for Harp sites:

```sh
rustyll migrate --from harp --source ./my-harp-site --destination ./my-rustyll-site
```

This command will:
1. Copy all content files
2. Convert Harp's metadata (\_data.json) to Rustyll front matter
3. Transform Jade/Pug templates to Liquid templates
4. Process EJS templates to Liquid format
5. Generate a migration report

## Directory Structure Differences

| Harp | Rustyll | Notes |
|------|---------|-------|
| Root directory | Root directory | Content files stay in same location |
| `_layout.jade/ejs` | `_layouts/default.html` | Layout templates |
| `_partials/` | `_includes/` | Partial templates |
| `_data.json` | Front matter in files | Metadata moves into individual files |
| Public folder (if used) | Root directory | Content is unified |
| `harp.json` | `_config.yml` | Configuration file |
| `www/` | `_site/` | Generated site |

## Content Conversion

Harp content files with metadata in `_data.json` convert to Rustyll's front matter:

```json
// Harp (_data.json)
{
  "about": {
    "title": "About Us",
    "layout": "_layout"
  }
}
```

```jade
//- Harp (about.jade)
h1= title
p This is the about page.
```

Converts to:

```markdown
---
title: About Us
layout: default
---

# {{ page.title }}
This is the about page.
```

## Template Conversion

### Jade/Pug to Liquid

Harp's Jade/Pug templates convert to Liquid:

```jade
//- Harp (_layout.jade)
doctype html
html
  head
    title= title
    link(rel="stylesheet", href="/css/style.css")
  body
    header
      include _partials/nav
    main
      != yield
    footer
      p &copy; #{new Date().getFullYear()} My Company
```

Converts to:

```html
<!-- Rustyll (_layouts/default.html) -->
<!DOCTYPE html>
<html>
  <head>
    <title>{% raw %}{{ page.title }}{% endraw %}</title>
    <link rel="stylesheet" href="{% raw %}{{ '/css/style.css' | relative_url }}{% endraw %}">
  </head>
  <body>
    <header>
      {% raw %}`{% include nav.html %}`{% endraw %}
    </header>
    <main>
      {% raw %}{{ content }}{% endraw %}
    </main>
    <footer>
      <p>&copy; {% raw %}{{ 'now' | date: "%Y" }}{% endraw %} My Company</p>
    </footer>
  </body>
</html>
```

### EJS to Liquid

Harp's EJS templates convert to Liquid:

```ejs
<!-- Harp (_layout.ejs) -->
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel="stylesheet" href="/css/style.css">
  </head>
  <body>
    <header>
      <%- partial("_partials/nav") %>
    </header>
    <main>
      <%- yield %>
    </main>
    <footer>
      <p>&copy; <%= new Date().getFullYear() %> My Company</p>
    </footer>
  </body>
</html>
```

Converts to the same Liquid template shown above.

## Preprocessing Conversion

Harp's built-in preprocessors have Rustyll equivalents:

| Harp | Rustyll | Notes |
|------|---------|-------|
| Jade/Pug | Liquid | Template language |
| EJS | Liquid | Template language |
| Markdown | Markdown | Content format (same) |
| LESS | SCSS | CSS preprocessor |
| Stylus | SCSS | CSS preprocessor |
| CoffeeScript | JavaScript | JS preprocessor (manual conversion) |

## Configuration Conversion

Harp's JSON configuration converts to Rustyll's YAML:

```json
// Harp (harp.json)
{
  "globals": {
    "site_name": "My Harp Site",
    "site_description": "A site built with Harp",
    "author": "Your Name"
  }
}
```

Converts to:

```yaml
# Rustyll (_config.yml)
title: My Harp Site
description: A site built with Harp
author: Your Name

# Default settings for Markdown processing
markdown: kramdown

# Sass configuration
sass:
  style: compressed
```

## Metadata Files

Harp's metadata files (`_data.json`) are split into front matter for individual files in Rustyll. Collection data can be placed in `_data/` files:

```json
// Harp (projects/_data.json)
{
  "project1": {
    "title": "First Project",
    "description": "Description of first project",
    "featured": true
  },
  "project2": {
    "title": "Second Project",
    "description": "Description of second project",
    "featured": false
  }
}
```

Converts to:

```yaml
# Rustyll (_data/projects.yml)
- slug: project1
  title: First Project
  description: Description of first project
  featured: true
- slug: project2
  title: Second Project
  description: Description of second project
  featured: false
```

## URL Structure

Harp's automatic `index.html` and clean URLs are supported in Rustyll:

```yaml
# Rustyll (_config.yml)
permalink: pretty  # Generates URLs without .html extension
```

## Asset Pipeline

Harp's asset preprocessing converts to Rustyll's asset handling:

| Harp | Rustyll | Notes |
|------|---------|-------|
| LESS/Stylus | SCSS | CSS preprocessing |
| CoffeeScript | JavaScript | Manual conversion needed |
| Asset fingerprinting | Built-in asset hashing | File fingerprinting |

## Dynamic Content

Harp's approach to handling collections converts to Rustyll collections:

```yaml
# Rustyll (_config.yml)
collections:
  projects:
    output: true
    permalink: /projects/:slug/
```

With corresponding front matter in collection files:

```markdown
# Rustyll (_projects/project1.md)
---
title: First Project
description: Description of first project
featured: true
---

Content for first project goes here.
```

## Performance Improvements

Rustyll offers significant performance advantages over Node.js-based Harp:

```yaml
# Rustyll performance options
threads: auto  # Use all available CPU cores
incremental: true  # Enable incremental builds
cache:
  enabled: true
  strategy: aggressive
```

Benefits include:
1. **Build Speed**: 10-20x faster builds
2. **Memory Usage**: Significantly lower resource consumption
3. **Parallelism**: Utilizes all CPU cores efficiently

## Troubleshooting Common Issues

### Template Language Differences

If you encounter template conversion issues:

1. Check for complex Jade/Pug or EJS constructs that need manual conversion
2. Replace JavaScript template logic with Liquid equivalents
3. Use includes for repeatable components

### Missing Preprocessors

If you use preprocessors not directly supported in Rustyll:

1. Convert CoffeeScript to JavaScript manually
2. Transform Stylus to SCSS syntax
3. Use standard preprocessing tools before adding to the Rustyll site

### Global Variables

Harp's globals work differently in Rustyll:

1. Site-wide variables belong in `_config.yml`
2. Access them using `{{ site.variable_name }}`
3. For complex data structures, use YAML data files

## Migration Checklist

- [ ] Install Rust and Rustyll
- [ ] Back up your Harp site
- [ ] Run the migration command
- [ ] Review content and front matter
- [ ] Check templates and includes
- [ ] Convert any remaining preprocessor files
- [ ] Set up collections for dynamic content
- [ ] Configure permalink structure
- [ ] Test build with `rustyll build`
- [ ] Preview site with `rustyll serve`
- [ ] Fix any template rendering issues
- [ ] Update asset references
- [ ] Optimize performance settings
- [ ] Update deployment workflows

## Need Help?

- [Rustyll Forum](https://forum.rustyll.com)
- [Rustyll Discord](https://discord.gg/rustyll)
- [GitHub Issues](https://github.com/rustyll/rustyll/issues) 