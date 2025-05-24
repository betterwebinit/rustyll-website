---
title: Migrating from Jekyll
permalink: /docs/migrating/jekyll-to-rustyll/
---

Migrating from Ruby-based Jekyll to Rustyll? This guide will help you transition to a high-performance Rust-powered static site generator while maintaining compatibility with your existing Jekyll site.

## Installation

First, install Rustyll using Cargo (Rust's package manager):

```sh
# Install Rust if you haven't already
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Rustyll
cargo install rustyll
```

## Automatic Migration

Rustyll provides a built-in migration tool specifically designed for Jekyll sites:

```sh
rustyll migrate --from jekyll --source ./my-jekyll-site --destination ./my-rustyll-site
```

This command will:
1. Copy all content files
2. Adapt Jekyll-specific Liquid tags to Rustyll's syntax
3. Preserve front matter
4. Convert Ruby plugins to Rust equivalents when possible
5. Generate a detailed migration report

## Directory Structure

The good news is that Rustyll maintains Jekyll's directory structure, making migration fairly straightforward:

| Jekyll | Rustyll | Notes |
|--------|---------|-------|
| `_posts/` | `_posts/` | Blog posts (same structure) |
| `_layouts/` | `_layouts/` | Layout templates (same format) |
| `_includes/` | `_includes/` | Include files (same format) |
| `_data/` | `_data/` | Data files (same format) |
| `_config.yml` | `_config.yml` | Configuration (similar structure) |
| `_site/` | `_site/` | Generated site |
| `assets/` | `assets/` | Static assets (same structure) |

## Content Files

Jekyll posts and pages work almost identically in Rustyll:

```markdown
---
layout: post
title: "My First Post"
date: 2023-04-15
categories: blog rust
---

This is my **first** blog post using Rustyll.
```

This format works without modification in Rustyll.

## Template System

Both Jekyll and Rustyll use Liquid templates, with some differences:

| Jekyll (Liquid) | Rustyll (Liquid) | Notes |
|-----------------|------------------|-------|
| `{% raw %}{{ page.title }}{% endraw %}` | `{% raw %}{{ page.title }}{% endraw %}` | Same syntax |
| `{% raw %}`{% include header.html %}`{% endraw %}` | `{% raw %}`{% include header.html %}`{% endraw %}` | Same syntax |
| `{% raw %}`{% link index.md %}`{% endraw %}` | `{% raw %}{{ '/index' | relative_url }}{% endraw %}` | URL generation differences |
| `{% raw %}`{% post_url 2023-04-15-first-post %}`{% endraw %}` | `{% raw %}{{ '/blog/2023/04/15/first-post' | relative_url }}{% endraw %}` | Post URL differences |
| `{% raw %}{{ site.github.contributors }}{% endraw %}` | N/A | GitHub-specific variables not available |

## Configuration File

Jekyll's `_config.yml` converts to Rustyll's format with some changes:

```yaml
# Jekyll (_config.yml)
title: My Jekyll Site
description: A site built with Jekyll
url: https://example.com
baseurl: /my-site
markdown: kramdown
permalink: /blog/:year/:month/:day/:title/
plugins:
  - jekyll-feed
  - jekyll-seo-tag
sass:
  style: compressed
```

Converts to:

```yaml
# Rustyll (_config.yml)
title: My Jekyll Site
description: A site built with Jekyll
url: https://example.com
base_url: /my-site
markdown: commonmark
permalink: /blog/:year/:month/:day/:title/
plugins:
  - rustyll-feed
  - rustyll-seo
sass:
  style: compressed
threads: auto  # Rustyll-specific option
```

## Collections

Jekyll collections convert easily to Rustyll:

```yaml
# Jekyll (_config.yml)
collections:
  projects:
    output: true
    permalink: /projects/:path/
```

Converts to:

```yaml
# Rustyll (_config.yml)
collections:
  projects:
    output: true
    permalink: /projects/:path/
```

## Front Matter Defaults

Jekyll's front matter defaults work similarly in Rustyll:

```yaml
# Jekyll (_config.yml)
defaults:
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
      author: "John Doe"
```

Converts to the same format in Rustyll.

## Plugin System

Jekyll plugins need to be replaced with Rustyll equivalents:

| Jekyll Plugin | Rustyll Plugin | Notes |
|---------------|---------------|-------|
| `jekyll-feed` | `rustyll-feed` | RSS/Atom feed generation |
| `jekyll-seo-tag` | `rustyll-seo` | SEO meta tags |
| `jekyll-sitemap` | `rustyll-sitemap` | Sitemap generation |
| `jekyll-paginate` | Built-in pagination | Native pagination in Rustyll |
| Custom Ruby plugins | Rust plugins/hooks | Need manual conversion |

## Asset Pipeline

Jekyll's asset handling converts to Rustyll's system:

| Jekyll | Rustyll | Notes |
|--------|---------|-------|
| Sass/SCSS | Built-in Sass | Similar functionality |
| `jekyll-assets` | Asset pipeline | Similar functionality |
| Webpack integration | Webpack support | Similar approach |

## Performance Improvements

Rustyll offers significant performance advantages over Ruby-based Jekyll:

```yaml
# Rustyll performance options
threads: auto  # Use all available CPU cores
incremental: true  # Enable incremental builds
cache:
  enabled: true
  strategy: aggressive
```

Benchmark comparisons:
1. **Build Speed**: 50-100x faster for large sites
2. **Memory Usage**: 80-90% less RAM consumption
3. **Concurrency**: Efficient parallelism with all CPU cores

## Common Migration Challenges

### Liquid Tags

Jekyll-specific Liquid tags need adjustment:

```liquid
<!-- Jekyll -->
{% raw %}
{% link about.md %}
{% post_url 2023-04-15-first-post %}
{% endraw %}
```

Converts to:

```liquid
<!-- Rustyll -->
{% raw %}
{{ '/about' | relative_url }}
{{ '/blog/2023/04/15/first-post' | relative_url }}
{% endraw %}
```

### Custom Plugins

Ruby plugins need to be replaced with Rust equivalents:

1. **Hooks**: Use Rustyll's hook system
2. **Generators**: Convert to Rustyll generators
3. **Converters**: Use Rustyll's conversion system
4. **Tags**: Implement as Liquid filters or tags

### GitHub Pages Integration

If you're using GitHub Pages with Jekyll:

1. Setup GitHub Actions for Rustyll builds
2. Configure with the Rustyll GitHub action
3. Deploy to GitHub Pages from the built `_site` directory

## Migration Checklist

- [ ] Install Rust and Rustyll
- [ ] Back up your Jekyll site
- [ ] Run the migration command
- [ ] Review configuration settings
- [ ] Check templates for Jekyll-specific tags
- [ ] Update plugin dependencies
- [ ] Verify front matter and collections
- [ ] Test build with `rustyll build`
- [ ] Preview site with `rustyll serve`
- [ ] Check for rendering differences
- [ ] Update deployment workflows
- [ ] Configure performance settings

## Troubleshooting

### Common Issues

1. **Template Errors**: Check for Jekyll-specific Liquid syntax
2. **Missing Plugins**: Install Rustyll plugin alternatives
3. **URL Generation**: Verify permalink settings match
4. **Markdown Processing**: Adjust for CommonMark vs Kramdown differences
5. **Front Matter**: Ensure proper handling of custom variables

### Performance Tuning

For optimal performance:

1. Enable multi-threading
2. Configure aggressive caching
3. Use incremental builds during development

## Need Help?

- [Rustyll Forum](https://forum.rustyll.com)
- [Rustyll Discord](https://discord.gg/rustyll)
- [GitHub Issues](https://github.com/rustyll/rustyll/issues) 