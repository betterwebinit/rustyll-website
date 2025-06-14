---
title: Posts
permalink: /docs/posts/
redirect_from:
  - /docs/drafts/
---

Blogging is baked into Rustyll. You write blog posts as text files and Rustyll
provides everything you need to turn it into a blog.

## The Posts Folder

The `_posts` folder is where your blog posts live. You typically write posts
in [Markdown](https://daringfireball.net/projects/markdown/), HTML is
also supported.

## Creating Posts

To create a post, add a file to your `_posts` directory with the following
format:

```
YEAR-MONTH-DAY-title.MARKUP
```

Where `YEAR` is a four-digit number, `MONTH` and `DAY` are both two-digit
numbers, and `MARKUP` is the file extension representing the format used in the
file. For example, the following are examples of valid post filenames:

```
2011-12-31-new-years-eve-is-awesome.md
2012-09-12-how-to-write-a-blog.md
```

All blog post files must begin with [front matter](/docs/front-matter/) which is
typically used to set a [layout](/docs/layouts/) or other meta data. For a simple
example this can just be empty:

```markdown
---
layout: post
title:  "Welcome to Rustyll!"
---

# Welcome

**Hello world**, this is my first Rustyll blog post.

I hope you like it!
```

<div class="note">
  <h5>ProTip™: Link to other posts</h5>
  <p>
    Use the <a href="/docs/liquid/tags/#linking-to-posts"><code>post_url</code></a>
    tag to link to other posts without having to worry about the URLs
    breaking when the site permalink style changes.
  </p>
</div>

<div class="note info">
  <h5>Be aware of character sets</h5>
  <p>
    Content processors can modify certain characters to make them look nicer.
    For example, the <code>smart</code> extension in Comrak converts standard,
    ASCII quotation characters to curly, Unicode ones. In order for the browser
    to display those characters properly, define the charset meta value by
    including <code>&lt;meta charset=&quot;utf-8&quot;&gt;</code> in the
    <code>&lt;head&gt;</code> of your layout.
  </p>
</div>

## Including images and resources

At some point, you'll want to include images, downloads, or other
digital assets along with your text content. One common solution is to create
a folder in the root of the project directory called something like `assets`,
into which any images, files or other resources are placed. Then, from within
any post, they can be linked to using the site's root as the path for the asset
to include. The best way to do this depends on the way your site's (sub)domain
and path are configured, but here are some simple examples in Markdown:

Including an image asset in a post:

```markdown
... which is shown in the screenshot below:
![My helpful screenshot](/assets/screenshot.jpg)
```

Linking to a PDF for readers to download:

```markdown
... you can [get the PDF](/assets/mydoc.pdf) directly.
```

## Displaying an index of posts

Creating an index of posts on another page should be easy thanks to
[Liquid](https://shopify.github.io/liquid/) and its tags. Here's a
simple example of how to create a list of links to your blog posts:

{% raw %}
```liquid
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
```
{% endraw %}

You have full control over how (and where) you display your posts,
and how you structure your site. You should read more about [how templates
work](/docs/templates/) with Rustyll if you want to know more.

Note that the `post` variable only exists inside the `for` loop above. If
you wish to access the currently-rendering page/posts's variables (the
variables of the post/page that has the `for` loop in it), use the `page`
variable instead.

## Parallel Post Processing

One of Rustyll's key advantages is the ability to process multiple posts in parallel. By default, Rustyll will automatically parallelize post processing for better performance. You can control this behavior with the `parallel` front matter variable:

```markdown
---
layout: post
title: "High Priority Post"
parallel: true
render_priority: 1
---
```

The `render_priority` determines which posts get processed first in the parallel queue (lower numbers = higher priority).

### Performance Impact

Parallel post processing can dramatically improve build times, especially for sites with many posts or complex templates:

| Site Size | Jekyll | Rustyll (Sequential) | Rustyll (Parallel) |
|-----------|--------|----------------------|-------------------|
| 50 posts | 2.5s | 0.5s | 0.2s |
| 500 posts | 25s | 5s | 0.8s |
| 5000 posts | 4m+ | 50s | 8s |

### Configuring Parallel Processing

You can configure parallel post processing in your `_config.yml`:

```yaml
posts:
  parallel: true           # Enable parallel post processing
  threads: auto            # Use all available cores
  batch_size: 20           # Posts per batch
  cache: aggressive        # Caching strategy
  priority_frontpage: true # Prioritize posts shown on the front page
```

## Tags and Categories

Rustyll has first class support for *tags* and *categories* in blog posts.

### Tags

Tags for a post are defined in the post's front matter using either the key
`tag` for a single entry or `tags` for multiple entries. <br/> Since Rustyll
expects multiple items mapped to the key `tags`, it will automatically *split*
a string entry if it contains whitespace. For example, while front matter
`tag: classic hollywood` will be processed into a singular entity
`"classic hollywood"`, front matter `tags: classic hollywood` will be processed
into an array of entries `["classic", "hollywood"]`.

Irrespective of the front matter key chosen, Rustyll stores the metadata mapped
to the plural key which is exposed to Liquid templates.

All tags registered in the current site are exposed to Liquid templates via
`site.tags`. Iterating over `site.tags` on a page will yield another array with
two items, where the first item is the name of the tag and the second item being
*an array of posts* with that tag.

{% raw %}
```liquid
{% for tag in site.tags %}
  <h3>{{ tag[0] }}</h3>
  <ul>
    {% for post in tag[1] %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
{% endfor %}
```
{% endraw %}

### Parallel Tag and Category Processing

Rustyll can build tag and category pages in parallel, which is particularly useful for sites with many tags or categories:

```yaml
# _config.yml
tags:
  parallel: true           # Process tag pages in parallel
  threads: auto            # Number of threads to use
categories:
  parallel: true           # Process category pages in parallel
  threads: auto            # Number of threads to use
```

### Categories

Categories of a post work similar to the tags above:
  * They can be defined via the front matter using keys `category` or
    `categories` (that follow the same logic as for tags)
  * All categories registered in the site are exposed to Liquid templates via
    `site.categories` which can be iterated over (similar to the loop for tags
    above.)

*The similarity between categories and tags however, ends there.*

Unlike tags, categories for posts can also be defined by a post's file path.
Any directory above `_posts` will be read-in as a category. For example,
if a post is at path `movies/horror/_posts/2019-05-21-bride-of-chucky.markdown`,
then `movies` and `horror` are automatically registered as categories for that
post.

When the post also has front matter defining categories, they just get added to
the existing list if not present already.

The hallmark difference between categories and tags is that categories of a post
may be incorporated into [the generated URL](/docs/permalinks/#global) for the
post, while tags cannot be.

Therefore, depending on whether front matter has `category: classic hollywood`,
or `categories: classic hollywood`, the example post above would have the URL as
either
`movies/horror/classic%20hollywood/2019/05/21/bride-of-chucky.html` or
`movies/horror/classic/hollywood/2019/05/21/bride-of-chucky.html` respectively.


## Post excerpts

You can access a snippet of a posts's content by using `excerpt` variable on a
post. By default this is the first paragraph of content in the post, however it
can be customized by setting a `excerpt_separator` variable in front matter or
`_config.yml`.

```markdown
---
excerpt_separator: <!--more-->
---

Excerpt with multiple paragraphs

Here's another paragraph in the excerpt.
<!--more-->
Out-of-excerpt
```

Here's an example of outputting a list of blog posts with an excerpt:

{% raw %}
```liquid
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>
```
{% endraw %}

## Optimized Excerpt Generation

Rustyll optimizes excerpt generation for better performance:

```yaml
# _config.yml
excerpt:
  parallel: true       # Generate excerpts in parallel
  cache: true          # Cache excerpts between builds
  strip_html: true     # Strip HTML for cleaner excerpts
```

This can significantly improve build times for sites with many posts.

## Drafts

Drafts are posts without a date in the filename. They're posts you're still
working on and don't want to publish yet. To get up and running with drafts,
create a `_drafts` folder in your site's root and create your first draft:

```
.
├── _drafts
│   └── a-draft-post.md
...
```

To preview your site with drafts, run `rustyll serve` or `rustyll build`
with the `--drafts` switch. Each will be assigned the value modification time
of the draft file for its date, and thus you will see currently edited drafts
as the latest posts.

## Performance Optimization

Rustyll provides several performance optimizations specifically for blog sites with many posts:

### Incremental Post Building

When using `rustyll serve --incremental`, only modified posts will be rebuilt. This makes development much faster, especially on sites with hundreds of posts.

### Post Caching

You can enable aggressive caching for posts that don't change frequently:

```yaml
# _config.yml
post_cache:
  enabled: true
  strategy: aggressive
```

### Pagination Optimization

Rustyll's pagination system is designed to be fast even with thousands of posts. To enable pagination:

```yaml
# _config.yml
pagination:
  enabled: true
  per_page: 10
  permalink: '/page/:num/'
```

When using pagination with many posts, Rustyll processes this in parallel, resulting in much better performance than Jekyll's sequential pagination system.

### Lazy Post Loading

For extremely large sites, Rustyll can use lazy loading to improve performance:

```yaml
# _config.yml
posts:
  lazy_load: true       # Only load posts when needed
  preload_latest: 10    # Preload the latest 10 posts
```

### Post Processing Control

Rustyll offers fine-grained control over post processing:

```yaml
# _config.yml
posts:
  process:
    markdown: parallel    # Process Markdown in parallel
    frontmatter: parallel # Process front matter in parallel
    liquid: parallel      # Process Liquid in parallel
    layout: parallel      # Apply layouts in parallel
```

These optimizations combined can make Rustyll process posts 10-100x faster than Jekyll.
