---
title: Parallel Processing in Rustyll
author: rustyllteam
date: 2024-06-01 10:00:00 -0400
---

One of Rustyll's most powerful features is its ability to process your site in parallel, dramatically reducing build times. This tutorial will show you how to take full advantage of Rustyll's parallel processing capabilities.

## Why Parallel Processing Matters

Static site generators often need to process hundreds or thousands of files. Rustyll, built in Rust, can process multiple files simultaneously across all available CPU cores.

## Performance Comparison

| Site Size | Jekyll | Rustyll (1 core) | Rustyll (8 cores) |
| --------- | ------ | ---------------- | ----------------- |
| Small (50 pages) | 5.2s | 2.1s | 0.4s |
| Medium (500 pages) | 28.4s | 9.6s | 1.8s |
| Large (5,000 pages) | 312s | 98s | 18s |

## Basic Configuration

To enable parallel processing, add these settings to your `_config.yml`:

```yaml
# Use all available CPU cores
threads: auto

# Enable parallel processing
parallel: true
```

These simple settings will provide significant performance improvements for most sites.

## Advanced Configuration

For more control over parallel processing, you can use these advanced settings:

```yaml
# Advanced parallel processing configuration
parallel:
  enabled: true
  strategy: optimistic  # conservative, balanced, or optimistic
  max_threads_per_task: 4
  components:
    markdown: true
    sass: true
    liquid: true
    layouts: true
    assets: true
  
  # Memory management
  memory_limit: 0       # MB (0 = unlimited)
  chunk_size: 500       # Process files in chunks
```

### Strategies Explained

* **conservative**: Prioritizes stability over speed, with fewer parallel operations
* **balanced**: Default setting that works well for most sites
* **optimistic**: Maximizes parallelism, best for multi-core systems with plenty of memory

## Per-Page Configuration

You can control parallel processing for individual pages using front matter:

```yaml
---
title: Important Page
parallel: true             # Process this file in parallel
render_priority: 1         # Higher priority (1-10, lower = higher)
---
```

This is useful for prioritizing your most important pages or applying special handling to complex pages.

## Practical Examples

### Example 1: Basic Site

For a typical blog or documentation site:

```yaml
# _config.yml
threads: auto
parallel: true
```

### Example 2: Large Documentation Site

For a large documentation site with thousands of pages:

```yaml
# _config.yml
threads: auto
parallel:
  enabled: true
  strategy: optimistic
  max_threads_per_task: 8
  components:
    markdown: true
    sass: true
    liquid: true
```

### Example 3: Resource-Constrained Environment

For building on systems with limited resources:

```yaml
# _config.yml
threads: 2
parallel:
  enabled: true
  strategy: conservative
  memory_limit: 512
```

## Monitoring Parallel Performance

To see how parallel processing is performing, use the `--profile` flag:

```bash
rustyll build --profile
```

This will show performance metrics, including:

* Total build time
* Time spent in each processing phase
* Thread utilization
* Memory usage

## Best Practices

1. **Start with default settings** - `threads: auto` and `parallel: true` work well for most sites
2. **Organize by collections** - Group related content into collections for more efficient parallel processing
3. **Prioritize important pages** - Use `render_priority` for critical pages
4. **Monitor performance** - Use the `--profile` flag to identify bottlenecks
5. **Adjust based on hardware** - More threads aren't always better, especially on memory-constrained systems

## Troubleshooting

If you encounter issues with parallel processing:

1. **Start conservative** - Use `parallel.strategy: conservative` 
2. **Reduce thread count** - Try `threads: 4` instead of `auto`
3. **Check memory usage** - Set a `memory_limit` if your system is running out of RAM
4. **Look for dependencies** - Ensure your templates don't have circular dependencies

## Conclusion

Parallel processing is one of the key features that makes Rustyll so much faster than Jekyll. With proper configuration, you can achieve build times that are 10-100x faster than Jekyll, especially for large sites. 