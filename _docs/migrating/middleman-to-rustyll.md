---
title: Migrating from Middleman
permalink: /docs/migrating/middleman-to-rustyll/
---

Migrating from Ruby-based Middleman to Rustyll? This guide will help you transition your site to high-performance Rust-powered Rustyll while preserving your content and maintaining a familiar development workflow.

## Installation

First, install Rustyll using Cargo (Rust's package manager):

```sh
# Install Rust if you haven't already
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Rustyll
cargo install rustyll
```

## Automatic Migration

Rustyll provides a built-in migration tool for Middleman sites:

```sh
rustyll migrate --from middleman --source ./my-middleman-site --destination ./my-rustyll-site
```

This command will:
1. Copy all content files
2. Convert Middleman frontmatter to Rustyll format
3. Transform Middleman templates to Liquid templates
4. Adjust configuration settings
5. Generate a migration report

## Directory Structure Differences

| Middleman | Rustyll | Notes |
|-----------|---------|-------|
| `source/` | Root directory | Content goes in the root folder in Rustyll |
| `source/layouts/` | `_layouts/` | Layout templates |
| `source/partials/` | `_includes/` | Partial templates |
| `data/` | `_data/` | Data files |
| `config.rb` | `_config.yml` | Configuration file |
| `build/` | `_site/` | Generated site |
| `source/blog/` | `_posts/` | Blog articles |

## Content Conversion

Middleman pages convert to Rustyll pages:

```erb
<!-- Middleman (source/about.html.erb) -->
---
title: About Us
layout: page
---

<h1><%= current_page.data.title %></h1>
<p>This is the about page.</p>
```

Converts to:

```markdown
<!-- Rustyll (about.md) -->
---
title: About Us
layout: page
---

# {% raw %}{{ page.title }}{% endraw %}
This is the about page.
```

## Blog Articles

Middleman blog articles convert to Rustyll posts:

```md
<!-- Middleman (source/blog/2023-01-15-hello-world.html.md) -->
---
title: Hello World
date: 2023-01-15
tags: welcome, introduction
---

This is my first blog post.
```

Converts to:

```md
<!-- Rustyll (_posts/2023-01-15-hello-world.md) -->
---
title: Hello World
date: 2023-01-15
tags:
  - welcome
  - introduction
---

This is my first blog post.
```

## Configuration Conversion

Middleman's Ruby configuration converts to Rustyll's YAML:

```ruby
# Middleman (config.rb)
set :site_title, "My Middleman Site"
set :site_url, "https://example.com"
set :markdown_engine, :kramdown
set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

activate :blog do |blog|
  blog.prefix = "blog"
  blog.permalink = "{year}/{month}/{day}/{title}.html"
  blog.layout = "blog_layout"
end

activate :livereload
activate :directory_indexes
```

Converts to:

```yaml
# Rustyll (_config.yml)
title: "My Middleman Site"
url: "https://example.com"
markdown: kramdown
sass:
  sass_dir: _sass
  style: compressed

# Blog configuration
permalink: /:year/:month/:day/:title/
defaults:
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "blog_layout"

# Live reload is built into Rustyll serve
livereload: true
```

## Template Conversion

Middleman uses ERB, Haml, or other templates, while Rustyll uses Liquid:

| Middleman (ERB) | Rustyll (Liquid) |
|-----------------|------------------|
| `<%= current_page.data.title %>` | `{% raw %}{{ page.title }}{% endraw %}` |
| `<% blog.articles.each do |article| %>` | `{% raw %}`{% for post in site.posts %}`{% endraw %}` |
| `<% end %>` | `{% raw %}`{% endfor %}`{% endraw %}` |
| `<%= partial "header" %>` | `{% raw %}`{% include header.html %}`{% endraw %}` |
| `<%= yield %>` | `{% raw %}{{ content }}{% endraw %}` |
| `<%= link_to "Home", "/" %>` | `<a href="{% raw %}{{ '/' | relative_url }}{% endraw %}">Home</a>` |
| `<%= asset_path :css, 'style' %>` | `{% raw %}{{ '/assets/css/style.css' | relative_url }}{% endraw %}` |

## Helper Functions

Middleman helpers convert to Liquid filters or includes:

| Middleman Helper | Rustyll Equivalent |
|------------------|-------------------|
| `link_to` | HTML links with `relative_url` filter |
| `image_tag` | HTML img tags with `relative_url` filter |
| `asset_path` | `relative_url` filter |
| `current_page.data.x` | `page.x` |
| Custom helpers | Liquid includes or custom plugins |

## Asset Pipeline

Middleman's asset pipeline converts to Rustyll's asset handling:

| Middleman | Rustyll | Notes |
|-----------|---------|-------|
| Sprockets | Built-in Sass/Asset processing | Automatic compilation |
| Asset hashing | Built-in asset hashing | File fingerprinting |
| CSS import | Sass imports | Combining stylesheets |
| JS concatenation | JS includes | Combining scripts |

## Data Files

Middleman data files are fully compatible with Rustyll:

```yaml
# Both systems (data/team.yml)
- name: John Doe
  position: Developer
  
- name: Jane Smith
  position: Designer
```

Used in Middleman as `data.team` and in Rustyll as `site.data.team`.

## Front Matter Defaults

Middleman's blog configuration options convert to Rustyll front matter defaults:

```yaml
# Rustyll (_config.yml)
defaults:
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
      author: "Default Author"
  
  - scope:
      path: "projects"
    values:
      layout: "project"
      permalink: "/projects/:title/"
```

## Extensions to Plugins

Middleman extensions convert to Rustyll plugins:

| Middleman Extension | Rustyll Equivalent |
|--------------------|-------------------|
| `middleman-blog` | Built-in blog functionality |
| `middleman-livereload` | `--livereload` flag |
| `middleman-search` | `rustyll-search` plugin |
| `middleman-syntax` | Built-in syntax highlighting |
| `middleman-autoprefixer` | `rustyll-autoprefixer` plugin |

## Performance Improvements

Rustyll offers significant performance advantages over Ruby-based Middleman:

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
3. **Live Reload**: Faster refresh during development

## Troubleshooting Common Issues

### Ruby Dependencies

If your Middleman site relies on Ruby gems:

1. Look for Rustyll plugin equivalents
2. Consider alternative implementation strategies
3. Simplify functionality where appropriate

### Template Engine Differences

If you use template engines other than ERB:

1. Convert Haml/Slim to HTML with Liquid tags
2. Replace complex template logic with simpler Liquid equivalents
3. Create includes for repeatable components

### Custom Extensions

If you use custom Middleman extensions:

1. Review the functionality needed
2. Look for Rustyll plugins that provide similar features
3. Consider creating custom Rustyll plugins

## Migration Checklist

- [ ] Install Rust and Rustyll
- [ ] Back up your Middleman site
- [ ] Run the migration command
- [ ] Review content and frontmatter
- [ ] Check templates and layouts
- [ ] Update custom functionality
- [ ] Test build with `rustyll build`
- [ ] Preview site with `rustyll serve`
- [ ] Verify asset compilation
- [ ] Test responsiveness and interactivity
- [ ] Fix any styling issues
- [ ] Update deployment workflows

## Need Help?

- [Rustyll Forum](https://forum.rustyll.com)
- [Rustyll Discord](https://discord.gg/rustyll)
- [GitHub Issues](https://github.com/rustyll/rustyll/issues) 