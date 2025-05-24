---
title: Configuration
permalink: /docs/configuration/
---

Rustyll gives you a lot of flexibility to customize how it builds your site. These options can either be specified in a `_config.yml` file placed in your site's root directory, or as flags for the `rustyll` executable in the terminal.

## Default Configuration

Rustyll ships with sensible defaults for most configuration options. The default configuration is:

```yaml
# Where things are
source:          .
destination:     ./_site
collections_dir: .
plugins_dir:     _plugins
layouts_dir:     _layouts
data_dir:        _data
includes_dir:    _includes

# Handling Reading
include:         [".htaccess"]
exclude:         ["Cargo.toml", "Cargo.lock", "node_modules/", "vendor/bundle/", "vendor/cache/", "vendor/gems/", "vendor/ruby/"]
keep_files:      [".git", ".svn"]
encoding:        "utf-8"
markdown_ext:    "markdown,mkdown,mkdn,mkd,md"
strict_front_matter: false

# Plugins
plugins: []

# Conversion
markdown:    comrak
highlighter: rouge

# Serving
port: 4000
host: 127.0.0.1
baseurl: ""
show_dir_listing: false

# Output
permalink:     date
pagination:    false
timezone:      null

# Rustyll Performance
threads:       auto
incremental:   false
parallel:      true
cache:
  enabled:     true
  strategy:    normal
```

## Performance Configuration

Rustyll offers extensive performance configuration options not available in Jekyll:

```yaml
# Multi-threading options
threads: auto  # Use all available CPU cores, or specify a number

# Parallel processing
parallel:
  enabled: true
  markdown: true
  sass: true
  liquid: true
  layouts: true
  collections: true
  max_threads_per_task: 4

# Caching configuration
cache:
  enabled: true
  strategy: aggressive  # Options: conservative, normal, aggressive
  expiry: 3600          # Seconds to keep cache valid
  liquid: true
  markdown: true
  partials: true
  
# Memory optimizations
memory:
  optimize: true
  limit: 0              # Memory limit in MB (0 = unlimited)
  preload_templates: true
  
# Incremental building
incremental:
  enabled: true
  safe_mode: false      # Stricter dependency tracking
  
# Build prioritization
priority:
  homepage: 1           # Lower numbers = higher priority
  posts: 2
  pages: 3
```

## Build Command Options

You can either use flags on the command line or set them in your `_config.yml` file. Command line options override configuration from your config file.

### Customizing Build Options

```bash
# Build your site
rustyll build --output _mysite

# Build with watch mode for faster rebuilds
rustyll build --watch

# Build with multiple threads for blazing fast performance
rustyll build --threads 8
```

## Configuring Parallel Builds

Rustyll's parallel build system can be configured for optimal performance:

```yaml
# _config.yml

# Configure parallel processing
parallel:
  enabled: true            # Master switch for parallel processing
  strategy: optimistic     # How to handle dependencies (conservative, balanced, optimistic)
  
  # Control specific components
  markdown: true           # Process markdown in parallel
  collections: true        # Process collections in parallel
  assets: true             # Process assets in parallel
  
  # Fine-tuned control
  max_threads_per_task: 4  # Maximum threads per task type
  min_items_per_thread: 5  # Only parallelize when enough items exist
  
  # Advanced settings
  thread_priority:         # Set thread priorities (1-10, lower = higher priority)
    markdown: 1
    collections: 2
    assets: 3
    
  # Dynamic scaling
  auto_scale: true         # Dynamically adjust thread count based on system load
```

## Jekyll Compatibility

Rustyll is designed to be a drop-in replacement for Jekyll, so all Jekyll configuration options are supported. However, Rustyll adds many performance-focused options that aren't available in Jekyll.

## Learn More

For more information, check out the Configuration documentation:

* [Default configuration]({{ '/docs/configuration/default/' | relative_url }})
* [Front matter defaults]({{ '/docs/configuration/front-matter-defaults/' | relative_url }})
* [Environments]({{ '/docs/configuration/environments/' | relative_url }})
* [Markdown options]({{ '/docs/configuration/markdown/' | relative_url }})
* [Liquid options]({{ '/docs/configuration/liquid/' | relative_url }})
* [Parallel processing]({{ '/docs/configuration/parallel/' | relative_url }})
* [Cache configuration]({{ '/docs/configuration/cache/' | relative_url }})
* [Memory optimization]({{ '/docs/configuration/memory/' | relative_url }})
