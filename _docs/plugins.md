---
title: Plugins
permalink: /docs/plugins/
---

Rustyll supports plugins written in Rust to extend functionality without modifying Rustyll's core code. Plugins can generate content, create data for templates, or modify the site output. Rustyll's plugin system offers significant performance advantages over Jekyll's Ruby-based plugins.

## Performance Advantages

Rustyll plugins are significantly faster than Jekyll plugins for several reasons:

1. **Rust Performance**: Plugins are written in Rust, which executes much faster than Ruby
2. **Parallel Execution**: Plugins can run in parallel across multiple cores
3. **Zero-Copy Processing**: Data can be processed without unnecessary copying
4. **Compiled Code**: Plugins are compiled to native code, not interpreted at runtime
5. **Memory Efficiency**: Rust's memory model ensures efficient resource usage

These advantages make Rustyll plugins up to 100x faster than equivalent Jekyll plugins.

## Installing a Plugin

You have three options for installing plugins:

### 1. In your Cargo.toml

The recommended approach is to add plugins to your `Cargo.toml` file:

```toml
[dependencies]
rustyll = "0.1.0"
rustyll-feed = "0.1.0"
rustyll-seo-tag = "0.1.0"
```

### 2. In your _config.yml

For plugins that don't require Rust code:

```yaml
plugins:
  - rustyll-feed
  - rustyll-seo-tag
  - rustyll-sitemap
```

### 3. In the _plugins directory

For custom or private plugins, you can place Rust files directly in your site's `_plugins` directory.

## Plugin Configuration

Rustyll offers advanced configuration options for plugins in your `_config.yml`:

```yaml
# Control plugin execution
plugin_settings:
  parallel: true             # Run plugins in parallel
  cache: true                # Cache plugin results
  timeout: 5000              # Milliseconds before timeout (0 = no limit)
  memory_limit: 1024         # Memory limit in MB (0 = no limit)
  priority:                  # Set execution priority (lower = earlier)
    rustyll-feed: 1
    rustyll-seo-tag: 2
```

## Creating a Plugin

Plugins are implemented as Rust crates that implement the `RustyllPlugin` trait:

```rust
use rustyll::Plugin;

#[derive(Default)]
pub struct MyPlugin;

impl Plugin for MyPlugin {
    fn name(&self) -> &str {
        "my-plugin"
    }
    
    fn register(&mut self, site: &mut rustyll::Site) {
        // Your plugin implementation
    }
    
    // Optional: enable parallel processing
    fn supports_parallel(&self) -> bool {
        true
    }
    
    // Optional: specify resource requirements
    fn resource_requirements(&self) -> ResourceRequirements {
        ResourceRequirements {
            memory: 100, // MB
            cpu: 1,      // Threads
        }
    }
}

// Register the plugin
rustyll::register_plugin!(MyPlugin);
```

## Jekyll Plugin Migration

Migrating Jekyll plugins to Rustyll is straightforward:

1. Identify the core functionality of your Jekyll plugin
2. Create a new Rust crate using `cargo new --lib rustyll-your-plugin`
3. Implement the `Plugin` trait in your Rust code
4. Publish the crate to crates.io

For most Jekyll plugins, a Rustyll equivalent will perform 10-100x faster.

## Available Plugins

Rustyll has a diverse ecosystem of plugins. Some popular ones include:

* [rustyll-feed](https://github.com/rustyll/rustyll-feed): Generate an Atom feed of your posts
* [rustyll-seo-tag](https://github.com/rustyll/rustyll-seo-tag): Add SEO tags to your site
* [rustyll-sitemap](https://github.com/rustyll/rustyll-sitemap): Generate a sitemap
* [rustyll-archives](https://github.com/rustyll/rustyll-archives): Archive pages for your site
* [rustyll-paginate](https://github.com/rustyll/rustyll-paginate): Pagination for your site

## Performance Testing Your Plugins

Rustyll includes a plugin benchmarking tool:

```bash
rustyll benchmark --plugin rustyll-your-plugin
```

This will measure plugin performance across various metrics and suggest optimizations.

For more details about creating plugins, see the [Plugin System]({{ '/docs/plugins/creating/' | relative_url }}) documentation.

## Advanced Plugin Features

Rustyll's plugin system offers several advanced features:

### Event Hooks

```rust
fn on_site_init(&mut self, site: &mut Site) { }
fn on_page_render(&mut self, page: &mut Page) { }
fn on_post_write(&mut self, post: &Post, path: &Path) { }
fn on_build_complete(&mut self, site: &Site) { }
```

### Parallel Processing

```rust
fn process_in_parallel(&mut self, items: Vec<T>, site: &Site) -> Vec<T> {
    items.into_par_iter()
        .map(|item| self.process_item(item, site))
        .collect()
}
```

### Resource Optimization

```rust
fn optimize_image(&self, path: &Path, config: &Config) -> Result<(), Error> {
    // Image optimization code
}
```

These advanced features allow for highly optimized plugins that can dramatically improve build performance.
