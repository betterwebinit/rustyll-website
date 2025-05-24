---
title: Cache API
author: rustyllteam
date: 2024-06-01 10:00:00 -0400
---

Rustyll includes a high-performance caching API that dramatically improves build speeds. This cache is used both internally and exposed for plugins. The cache persists across builds but is intelligently invalidated when Rustyll detects changes to `_config.yml` or relevant files.

## Performance Improvements

Rustyll's caching system offers significant advantages over traditional static site generators:

| Feature | Traditional SSGs | Rustyll | Improvement |
| ------- | --------------- | ------- | ----------- |
| Cache granularity | File-level | Component-level | 5-10x faster rebuilds |
| Multi-level caching | No | Yes | More efficient for complex sites |
| Parallel cache access | Limited | Full | Better utilization of CPU cores |
| Memory efficiency | High overhead | Low overhead | Handles larger sites |

## Basic Usage

The most common way to use the cache is through the `get_or_compute` method:

```rust
use rustyll::cache::Cache;

fn convert_markdown_to_html(markdown: &str) -> String {
    // Create or get an existing cache
    let cache = Cache::new("markdown_converter");
    
    // Get from cache or compute if not found
    cache.get_or_compute(markdown, || {
    expensive_conversion_method(markdown)
    })
}
```

In this example, `expensive_conversion_method` will only be called once for any given markdown input. If `convert_markdown_to_html` is called again with the same input, the cached output will be returned.

## Cache Configuration

Rustyll's cache can be configured in `_config.yml`:

```yaml
cache:
  enabled: true
  strategy: aggressive  # conservative, balanced, aggressive
  max_size: 500MB       # Maximum cache size
  ttl: 24h              # Time-to-live for cache entries
  concurrent: true      # Enable concurrent access
  
  # Optional distributed cache
  distributed:
    enabled: false
    provider: memcached  # memcached, redis
    servers:
      - localhost:11211
```

## Advanced Usage

### Tiered Caching

Rustyll supports tiered caching for optimal performance:

```rust
use rustyll::cache::{Cache, TieredCache};

// Create a tiered cache with memory and disk layers
let cache = TieredCache::new()
    .with_memory_layer(100_000)     // 100K items in memory
    .with_disk_layer("markdown");   // Persistent disk cache

// Use like a regular cache
let result = cache.get_or_compute(key, || expensive_operation());
```

### Cache Control with Metadata

You can include cache directives in front matter:

```yaml
---
title: My Page
cache:
  strategy: aggressive
  ttl: 1h
---
```

### Programmatic Cache Management

```rust
// Clear specific cache
Cache::new("markdown_converter").clear();

// Clear all caches
Cache::clear_all();

// Check if key exists
if cache.contains_key(key) {
    // ...
}

// Add to cache directly
cache.set(key, value);

// Get with a fallback
let value = cache.get(key).unwrap_or_else(|| default_value);

// Remove from cache
cache.remove(key);
```

## Performance Monitoring

Rustyll provides cache performance metrics:

```bash
rustyll build --profile

# Output includes:
# Cache Statistics:
#  - Hit rate: 87.3%
#  - Memory usage: 124MB
#  - Avg retrieval time: 0.2ms
#  - Total saved build time: 12.4s
```

These metrics help you fine-tune cache configuration for optimal performance.

## Distributed Caching

For large sites or team environments, Rustyll supports distributed caching:

```yaml
# _config.yml
cache:
  distributed:
    enabled: true
    provider: memcached
    servers:
      - cache1.example.com:11211
      - cache2.example.com:11211
```

This allows build caches to be shared across multiple developers or build servers.
