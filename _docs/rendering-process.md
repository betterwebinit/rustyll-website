---
title: Rendering Process
permalink: /docs/rendering-process/
---

This document describes how Rustyll processes and renders your site. Understanding this process will help you troubleshoot and optimize your Rustyll site.

## Overview

Rustyll's rendering process consists of several stages:

1. **Site Reading**: Read configuration and content files
2. **Content Conversion**: Convert Markdown and other formats to HTML
3. **Template Rendering**: Process Liquid templates
4. **Layout Application**: Apply layouts to content
5. **Asset Processing**: Process Sass, CoffeeScript, etc.
6. **Site Writing**: Write generated files to disk

What makes Rustyll special is how these stages are executed - in parallel across multiple CPU cores, with sophisticated dependency tracking and caching.

## Detailed Process

### 1. Site Reading

First, Rustyll reads your site configuration from `_config.yml` and loads content files:

```rust
// Pseudocode representation
let config = read_config("_config.yml");
let site = Site::new(config);

// Read content in parallel
let content_files = find_content_files();
let contents = content_files.par_iter().map(|file| {
    read_file(file)
}).collect();
```

Key differences from Jekyll:
- Files are read in parallel
- Front matter is parsed using a high-performance YAML parser
- File metadata is cached for faster incremental builds

### 2. Content Conversion

Next, Rustyll converts your content from its source format (Markdown, etc.) to HTML:

```rust
// Pseudocode representation
let converted_content = content.par_iter().map(|item| {
    match item.format() {
        Format::Markdown => convert_markdown(item),
        Format::HTML => item, // No conversion needed
        // Other formats...
    }
}).collect();
```

Key differences from Jekyll:
- Markdown conversion happens in parallel
- Uses a highly optimized Markdown parser (comrak)
- Conversion results are cached for incremental builds

### 3. Template Rendering

Rustyll then processes Liquid templates:

```rust
// Pseudocode representation
let rendered_content = content.par_iter().map(|item| {
    let context = create_context(site, item);
    render_liquid(item.content, context)
}).collect();
```

Key differences from Jekyll:
- Liquid rendering is parallelized
- Template parsing results are cached
- Optimized Liquid implementation for maximum performance

### 4. Layout Application

Next, Rustyll applies layouts to content:

```rust
// Pseudocode representation
let with_layouts = content.iter().map(|item| {
    if let Some(layout) = item.layout {
        apply_layout(item, layout, site.layouts)
    } else {
        item
    }
}).collect();
```

Key differences from Jekyll:
- Layout application can happen in parallel where possible
- Complex dependency tracking for optimal parallelization
- Layout templates are cached after parsing

### 5. Asset Processing

Rustyll processes assets like Sass, CoffeeScript, etc.:

```rust
// Pseudocode representation
let processed_assets = assets.par_iter().map(|asset| {
    match asset.type() {
        AssetType::Sass => process_sass(asset),
        AssetType::CoffeeScript => process_coffee(asset),
        // Other asset types...
    }
}).collect();
```

Key differences from Jekyll:
- Asset processing happens in parallel
- Native Rust implementations for better performance
- Smart caching of processed assets

### 6. Site Writing

Finally, Rustyll writes the generated site to disk:

```rust
// Pseudocode representation
site.pages.par_iter().for_each(|page| {
    write_file(page.destination, page.content);
});
```

Key differences from Jekyll:
- Parallel file writing for maximum I/O utilization
- Intelligent file diffing to avoid unnecessary writes
- Optimized for modern SSDs

## Performance Optimization

Rustyll's rendering process includes several performance optimizations:

### Parallel Processing

Rustyll processes files in parallel whenever possible:

```yaml
# _config.yml
threads: auto  # Use all available CPU cores
parallel: true # Enable parallel processing
```

### Incremental Builds

Rustyll tracks file dependencies to only rebuild what's necessary:

```bash
rustyll serve --incremental
```

### Caching

Rustyll caches intermediate results:

```yaml
# _config.yml
cache:
  enabled: true
  strategy: aggressive  # Options: conservative, normal, aggressive
```

### Memory Optimization

Rustyll optimizes memory usage:

```yaml
# _config.yml
memory:
  optimize: true
  preload_templates: true
```

## Debugging the Build Process

To understand what's happening during the build:

```bash
# Show detailed build information
rustyll build --verbose

# Show build profile
rustyll build --profile

# Trace specific file processing
rustyll build --trace path/to/file.md
```

## Order of Interpretation

Rustyll processes the various aspects of your site in this order:

1. Configuration
2. Plugins
3. Front matter defaults
4. Front matter in pages and collections
5. Liquid templates
6. Markdown conversion
7. Layout application
8. Asset conversion
9. Destination writing

Understanding this order can help diagnose issues in your site build.
