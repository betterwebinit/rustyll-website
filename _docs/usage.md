---
title: Command Line Usage
permalink: /docs/usage/
---

The Rustyll crate makes a `rustyll` executable available to you in your terminal after installation.

The `rustyll` program has several commands but the structure is always:

```
rustyll command [argument] [option] [argument_to_option]

Examples:
    rustyll new site/ --blank
    rustyll serve --config _alternative_config.yml
```

Typically you'll use `rustyll serve` while developing locally and `rustyll build` when you need to generate the site for production.

## Commands Overview

Rustyll provides a comprehensive set of commands:

* `rustyll new PATH` - Creates a new Rustyll site with default theme at specified path. The directories will be created as necessary.
* `rustyll new PATH --blank` - Creates a new blank Rustyll site scaffold at specified path.
* `rustyll build` or `rustyll b` - Performs a one-off build of your site to `./_site` (by default). Significantly faster than Jekyll.
* `rustyll serve` or `rustyll s` - Builds your site any time a source file changes and serves it locally.
* `rustyll clean` - Removes all generated files: destination folder, metadata file, Sass and cached files.
* `rustyll help` - Shows help, optionally for a given subcommand, e.g. `rustyll help build`.
* `rustyll new-theme` - Creates a new Rustyll theme scaffold.
* `rustyll doctor` - Outputs any deprecation or configuration issues.
* `rustyll benchmark` - Runs performance benchmarks on your site.
* `rustyll profile` - Generates a detailed performance profile of your build process.

## Performance Options

Rustyll offers a wide range of command line options to optimize performance:

* `rustyll build --threads N` - Control the number of parallel threads (default: auto-detect)
* `rustyll build --watch` - Watch for changes and rebuild only modified files
* `rustyll serve --incremental` - Enable incremental builds for faster rebuilds during development
* `rustyll build --profile release` - Build with maximum optimization for production deployment
* `rustyll serve --livereload` - Enable live reloading for faster development
* `rustyll build --parallel-markdown` - Enable parallel markdown processing
* `rustyll build --cache-level aggressive` - Set cache aggressiveness (conservative, normal, aggressive)
* `rustyll serve --memory-limit N` - Limit memory usage to N megabytes

## Parallel Processing Control

Rustyll lets you fine-tune parallel processing for optimal performance:

```bash
# Maximum parallelism for fastest builds
rustyll build --threads auto --parallel-all

# Targeted parallelism for specific tasks
rustyll build --parallel-markdown --parallel-sass --sequential-plugins

# Balanced approach for laptops and low-power systems
rustyll build --threads 4 --power-save
```

## Cache Control

Control Rustyll's caching system with precision:

```bash
# Clear cache before building
rustyll clean --cache

# Use aggressive caching for maximum speed
rustyll build --cache-level aggressive

# Target specific cache types
rustyll build --cache markdown,sass,liquid

# Disable cache for fresh results
rustyll build --no-cache
```

## Examples

```bash
# Development with live reload
rustyll serve --livereload

# Maximum parallel processing
rustyll build --threads 16

# Production build
rustyll build --profile release --destination public

# Watch for changes with optimal performance
rustyll serve --incremental --watch

# Complete performance optimization
rustyll build --threads auto --parallel-all --cache-level aggressive --memory-optimized
```

## Performance Monitoring

Monitor your build performance with built-in tools:

```bash
# Generate a build profile
rustyll build --profile-output build-report.json

# Visual performance dashboard
rustyll serve --stats

# CPU and memory usage monitoring
rustyll build --monitor
```

## Migration from Jekyll

Rustyll's command line interface is fully compatible with Jekyll's, making migration seamless:

```bash
# Jekyll command
jekyll serve --watch --drafts

# Equivalent Rustyll command
rustyll serve --watch --drafts
```

However, Rustyll adds many advanced performance options not available in Jekyll.

To change Rustyll's default build behavior have a look through the [configuration options](/docs/configuration/).
