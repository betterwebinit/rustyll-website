---
title: Migrating from Pelican
permalink: /docs/migrating/pelican-to-rustyll/
---

Migrating from Python-based Pelican to Rustyll? This guide will help you transition your blog or content site to high-performance Rust-powered Rustyll while preserving your content's organization and features.

## Installation

First, install Rustyll using Cargo (Rust's package manager):

```sh
# Install Rust if you haven't already
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Rustyll
cargo install rustyll
```

## Automatic Migration

Rustyll provides a built-in migration tool for Pelican sites:

```sh
rustyll migrate --from pelican --source ./my-pelican-site --destination ./my-rustyll-site
```

This command will:
1. Copy all content files
2. Convert Pelican-specific metadata to Rustyll front matter
3. Transform Pelican themes to Rustyll templates
4. Adjust configuration settings
5. Generate a migration report

## Directory Structure Differences

| Pelican | Rustyll | Notes |
|---------|---------|-------|
| `content/` | Root directory and `_posts/` | Content files move to appropriate locations |
| `content/articles/` | `_posts/` | Blog posts |
| `content/pages/` | Root directory | Static pages |
| `pelicanconf.py` | `_config.yml` | Main configuration file |
| `publishconf.py` | `_config.yml` + `_config.prod.yml` | Production settings |
| `themes/` | `_layouts/` and `_includes/` | Theme templates |
| `output/` | `_site/` | Generated site |

## Content Format Conversion

### Articles to Posts

Pelican articles convert to Rustyll posts:

```markdown
# Pelican (content/articles/my-article.md)
Title: My First Article
Date: 2023-01-15 10:20
Modified: 2023-01-16 19:30
Category: Python
Tags: python, pelican, tutorial
Slug: my-first-article
Authors: Your Name
Summary: Short summary of the article

This is the content of my first article.
```

Converts to:

```markdown
# Rustyll (_posts/2023-01-15-my-first-article.md)
---
title: My First Article
date: 2023-01-15 10:20:00
last_modified_at: 2023-01-16 19:30:00
categories:
  - Python
tags:
  - python
  - pelican
  - tutorial
slug: my-first-article
author: Your Name
excerpt: Short summary of the article
---

This is the content of my first article.
```

### Pages to Static Pages

Pelican pages convert to Rustyll pages:

```markdown
# Pelican (content/pages/about.md)
Title: About
Slug: about
Date: 2023-01-15

This is the about page.
```

Converts to:

```markdown
# Rustyll (about.md)
---
title: About
permalink: /about/
date: 2023-01-15
layout: page
---

This is the about page.
```

## Configuration Conversion

Pelican's Python configuration converts to Rustyll's YAML:

```python
# Pelican (pelicanconf.py)
AUTHOR = 'Your Name'
SITENAME = 'My Blog'
SITEURL = 'https://example.com'

PATH = 'content'
TIMEZONE = 'Europe/Paris'
DEFAULT_LANG = 'en'

# Feed settings
FEED_ALL_ATOM = 'feeds/all.atom.xml'
CATEGORY_FEED_ATOM = 'feeds/{slug}.atom.xml'

# Blogroll
LINKS = (('Pelican', 'https://getpelican.com/'),
         ('Python.org', 'https://www.python.org/'))

# Social widget
SOCIAL = (('Twitter', 'https://twitter.com/username'),
          ('GitHub', 'https://github.com/username'))

DEFAULT_PAGINATION = 10
```

Converts to:

```yaml
# Rustyll (_config.yml)
author: Your Name
title: My Blog
url: https://example.com

timezone: Europe/Paris
lang: en

# Feed settings
feed:
  path: feeds/all.atom.xml
  categories: true
  category_path: feeds/:name.atom.xml

# Link lists
links:
  - title: Pelican
    url: https://getpelican.com/
  - title: Python.org
    url: https://www.python.org/

social:
  - title: Twitter
    url: https://twitter.com/username
  - title: GitHub
    url: https://github.com/username

# Pagination
paginate: 10
paginate_path: "/page:num/"
```

## Template Conversion

Pelican uses Jinja2 templates, while Rustyll uses Liquid:

| Pelican (Jinja2) | Rustyll (Liquid) |
|------------------|------------------|
| `{% raw %}{{ article.title }}{% endraw %}` | `{% raw %}{{ page.title }}{% endraw %}` |
| `{% raw %}{% for article in articles %}{% endraw %}` | `{% raw %}{% for post in site.posts %}{% endraw %}` |
| `{% raw %}{% endfor %}{% endraw %}` | `{% raw %}{% endfor %}{% endraw %}` |
| `{% raw %}{{ article.date }}{% endraw %}` | `{% raw %}{{ post.date }}{% endraw %}` |
| `{% raw %}{% block content %}{% endraw %}` | `{% raw %}{% content %}{% endraw %}` |
| `{% raw %}{{ SITEURL }}{% endraw %}` | `{% raw %}{{ site.url }}{% endraw %}` |

## Plugin Conversion

Many Pelican plugins have Rustyll equivalents:

| Pelican Plugin | Rustyll Equivalent |
|----------------|-------------------|
| `sitemap` | `rustyll-sitemap` |
| `feed` | Built-in feed generation |
| `related_posts` | `rustyll-related-posts` |
| `neighbors` | Navigation includes |
| `assets` | Built-in asset management |
| `i18n_subsites` | Multilingual collections |

## Themes

Pelican themes convert to Rustyll layouts and includes:

| Pelican Theme File | Rustyll Equivalent |
|--------------------|-------------------|
| `base.html` | `_layouts/default.html` |
| `article.html` | `_layouts/post.html` |
| `page.html` | `_layouts/page.html` |
| `index.html` | `index.html` with layout |
| `categories.html` | `categories.html` with layout |
| `tags.html` | `tags.html` with layout |
| `archives.html` | `archives.html` with layout |

## Category and Tag Pages

Pelican's category and tag pages are implemented in Rustyll using collections:

```yaml
# _config.yml
collections:
  categories:
    output: true
    permalink: /category/:name/
  tags:
    output: true
    permalink: /tag/:name/
```

## Archives and Pagination

Pelican's archives and pagination are handled differently in Rustyll:

```yaml
# _config.yml
paginate: 10
paginate_path: "/page:num/"

# Archives configuration
archives:
  enabled: true
  layout: archive
  permalinks:
    year: '/:year/'
    month: '/:year/:month/'
    day: '/:year/:month/:day/'
```

## Performance Improvements

Rustyll offers significant performance advantages over Python-based Pelican:

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
3. **Parallelism**: Utilizes all CPU cores efficiently

## Troubleshooting Common Issues

### Python Dependencies

Rustyll eliminates Python dependencies:

1. No need for virtualenv or requirements.txt
2. No Python runtime required for building
3. Simplified deployment workflow

### Custom Jinja Filters

If you use custom Jinja filters in Pelican:

1. Check for equivalent Liquid filters in Rustyll
2. Create custom Liquid filters if needed
3. Simplify templates where possible

### Metadata Format

If you encounter metadata conversion issues:

1. Check for non-standard metadata in Pelican content
2. Verify front matter format in converted files
3. Look for unsupported metadata types

## Migration Checklist

- [ ] Install Rust and Rustyll
- [ ] Back up your Pelican site
- [ ] Run the migration command
- [ ] Review the converted content and front matter
- [ ] Check templates and includes
- [ ] Test category and tag pages
- [ ] Verify pagination and archives
- [ ] Test any custom functionality
- [ ] Build with `rustyll build`
- [ ] Preview site with `rustyll serve`
- [ ] Fix any styling issues
- [ ] Update deployment workflows

## Need Help?

- [Rustyll Forum](https://forum.rustyll.com)
- [Rustyll Discord](https://discord.gg/rustyll)
- [GitHub Issues](https://github.com/rustyll/rustyll/issues) 