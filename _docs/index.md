---
title: Quickstart
description: Install Rustyll, create a site, and serve it locally with the essential commands.
permalink: /docs/
redirect_from:
  - /docs/home/
  - /docs/quickstart/
  - /docs/extras/
---

Rustyll is a static site generator written in Rust. Write content in Markdown, shape it with Liquid templates, and generate a website you can host as static files. If you have a Jekyll site, the familiar structure can help you get started; review plugins and configuration when you migrate.

## Why Choose Rustyll?

* **Rust-powered**: Build a static site with a tool written in Rust.
* **Content-focused**: Keep writing in Markdown and organize content in files.
* **Familiar templates**: Use Liquid layouts and includes to shape your pages.
* **Portable output**: Publish the generated files with your preferred static host.
* **Migration guides**: Review the changes needed for an existing project.

## Prerequisites

Rustyll requires the following:

* Rust version **1.75** or higher
* Cargo (comes with Rust)

See [Requirements]({{ '/docs/installation/#requirements' | relative_url }}) for guides and details.

## Instructions

1. Install all [prerequisites]({{ '/docs/installation/' | relative_url }}).
2. Install Rustyll using Cargo.
```sh
cargo install rustyll
```
3. Create a new Rustyll site at `./myblog`.
```sh
rustyll new myblog
```
4. Change into your new directory.
```sh
cd myblog
```
5. Build the site and make it available on a local server.
```sh
rustyll serve
```
6. Browse to [http://localhost:4000](http://localhost:4000){:target="_blank"}

{: .note .info}
Pass the `--livereload` option to `serve` to automatically refresh the page with each change you make to the source files: `rustyll serve --livereload`

{: .note .info}
For build options available in your installed release, run `rustyll serve --help`.

## Migration from Jekyll

If you have an existing Jekyll site:

1. Install Rustyll
2. Navigate to your Jekyll site directory
3. Follow the [Jekyll migration guide]({{ '/docs/migrating/jekyll-to-rustyll/' | relative_url }}) to review configuration, templates and plugins.
4. Run `rustyll serve` and check the generated site.

## Next steps

Explore the [step by step tutorial]({{ '/docs/step-by-step/01-setup/' | relative_url }}), [deployment guide]({{ '/docs/deployment/' | relative_url }}) and [published releases](https://github.com/betterwebinit/rustyll/releases). Build times vary by project; compare tools using your own site's content and configuration.

If you encounter any errors during this process, check that you have installed all the prerequisites in [Requirements]({{ '/docs/installation/#requirements' | relative_url }}). 
If you still have issues, see [Troubleshooting]({{ '/docs/troubleshooting/#configuration-problems' | relative_url }}).

{: .note .info}
Installation varies based on your operating system. See our [guides]({{ '/docs/installation/#guides' | relative_url }}) for OS-specific instructions.
