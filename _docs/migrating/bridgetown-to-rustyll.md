---
title: Migrating from Bridgetown
permalink: /docs/migrating/bridgetown-to-rustyll/
---

Migrating from Ruby-based Bridgetown to Rustyll? This guide will help you transition from Bridgetown's modern Ruby architecture to Rustyll's high-performance Rust-powered framework while preserving your content and components.

## Installation

First, install Rustyll using Cargo (Rust's package manager):

```sh
# Install Rust if you haven't already
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Rustyll
cargo install rustyll
```

## Automatic Migration

Rustyll provides a built-in migration tool for Bridgetown sites:

```sh
rustyll migrate --from bridgetown --source ./my-bridgetown-site --destination ./my-rustyll-site
```

This command will:
1. Copy all content files
2. Convert Bridgetown's front matter to Rustyll format
3. Transform Bridgetown's Liquid/ERB templates to Rustyll's Liquid templates
4. Adjust configuration settings
5. Generate a migration report

## Directory Structure Differences

| Bridgetown | Rustyll | Notes |
|------------|---------|-------|
| `src/` | Root directory | Content files move to root folder in Rustyll |
| `src/_posts/` | `_posts/` | Blog posts |
| `src/_pages/` | Root directory | Static pages |
| `src/_layouts/` | `_layouts/` | Layout templates |
| `src/_components/` | `_includes/` | Component templates |
| `src/_data/` | `_data/` | Data files |
| `bridgetown.config.yml` | `_config.yml` | Configuration file |
| `frontend/` | `assets/` | Frontend assets |
| `output/` | `_site/` | Generated site |

## Content Conversion

### Pages

Bridgetown pages convert to Rustyll pages:

```markdown
# Bridgetown (src/_pages/about.md)
---
layout: page
title: About Us
permalink: /about/
---

This is the about page content.
```

Converts to:

```markdown
# Rustyll (about.md)
---
layout: page
title: About Us
permalink: /about/
---

This is the about page content.
```

### Posts

Bridgetown posts convert to Rustyll posts:

```markdown
# Bridgetown (src/_posts/2023-01-15-hello-world.md)
---
layout: post
title: Hello World
date: 2023-01-15 12:00:00 -0500
categories:
  - announcements
---

This is my first blog post.
```

Converts to:

```markdown
# Rustyll (_posts/2023-01-15-hello-world.md)
---
layout: post
title: Hello World
date: 2023-01-15 12:00:00 -0500
categories:
  - announcements
---

This is my first blog post.
```

## Configuration Conversion

Bridgetown's YAML configuration converts to Rustyll's format:

```yaml
# Bridgetown (bridgetown.config.yml)
url: https://example.com
title: My Bridgetown Site
timezone: America/New_York
permalink: pretty
template_engine: liquid

pagination:
  enabled: true
  per_page: 10

collections:
  projects:
    output: true
    permalink: /projects/:slug/
```

Converts to:

```yaml
# Rustyll (_config.yml)
url: https://example.com
title: My Bridgetown Site
timezone: America/New_York
permalink: pretty

# Pagination
paginate: 10
paginate_path: "/page:num/"

# Collections
collections:
  projects:
    output: true
    permalink: /projects/:slug/
```

## Template Conversion

### Liquid Templates

Bridgetown Liquid templates are compatible with Rustyll with minor changes:

| Bridgetown (Liquid) | Rustyll (Liquid) |
|---------------------|------------------|
| Page title variable | Same page title variable |
| Loop through collection resources | Loop through site posts |
| Render component with parameters | Include partial with parameters |
| Data access with square brackets | Same data access pattern |

### Components

Bridgetown components convert to Rustyll includes:

```
# Bridgetown (src/_components/shared/card.liquid)
<div class="card">
  <h3><!-- {{ title }} --></h3>
  <div class="content">
    <!-- {{ content }} -->
  </div>
</div>
```

Converts to:

```
# Rustyll (_includes/shared/card.html)
<div class="card">
  <h3><!-- {{ include.title }} --></h3>
  <div class="content">
    <!-- {{ include.content }} -->
  </div>
</div>
```

### Ruby Components

Bridgetown's Ruby components convert to Liquid includes:

```ruby
# Bridgetown (src/_components/shared/author_bio.rb)
class Shared::AuthorBio < Bridgetown::Component
  def initialize(author:)
    @author = site.data.authors[author]
  end
end
```

```erb
# Bridgetown (src/_components/shared/author_bio.erb)
<div class="author-bio">
  <h3><%= @author.name %></h3>
  <p><%= @author.bio %></p>
</div>
```

Converts to:

```
# Rustyll (_includes/shared/author_bio.html)
<!-- {% assign author = site.data.authors[include.author] %} -->
<div class="author-bio">
  <h3><!-- {{ author.name }} --></h3>
  <p><!-- {{ author.bio }} --></p>
</div>
```

## Asset Pipeline

Bridgetown's esbuild/webpack assets convert to Rustyll's asset structure:

| Bridgetown | Rustyll | Notes |
|------------|---------|-------|
| `frontend/javascript/` | `assets/js/` | JavaScript files |
| `frontend/styles/` | `_sass/` and `assets/css/` | CSS/SCSS files |
| `frontend/images/` | `assets/images/` | Image files |
| `import` statements | Standard includes | Asset references |

## Plugins

Bridgetown plugins convert to Rustyll plugins:

| Bridgetown Plugin | Rustyll Equivalent |
|-------------------|-------------------|
| `bridgetown-feed` | Built-in feed functionality |
| `bridgetown-seo-tag` | `rustyll-seo` |
| `bridgetown-sitemap` | `rustyll-sitemap` |
| `bridgetown-minify-html` | `rustyll-minify-html` |
| Ruby-based plugins | Rust-based plugins |

## Performance Improvements

Rustyll offers significant performance advantages over Ruby-based Bridgetown:

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

### Ruby Components

If you use Ruby components in Bridgetown:

1. Convert to Liquid includes using the `include` tag
2. Break complex components into smaller, more focused includes
3. Use data files for dynamic configuration

### Front-end Integration

If you rely on Bridgetown's frontend integration:

1. Move JavaScript to standard asset directories
2. Configure scripts in individual HTML files
3. Use simpler build processes for assets

### Ruby Helpers

If you use Ruby helpers in Bridgetown:

1. Look for equivalent Liquid filters in Rustyll
2. Consider using custom Liquid filters via plugins
3. Simplify template logic where possible

## Content Collections

Bridgetown's and Rustyll's collections work similarly:

```yaml
# _config.yml
collections:
  products:
    output: true
    permalink: /products/:name/
    sort_by: price
    sort_direction: ascending
```

## Migration Checklist

- [ ] Install Rust and Rustyll
- [ ] Back up your Bridgetown site
- [ ] Run the migration command
- [ ] Review content and front matter
- [ ] Check templates and includes
- [ ] Test component conversions
- [ ] Verify asset pipeline works
- [ ] Build with `rustyll build`
- [ ] Preview site with `rustyll serve`
- [ ] Test responsive design
- [ ] Fix any styling issues
- [ ] Update deployment workflows

## Need Help?

- [Rustyll Forum](https://forum.rustyll.com)
- [Rustyll Discord](https://discord.gg/rustyll)
- [GitHub Issues](https://github.com/rustyll/rustyll/issues) 