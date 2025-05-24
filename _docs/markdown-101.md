---
title: Markdown 101
permalink: /docs/markdown-101/
---

Markdown is a lightweight markup language with plain text formatting syntax that Rustyll supports out of the box. This guide provides a quick introduction to Markdown for creating content in your Rustyll site.

## Basic Markdown Syntax

### Headers

```markdown
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

### Emphasis

```markdown
*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

_You **can** combine them_
```

### Lists

#### Unordered

```markdown
* Item 1
* Item 2
  * Item 2a
  * Item 2b
```

#### Ordered

```markdown
1. Item 1
2. Item 2
3. Item 3
   1. Item 3a
   2. Item 3b
```

### Images

```markdown
![Alt Text](url)
```

### Links

```markdown
[Link Text](url)
```

### Blockquotes

```markdown
> This is a blockquote.
> 
> This is the second paragraph in the blockquote.
```

### Horizontal Rules

```markdown
---
```

### Code

Inline code uses single backticks:
```markdown
Use the `print()` function
```

Code blocks use triple backticks with optional language specification:
````markdown
```rust
fn main() {
    println!("Hello, world!");
}
```
````

## Markdown in Rustyll

Rustyll uses Markdown for content files like posts and pages. When you create a new file with a `.md` or `.markdown` extension, Rustyll will convert it to HTML during the build process.

### Front Matter

Rustyll pages and posts require front matter. This is a section at the top of your markdown file that specifies metadata:

```yaml
---
layout: post
title: "My First Post"
date: 2023-06-15
categories: tutorial
parallel: true           # Enable parallel processing for this document
render_priority: 1       # Higher priority in the build queue (lower number = higher priority)
cache: aggressive        # Cache this document aggressively
---
```

### Enhanced Markdown Features

Rustyll enhances standard Markdown with several features:

1. **Parallel Processing**: Markdown files can be processed in parallel for speed
2. **Syntax Highlighting**: Code blocks are automatically highlighted using a fast Rust-based highlighter
3. **Table of Contents**: Generate a TOC with `{:toc}`
4. **Custom Attributes**: Add classes, IDs and other attributes to elements
5. **Math Rendering**: Support for LaTeX math using `$$` delimiters
6. **Diagrams**: Support for Mermaid and other diagram formats

Example:

```markdown
{: .warning}
> This is a warning message.

* TOC
{:toc}

# Header with ID {#custom-id}

$$
\int_0^1 x^2 dx = \frac{1}{3}
$$

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
```

### Performance Optimizations

Rustyll provides several Markdown-specific performance optimizations:

```yaml
# _config.yml
markdown:
  parallel: true           # Process markdown in parallel
  cache: true              # Cache rendered markdown
  lazy_images: true        # Lazy load images in markdown
  incremental: true        # Only reprocess changed markdown files
  precompile_headers: true # Precompile headers for faster processing
  threads: auto            # Number of threads for markdown processing
```

You can also enable parallel processing for individual markdown files with front matter:

```yaml
---
title: "My Document"
parallel: true
render_priority: 1
---
```

### Markdown Processors

Rustyll uses [Comrak](https://github.com/kivikakk/comrak) (a CommonMark parser written in Rust) by default, which offers significant performance improvements over Ruby-based Markdown processors.

You can configure the Markdown processor in your `_config.yml`:

```yaml
markdown: comrak
comrak:
  options:
    hardbreaks: false
    smart: true
    github_pre_lang: true
  extensions:
    strikethrough: true
    table: true
    autolink: true
    tasklist: true
    superscript: true
    header_ids: true
    footnotes: true
```

## Advanced Markdown Features

Rustyll supports several advanced Markdown features:

### Markdown Includes 

Include other markdown files directly:

```markdown
{%raw%}{% include_markdown _includes/snippet.md %}{%endraw%}
```

### Conditional Markdown

Show different content based on configuration:

```markdown
{%raw%}{% if site.show_advanced_features %}
# Advanced Features
This content is only shown if advanced features are enabled.
{% endif %}{%endraw%}
```

### Markdown Variables

Use site variables in your markdown:

```markdown
{%raw%}This site has {{ site.posts.size }} posts.{%endraw%}
```

## Performance

Rustyll's Markdown processing is significantly faster than Jekyll's due to:

1. Use of Comrak, a fast Rust-based CommonMark parser
2. Parallel processing of multiple Markdown files
3. Incremental builds that only reprocess changed files
4. Document-level caching
5. Header precompilation

This means that even sites with hundreds of Markdown files can rebuild in milliseconds instead of seconds or minutes.

For the best performance:

1. Enable parallel Markdown processing in your config
2. Use front matter `parallel: true` for complex documents
3. Set appropriate `render_priority` for critical pages
4. Use `cache: aggressive` for documents that rarely change

## Migration from Jekyll

Rustyll's Markdown processing is fully compatible with Jekyll's, so your existing Markdown content will work without changes. However, to take advantage of Rustyll's performance optimizations, consider adding the Rustyll-specific front matter options mentioned above.
