---
title: Liquid Filters
permalink: "/docs/liquid/filters/"
shopify_filter_url: https://shopify.github.io/liquid/filters/
shopify_filters:
- abs
- append
- at_least
- at_most
- capitalize
- ceil
- compact
- concat
- date
- default
- divided_by
- downcase
- escape
- escape_once
- first
- floor
- join
- last
- lstrip
- map
- minus
- modulo
- newline_to_br
- plus
- prepend
- remove
- remove_first
- replace
- replace_first
- reverse
- round
- rstrip
- size
- slice
- sort
- sort_natural
- split
- strip
- strip_html
- strip_newlines
- times
- truncate
- truncatewords
- uniq
- upcase
- url_decode
- url_encode
---

All of the standard Liquid [filters](#standard-liquid-filters) are supported (see below).

Rustyll adds several high-performance filters of its own, all of which you can find on this page. You can also create your own filters using [plugins](/docs/plugins/). Rustyll's filter implementation is significantly faster than Jekyll's, as they're written in Rust rather than Ruby.

<div class="mobile-side-scroller">
<table>
  <thead>
    <tr>
      <th>Description</th>
      <th><span class="filter">Filter</span> and <span class="output">Output</span></th>
    </tr>
  </thead>
  <tbody>
    {% for filter in site.data.jekyll_filters %}
      <tr>
        <td>
          <p id="{{ filter.name | slugify }}" class="name"><strong>{{ filter.name }}</strong></p>
          <p>
            {{- filter.description -}}
            {%- if filter.version_badge %}
              <span class="version-badge" title="This filter is available from version {{ filter.version_badge }}">
                {{- filter.version_badge -}}
              </span>
            {% endif -%}
          </p>
        </td>
        <td class="align-center">
          {%- for example in filter.examples %}
            <p><code class="filter">{{ example.input }}</code></p>
            {% if example.output %}<p><code class="output">{{ example.output }}</code></p>{% endif %}
          {% endfor -%}
        </td>
      </tr>
    {% endfor %}
  </tbody>
</table>
</div>

### Rustyll-specific Performance Filters

Rustyll adds several filters specifically designed for performance optimization:

<div class="mobile-side-scroller">
<table>
  <thead>
    <tr>
      <th>Description</th>
      <th><span class="filter">Filter</span> and <span class="output">Output</span></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <p id="parallel_map" class="name"><strong>Parallel Map</strong></p>
        <p>Maps a collection in parallel across multiple CPU cores, providing significant performance improvements for large collections.</p>
      </td>
      <td class="align-center">
        <p><code class="filter">{{ "site.posts | parallel_map: 'title'" }}</code></p>
      </td>
    </tr>
    <tr>
      <td>
        <p id="cached" class="name"><strong>Cached</strong></p>
        <p>Caches the result of a filter chain for reuse, improving performance for expensive operations that are used multiple times.</p>
      </td>
      <td class="align-center">
        <p><code class="filter">{{ "site.posts | where: 'category', 'news' | cached: 'news_posts'" }}</code></p>
      </td>
    </tr>
    <tr>
      <td>
        <p id="optimized_sort" class="name"><strong>Optimized Sort</strong></p>
        <p>A highly optimized sorting implementation that's significantly faster than the standard sort filter for large collections.</p>
      </td>
      <td class="align-center">
        <p><code class="filter">{{ "site.posts | optimized_sort: 'date'" }}</code></p>
      </td>
    </tr>
    <tr>
      <td>
        <p id="parallel_where" class="name"><strong>Parallel Where</strong></p>
        <p>Performs collection filtering in parallel for better performance on large datasets.</p>
      </td>
      <td class="align-center">
        <p><code class="filter">{{ "site.posts | parallel_where: 'category', 'news'" }}</code></p>
      </td>
    </tr>
    <tr>
      <td>
        <p id="memoize" class="name"><strong>Memoize</strong></p>
        <p>Remembers the result of expensive operations for the duration of the build.</p>
      </td>
      <td class="align-center">
        <p><code class="filter">{% raw %}{{ site.posts | where_exp: 'post', 'post.content contains "keyword"' | memoize: 'keyword_posts' }}{% endraw %}</code></p>
      </td>
    </tr>
  </tbody>
</table>
</div>

### Options for the `slugify` filter

The `slugify` filter accepts an option, each specifying what to filter.
The default is `default`. They are as follows (with what they filter):

- `none`: no characters
- `raw`: spaces
- `default`: spaces and non-alphanumeric characters
- `pretty`: spaces and non-alphanumeric characters except for `._~!$&'()+,;=@`
- `ascii`: spaces, non-alphanumeric, and non-ASCII characters
- `latin`: like `default`, except Latin characters are first transliterated (e.g. `àèïòü` to `aeiou`)

Rustyll's implementation is significantly faster than Jekyll's, particularly for large strings.

### Detecting `nil` values with `where` filter

You can use the `where` filter to detect documents and pages with properties that are `nil` or `""`. For example,

{% raw %}
```liquid
// Using `nil` to select posts that either do not have `my_prop`
// defined or `my_prop` has been set to `nil` explicitly.
{% assign filtered_posts = site.posts | where: 'my_prop', nil %}
```
{% endraw %}

{% raw %}
```liquid
// Using Liquid's special literal `empty` or `blank` to select
// posts that have `my_prop` set to an empty value.
{% assign filtered_posts = site.posts | where: 'my_prop', empty %}
```
{% endraw %}

### Binary operators in `where_exp` filter

You can use Liquid binary operators `or` and `and` in the expression passed to the `where_exp` filter to employ multiple
conditionals in the operation.

For example, to get a list of documents on English horror flicks, one could use the following snippet:

{% raw %}
```liquid
{{ site.movies | where_exp: "item", "item.genre == 'horror' and item.language == 'English'" }}
```
{% endraw %}

Or to get a list of comic-book based movies, one may use the following:

{% raw %}
```liquid
{{ site.movies | where_exp: "item", "item.sub_genre == 'MCU' or item.sub_genre == 'DCEU'" }}
```
{% endraw %}

Rustyll's implementation of `where_exp` includes advanced optimization techniques that make these expressions much faster than Jekyll's Ruby implementation.

### Filter Performance

Rustyll's filters are implemented in Rust, providing several performance advantages:

1. **Native code execution**: Filters run as compiled code, not interpreted Ruby
2. **Parallel processing**: Many filters can operate in parallel
3. **Memory efficiency**: Minimal memory overhead during filter operations
4. **Zero-copy operations**: Data is processed without unnecessary duplication
5. **Optimized algorithms**: Using highly efficient data structures and algorithms

For the best performance with large sites, consider using the Rustyll-specific parallel filters.

### Standard Liquid Filters

For your convenience, here is the list of all [Liquid filters]({{ page.shopify_filter_url }}) with links to examples in the official Liquid documentation.

{% for filter in page.shopify_filters %}
- [{{ filter }}]({{ filter | prepend: page.shopify_filter_url | append: '/' }})
{% endfor %}
