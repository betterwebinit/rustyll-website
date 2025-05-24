---
title: Migrating from Hugo
permalink: /docs/migrating/hugo-to-rustyll/
---

Migrating from Go-based Hugo to Rustyll? This guide will help you transition your site to Rustyll while preserving your content structure and taking advantage of Rustyll's performance and flexibility.

## Installation

First, install Rustyll using Cargo (Rust's package manager):

```sh
# Install Rust if you haven't already
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Rustyll
cargo install rustyll
```

## Automatic Migration

Rustyll provides a built-in migration tool for Hugo sites:

```sh
rustyll migrate --from hugo --source ./my-hugo-site --destination ./my-rustyll-site
```

This command will:
1. Convert content files and front matter
2. Transform Hugo templates to Liquid syntax
3. Adapt shortcodes to Rustyll includes
4. Process data files and configuration
5. Generate a migration report

## Directory Structure Differences

| Hugo | Rustyll | Notes |
|------|---------|-------|
| `content/` | Root directory (and collections) | Content organization is different |
| `layouts/` | `_layouts/` and `_includes/` | Templates are split by purpose |
| `static/` | `assets/` | Static assets live here |
| `data/` | `_data/` | Data files (similar functionality) |
| `themes/` | Themes use the same directory structure | Themes work differently |
| `config.toml` | `_config.yml` | Configuration uses YAML |
| `public/` | `_site/` | Generated site |

## Content Conversion

Hugo's content structure with front matter converts to Rustyll's approach:

```markdown
<!-- Hugo (content/posts/first-post.md) -->
+++
title = "My First Post"
date = 2023-01-15T09:00:00+00:00
draft = false
tags = ["rust", "static-site"]
+++

This is my first post.
```

Converts to:

```markdown
<!-- Rustyll (_posts/2023-01-15-first-post.md) -->
---
title: "My First Post"
date: 2023-01-15 09:00:00 +0000
tags:
  - rust
  - static-site
---

This is my first post.
```

## Template Conversion

### Go Templates to Liquid

Hugo's Go templates convert to Rustyll's Liquid templates:

```html
<!-- Hugo (layouts/partials/header.html) -->
{% raw %}
<header>
  <h1>{{ .Site.Title }}</h1>
  <nav>
    {{ range .Site.Menus.main }}
    <a href="{{ .URL }}" class="{{ if $.IsMenuCurrent "main" . }}active{{ end }}">
      {{ .Name }}
    </a>
    {{ end }}
  </nav>
</header>
{% endraw %}
```

Converts to:

```html
<!-- Rustyll (_includes/header.html) -->
{% raw %}
<header>
  <h1>{{ site.title }}</h1>
  <nav>
    {% endraw %}{% for item in site.data.menu.main %}{% raw %}
    <a href="{{ item.url }}" class="{% if page.url == item.url %}active{% endif %}">
      {{ item.name }}
    </a>
    {% endraw %}{% endfor %}{% raw %}
  </nav>
</header>
{% endraw %}
```

### Shortcodes to Includes

Hugo's shortcodes convert to Rustyll includes:

```markdown
<!-- Hugo shortcode usage -->
{% raw %}{{< figure src="/images/sunset.jpg" title="Beautiful Sunset" >}}{% endraw %}
```

Converts to:

```markdown
<!-- Rustyll include usage -->
{% raw %}{% include figure.html src="/images/sunset.jpg" title="Beautiful Sunset" %}{% endraw %}
```

With the corresponding include file:

```html
<!-- Rustyll (_includes/figure.html) -->
<figure>
  <img src="{% raw %}{{ include.src }}{% endraw %}" alt="{% raw %}{{ include.title }}{% endraw %}">
  <figcaption>{% raw %}{{ include.title }}{% endraw %}</figcaption>
</figure>
```

## Configuration Conversion

Hugo's TOML configuration converts to Rustyll's YAML:

```toml
# Hugo (config.toml)
baseURL = "https://example.com/"
languageCode = "en-us"
title = "My Hugo Site"
theme = "my-theme"

[params]
  description = "A site built with Hugo"
  author = "Your Name"

[menu]
  [[menu.main]]
    name = "Home"
    url = "/"
    weight = 1
  [[menu.main]]
    name = "About"
    url = "/about/"
    weight = 2
```

Converts to:

```yaml
# Rustyll (_config.yml)
url: https://example.com
title: My Hugo Site
description: A site built with Hugo
author: Your Name

# Menu is moved to _data/menu.yml
markdown: commonmark
sass:
  style: compressed

# Performance settings
threads: auto
incremental: true
```

With a corresponding data file:

```yaml
# Rustyll (_data/menu.yml)
main:
  - name: Home
    url: /
    weight: 1
  - name: About
    url: /about/
    weight: 2
```

## Content Organization

Hugo's content organization converts to Rustyll's collections:

| Hugo | Rustyll | Notes |
|------|---------|-------|
| `content/posts/` | `_posts/` | Blog posts |
| `content/projects/` | `_projects/` (collection) | Custom collection |
| `content/about.md` | `about.md` | Pages at root level |
| `content/pages/` | Page files at root | Regular pages |

Configure collections in `_config.yml`:

```yaml
# Rustyll (_config.yml)
collections:
  projects:
    output: true
    permalink: /projects/:path/
```

## Taxonomy System

Hugo's taxonomy system converts to Rustyll's approach:

```toml
# Hugo taxonomy configuration
[taxonomies]
  category = "categories"
  tag = "tags"
  series = "series"
```

Convert to Rustyll collections and plugins:

```yaml
# Rustyll taxonomy approach
plugins:
  - rustyll-taxonomies

taxonomies:
  categories:
    permalink: /categories/:name/
  tags:
    permalink: /tags/:name/
  series:
    permalink: /series/:name/
```

## Data Files

Hugo's data files convert to Rustyll's `_data` directory:

```json
// Hugo (data/team.json)
{
  "members": [
    {
      "name": "John Doe",
      "role": "Developer"
    },
    {
      "name": "Jane Smith",
      "role": "Designer"
    }
  ]
}
```

Converts to:

```yaml
# Rustyll (_data/team.yml)
members:
  - name: John Doe
    role: Developer
  - name: Jane Smith
    role: Designer
```

## Asset Pipeline

Hugo's asset processing converts to Rustyll's approach:

| Hugo | Rustyll | Notes |
|------|---------|-------|
| Hugo Pipes | Asset pipeline | Similar functionality |
| SCSS processing | Built-in Sass | Similar syntax |
| Asset bundling | Asset optimization | Similar results |
| Fingerprinting | Asset hashing | Cache busting |

## Performance Considerations

Both Hugo and Rustyll focus on performance, but Rustyll offers additional options:

```yaml
# Rustyll performance options
threads: auto  # Use all available CPU cores
incremental: true  # Enable incremental builds
cache:
  enabled: true
  strategy: aggressive
```

Comparison:
1. **Build Speed**: Both are very fast, with Hugo slightly faster for massive sites
2. **Memory Usage**: Both are efficient
3. **Incremental Builds**: Rustyll offers more granular control
4. **Concurrency**: Both use multiple CPU cores efficiently

## Multilingual Support

Hugo's multilingual setup converts to Rustyll's approach:

```toml
# Hugo multilingual config
[languages]
  [languages.en]
    title = "My Site"
    weight = 1
  [languages.fr]
    title = "Mon Site"
    weight = 2
```

Converts to:

```yaml
# Rustyll (_config.yml)
languages:
  - code: en
    name: English
    title: My Site
    weight: 1
  - code: fr
    name: French
    title: Mon Site
    weight: 2
```

## Troubleshooting Common Issues

### Template Syntax

If you encounter template conversion issues:

1. Hugo uses Go templates with {% raw %}`{{ .Variable }}`{% endraw %} syntax
2. Rustyll uses Liquid with {% raw %}`{{ variable }}`{% endraw %} syntax
3. Control structures are different ({% raw %}`{{ range .Items }}`{% endraw %} vs {% raw %}`{% for item in items %}`{% endraw %})

### Front Matter Format

Hugo supports TOML, YAML, and JSON front matter:

1. Convert TOML (`+++`) and JSON front matter to YAML (`---`)
2. Adjust date formats to ISO 8601 (YYYY-MM-DD HH:MM:SS +/-TTTT)
3. Convert boolean values properly (`draft = false` to `draft: false`)

### Content Organization

Hugo uses content sections while Rustyll uses collections:

1. Map each Hugo section to a Rustyll collection
2. Configure collection permalinks to match Hugo's URL structure
3. Update templates to use Rustyll's collection syntax

## Migration Checklist

- [ ] Install Rust and Rustyll
- [ ] Back up your Hugo site
- [ ] Run the migration command
- [ ] Convert config.toml to _config.yml
- [ ] Set up collections for content sections
- [ ] Convert templates from Go to Liquid syntax
- [ ] Move shortcodes to includes
- [ ] Update data files
- [ ] Configure permalinks
- [ ] Test build with `rustyll build`
- [ ] Preview site with `rustyll serve`
- [ ] Fix any template or rendering issues
- [ ] Update deployment workflows
- [ ] Optimize performance settings

## Need Help?

- [Rustyll Forum](https://forum.rustyll.com)
- [Rustyll Discord](https://discord.gg/rustyll)
- [GitHub Issues](https://github.com/rustyll/rustyll/issues) 