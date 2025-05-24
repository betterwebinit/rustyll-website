---
title: Parallel Builds
permalink: /docs/parallel-builds/
---

One of Rustyll's most significant advantages over Jekyll is its powerful parallel build system. Built in Rust, Rustyll can utilize all available CPU cores to dramatically speed up site generation.

## Enabling Parallel Builds

Parallel builds are enabled by default in Rustyll. You can control the number of threads using the `--threads` flag:

```bash
# Automatically use all available CPU cores
rustyll build --threads auto

# Specify exact number of threads
rustyll build --threads 8
```

You can also configure this in your `_config.yml` file:

```yaml
# Use all available CPU cores
threads: auto

# Or specify a number
threads: 8
```

## Parallel Processing Configuration

For fine-grained control over parallel processing, you can use these additional configuration options:

```yaml
parallel:
  enabled: true             # Master switch for parallel processing
  markdown: true            # Process markdown in parallel
  layouts: true             # Apply layouts in parallel
  sass: true                # Process Sass/SCSS in parallel
  collections: true         # Process collections in parallel
  
  # Advanced settings
  max_threads_per_task: 4   # Maximum threads per task type
  min_items_per_thread: 5   # Only parallelize when enough items exist
```

## Performance Impact

Parallel processing has a dramatic effect on build times, especially for larger sites:

| Site Size | Jekyll | Rustyll | Improvement |
|-----------|--------|---------|-------------|
| Small (50 pages) | 5-8s | 0.5-1s | 8-10x faster |
| Medium (500 pages) | 30-60s | 2-5s | 12-15x faster |
| Large (5000+ pages) | 5-10min | 15-30s | 20-30x faster |

## Understanding Build Stages

Rustyll's build process is divided into stages, with some stages benefiting more from parallelization than others:

1. **File reading and front matter parsing** - Highly parallelizable
2. **Markdown conversion** - Highly parallelizable
3. **Template rendering** - Moderately parallelizable (some dependencies)
4. **Layout application** - Moderately parallelizable
5. **Writing to disk** - I/O bound, less benefit from parallelization

## Troubleshooting

If you experience any issues with parallel builds, you can disable them:

```bash
rustyll build --threads 1
```

Or in your configuration:

```yaml
threads: 1
parallel: false
```

## Combining with Incremental Builds

For the ultimate performance, combine parallel processing with incremental builds:

```bash
rustyll build --threads auto --incremental
```

This will only rebuild files that have changed, and will use all available CPU cores to process them in parallel.

## When to Use Parallel Builds

Parallel builds are most beneficial for:

- Large sites with hundreds or thousands of pages
- Sites with complex templates and many includes
- Sites that use extensive Liquid processing
- Development environments that require fast feedback

## Best Practices

To get the most out of Rustyll's parallel build system:

1. **Organize related content** into collections that can be processed in parallel
2. **Use front matter defaults** to apply parallel processing settings to groups of files
3. **Prioritize important pages** with the `render_priority` front matter setting
4. **Enable caching** for files that change infrequently
5. **Consider your CPU resources** - more threads isn't always better on every system

## Comparing with Jekyll

| Feature                     | Jekyll                | Rustyll               |
|-----------------------------|----------------------|----------------------|
| Build architecture          | Sequential           | Parallel             |
| Utilizes multiple cores     | No                   | Yes                  |
| File reading                | Sequential           | Parallel             |
| Markdown processing         | Sequential           | Parallel             |
| Template rendering          | Sequential           | Parallel             |
| Custom thread configuration | Not available        | Available            |
| Per-file parallelization    | Not available        | Available            |
| Incremental builds          | Limited support      | Fully supported      | 