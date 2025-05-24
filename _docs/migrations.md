---
title: Blog Migrations
permalink: /docs/migrations/
---

If you're switching to Rustyll from another blogging system or static site generator, Rustyll's importers can help you with the move. Rustyll is designed for seamless migration with significant performance improvements.

## Migrating from Jekyll

Rustyll is designed to be 100% compatible with existing Jekyll sites. To migrate from Jekyll:

1. Install Rustyll:
```bash
cargo install rustyll
```

2. Navigate to your existing Jekyll site and run:
```bash
rustyll serve
```

That's it! Rustyll will detect your Jekyll site structure and build it without any modifications needed.

### Optimizing After Migration

While your Jekyll site will work immediately, you can enhance performance further:

1. Enable parallel processing in `_config.yml`:
```yaml
# Add to your existing _config.yml
threads: auto        # Use all available CPU cores
parallel: true       # Enable parallel processing
incremental: true    # Enable incremental builds
```

2. Add Rustyll-specific front matter to key pages:
```yaml
---
title: "My Important Page"
parallel: true           # Process in parallel
render_priority: 1       # High priority (1-10, lower is higher)
cache: aggressive        # Aggressive caching
---
```

3. Optimize assets:
```bash
rustyll optimize-assets
```

## Jekyll vs. Rustyll Performance

| Site Size | Jekyll | Rustyll | Improvement |
|-----------|--------|---------|------------|
| Small (50 pages) | 3s | 0.2s | 15x faster |
| Medium (500 pages) | 30s | 1.5s | 20x faster |
| Large (5000 pages) | 5m+ | 9s | 33x faster |
| Enterprise (50,000+ pages) | Hours | Minutes | 60x+ faster |

## Migrating from Other Systems

Rustyll includes built-in importers for popular blogging platforms and static site generators:

### WordPress

```bash
rustyll import wordpress --source wordpress.xml --output _posts
```

#### WordPress Migration Options

```bash
# Full site migration with pages, posts, and media
rustyll import wordpress --full --source wordpress.xml --output .

# Retain WordPress permalinks
rustyll import wordpress --source wordpress.xml --output . --retain-permalinks

# Import media files
rustyll import wordpress --source wordpress.xml --output . --with-media
```

### Hugo

```bash
rustyll import hugo --source hugo-site-dir --output .
```

#### Hugo Migration Notes

- Hugo shortcodes are automatically converted to Liquid tags
- Archetypes are converted to front matter defaults
- Page bundles are properly converted to Rustyll's structure

### Ghost

```bash
rustyll import ghost --source ghost-export.json --output .
```

### Gatsby

```bash
rustyll import gatsby --source gatsby-site-dir --output .
```

#### Gatsby Migration Notes

- GraphQL queries are converted to Liquid code
- React components are transformed to includes
- CSS-in-JS is extracted to proper stylesheets

## Handling Large Migrations

For very large sites, Rustyll provides specialized tools:

```bash
# Parallel import for large WordPress sites
rustyll import wordpress --source wordpress.xml --output . --parallel --threads 16

# Memory-optimized import for huge datasets
rustyll import wordpress --source wordpress.xml --output . --memory-optimized

# Incremental import (only import new content)
rustyll import wordpress --source wordpress.xml --output . --incremental
```

## Performance Gains

When migrating from Jekyll to Rustyll, you'll experience immediate performance improvements:

* Build times 10-100x faster
* Lower memory usage
* Parallel processing of content files
* Incremental builds for even faster development
* Optimized asset processing and delivery

## Troubleshooting Migrations

### Common Issues

1. **Liquid Syntax Variations**: Some Jekyll themes use non-standard Liquid syntax. Use `rustyll check --compatibility` to identify issues.

2. **Plugin Dependencies**: Some Jekyll plugins may not have Rustyll equivalents. Run `rustyll doctor` to get a compatibility report.

3. **Custom Generators**: Jekyll custom generators need to be rewritten for Rustyll. See our [plugin migration guide]({{ '/docs/plugins/migration/' | relative_url }}).

### Migration Validation

After migration, verify your site:

```bash
# Check for any rendering issues
rustyll doctor

# Test the site with all pages
rustyll test

# Compare output with Jekyll (if installed)
rustyll compare-with-jekyll
```

## Advanced Import Options

For complex migrations or other systems, visit our [comprehensive import documentation](https://import.rustyll.org/docs/home/) for detailed guides and advanced options.

## Custom Migrations

For custom migration needs, Rustyll provides a flexible migration API that can be extended:

```rust
use rustyll::migration::{Migrator, Options};

fn main() {
    let options = Options {
        source: "my-custom-cms-export.json",
        output: "_posts",
        // other options...
    };
    
    let migrator = CustomMigrator::new(options);
    migrator.run();
}
```

### Custom Migration Optimization

Custom migrations can take advantage of Rustyll's parallel processing:

```rust
use rustyll::migration::{Migrator, Options};
use rayon::prelude::*;

impl CustomMigrator {
    fn process_entries(&self) -> Result<(), Error> {
        // Process entries in parallel
        self.entries.par_iter()
                   .map(|entry| self.process_entry(entry))
                   .collect()
    }
}
```

## Enterprise Migration Services

For enterprise-level migrations with complex requirements, custom workflows, or high-volume content, Rustyll offers professional migration services. Contact [enterprise@rustyll.org](mailto:enterprise@rustyll.org) for details.
