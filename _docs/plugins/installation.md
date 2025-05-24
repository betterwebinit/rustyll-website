---
title: Plugins
permalink: /docs/plugins/installation/
---

Rustyll has built-in support for plugins to extend its core functionality. As a Rust-based system, Rustyll's plugin architecture is fundamentally different from Jekyll's Ruby-based approach.

## Plugin Types

Rustyll supports two main types of plugins:

1. **Native Rust plugins** - High-performance compiled plugins with direct access to Rustyll's internals
2. **Script plugins** - Lightweight plugins written in a scripting language that Rustyll supports

## Installing Rust Plugins

### From crates.io

The preferred way to install Rustyll plugins is through Cargo, using plugins published on [crates.io](https://crates.io):

```sh
cargo install rustyll-plugin-name
```

Then, list the installed plugins in your `_config.yml`:

```yaml
plugins:
  - rustyll-syntax-highlight
  - rustyll-sitemap
  - rustyll-seo-tools
```

### Local Plugins

For custom or development plugins, you can place Rust source files in a `_plugins` directory at the root of your site's source. Rustyll will automatically compile and load these plugins during the build process.

The plugin structure should follow Rustyll's plugin API:

```rust
// _plugins/my_plugin.rs
use rustyll::prelude::*;

#[rustyll_plugin]
pub struct MyPlugin;

impl Plugin for MyPlugin {
    fn name(&self) -> &str {
        "my_plugin"
    }
    
    fn on_site_load(&self, site: &mut Site) {
        // Plugin implementation
    }
}
```

## Plugin Configuration

Plugins can be configured in your `_config.yml` file:

```yaml
# Enable plugins
plugins:
  - rustyll-syntax-highlight
  - rustyll-sitemap

# Configure specific plugins
syntax_highlight:
  theme: "dracula"
  line_numbers: true

sitemap:
  exclude:
    - "/404.html"
    - "/private/"
```

## Safe Mode

When running Rustyll in `safe` mode (with the `--safe` flag), only officially approved plugins will be loaded. Any local plugins in the `_plugins` directory will be ignored.

To authorize specific plugins in safe mode, list them in the `whitelist` section:

```yaml
# Enable safe mode
safe: true

# Whitelist plugins under safe mode
whitelist:
  - rustyll-syntax-highlight
  - rustyll-sitemap
```

<div class="note info">
  <h5>Plugins on GitHub Pages</h5>
  <p>
    <a href="https://pages.github.com/">GitHub Pages</a> runs in safe mode to ensure security. While GitHub Pages natively supports Jekyll, it doesn't support Rustyll directly. 
    
    <br><br>
    
    To use Rustyll with GitHub Pages, you'll need to:
    <ol>
      <li>Build your site locally and push the generated files</li>
      <li>Use <a href="{{ '/docs/continuous-integration/github-actions/' | relative_url }}">GitHub Actions</a> to build and deploy your site</li>
    </ol>
    
    See our <a href="{{ '/docs/deployment/github-pages/' | relative_url }}">GitHub Pages deployment guide</a> for details.
  </p>
</div>

## Performance Considerations

Rustyll's plugin system is designed for high performance:

1. **Compiled Plugins**: Native Rust plugins compile to highly optimized machine code
2. **Parallel Execution**: Plugins can take advantage of Rustyll's parallel processing capabilities
3. **Low Overhead**: The plugin API is designed to minimize runtime overhead

When choosing or developing plugins, consider how they might affect build performance, particularly for large sites.
