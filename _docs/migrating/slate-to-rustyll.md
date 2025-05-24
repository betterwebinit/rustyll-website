---
title: Migrating from Slate
permalink: /docs/migrating/slate-to-rustyll/
---

Migrating from Slate to Rustyll? This guide will help you transition your API documentation from Ruby-based Slate to high-performance Rust-powered Rustyll while preserving the three-column layout and interactive features.

## Installation

First, install Rustyll using Cargo (Rust's package manager):

```sh
# Install Rust if you haven't already
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Rustyll
cargo install rustyll
```

## Automatic Migration

Rustyll provides a built-in migration tool for Slate sites:

```sh
rustyll migrate --from slate --source ./my-slate-project --destination ./my-rustyll-site
```

This command will:
1. Copy all Markdown content
2. Convert Slate's structure to Rustyll format
3. Create equivalent Liquid templates for the three-column layout
4. Set up syntax highlighting and other API doc features
5. Generate a migration report

## Directory Structure Differences

| Slate | Rustyll | Notes |
|-------|---------|-------|
| `source/index.html.md` | `index.md` | Main content file |
| `source/includes/*.md` | `_includes/*.md` | Included documentation sections |
| `source/layouts/layout.erb` | `_layouts/api.html` | Layout template |
| `source/stylesheets/` | `_sass/` | Styling |
| `source/javascripts/` | `assets/js/` | JavaScript files |
| `config.rb` | `_config.yml` | Configuration file |

## Content Organization

Slate typically has a single large Markdown file with include directives. These are converted to Rustyll includes:

```markdown
# Slate (index.html.md)
---
title: API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - shell
  - ruby
  - python
  - javascript

includes:
  - errors
  - authentication

search: true
---

# Introduction

Welcome to the API!

# Slate (includes/errors.md)
# Errors

This API uses the following error codes...
```

Converts to:

```markdown
# Rustyll (index.md)
---
title: API Reference
layout: api
language_tabs:
  - shell
  - ruby
  - python
  - javascript
search: true
---

# Introduction

Welcome to the API!

{% raw %}{{% include_relative _includes/errors.md %}}{% endraw %}
{% raw %}{{% include_relative _includes/authentication.md %}}{% endraw %}
```

## Configuration Conversion

Slate's Ruby configuration converts to Rustyll's YAML:

```ruby
# Slate (config.rb)
set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true, smartypants: true, tables: true
set :base_url, "https://example.com"
```

Converts to:

```yaml
# Rustyll (_config.yml)
title: API Documentation
url: https://example.com
markdown: comrak
highlight:
  theme: "monokai"
  line_numbers: true
api_docs:
  language_tabs:
    - shell
    - ruby
    - python
    - javascript
  search: true
```

## Three-Column Layout

Rustyll provides an API documentation theme with the familiar three-column layout:

```yaml
# _config.yml
theme: api
```

The layout includes:
1. Left column: Navigation/table of contents
2. Middle column: Documentation content
3. Right column: Code examples

## Language Tabs and Code Samples

Slate's language tabs feature is supported in Rustyll:

```markdown
# Request example in multiple languages

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
```

```shell
curl "https://example.com/api/kittens" \
  -H "Authorization: meowmeowmeow"
```

```javascript
const kittn = require('kittn');

let api = kittn.authorize('meowmeowmeow');
```
```

## Search Implementation

Slate's search functionality is replaced with Rustyll's search:

```yaml
# _config.yml
search:
  enabled: true
  provider: lunr  # Fast search engine
  index_fields:
    - title
    - content
    - headings
```

## Styling and Customization

Slate's styling converts to Rustyll's SCSS structure:

| Slate | Rustyll | Notes |
|-------|---------|-------|
| `_variables.scss` | `_sass/_variables.scss` | Theme variables |
| `screen.css.scss` | `_sass/main.scss` | Main styling |
| Custom styles | `_sass/custom.scss` | Your customizations |

## API Documentation Features

Rustyll provides specific features for API documentation:

| Feature | Implementation |
|---------|----------------|
| HTTP request examples | Code blocks with language tabs |
| Request/response objects | Structured examples with JSON highlighting |
| Parameter tables | Markdown tables with styling |
| Authentication details | Special includes for auth sections |
| Status codes | Styled tables for error codes |

## Interactive Features

Slate's interactive features have Rustyll equivalents:

| Slate Feature | Rustyll Equivalent |
|---------------|-------------------|
| Language switching | JavaScript-based language tabs |
| Sticky navigation | CSS-based sticky positioning |
| Scroll spy | JavaScript for navigation highlighting |
| Code highlighting | Syntax highlighting with Syntect |
| On-page search | Client-side search implementation |

## Performance Improvements

Rustyll offers significant performance advantages over Ruby-based Slate:

```yaml
# Rustyll performance options
threads: auto  # Use all available CPU cores
incremental: true  # Enable incremental builds
cache:
  enabled: true
  strategy: aggressive
```

Benefits include:
1. **Build Speed**: 10-20x faster builds
2. **Memory Usage**: Significantly lower resource consumption
3. **Deployment**: Simpler deployment with static files

## OpenAPI/Swagger Integration

If you use OpenAPI/Swagger specifications:

```yaml
# _config.yml
plugins:
  - rustyll-openapi
  
openapi:
  spec_file: api/openapi.yaml
  expand_endpoints: true
```

## Troubleshooting Common Issues

### Ruby Dependencies

Unlike Slate, Rustyll doesn't require Ruby or its dependencies:

1. No need for Bundler or Gemfile
2. No middleware dependencies
3. Simplified deployment

### Custom JavaScript

If you have custom JavaScript for your Slate documentation:

1. Review the JavaScript files in `assets/js/`
2. Update DOM selectors to match the new HTML structure
3. Test interactive features thoroughly

### Syntax Highlighting

Rustyll uses Syntect instead of Rouge for syntax highlighting:

1. Check highlighted code blocks in all languages
2. Adjust theme if needed
3. Configure additional languages if required

## Migration Checklist

- [ ] Install Rust and Rustyll
- [ ] Back up your Slate project
- [ ] Run the migration command
- [ ] Review the converted content structure
- [ ] Check the three-column layout
- [ ] Test language switching
- [ ] Verify code examples display correctly
- [ ] Test search functionality
- [ ] Build with `rustyll build`
- [ ] Preview site with `rustyll serve`
- [ ] Adjust styling as needed
- [ ] Update deployment workflows

## Need Help?

- [Rustyll Forum](https://forum.rustyll.com)
- [Rustyll Discord](https://discord.gg/rustyll)
- [GitHub Issues](https://github.com/rustyll/rustyll/issues)

## Slate Helper | Rustyll Equivalent

| Slate Helper | Rustyll Equivalent |
|--------------|-------------------|
| `link_to(text, path)` | `[text]({% raw %}`{% link path %}`{% endraw %})` |
| `include_file(path)` | `{% raw %}`{% include path %}`{% endraw %}` |
| `toc_generate` | `{% raw %}`{% include toc.html %}`{% endraw %}` |
| `language_tabs` | `{% raw %}`{% include language-tabs.html %}`{% endraw %}` |

## Template Conversion

Slate templates convert to Rustyll layouts:

| Slate Template | Rustyll Layout |
|----------------|----------------|
| `layout.erb` | `_layouts/default.html` |
| `index.html.erb` | `index.html` |
| `includes/` | `_includes/` |
| `javascripts/` | `assets/js/` |
| `stylesheets/` | `assets/css/` |

## Code Block Conversion

Slate's code blocks convert to Rustyll's syntax highlighting:

```markdown
# Slate
```ruby
def hello
  puts "Hello, world!"
end
```

Converts to:

```markdown
# Rustyll
{% raw %}`{% highlight ruby %}
def hello
  puts "Hello, world!"
end
{% endhighlight %}`{% endraw %}
``` 