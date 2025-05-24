---
layout: step
title: Setup
menu_name: Step by Step Tutorial
position: 1
redirect_from:
- /docs/step-by-step/
---
Welcome to Rustyll's step-by-step tutorial. This tutorial takes
you from having some front-end web development experience to building your
first Rustyll site from scratch without relying on the default themes, leveraging the high performance of Rust-powered static site generation.

## Installation

Rustyll is built in Rust for exceptional performance. First, install Rust on your machine if you haven't already. 
Go to [rustup.rs](https://rustup.rs/) to install Rust, or visit our detailed [Installation]({{ '/docs/installation/' | relative_url }}) page for platform-specific instructions.

With Rust installed, install Rustyll from the terminal:

```sh
cargo install rustyll
```

Alternatively, you can download a precompiled binary from our [releases page](https://github.com/rustyll/rustyll/releases).

To verify the installation:

```sh
rustyll --version
```

## Creating a New Site

The easiest way to get started is using Rustyll's built-in site generator:

```sh
rustyll new mysite
cd mysite
```

This creates a basic site structure with the following files:
- `_config.yml` - Configuration settings
- `index.md` - Your homepage content
- `_layouts/default.html` - The main layout template
- `_layouts/post.html` - A template for blog posts
- `_posts/` - Directory for your blog posts

## Creating a Site Manually

If you prefer to set up your site manually, you can create a new directory for your site and set up the files yourself.

Create a new directory for your site and name
it whatever you want. Through the rest of this tutorial we'll refer to this
directory as **root**.

You can also initialize a Git repository here. Version control is highly recommended as all content and site structure are simple files that Git can track. Learn more about Git by reading the [Git Handbook](https://guides.github.com/introduction/git-handbook/).

Let's add your first file. Create `index.html` in **root** with the following
content:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Home</title>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

## Building Your Site

Since Rustyll is a static site generator, it builds your site before you can view it. Rustyll offers significantly faster build times than Ruby-based generators like Jekyll.

Run either of the following commands:

* `rustyll build` - Builds the site and outputs a static site to a directory called `_site`
* `rustyll serve` - Does `rustyll build` and runs it on a local web server at `http://localhost:4000`, rebuilding the site any time you make a change

### Performance Options

Rustyll offers performance options not available in other generators:

```sh
# Use all CPU cores for maximum performance
rustyll serve --threads auto

# Enable live reload for instant browser refresh
rustyll serve --livereload

# Enable incremental builds for faster rebuilds
rustyll serve --incremental
```

{: .note .info}
For the best development experience, use `rustyll serve --livereload --incremental`. This gives you near-instant rebuilds and browser refreshes as you edit.

{: .note .warning}
The version of the site that `rustyll serve` builds in `_site` is configured for development. For production deployment, use `rustyll build` with your production configuration settings. See the [Deployment]({{ '/docs/step-by-step/10-deployment/' | relative_url }}) section for more details.

Run `rustyll serve` and go to
<a href="http://localhost:4000" target="_blank" data-proofer-ignore>http://localhost:4000</a> in
your browser. You should see "Hello World!".

At this point, your site is very basic - just a single HTML file. In the next sections, you'll learn how to use Liquid templates, front matter, layouts, and more to build a full-featured static site with blazing performance.
