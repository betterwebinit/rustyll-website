---
title: Quickstart
permalink: /docs/
redirect_from:
  - /docs/home/
  - /docs/quickstart/
  - /docs/extras/
---

Rustyll is a blazing fast static site generator written in Rust. It's a drop-in replacement for Jekyll that offers dramatic performance improvements through parallel processing. Rustyll takes text written in your favorite markup language and uses layouts to create a static website. You can tweak the site's look and feel, URLs, the data displayed on the page, and more.

## Why Choose Rustyll?

* **Lightning Fast**: 10-100x faster than Jekyll thanks to Rust and parallel processing
* **Fully Compatible**: Works with existing Jekyll sites with no modifications needed
* **Modern Features**: Parallel builds, aggressive caching, and memory optimization
* **Rust-powered**: Built on Rust's speed, memory safety, and thread safety
* **Jekyll-familiar**: Uses the same project structure and Liquid templates

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
For even faster build times, enable parallel and incremental builds: `rustyll serve --livereload --incremental --threads=auto`

## Migration from Jekyll

If you have an existing Jekyll site, migration is simple:

1. Install Rustyll
2. Navigate to your Jekyll site directory
3. Run `rustyll serve`

That's it! Rustyll will automatically detect and build your Jekyll site, typically 10-100x faster than Jekyll would.

## Performance Comparison

| Site Size | Jekyll Build Time | Rustyll Build Time |
|-----------|------------------|-------------------|
| Small (50 pages) | 3.5s | 0.3s |
| Medium (500 pages) | 32.0s | 1.8s |
| Large (5000 pages) | 5m 20s | 9.5s |

See [Parallel Builds]({{ '/docs/parallel-builds/' | relative_url }}) for more information on Rustyll's performance features.

If you encounter any errors during this process, check that you have installed all the prerequisites in [Requirements]({{ '/docs/installation/#requirements' | relative_url }}). 
If you still have issues, see [Troubleshooting]({{ '/docs/troubleshooting/#configuration-problems' | relative_url }}).

{: .note .info}
Installation varies based on your operating system. See our [guides]({{ '/docs/installation/#guides' | relative_url }}) for OS-specific instructions.
