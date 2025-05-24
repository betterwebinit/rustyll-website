---
title: Installation
description: Official guide to install Rustyll on macOS, GNU/Linux or Windows.
permalink: /docs/installation/
---

Rustyll is a [Rust Crate]({{ '/docs/rust-101/#crates' | relative_url }}) that can be installed on most systems. As a compiled language, Rust offers significant performance advantages over Ruby, resulting in Rustyll's 10-100x faster build times compared to Jekyll.

## Requirements

* [Rust](https://www.rust-lang.org/tools/install) version **1.75** or higher (check your Rust version using `rustc --version`)
* [Cargo](https://doc.rust-lang.org/cargo/) (check your Cargo version using `cargo --version`)

## Installation Methods

### Standard Installation

The simplest way to install Rustyll is via Cargo:

```bash
cargo install rustyll
```

This will download and compile Rustyll and its dependencies. Once installed, verify your installation:

```bash
rustyll --version
```

### Optional Features

You can install Rustyll with optional features:

```bash
# Install with all features (recommended)
cargo install rustyll --features all

# Install with specific features
cargo install rustyll --features "parallel memcached imageproc"
```

Available features:
- `parallel` - Enables full parallel processing
- `memcached` - Adds Memcached support for distributed caching
- `imageproc` - Adds advanced image processing capabilities
- `s3` - Adds AWS S3 deployment support
- `minify` - Enables built-in minification

### From Source

For the latest features or to contribute to Rustyll:

```bash
# Clone the repository
git clone https://github.com/rustyll/rustyll.git
cd rustyll

# Build and install
cargo build --release
cargo install --path .
```

## Performance Optimization

For maximum performance, install Rustyll with optimized settings:

```bash
RUSTFLAGS="-C target-cpu=native" cargo install rustyll
```

This compiles Rustyll specifically for your CPU architecture, enabling additional performance optimizations.

## Docker Installation

Rustyll is available as a Docker image:

```bash
# Pull the image
docker pull rustyllorg/rustyll:latest

# Run a Rustyll site
docker run --rm -v "$PWD:/site" -p 4000:4000 rustyllorg/rustyll:latest serve --host 0.0.0.0
```

## Guides

For detailed install instructions, follow the guide for your operating system.

* [macOS]({{ '/docs/installation/macos/' | relative_url }})
* [Ubuntu]({{ '/docs/installation/ubuntu/' | relative_url }})
* [FreeBSD]({{ '/docs/installation/freebsd/' | relative_url }})
* [Other Linux]({{ '/docs/installation/other-linux/' | relative_url }})
* [Windows]({{ '/docs/installation/windows/' | relative_url }})

## System Requirements

Rustyll is highly efficient and can run on modest hardware, but performance scales with better hardware:

| Hardware | Build Performance |
|----------|------------------|
| Single-core CPU, 1GB RAM | Suitable for small sites |
| Dual-core CPU, 2GB RAM | Good for medium sites |
| Quad-core+ CPU, 4GB+ RAM | Excellent for large sites |

## Troubleshooting

If you encounter issues during installation:

1. Ensure you have the latest Rust version:
```bash
rustup update
```

2. Check for system dependencies:
```bash
rustyll doctor --system
```

3. Clean Cargo cache if you're upgrading:
```bash
cargo clean
cargo install rustyll --force
```

## Upgrade Instructions

To upgrade Rustyll to the latest version:

```bash
cargo install rustyll --force
```

## Creating a New Site

After installation, create a new Rustyll site:

```bash
# Create a new site with default theme
rustyll new my-awesome-site

# Create a blank site
rustyll new my-awesome-site --blank

# Create a site with a specific theme
rustyll new my-awesome-site --theme minima
```

## Next Steps

After installation, check out:

* [Quickstart guide]({{ '/docs/' | relative_url }})
* [Configuration options]({{ '/docs/configuration/' | relative_url }})
* [Migrating from Jekyll]({{ '/docs/upgrading/' | relative_url }})