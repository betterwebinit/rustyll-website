---
title: Liquid Tags
permalink: "/docs/liquid/tags/"
---

All of the standard Liquid [tags](https://shopify.github.io/liquid/tags/control-flow/) are supported by Rustyll. Rustyll has several built-in tags to help you build your site. You can also create your own tags using [plugins]({{ '/docs/plugins/' | relative_url }}).

## Includes

If you have page snippets that you use repeatedly across your site, an [include]({{ '/docs/includes/' | relative_url }}) is the perfect way to make this more maintainable.

## Code snippet highlighting

Rustyll has built-in support for syntax highlighting of over 200 languages thanks to [Syntect](https://github.com/trishume/syntect), a high-performance syntax highlighting library written in Rust. Syntect is significantly faster than both Rouge and Pygments.

To render a code block with syntax highlighting, surround your code as follows:

{% raw %}
```liquid
{% highlight rust %}
fn main() {
    println!("Hello, world!");
}
{% endhighlight %}
```
{% endraw %}

The argument to the `highlight` tag (`rust` in the example above) is the language identifier.

<div class="note">
  <h5>Rustyll processes all Liquid filters in code blocks</h5>
  <p>If you are using a language that contains curly braces, you
    will likely need to place <code>{&#37; raw &#37;}</code> and
    <code>{&#37; endraw &#37;}</code> tags around your code.
    You can add <code>render_with_liquid: false</code> in your front matter to disable Liquid entirely for a particular document.</p>
</div>

### Line numbers

There is a second argument to `highlight` called `linenos` that is optional.
Including the `linenos` argument will force the highlighted code to include line
numbers. For instance, the following code block would include line numbers next
to each line:

{% raw %}
```liquid
{% highlight rust linenos %}
fn main() {
    println!("Hello, world!");
}
{% endhighlight %}
```
{% endraw %}

### Marking specific lines

You can mark specific lines in a code snippet by using the optional
argument `mark_lines`. This argument takes a space-separated list of
line numbers which must be wrapped in double quotes. For example, the
following code block will mark lines 1 and 2 but not line 3:

{% raw %}
```liquid
{% highlight rust mark_lines="1 2" %}
fn main() {
    println!("Hello, world!");
}
{% endhighlight %}
```
{% endraw %}

A default class name of `hll` will be applied to the marked lines.

### Rustyll-specific syntax highlighting options

Rustyll adds several performance optimizations and additional options for syntax highlighting:

{% raw %}
```liquid
{% highlight rust cache=true theme="Dracula" %}
fn main() {
    println!("Hello, world!");
}
{% endhighlight %}
```
{% endraw %}

The available options include:

- `cache`: Enable caching for this code block (default: true)
- `theme`: Specify a syntax highlighting theme
- `inline`: Render as inline code (no containing `pre` tag)
- `tab_width`: Set the tab width in spaces
- `wrap`: Enable line wrapping for long lines

### Stylesheets for syntax highlighting

Rustyll includes several built-in syntax highlighting themes:

```yaml
# _config.yml
highlight:
  theme: "InspiredGitHub"  # Default theme
```

Available themes include:
- "InspiredGitHub" (default)
- "Solarized (dark)"
- "Solarized (light)"
- "Dracula"
- "Nord"
- "VS Code Dark+"
- "One Dark"

## Parallel Processing Tags

Rustyll adds special tags for managing parallel processing:

{% raw %}
```liquid
{% rustyll_parallel %}
  {% for post in site.posts %}
    {% include complex_template.html post=post %}
  {% endfor %}
{% endparallel %}
```
{% endraw %}

This will process the loop iterations in parallel across multiple CPU cores, dramatically improving performance for sites with many posts.

## Links

### Linking to pages {#link}

To link to a post, a page, collection item, or file, the `link` tag will generate the correct permalink URL for the path you specify. For example, if you use the `link` tag to link to `mypage.html`, even if you change your permalink style to include the file extension or omit it, the URL formed by the `link` tag will always be valid.

You must include the file's original extension when using the `link` tag. Here are some examples:

{% raw %}
```liquid
{% link _collection/name-of-document.md %}
{% link _posts/2016-07-26-name-of-post.md %}
{% link news/index.html %}
{% link /assets/files/doc.pdf %}
```
{% endraw %}

You can also use the `link` tag to create a link in Markdown as follows:

{% raw %}
```liquid
[Link to a document]({% link _collection/name-of-document.md %})
[Link to a post]({% link _posts/2016-07-26-name-of-post.md %})
[Link to a page]({% link news/index.html %})
[Link to a file]({% link /assets/files/doc.pdf %})
```
{% endraw %}

The path to the post, page, or collection is defined as the path relative to the root directory (where your config file is) to the file, not the path from your existing page to the other page.

For example, suppose you're creating a link in `page_a.md` (stored in `pages/folder1/folder2`) to `page_b.md` (stored in  `pages/folder1`). Your path in the link would not be `../page_b.html`. Instead, it would be `/pages/folder1/page_b.md`.

If you're unsure of the path, add {% raw %}`{{ page.path }}`{% endraw %} to the page and it will display the path.

One major benefit of using the `link` or `post_url` tag is link validation. If the link doesn't exist, Rustyll won't build your site. This is a good thing, as it will alert you to a broken link so you can fix it (rather than allowing you to build and deploy a site with broken links).

Note you cannot add filters to `link` tags. For example, you cannot append a string using Liquid filters, such as {% raw %}`{% link mypage.html | append: "#section1" %}`{% endraw %}. To link to sections on a page, you will need to use regular HTML or Markdown linking techniques.

The name of the file you want to link can be specified as a variable instead of an actual file name. For example, suppose you defined a variable in your page's front matter like this:

```yaml
---
title: My page
my_variable: footer_company_a.html
---
```

You could then reference that variable in your link:

{% raw %}
```liquid
{% link {{ page.my_variable }} %}
```
{% endraw %}

In this example, the `link` tag would render a link to the file `footer_company_a.html`.

### Linking to posts

If you want to include a link to a post on your site, the `post_url` tag will generate the correct permalink URL for the post you specify.

{% raw %}
```liquid
{% post_url 2010-07-21-name-of-post %}
```
{% endraw %}

If you organize your posts in subdirectories, you need to include subdirectory path to the post:

{% raw %}
```liquid
{% post_url /subdir/2010-07-21-name-of-post %}
```
{% endraw %}

There is no need to include the file extension when using the `post_url` tag.

You can also use this tag to create a link to a post in Markdown as follows:

{% raw %}
```liquid
[Name of Link]({% post_url 2010-07-21-name-of-post %})
```
{% endraw %}

## Performance Consideration

Rustyll's implementation of Liquid tags is highly optimized:

1. Tags are compiled to native code rather than interpreted
2. Common tags are optimized for specific use cases
3. Template evaluation is cached for repeated tags
4. Large operations (like `for` loops over many items) can be parallelized

For best performance, consider using the `rustyll_parallel` tag for processing large collections in templates.
