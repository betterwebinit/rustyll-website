---
title: Markdown Options
permalink: "/docs/configuration/markdown/"
---

Rustyll offers high-performance Markdown processing with multiple renderer options. The default Markdown renderer for Rustyll is [comrak](https://github.com/kivikakk/comrak), a fast CommonMark and GitHub Flavored Markdown implementation written in Rust.

## Comrak (Default)

Comrak is significantly faster than Jekyll's Kramdown, offering full CommonMark and GitHub Flavored Markdown support. It's configured by default, but you can customize it:

```yaml
markdown: comrak
comrak:
  extension:
    autolink: true
    description_lists: true
    footnotes: true
    strikethrough: true
    superscript: true
    table: true
    tagfilter: true
    tasklist: true
  render:
    escape: true
    github_pre_lang: true
    hardbreaks: false
    smart: true
    unsafe: false
  parse:
    smart: true
    default_info_string: "rust"
    relaxed_autolinks: true
```

These options provide fine-grained control over how your Markdown is processed.

## Parallel Markdown Processing

One of Rustyll's key advantages is its ability to process Markdown files in parallel:

```yaml
# Enable parallel Markdown processing
parallel:
  markdown: true
  max_threads: auto  # Use all available cores
```

This can provide a 5-10x performance improvement for sites with many Markdown files.

## Syntax Highlighting

Rustyll uses [syntect](https://github.com/trishume/syntect) for syntax highlighting, which is significantly faster than Rouge or Pygments used by Jekyll:

```yaml
# Syntax highlighting configuration
highlight:
  theme: "InspiredGitHub"  # Default theme
  line_numbers: true
  tab_width: 2
  wrap: false
  guess_syntax: false
  
  # Available themes:
  # - "InspiredGitHub" (default)
  # - "Solarized (dark)"
  # - "Solarized (light)"
  # - "Dracula"
  # - "Nord"
  # - "VS Code Dark+"
  # - "One Dark"
```

### Example

````markdown
```rust
fn main() {
    println!("Hello, world!");
}
```
````

This will be rendered as:

```rust
fn main() {
    println!("Hello, world!");
}
```

## Performance Considerations

Markdown processing is one of the most resource-intensive parts of building a static site. Rustyll optimizes this in several ways:

1. **Native code**: Using Rust-based parsers instead of Ruby ones
2. **Parallel processing**: Converting multiple files simultaneously
3. **Caching**: Storing parsed results to avoid reprocessing
4. **Memory efficiency**: Minimizing memory usage during processing

To get the maximum performance:

```yaml
# Maximum Markdown performance
markdown: comrak
cache:
  markdown: true
  strategy: aggressive
parallel:
  markdown: true
```

## Available Markdown Renderers

Rustyll supports multiple Markdown renderers that can be installed as plugins:

- **comrak** (default): Fast CommonMark/GFM implementation
- **pulldown-cmark**: Another high-performance CommonMark parser
- **markdown-it**: Port of the popular JavaScript Markdown-it library
- **goldmark**: Port of the Go-based Goldmark parser

To switch renderers:

```yaml
# Change to a different renderer
markdown: pulldown-cmark
```

## Custom Markdown Processors

You can create a custom Markdown processor by implementing the `MarkdownRenderer` trait in a Rustyll plugin:

```rust
use rustyll::markdown::{MarkdownRenderer, MarkdownOptions};

pub struct MyCustomMarkdown;

impl MarkdownRenderer for MyCustomMarkdown {
    fn render(&self, content: &str, options: &MarkdownOptions) -> String {
        // Your custom markdown processing logic here
        format!("<p>{}</p>", content)
    }
    
    fn name(&self) -> &str {
        "my-custom-markdown"
    }
}

// Register the renderer
rustyll::register_markdown_renderer!(MyCustomMarkdown);
```

Once you've created your processor as a plugin, specify it in your `_config.yml`:

```yaml
markdown: my-custom-markdown
```
