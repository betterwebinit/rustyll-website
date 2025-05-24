---
title: Migrating from Zola
permalink: /docs/migrating/zola-to-rustyll/
---

Migrating from Rust-based Zola to Rustyll? This guide will help you transition between these two Rust-powered static site generators, preserving your content structure while gaining Rustyll's additional features.

## Installation

Since both Zola and Rustyll are Rust-based, you likely already have Rust installed. If not:

```sh
# Install Rust if you haven't already
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Rustyll
cargo install rustyll
```

## Automatic Migration

Rustyll provides a built-in migration tool for Zola sites:

```sh
rustyll migrate --from zola --source ./my-zola-site --destination ./my-rustyll-site
```

This command will:
1. Copy all content files
2. Convert Zola front matter to Rustyll format
3. Transform Tera templates to Liquid templates
4. Adapt Zola-specific features to Rustyll equivalents
5. Generate a migration report

## Directory Structure Differences

| Zola | Rustyll | Notes |
|------|---------|-------|
| `content/` | Root directory (and collections) | Content organization is different |
| `templates/` | `_layouts/` and `_includes/` | Templates are split by purpose |
| `static/` | `assets/` | Static assets live here |
| `sass/` | `_sass/` | Sass files go here |
| `themes/` | Themes use a different structure | Theme implementation differs |
| `config.toml` | `_config.yml` | Configuration uses YAML |
| `public/` | `_site/` | Generated site |

## Content Conversion

Zola's content with TOML front matter converts to Rustyll's YAML front matter:

```markdown
<!-- Zola (content/blog/first-post.md) -->
+++
title = "My First Post"
date = 2023-01-15
[taxonomies]
tags = ["rust", "static-site"]
+++

This is my first post.
```

Converts to:

```markdown
<!-- Rustyll (_posts/2023-01-15-first-post.md) -->
---
title: "My First Post"
date: 2023-01-15
tags:
  - rust
  - static-site
---

This is my first post.
```

## Template Conversion

### Tera to Liquid

Zola's Tera templates convert to Rustyll's Liquid templates:

```html
<!-- Zola (templates/base.html) -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{% raw %}{% block title %}{{ config.title }}{% endblock title %}{% endraw %}</title>
    <link rel="stylesheet" href="{{ get_url(path="style.css") }}">
</head>
<body>
    <header>
        {% raw %}{% include "partials/nav.html" %}{% endraw %}
    </header>
    <main>
        {% raw %}{% block content %}{% endblock content %}{% endraw %}
    </main>
    <footer>
        &copy; {% raw %}{{ now() | date(format="%Y") }}{% endraw %} {% raw %}{{ config.extra.author }}{% endraw %}
    </footer>
</body>
</html>
```

Converts to:

```html
<!-- Rustyll (_layouts/default.html) -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{% raw %}{% if page.title %}{{ page.title }}{% else %}{{ site.title }}{% endif %}{% endraw %}</title>
    <link rel="stylesheet" href="{% raw %}{{ '/style.css' | relative_url }}{% endraw %}">
</head>
<body>
    <header>
        {% raw %}{% include nav.html %}{% endraw %}
    </header>
    <main>
        {% raw %}{{ content }}{% endraw %}
    </main>
    <footer>
        &copy; {% raw %}{{ 'now' | date: "%Y" }} {{ site.author }}{% endraw %}
    </footer>
</body>
</html>
```

### Shortcodes to Includes

Zola's shortcodes convert to Rustyll includes:

```markdown
<!-- Zola shortcode usage -->
{% raw %}{{ youtube(id="dQw4w9WgXcQ") }}{% endraw %}
```

Converts to:

```markdown
<!-- Rustyll include usage -->
{% raw %}{% include youtube.html id="dQw4w9WgXcQ" %}{% endraw %}
```

## Configuration Conversion

Zola's TOML configuration converts to Rustyll's YAML:

```toml
# Zola (config.toml)
base_url = "https://example.com"
title = "My Zola Site"
description = "A website built with Zola"
compile_sass = true
generate_feed = true
feed_filename = "atom.xml"

[extra]
author = "Your Name"
```

Converts to:

```yaml
# Rustyll (_config.yml)
url: https://example.com
title: My Zola Site
description: A website built with Zola
author: Your Name

# Feed configuration
plugins:
  - rustyll-feed

feed:
  path: atom.xml

# Sass configuration
sass:
  style: compressed

# Performance settings
threads: auto
incremental: true
```

## Section/Taxonomies to Collections

Zola's content sections and taxonomies convert to Rustyll collections:

```toml
# Zola taxonomy configuration
taxonomies = [
  {name = "tags", feed = true},
  {name = "categories", feed = true},
]
```

Converts to:

```yaml
# Rustyll (_config.yml)
collections:
  projects:
    output: true
    permalink: /projects/:path/

# Taxonomy handling
plugins:
  - rustyll-taxonomies

taxonomies:
  tags:
    permalink: /tags/:name/
    feed: true
  categories:
    permalink: /categories/:name/
    feed: true
```

## Theme System

Zola's themes work differently than Rustyll's:

| Zola | Rustyll | Notes |
|------|---------|-------|
| `themes/theme-name/` | Theme gems/local themes | Different theme approach |
| Theme inheritance | Theme customization | Different override mechanisms |
| `theme.toml` | `_config.yml` theme settings | Configuration differences |

For a smooth transition, copy theme files directly into your site rather than using Rustyll's theme system.

## Asset Pipeline

Zola's asset processing converts to Rustyll's approach:

| Zola | Rustyll | Notes |
|------|---------|-------|
| Built-in Sass | Built-in Sass | Similar functionality |
| `sass/` directory | `_sass/` directory | Similar structure |
| Asset colocation | Asset organization | Different approaches |
| `get_url()` function | `relative_url` filter | URL generation |

## Markdown Processing

Both Zola and Rustyll use similar Markdown processors:

| Zola | Rustyll | Notes |
|------|---------|-------|
| CommonMark | CommonMark | Similar Markdown support |
| Syntax highlighting | Syntax highlighting | Similar feature |
| Table of contents | Table of contents | Similar functionality |

## Performance Considerations

Both Zola and Rustyll are Rust-based and focus on performance, with some differences:

```yaml
# Rustyll performance options
threads: auto  # Use all available CPU cores
incremental: true  # Enable incremental builds
cache:
  enabled: true
  strategy: aggressive
```

Comparison:
1. **Build Speed**: Both are very fast as Rust-based SSGs
2. **Memory Usage**: Both are efficient with memory
3. **Incremental Builds**: Rustyll offers more fine-grained control
4. **Parallelism**: Both use multiple cores effectively

## Troubleshooting Common Issues

### Template Syntax Differences

If you encounter template conversion issues:

1. Tera uses `{% raw %}{% block content %}{% endblock content %}{% endraw %}` for layouts while Liquid uses `{% raw %}{{ content }}{% endraw %}`
2. Zola's `{% raw %}{{ get_url() }}{% endraw %}` function becomes `{% raw %}{{ '/path' | relative_url }}{% endraw %}` in Rustyll
3. Tera's `{% raw %}{% for post in section.pages %}{% endraw %}` becomes `{% raw %}{% for post in site.posts %}{% endraw %}` in Liquid

### Front Matter Format

Zola uses TOML front matter with `+++` delimiters:

1. Convert TOML (`+++`) front matter to YAML (`---`)
2. Adjust date formats if needed
3. Convert taxonomies to tags/categories or custom collections

### Content Organization

Zola uses sections while Rustyll uses collections:

1. Map each Zola section to a Rustyll collection
2. Configure collection permalinks to match Zola's URL structure
3. Update templates to use Rustyll's collection syntax

## Migration Checklist

- [ ] Install Rust and Rustyll
- [ ] Back up your Zola site
- [ ] Run the migration command
- [ ] Convert config.toml to _config.yml
- [ ] Set up collections for content sections
- [ ] Convert templates from Tera to Liquid syntax
- [ ] Move shortcodes to includes
- [ ] Configure permalink structure
- [ ] Test build with `rustyll build`
- [ ] Preview site with `rustyll serve`
- [ ] Fix any template or rendering issues
- [ ] Check internal links
- [ ] Optimize performance settings
- [ ] Update deployment workflows

## Need Help?

- [Rustyll Forum](https://forum.rustyll.com)
- [Rustyll Discord](https://discord.gg/rustyll)
- [GitHub Issues](https://github.com/rustyll/rustyll/issues)

| Zola Variable | Rustyll Equivalent |
|---------------|-------------------|
| `{{ page.title }}` | `{% raw %}{{ page.title }}{% endraw %}` |
| `{{ page.content }}` | `{% raw %}{{ content }}{% endraw %}` |
| `{{ page.permalink }}` | `{% raw %}`{% link page.path %}`{% endraw %}` |
| `{{ page.date }}` | `{% raw %}{{ page.date }}{% endraw %}` |
| `{{ page.taxonomies }}` | `{% raw %}`{% for category in page.categories %}`{% endraw %}` |

## Template Conversion

Zola templates (Tera) convert to Liquid templates:

| Zola (Tera) | Rustyll (Liquid) |
|-------------|------------------|
| `{% raw %}{% for page in section.pages %}{% endraw %}` | `{% raw %}`{% for page in site.pages %}`{% endraw %}` |
| `{% raw %}{% endfor %}{% endraw %}` | `{% raw %}`{% endfor %}`{% endraw %}` |
| `{% raw %}{% include "header.html" %}{% endraw %}` | `{% raw %}`{% include header.html %}`{% endraw %}` |
| `{% raw %}{{ page.content }}{% endraw %}` | `{% raw %}{{ content }}{% endraw %}` |
| `{% raw %}{{ page.permalink }}{% endraw %}` | `{% raw %}`{% link page.path %}`{% endraw %}` | 