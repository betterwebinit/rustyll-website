---
title: Migrating from Assemble
permalink: /docs/migrating/assemble-to-rustyll/
---

Migrating from JavaScript-based Assemble to Rustyll? This guide will help you transition from Assemble's component-based approach to Rustyll's high-performance static site generation while preserving your content structure.

## Installation

First, install Rustyll using Cargo (Rust's package manager):

```sh
# Install Rust if you haven't already
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Rustyll
cargo install rustyll
```

## Automatic Migration

Rustyll provides a built-in migration tool for Assemble sites:

```sh
rustyll migrate --from assemble --source ./my-assemble-site --destination ./my-rustyll-site
```

This command will:
1. Convert Assemble's pages and templates to Rustyll format
2. Transform Handlebars templates to Liquid templates
3. Process YAML front matter 
4. Adapt Assemble's data organization to Rustyll's approach
5. Generate a migration report

## Directory Structure Differences

| Assemble | Rustyll | Notes |
|----------|---------|-------|
| `pages/` | Root directory | Content pages |
| `templates/` | `_layouts/` and `_includes/` | Templates are split by purpose |
| `partials/` | `_includes/` | Reusable components |
| `data/` | `_data/` | Data files (similar functionality) |
| `dist/` | `_site/` | Generated site |
| `assets/` | `assets/` | Static assets (same structure) |
| `Gruntfile.js` | `_config.yml` | Configuration |

## Content Conversion

Assemble pages with YAML front matter convert to Rustyll's format:

```html
<!-- Assemble (pages/about.hbs) -->
---
title: About Us
layout: default
---
<div class="about">
  <h1>\{\{title\}\}</h1>
  <p>This is the about page.</p>
</div>
```

Converts to:

```html
<!-- Rustyll (about.html) -->
---
title: About Us
layout: default
---
<div class="about">
  <h1>{{ page.title }}</h1>
  <p>This is the about page.</p>
</div>
```

## Template Conversion

### Handlebars to Liquid

Assemble's Handlebars templates convert to Rustyll's Liquid templates:

```html
<!-- Assemble (templates/layouts/default.hbs) -->
<!DOCTYPE html>
<html>
<head>
  <title>\{\{title\}\}</title>
  <link rel="stylesheet" href="\{\{assets\}\}/css/style.css">
</head>
<body>
  <header>
    \{\{> header\}\}
  </header>
  <main>
    \{\{> body\}\}
  </main>
  <footer>
    \{\{> footer\}\}
  </footer>
</body>
</html>
```

Converts to:

```html
<!-- Rustyll (_layouts/default.html) -->
<!DOCTYPE html>
<html>
<head>
  <title><!-- {{ page.title }} --></title>
  <link rel="stylesheet" href="<!-- {{ '/assets/css/style.css' | relative_url }} -->">
</head>
<body>
  <header>
    <!-- {% include header.html %} -->
  </header>
  <main>
    <!-- {{ content }} -->
  </main>
  <footer>
    <!-- {% include footer.html %} -->
  </footer>
</body>
</html>
```

### Partials to Includes

Assemble's partials convert to Rustyll includes:

```html
<!-- Assemble (partials/header.hbs) -->
<nav>
  \{\{#each pages\}\}
    <a href="\{\{this.url\}\}" class="\{\{#if this.isActive\}\}active\{\{/if\}\}">\{\{this.title\}\}</a>
  \{\{/each\}\}
</nav>
```

Converts to:

```html
<!-- Rustyll (_includes/header.html) -->
<nav>
  <!-- Liquid for loop starts -->
  <!-- {% for page in site.pages %} -->
    <a href="{{ page.url }}" class="{% if page.url == page.active_url %}active{% endif %}">{{ page.title }}</a>
  <!-- {% endfor %} -->
  <!-- Liquid for loop ends -->
</nav>
```

## Configuration Conversion

Assemble's Grunt configuration converts to Rustyll's YAML:

```javascript
// Assemble (Gruntfile.js)
module.exports = function(grunt) {
  grunt.initConfig({
    assemble: {
      options: {
        site: {
          title: 'My Assemble Site',
          description: 'A website built with Assemble'
        },
        layouts: 'templates/layouts',
        partials: 'templates/partials',
        data: 'data/*.{json,yml}'
      },
      site: {
        files: [
          { expand: true, cwd: 'pages', src: '**/*.hbs', dest: 'dist/' }
        ]
      }
    }
  });
  
  grunt.loadNpmTasks('assemble');
  grunt.registerTask('default', ['assemble']);
};
```

Converts to:

```yaml
# Rustyll (_config.yml)
title: My Assemble Site
description: A website built with Assemble

# Directory settings
layouts_dir: _layouts
includes_dir: _includes

# Build settings
markdown: commonmark
permalink: pretty

# Performance settings
threads: auto
incremental: true
```

## Data System Conversion

Assemble's data file approach converts to Rustyll's `_data` directory:

```yaml
# Assemble (data/team.yml)
members:
  - name: John Doe
    role: Developer
  - name: Jane Smith
    role: Designer
```

Transfers directly to:

```yaml
# Rustyll (_data/team.yml)
members:
  - name: John Doe
    role: Developer
  - name: Jane Smith
    role: Designer
```

## Helpers to Filters and Tags

Assemble's custom helpers convert to Rustyll's Liquid filters or includes:

```html
<!-- Assemble (with custom helper) -->
<div class="posts">
  \{\{#each posts\}\}
    <article>
      <h2>\{\{title\}\}</h2>
      <p>\{\{truncate description 100\}\}</p>
    </article>
  \{\{/each\}\}
</div>
```

Converts to:

```html
<!-- Rustyll (with filter) -->
<div class="posts">
  <!-- Liquid for loop starts -->
  <!-- {% for post in site.posts %} -->
    <article>
      <h2>{{ post.title }}</h2>
      <p>{{ post.description | truncate: 100 }}</p>
    </article>
  <!-- {% endfor %} -->
  <!-- Liquid for loop ends -->
</div>
```

## Collections

Assemble's post grouping can be implemented using Rustyll collections:

```yaml
# Rustyll (_config.yml)
collections:
  projects:
    output: true
    permalink: /projects/:path/
```

With corresponding content files:

```markdown
<!-- Rustyll (_projects/project1.md) -->
---
title: First Project
description: Description of first project
featured: true
---

Content for first project goes here.
```

## Performance Improvements

Rustyll offers significant performance advantages over JavaScript-based Assemble:

```yaml
# Rustyll performance options
threads: auto  # Use all available CPU cores
incremental: true  # Enable incremental builds
cache:
  enabled: true
  strategy: aggressive
```

Comparison:
1. **Build Speed**: 10-20x faster for large sites
2. **Memory Usage**: Much lower RAM consumption
3. **Concurrency**: Efficient use of all CPU cores

## Troubleshooting Common Issues

### Template Syntax Differences

If you encounter template conversion issues:

1. Handlebars uses `\{\{variable\}\}` syntax while Liquid uses `{ { variable } }` (with spaces)
2. Handlebars helpers (`\{\{#each\}\}`) convert to Liquid tags (`{ % for % }`)
3. Handlebars context (`this`) is handled differently in Liquid

### Helper Functions

For complex Assemble helpers:

1. Use Liquid's built-in filters when possible
2. Create custom Liquid tags for complex functionality
3. Use JavaScript in the browser for dynamic components

### Layout System

Assemble and Rustyll handle layouts differently:

1. Assemble uses `\{\{> body\}\}` for content injection
2. Rustyll uses `{ { content } }` in layout files
3. Nested layouts work differently in Rustyll

## Migration Checklist

- [ ] Install Rust and Rustyll
- [ ] Back up your Assemble site
- [ ] Run the migration command
- [ ] Check template conversions
- [ ] Set up collections for content types
- [ ] Convert Handlebars helpers to Liquid filters
- [ ] Update asset references
- [ ] Configure permalink structure
- [ ] Test build with `rustyll build`
- [ ] Preview site with `rustyll serve`
- [ ] Fix any template or rendering issues
- [ ] Optimize performance settings
- [ ] Update deployment workflows

## Need Help?

- [Rustyll Forum](https://forum.rustyll.com)
- [Rustyll Discord](https://discord.gg/rustyll)
- [GitHub Issues](https://github.com/rustyll/rustyll/issues) 