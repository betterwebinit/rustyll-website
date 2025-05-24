---
title: Migrating from Eleventy
permalink: /docs/migrating/eleventy-to-rustyll/
---

Migrating from Eleventy (11ty) to Rustyll? This guide will help you transition from JavaScript-based Eleventy to Rust-powered Rustyll while preserving your content and layouts.

## Installation

First, install Rustyll using Cargo (Rust's package manager):

```sh
# Install Rust if you haven't already
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Rustyll
cargo install rustyll
```

## Automatic Migration

Rustyll provides a built-in migration tool for Eleventy sites:

```sh
rustyll migrate --from eleventy --source ./my-eleventy-site --destination ./my-rustyll-site
```

This command will:
1. Copy all content files
2. Convert Eleventy-specific front matter to Rustyll format
3. Transform templates to Liquid format (if they aren't already)
4. Adjust configuration settings
5. Generate a migration report

## Directory Structure Differences

| Eleventy | Rustyll | Notes |
|----------|---------|-------|
| Input directory (configurable) | Root directory | Content goes in the root folder in Rustyll |
| `_includes/` | `_includes/` | Same structure for includes |
| `_data/` | `_data/` | Same structure for data files |
| `.eleventy.js` | `_config.yml` | Configuration file (YAML format) |
| Output directory (configurable) | `_site/` | Default output directory |

## Template Differences

Eleventy supports multiple template languages, while Rustyll primarily uses Liquid:

| Eleventy | Rustyll |
|----------|---------|
| Liquid (.liquid) | Liquid |
| Nunjucks (.njk) | Converted to Liquid |
| Handlebars (.hbs) | Converted to Liquid |
| EJS (.ejs) | Converted to Liquid |
| JavaScript (.11ty.js) | Needs manual conversion |

### Liquid Templates

If you're already using Liquid templates in Eleventy, the transition will be straightforward:

| Eleventy (Liquid) | Rustyll (Liquid) |
|-------------------|------------------|
| `{% raw %}{{ page.title }}{% endraw %}` | `{{ page.title }}` |
| `{% raw %}{% for post in collections.posts %}{% endraw %}` | `{% raw %}{% for post in site.posts %}{% endraw %}` |
| `{% raw %}{% endfor %}{% endraw %}` | `{% raw %}{% endfor %}{% endraw %}` |
| `{% raw %}{% if page.tags contains "featured" %}{% endraw %}` | `{% raw %}{% if page.tags contains "featured" %}{% endraw %}` |
| {% raw %}`{% include "header.html" %}`{% endraw %} | {% raw %}`{% include header.html %}`{% endraw %} |

### Nunjucks to Liquid Conversion

If you're using Nunjucks templates, the migrator will convert them to Liquid:

| Eleventy (Nunjucks) | Rustyll (Liquid) |
|---------------------|------------------|
| `{% raw %}{{ page.title }}{% endraw %}` | `{{ page.title }}` |
| `{% raw %}{% for post in collections.posts %}{% endraw %}` | `{% raw %}{% for post in site.posts %}{% endraw %}` |
| `{% raw %}{% endfor %}{% endraw %}` | `{% raw %}{% endfor %}{% endraw %}` |
| `{% raw %}{% if page.tags contains "featured" %}{% endraw %}` | `{% raw %}{% if page.tags contains "featured" %}{% endraw %}` |
| {% raw %}`{% include "header.njk" %}`{% endraw %} | {% raw %}`{% include header.html %}`{% endraw %} |
| {% raw %}`{% set variable = value %}`{% endraw %} | `{% assign variable = value %}` |

## Front Matter

Eleventy front matter is generally compatible with Rustyll:

```yaml
---
title: My Post
date: 2023-01-01
tags: 
  - tech
  - rust
layout: post
---
```

## Collections and Data

Eleventy uses the concept of collections, while Rustyll has both collections and posts:

| Eleventy | Rustyll | Notes |
|----------|---------|-------|
| `collections.posts` | `site.posts` | Blog posts in Rustyll |
| `collections.customType` | `site.customType` | Custom collections in Rustyll |
| `{% raw %}{{ collections.all }}{% endraw %}` | `{% raw %}{{ site.pages }}{% endraw %}` and `{% raw %}{{ site.posts }}{% endraw %}` | All content |

Configure collections in Rustyll's `_config.yml`:

```yaml
# Rustyll collections (similar to Eleventy collections)
collections:
  projects:
    output: true
    permalink: /projects/:name/
```

## Configuration Conversion

Eleventy uses a JavaScript configuration file, while Rustyll uses YAML:

```js
// Eleventy (.eleventy.js)
module.exports = function(eleventyConfig) {
  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
```

Converts to:

```yaml
# Rustyll (_config.yml)
source: src
destination: dist
```

## Filters and Shortcodes

Eleventy's custom filters and shortcodes need to be converted to Rustyll's plugin system:

| Eleventy | Rustyll |
|----------|---------|
| Custom filters in .eleventy.js | Custom Liquid filters in Rust plugins |
| Shortcodes | Includes or Liquid tags |

For example, an Eleventy shortcode:

```js
// Eleventy
eleventyConfig.addShortcode("user", function(name, avatar) {
  return `<div class="user">
    <img src="${avatar}" alt="${name}">
    <h2>${name}</h2>
  </div>`;
});
```

Would become a Rustyll include (`_includes/user.html`):

```html
<!-- Rustyll -->
<div class="user">
  <img src="{{ avatar }}" alt="{{ name }}">
  <h2>{{ name }}</h2>
</div>
```

Used as: {% raw %}`{% include user.html name="John" avatar="/images/john.jpg" %}`{% endraw %}

## Performance Optimization

Rustyll offers significant performance improvements over Eleventy:

```yaml
# Rustyll performance options
threads: auto  # Use all available CPU cores
incremental: true  # Enable incremental builds
cache:
  enabled: true
  strategy: aggressive
```

## Troubleshooting Common Issues

### JavaScript Templates and Functions

If you heavily use JavaScript in your Eleventy site:

1. Convert JavaScript templates to Liquid templates
2. Replace custom JavaScript functions with Liquid filters
3. Consider using Rustyll plugins for complex functionality

### Pagination Differences

Eleventy and Rustyll handle pagination differently:

```yaml
# Rustyll pagination
paginate: 10  # Posts per page
paginate_path: "/blog/page:num/"
```

## Migration Checklist

- [ ] Install Rust and Rustyll
- [ ] Back up your Eleventy site
- [ ] Run the migration command
- [ ] Update templates to use Rustyll's syntax
- [ ] Configure collections
- [ ] Create includes for shortcodes
- [ ] Test build with `rustyll build`
- [ ] Preview site with `rustyll serve`
- [ ] Check for template errors
- [ ] Verify all content renders correctly
- [ ] Update deployment workflows

## Need Help?

- [Rustyll Forum](https://forum.rustyll.com)
- [Rustyll Discord](https://discord.gg/rustyll)
- [GitHub Issues](https://github.com/rustyll/rustyll/issues) 