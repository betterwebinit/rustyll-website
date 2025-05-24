---
title: Convert an HTML site to Rustyll
author: rustyllteam
date: 2024-06-01 10:00:00 -0400
---

If you're looking for themes for your Rustyll site, you don't have to restrict yourself to existing Rustyll themes. It's pretty easy to convert almost any static HTML files into a Rustyll website.

In many ways, any site that is currently a static site is *already* a Rustyll website. Rustyll just allows you to automate parts of the site (like inserting pages into templates, rendering lists for navigation, generating feeds and sitemaps, and more) as it processes the files.

Understanding how to convert any HTML site into Rustyll templates will open your world to many more options for Rustyll themes. Instead of [searching online for  *Rustyll themes*](https://duckduckgo.com/?q=Rustyll+themes), you can choose from the large variety of HTML templates for your site, quickly Rustyll-ize the HTML templates as you need to, and build the output with Rustyll.

Although websites can have sophisticated features and controls, we'll keep things simple in this tutorial.

## What is a Rustyll Website?

First, let's start with a grounding in the basics. Stripping a Rustyll site down to an extremely basic level will help clarify what happens in a Rustyll site. If you haven't already installed Rustyll, [install it]({% link _docs/installation.md %}).

We'll start with a *basic Rustyll site* consisting of three files:

```
.
├── _config.yml
├── _layouts
│   └── default.html
└── index.md
```

Manually create these three files in a folder called `my_rustyll_site` or whatever suits you the most, and place `default.html` inside a folder named `_layouts`.

```sh
touch _config.yml index.md default.html
mkdir _layouts && mv default.html _layouts
```

Fire up your favorite editor, and populate the contents of the `default.html` and `index.md` files as follows:

**_config.yml**

```yaml
name: My Rustyll Website
```

**_layouts/default.html**

{% raw %}
```html
<!DOCTYPE html>
<html>
  <body>
     {{ content }}
  </body>
</html>
```
{% endraw %}

**index.md**

{% raw %}
```markdown
---
title: My page
layout: default
---

# {{ page.title }}

Content is written in [Markdown](https://learnxinyminutes.com/docs/markdown/).
Plain text format allows you to focus on your **content**.

<!--
You can use HTML elements in Markdown, such as the comment element, and they won't
be affected by a markdown parser. However, if you create an HTML element in your
markdown file, you cannot use markdown syntax within that element's contents.
-->
```
{% endraw %}

Now `cd` to `my_rustyll_site` and serve the site with the built-in server:

```sh
cd my_rustyll_site
rustyll serve
```

{: .note .info}
For even faster development, add the `--threads auto` flag to enable parallel processing: `rustyll serve --threads auto`.

When you serve the site, you get a preview URL such as `http://127.0.0.1:4000/` (which is the same as `http://localhost:4000/`). The site's files are built into the `_site` folder by default.

This is a Rustyll site at the most basic functional level. Here's what is happening:

  * The `_config.yml` file contains settings that Rustyll uses as it processes your site. An empty config file will use default values for building a Rustyll site. For example, to convert [Markdown](https://learnxinyminutes.com/docs/markdown/) to HTML, Rustyll will automatically use the [kramdown Markdown filter](https://rubygems.org/gems/kramdown/), without any need to specify it.
  * Rustyll looks for files with [front matter tags]({% link _docs/front-matter.md %}) (the two sets of dashed lines `---` like those in `index.md`) and processes the files (populating site variables, rendering any [Liquid](https://shopify.github.io/liquid/), and converting Markdown to HTML).
  * Rustyll pushes the content from all pages and posts into the {% raw %}`{{ content }}`{% endraw %} variable in the layout specified (`default`) in the front matter tags.
  * The processed files get written as `.html` files in the `_site` directory.

You can read more about how Rustyll processes the files in [order of Interpretation]({% link _tutorials/orderofinterpretation.md %}).

With this basic understanding of how a Rustyll site works, you can convert almost any HTML theme for Rustyll. The following sections will take you through a step-by-step tutorial to do so. 