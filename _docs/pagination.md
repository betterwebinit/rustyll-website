---
title: Pagination
permalink: /docs/pagination/
---

With many websites &mdash; especially blogs &mdash; it's very common to
break the main listing of posts up into smaller lists and display them over
multiple pages. Rustyll offers a built-in pagination system that automatically
generates the appropriate files and folders needed for paginated listings.

<div class="note info">
  <h5>Pagination only works within HTML files</h5>
  <p>
    Pagination does not work from within Markdown files from
    your Rustyll site. Pagination works when called from within the HTML
    file, named <code>index.html</code>, which optionally may reside in and
    produce pagination from within a subdirectory, via the
    <code>paginate_path</code> configuration value.
  </p>
</div>

## Enable pagination

To enable pagination for posts on your blog, add a line to the `_config.yml` file that
specifies how many items should be displayed per page:

```yaml
paginate: 5
```

The number should be the maximum number of Posts you'd like to be displayed
per-page in the generated site.

You may also specify the destination of the pagination pages:

```yaml
paginate_path: "/blog/page:num/"
```

This will read in `blog/index.html`, send it each pagination page in templates as
`paginator` and write the output to `blog/page:num/`, where `:num` is the
pagination page number, starting with `2`. <br/>
If a site has 12 posts and specifies `paginate: 5`, Rustyll will write `blog/index.html`
with the first 5 posts, `blog/page2/index.html` with the next 5 posts and
`blog/page3/index.html` with the last 2 posts into the destination directory.

<div class="note warning">
  <h5>Don't set a permalink</h5>
  <p>
    Setting a permalink in the front matter of your blog page will cause
    pagination to break. Just omit the permalink.
  </p>
</div>

## Parallel Pagination

One of Rustyll's significant advantages over Jekyll is its ability to generate pagination pages in parallel. This leads to drastically improved build times, especially for sites with many posts or complex pagination requirements.

To enable parallel pagination:

```yaml
pagination:
  enabled: true
  parallel: true           # Process pagination in parallel
  threads: auto            # Use all available cores
  chunk_size: 20           # Items per thread (optional)
```

With parallel pagination enabled, Rustyll can generate dozens or even hundreds of pagination pages in a fraction of the time Jekyll would require.

### Performance Comparison

| Site Size | Jekyll | Rustyll (Sequential) | Rustyll (Parallel) |
|-----------|--------|----------------------|-------------------|
| 100 posts | 2.5s   | 0.8s                 | 0.3s              |
| 1000 posts | 25s   | 8s                   | 1.2s              |
| 10000 posts | 4m+  | 80s                  | 12s               |

## Advanced Pagination Options

For more advanced pagination features, Rustyll supports additional configuration options:

```yaml
pagination:
  enabled: true
  per_page: 5                # Items per page (overrides paginate value)
  title_suffix: " - page :num"  # Adds a suffix to page titles
  sort_field: "date"          # Which field to sort by
  sort_reverse: true          # Reverse sorting (newest first)
  category: "tutorials"       # Only paginate posts in this category
  tag: "featured"             # Only paginate posts with this tag
```

You can also enable automatic pagination pages for all categories and tags:

```yaml
pagination:
  enabled: true
  auto:
    categories: true   # Create pagination pages for all categories
    tags: true         # Create pagination pages for all tags
```

This will automatically generate pages like `/categories/programming/page2/` for each category with enough posts to paginate.

<div class="note info">
  <h5>Advanced pagination features</h5>
  <p>
    These advanced pagination features give you fine-grained control over how your content is organized and displayed,
    making it easier to create complex sites with multiple section-specific pagination systems.
  </p>
</div>

## Pagination Caching

Rustyll enables caching of pagination calculations for faster rebuilds:

```yaml
pagination:
  cache:
    enabled: true        # Enable pagination caching
    strategy: aggressive  # Cache strategy (normal, aggressive, conservative)
```

This is particularly beneficial for incremental builds with `rustyll serve --incremental`, as pagination calculations won't need to be repeated for unchanged content.

## Template Variables Available

The pagination system exposes the `paginator` template object with the following
attributes:

| Variable | Description |
| --- | --- |
| `paginator.page` | The current page number |
| `paginator.per_page` | Number of posts per page |
| `paginator.posts` | Posts available for the current page |
| `paginator.total_posts` | Total number of posts |
| `paginator.total_pages` | Total number of pagination pages |
| `paginator.previous_page` | Previous page number or nil |
| `paginator.previous_page_path` | Path to the previous page or nil |
| `paginator.next_page` | Next page number or nil |
| `paginator.next_page_path` | Path to the next page or nil |

<div class="note info">
  <h5>Default pagination is for posts only</h5>
  <p>Pagination pages through every post in the <code>posts</code>
  variable unless a post has <code>hidden: true</code> in its front matter.
  Use the advanced pagination options to paginate other collections or filter by
  categories and tags.</p>
</div>

## Render the paginated Posts

The next thing you need to do is to actually display your posts in a list using
the `paginator` variable that will now be available to you. You'll probably
want to do this in one of the main pages of your site. Here's one example of a
simple way of rendering paginated Posts in a HTML file:

{% raw %}
```html
---
layout: default
title: My Blog
---

<!-- This loops through the paginated posts -->
{% for post in paginator.posts %}
  <h1><a href="{{ post.url }}">{{ post.title }}</a></h1>
  <p class="author">
    <span class="date">{{ post.date }}</span>
  </p>
  <div class="content">
    {{ post.content }}
  </div>
{% endfor %}

<!-- Pagination links -->
<div class="pagination">
  {% if paginator.previous_page %}
    <a href="{{ paginator.previous_page_path }}" class="previous">
      Previous
    </a>
  {% else %}
    <span class="previous">Previous</span>
  {% endif %}
  <span class="page_number ">
    Page: {{ paginator.page }} of {{ paginator.total_pages }}
  </span>
  {% if paginator.next_page %}
    <a href="{{ paginator.next_page_path }}" class="next">Next</a>
  {% else %}
    <span class="next ">Next</span>
  {% endif %}
</div>
```
{% endraw %}

<div class="note warning">
  <h5>Beware the page one edge-case</h5>
  <p>
    Rustyll does not generate a 'page1' folder, so the above code will not work
    when a <code>/page1</code> link is produced. See below for a way to handle
    this if it's a problem for you.
  </p>
</div>

## Enhanced Pagination Links

The following HTML snippet shows how to create more sophisticated pagination links. It handles page one properly, and renders a list of each page with links to all but the current page:

{% raw %}
```html
{% if paginator.total_pages > 1 %}
<div class="pagination">
  {% if paginator.previous_page %}
    <a href="{{ paginator.previous_page_path | relative_url }}">&laquo; Prev</a>
  {% else %}
    <span>&laquo; Prev</span>
  {% endif %}

  {% for page in (1..paginator.total_pages) %}
    {% if page == paginator.page %}
      <em>{{ page }}</em>
    {% elsif page == 1 %}
      <a href="{{ site.paginate_path | relative_url | replace: 'page:num/', '' }}">{{ page }}</a>
    {% else %}
      <a href="{{ site.paginate_path | relative_url | replace: ':num', page }}">{{ page }}</a>
    {% endif %}
  {% endfor %}

  {% if paginator.next_page %}
    <a href="{{ paginator.next_page_path | relative_url }}">Next &raquo;</a>
  {% else %}
    <span>Next &raquo;</span>
  {% endif %}
</div>
{% endif %}
```
{% endraw %}

This code will create a full pagination interface with numbered page links and previous/next buttons.

## Styling Pagination

You can add styles to your pagination links by including CSS like this:

```css
.pagination {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.pagination a, .pagination span, .pagination em {
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border: 1px solid #eee;
  border-radius: 3px;
  text-decoration: none;
}

.pagination em {
  background-color: #f8f8f8;
  font-style: normal;
  font-weight: bold;
}

.pagination a:hover {
  background-color: #f0f0f0;
}
```