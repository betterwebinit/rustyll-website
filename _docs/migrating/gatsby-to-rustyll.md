---
title: Migrating from Gatsby
permalink: /docs/migrating/gatsby-to-rustyll/
---

Migrating from Gatsby to Rustyll? This guide will help you transition from React-based Gatsby to Rust-powered Rustyll, simplifying your stack while maintaining content and SEO benefits.

## Installation

First, install Rustyll using Cargo (Rust's package manager):

```sh
# Install Rust if you haven't already
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Rustyll
cargo install rustyll
```

## Automatic Migration

Rustyll provides a built-in migration tool for Gatsby sites:

```sh
rustyll migrate --from gatsby --source ./my-gatsby-site --destination ./my-rustyll-site
```

This command will:
1. Extract content from Gatsby's data layer
2. Convert MDX/Markdown content to Rustyll format
3. Create Liquid templates from React components
4. Adjust configuration settings
5. Generate a migration report

## Key Differences

| Gatsby | Rustyll |
|--------|---------|
| React-based | Liquid templates |
| JavaScript/TypeScript | Rust (core) with front-end languages |
| GraphQL data layer | Simple data structures |
| npm/yarn dependencies | Minimal dependencies |
| Client-side hydration | Static HTML (primarily) |

## Directory Structure Changes

| Gatsby | Rustyll | Notes |
|--------|---------|-------|
| `src/pages/` | Root directory | Pages go in the root folder |
| `src/templates/` | `_layouts/` | Templates for different content types |
| `src/components/` | `_includes/` | Reusable components |
| `static/` | `assets/` | Static files location |
| `content/` | `_posts/` etc. | Content moves to appropriate collections |
| `gatsby-config.js` | `_config.yml` | Configuration file |

## Content Transformation

### From MDX to Markdown

Gatsby often uses MDX (Markdown + JSX). The migrator will convert this to Markdown with Liquid includes:

```mdx
---
title: My Gatsby Post
date: 2023-01-01
---

# Hello world

{% raw %}`{% include custom-component.html prop="value" %}`{% endraw %}

Some more content.
```

Converts to:

```markdown
---
title: My Gatsby Post
date: 2023-01-01
---

# Hello world

{% raw %}`{% include custom-component.html prop="value" %}`{% endraw %}

Some more content.
```

### GraphQL to Front Matter

Gatsby's GraphQL queries will be converted to front matter and site data:

```javascript
// Gatsby
export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
```

In Rustyll, this data is available as:

{% raw %}`{{ site.title }}`{% endraw %}

## Components to Includes

React components need to be converted to Liquid includes:

```jsx
// Gatsby component
const Header = ({ title, description }) => (
  <header>
    <h1>{title}</h1>
    <p>{description}</p>
  </header>
);
```

Becomes a Rustyll include (`_includes/header.html`):

```html
<header>
  <h1>{% raw %}{{ title }}{% endraw %}</h1>
  <p>{% raw %}{{ description }}{% endraw %}</p>
</header>
```

Used as: {% raw %}`{% include header.html title="Page Title" description="Page description" %}`{% endraw %}

## Configuration Conversion

Gatsby uses JavaScript for configuration, while Rustyll uses YAML:

```javascript
// gatsby-config.js
module.exports = {
  siteMetadata: {
    title: "My Gatsby Site",
    description: "A site built with Gatsby",
    siteUrl: "https://example.com"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap"
  ]
};
```

Converts to:

```yaml
# _config.yml
title: "My Gatsby Site"
description: "A site built with Gatsby"
url: "https://example.com"

# Plugins
plugins:
  - rustyll-seo
  - rustyll-sitemap
```

## Handling Gatsby Plugins

Many Gatsby plugins have Rustyll equivalents:

| Gatsby Plugin | Rustyll Equivalent |
|---------------|-------------------|
| gatsby-plugin-sitemap | rustyll-sitemap |
| gatsby-plugin-feed | rustyll-feed |
| gatsby-plugin-image | Standard HTML/CSS for images |
| gatsby-plugin-mdx | Markdown with includes |
| gatsby-source-filesystem | Built-in functionality |

## Dynamic Features

Gatsby's dynamic features can be handled in different ways:

1. **Client-side components**: Convert to static HTML or use custom JavaScript
2. **Form handling**: Use external services (Formspree, Netlify Forms)
3. **Authentication**: Use external auth providers with APIs
4. **Dynamic routes**: Configure with collections and permalinks

## Performance Comparison

While Gatsby offers code splitting and client-side optimizations, Rustyll provides:

1. **Faster build times**: 10-20x faster builds
2. **Lower memory usage**: Significantly reduced resource consumption
3. **Simpler deployment**: No Node.js runtime dependencies
4. **Multi-threading**: Utilizes all CPU cores efficiently

```yaml
# Rustyll performance options
threads: auto  # Use all available CPU cores
incremental: true  # Enable incremental builds
```

## Troubleshooting Common Issues

### React Component Conversion

If you have complex React components:

1. Break them down into smaller includes
2. Use custom JavaScript for interactive elements
3. Consider using web components for complex UI

### Data Handling

For complex data transformations:

1. Use Rustyll's data files (`_data/*.yml`)
2. Preprocess data during migration
3. Utilize Liquid filters for simple transformations

## Migration Checklist

- [ ] Install Rust and Rustyll
- [ ] Back up your Gatsby site
- [ ] Run the migration command
- [ ] Convert React components to Liquid includes
- [ ] Update templates
- [ ] Replace GraphQL queries with direct data access
- [ ] Test build with `rustyll build`
- [ ] Preview site with `rustyll serve`
- [ ] Check for template errors
- [ ] Implement client-side JavaScript as needed
- [ ] Verify all content renders correctly
- [ ] Update deployment workflows

## Need Help?

- [Rustyll Forum](https://forum.rustyll.com)
- [Rustyll Discord](https://discord.gg/rustyll)
- [GitHub Issues](https://github.com/rustyll/rustyll/issues) 