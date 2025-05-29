---
title: Front Matter
permalink: /docs/front-matter/
redirect_from: /docs/frontmatter/index.html
---

Any file that contains a [YAML](https://yaml.org/) front matter block will be
processed by Rustyll as a special file. The front matter must be the first thing
in the file and must take the form of valid YAML set between triple-dashed
lines. Here is a basic example:

```yaml
---
layout: post
title: Blogging Like a Hacker
---
```

Between these triple-dashed lines, you can set predefined variables (see below
for a reference) or even create custom ones of your own. These variables will
then be available for you to access using Liquid tags both further down in the
file and also in any layouts or includes that the page or post in question
relies on.

<div class="note warning">
  <h5>UTF-8 Character Encoding Warning</h5>
  <p>
    If you use UTF-8 encoding, make sure that no <code>BOM</code> header
    characters exist in your files or very, very bad things will happen to
    Rustyll. This is especially relevant if you're running
    <a href="{{ '/docs/installation/windows/' | relative_url }}">Rustyll on Windows</a>.
  </p>
</div>

<div class="note">
  <h5>Front Matter Variables Are Optional</h5>
  <p>
    If you want to use <a href="{{ '/docs/variables/' | relative_url }}">Liquid tags and variables</a>
    but don't need anything in your front matter, just leave it empty! The set
    of triple-dashed lines with nothing in between will still get Rustyll to
    process your file. (This is useful for things like CSS and RSS feeds!)
  </p>
</div>

## Predefined Global Variables

There are a number of predefined global variables that you can set in the
front matter of a page or post.

<div class="mobile-side-scroller">
<table>
  <thead>
    <tr>
      <th>Variable</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <p><code>layout</code></p>
      </td>
      <td>
        <p>

          If set, this specifies the layout file to use. Use the layout file
          name without the file extension. Layout files must be placed in the
          <code>_layouts</code> directory.

        </p>
        <ul>
          <li>
            Using <code>null</code> will produce a file without using a layout
            file. This is overridden if the file is a post/document and has a
            layout defined in the <a href="{{ '/docs/configuration/front-matter-defaults/' | relative_url }}">
            front matter defaults</a>.
          </li>
          <li>
            Using <code>none</code> in a post/document will
            produce a file without using a layout file regardless of front matter defaults.
            Using <code>none</code> in a page will cause Rustyll to attempt to
            use a layout named "none".
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>permalink</code></p>
      </td>
      <td>
        <p>

          If you need your processed blog post URLs to be something other than
          the site-wide style (default <code>/year/month/day/title.html</code>), then you can set
          this variable and it will be used as the final URL.

        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>published</code></p>
      </td>
      <td>
        <p>
          Set to false if you don't want a specific post to show up when the
          site is generated.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>parallel</code></p>
      </td>
      <td>
        <p>
          Set to true to enable parallel processing for this page, which can dramatically speed up
          rendering for complex content with many includes or heavy Liquid processing.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>cache</code></p>
      </td>
      <td>
        <p>
          Controls caching behavior for this page. Options include: <code>always</code>, <code>never</code>, or <code>default</code>.
          Useful for frequently changing pages or pages that need fresh data on each build.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>render_priority</code></p>
      </td>
      <td>
        <p>
          Sets the priority level for rendering (1-10, lower numbers = higher priority). 
          High-priority pages are processed first during parallel builds.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>memory_limit</code></p>
      </td>
      <td>
        <p>
          Sets a specific memory limit for rendering this page in MB. Useful for 
          very large or complex pages that might exceed default memory allocations.
        </p>
      </td>
    </tr>
  </tbody>
</table>
</div>

<div class="note">
  <h5>Render Posts Marked As Unpublished</h5>
  <p>
    To preview unpublished pages, run `rustyll serve` or `rustyll build`
    with the `--unpublished` switch. Rustyll also has a handy <a href="{{ '/docs/posts/#drafts' | relative_url }}">drafts</a>
    feature tailored specifically for blog posts.
  </p>
</div>

## Custom Variables

You can also set your own front matter variables you can access in Liquid. For
instance, if you set a variable called `food`, you can use that in your page:

{% raw %}
```liquid
---
food: Pizza
---

<h1>{{ page.food }}</h1>
```
{% endraw %}

## Predefined Variables for Posts

These are available out-of-the-box to be used in the front matter for a post.

<div class="mobile-side-scroller">
<table>
  <thead>
    <tr>
      <th>Variable</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <p><code>date</code></p>
      </td>
      <td>
        <p>
          A date here overrides the date from the name of the post. This can be
          used to ensure correct sorting of posts. A date is specified in the
          format <code>YYYY-MM-DD HH:MM:SS +/-TTTT</code>; hours, minutes, seconds, and timezone offset
          are optional.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>category</code></p>
        <p><code>categories</code></p>
      </td>
      <td>
        <p>

          Instead of placing posts inside of folders, you can specify one or
          more categories that the post belongs to. When the site is generated
          the post will act as though it had been set with these categories
          normally. Categories (plural key) can be specified as a <a
          href="https://en.wikipedia.org/wiki/YAML#Basic_components">YAML list</a> or a
          space-separated string.

        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>tags</code></p>
      </td>
      <td>
        <p>

          Similar to categories, one or multiple tags can be added to a post.
          Also like categories, tags can be specified as a <a
          href="https://en.wikipedia.org/wiki/YAML#Basic_components">YAML list</a> or a
          space-separated string.

        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>render_priority</code></p>
      </td>
      <td>
        <p>
          Rustyll-specific feature that controls the priority of this post in the parallel build system.
          Posts with higher priority (lower numbers) are rendered first. Values range from 1 (highest) to 10 (lowest).
          Default is 5.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>parallel_deps</code></p>
      </td>
      <td>
        <p>
          Specifies dependencies that must be rendered before this post can be processed. 
          This helps Rustyll optimize the parallel build queue. Format: <code>["_posts/2023-01-01-post.md"]</code>
        </p>
      </td>
    </tr>
  </tbody>
</table>
</div>

<div class="note">
  <h5>Don't repeat yourself</h5>
  <p>
    If you don't want to repeat your frequently used front matter variables
    over and over, define
    <a href="{{ '/docs/configuration/front-matter-defaults/' | relative_url }}" title="Front Matter defaults">defaults</a>
    for them and only override them where necessary (or not at all). This works
    both for predefined and custom variables.
  </p>
</div>

## Performance Considerations

Rustyll's parsing of front matter is significantly faster than Jekyll's thanks to its Rust implementation. However, for even better performance:

- Consider using front matter defaults in `_config.yml` instead of repeating the same front matter in many files
- For build-time computations, use the `parallel: true` setting on complex pages
- Use the `cache` option strategically for files that rarely change
- Set appropriate `render_priority` values to ensure important pages are built first
- For very large sites, consider using the `parallel_deps` option to fine-tune the build order

These optimizations can result in even faster build times, especially for large sites with hundreds or thousands of pages.

## Front Matter Formats

Rustyll supports multiple front matter formats for flexibility:

### YAML (Default)

```yaml
---
title: My Page
layout: default
---
```

### TOML

```toml
+++
title = "My Page"
layout = "default"
+++
```

### JSON

{% raw %}
```json
{{{
  "title": "My Page",
  "layout": "default"
}}}
```
{% endraw %}

All formats provide the same functionality, but YAML is the most commonly used.
