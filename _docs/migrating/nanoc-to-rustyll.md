---
title: Migrating from Nanoc
permalink: /docs/migrating/nanoc-to-rustyll/
---

Migrating from Ruby-based Nanoc to Rustyll? This guide will help you transition your site to high-performance Rust-powered Rustyll while preserving your content structure and customizations.

## Installation

First, install Rustyll using Cargo (Rust's package manager):

```sh
# Install Rust if you haven't already
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Rustyll
cargo install rustyll
```

## Automatic Migration

Rustyll provides a built-in migration tool for Nanoc sites:

```sh
rustyll migrate --from nanoc --source ./my-nanoc-site --destination ./my-rustyll-site
```

This command will:
1. Copy all content files
2. Convert Nanoc-specific front matter to Rustyll format
3. Transform Nanoc layouts to Rustyll templates
4. Convert Rules to appropriate configurations
5. Generate a migration report

## Directory Structure Differences

| Nanoc | Rustyll | Notes |
|-------|---------|-------|
| `content/` | Root directory | Content goes in the root folder in Rustyll |
| `layouts/` | `_layouts/` | Layout templates |
| `lib/` | `_plugins/` | Custom helpers and functions |
| `Rules` | `_config.yml` | Compilation and routing rules |
| `nanoc.yaml` | `_config.yml` | Configuration settings |
| `output/` | `_site/` | Generated site |

## Content Conversion

Nanoc items convert to Rustyll pages or posts:

```yaml
# Nanoc (content/articles/example.md)
---
title: Example Article
created_at: 2023-01-15
kind: article
tags:
  - example
  - tutorial
---

Content goes here.
```

Converts to:

```yaml
# Rustyll (_posts/2023-01-15-example-article.md or regular page)
---
title: Example Article
date: 2023-01-15
layout: article
tags:
  - example
  - tutorial
---

Content goes here.
```

## Rules Conversion

Nanoc's Rules file defines compilation and routing, which convert to Rustyll configuration:

```ruby
# Nanoc (Rules)
compile '/articles/**/*' do
  filter :kramdown
  layout '/article.*'
end

route '/articles/**/*' do
  y, m, d, slug = item.identifier.to_s.match(%r{/articles/(\d+)-(\d+)-(\d+)-([^/]+)}).captures
  "/blog/#{y}/#{m}/#{d}/#{slug}/index.html"
end
```

Converts to:

```yaml
# Rustyll (_config.yml)
collections:
  posts:
    output: true
    permalink: /blog/:year/:month/:day/:title/

# Defaults for post processing
defaults:
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "article"
      
markdown: kramdown
```

## Configuration Conversion

Nanoc's YAML configuration converts to Rustyll format:

```yaml
# Nanoc (nanoc.yaml)
base_url: https://example.com
title: My Nanoc Site
author_name: Your Name
author_email: your@email.com

deploy:
  default:
    kind: rsync
    dst: "user@example.com:/var/www/mysite"
```

Converts to:

```yaml
# Rustyll (_config.yml)
url: https://example.com
title: My Nanoc Site
author:
  name: Your Name
  email: your@email.com
```

## Filters to Plugins

Nanoc's custom filters can be converted to Rustyll plugins:

| Nanoc Filter | Rustyll Equivalent |
|--------------|-------------------|
| `filter :kramdown` | `markdown: kramdown` |
| `filter :erb` | Liquid templates |
| `filter :colorize_syntax` | Built-in syntax highlighting |
| `filter :sass` | Built-in Sass/SCSS processing |
| Custom filters | Custom Rust plugins |

## Helpers Conversion

Nanoc helpers convert to Liquid filters or tags in Rustyll:

| Nanoc Helper | Rustyll Equivalent |
|--------------|-------------------|
| `link_to(text, path)` | `[text]({% raw %}`{% link path %}`{% endraw %})` |
| `item[:attribute]` | `{% raw %}{{ page.attribute }}{% endraw %}` |
| `@items['/path/*']` | `{% raw %}`{% for page in site.pages %}`{% endraw %}` |
| Custom helpers | Liquid includes or custom plugins |

## Template Conversion

Nanoc templates (typically ERB) convert to Liquid templates:

| Nanoc (ERB) | Rustyll (Liquid) |
|-------------|------------------|
| `<%= item[:title] %>` | `{% raw %}{{ page.title }}{% endraw %}` |
| `<% items.each do |i| %>` | `{% raw %}`{% for page in site.pages %}`{% endraw %}` |
| `<% end %>` | `{% raw %}`{% endfor %}`{% endraw %}` |
| `<%= render '/partials/header.*' %>` | `{% raw %}`{% include header.html %}`{% endraw %}` |
| `<%= item.compiled_content %>` | `{% raw %}{{ content }}{% endraw %}` |

## Custom Data

Nanoc data files convert to Rustyll data files:

```yaml
# Nanoc (content/data/members.yaml)
- name: John Doe
  role: Developer
  
- name: Jane Smith
  role: Designer
```

Converts to:

```yaml
# Rustyll (_data/members.yml)
- name: John Doe
  role: Developer
  
- name: Jane Smith
  role: Designer
```

Used in templates as `{{ site.data.members }}`.

## Blogging Features

Nanoc's blogging features convert to Rustyll's blogging system:

| Nanoc | Rustyll | Notes |
|-------|---------|-------|
| Article items | Posts | Date-based filename convention |
| Custom article sorting | Front matter with `date` field | Automatic date-based sorting |
| Tag pages | Collections for tags | Generated tag pages |
| Articles listing | Site-wide post variable | `site.posts` |

## Performance Improvements

Rustyll offers significant performance advantages over Ruby-based Nanoc:

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

## Asset Pipeline

Nanoc's asset processing converts to Rustyll's asset system:

| Nanoc | Rustyll | Notes |
|-------|---------|-------|
| `filter :sass` | Built-in SASS processing | Automatic compilation |
| `filter :uglify_js` | Asset plugins | JS minification |
| Asset concatenation | Asset includes | Combined files |
| Custom asset filters | Custom plugins | Extended functionality |

## Troubleshooting Common Issues

### Ruby Dependencies

If your Nanoc site relies on Ruby gems:

1. Look for Rustyll plugin equivalents
2. Consider using preprocessing during migration
3. Simplify dependencies where possible

### Custom Rules

If you have complex compilation or routing rules:

1. Review permalink structures in `_config.yml`
2. Configure collections to match your routing needs
3. Use front matter defaults for consistent processing

### Filter Chains

If you use complex filter chains in Nanoc:

1. Break down complex filters into simpler steps
2. Use Rustyll's plugin ecosystem for specialized processing
3. Consider custom plugins for unique requirements

## Migration Checklist

- [ ] Install Rust and Rustyll
- [ ] Back up your Nanoc site
- [ ] Run the migration command
- [ ] Review content and front matter
- [ ] Check templates and layouts
- [ ] Update custom functionality
- [ ] Test build with `rustyll build`
- [ ] Preview site with `rustyll serve`
- [ ] Verify site structure and navigation
- [ ] Fix any styling issues
- [ ] Optimize performance settings
- [ ] Update deployment workflows

## Need Help?

- [Rustyll Forum](https://forum.rustyll.com)
- [Rustyll Discord](https://discord.gg/rustyll)
- [GitHub Issues](https://github.com/rustyll/rustyll/issues) 