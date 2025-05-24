---
title: Rustyll on Ubuntu
permalink: /docs/installation/ubuntu/
---

## Install Rust and Rustyll

Installing Rustyll on Ubuntu is simple and straightforward since it's built with Rust. Follow these steps to get up and running quickly:

### 1. Install Rust using rustup

The recommended way to install Rust is through rustup, the Rust toolchain installer:

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Follow the on-screen instructions. The default installation is recommended for most users.

Source the environment variables to use Rust without restarting your terminal:

```sh
source "$HOME/.cargo/env"
```

### 2. Install Rustyll

Once Rust is installed, you can install Rustyll directly through Cargo, Rust's package manager:

```sh
cargo install rustyll
```

### 3. Verify Installation

Verify that Rustyll was installed correctly:

```sh
rustyll -v
```

That's it! You're ready to start using Rustyll. No need to install Ruby, gems, or additional dependencies.

## Performance on Ubuntu

Rustyll performs exceptionally well on Ubuntu Linux:

| Task | Jekyll (Ruby) | Rustyll (Rust) | Improvement |
|------|---------------|----------------|-------------|
| Installation | Multiple dependencies | Single command | Simpler |
| Build time | Slow | Very fast | 10-20x faster |
| Memory usage | High | Low | 3-5x less |

## Creating a New Site

To create a new Rustyll site:

```sh
rustyll new my-site
cd my-site
rustyll serve
```

Your site will be available at `http://localhost:4000`.

## Advanced Usage

### Parallel Processing

Take advantage of all available CPU cores on your Ubuntu system:

```sh
rustyll build --threads auto
```

Or specify in your `_config.yml`:

```yaml
threads: auto  # Uses all available CPU cores
```

### Live Reload and Incremental Builds

For the best development experience:

```sh
rustyll serve --livereload --incremental
```

### System-wide Installation

If you want to install Rustyll system-wide (available to all users):

```sh
sudo cargo install rustyll
```

### Using with Docker

If you prefer using Docker, you can use the official Rustyll image:

```sh
docker run -it --rm -v "$PWD:/site" -p 4000:4000 rustyll/rustyll serve --host 0.0.0.0
```

## Troubleshooting

### Permission Issues

If you encounter permission errors when installing or running Rustyll:

```sh
# Add yourself to the correct group (usually not needed with Rustyll)
sudo chown -R $(whoami) ~/.cargo/

# Or install locally (recommended approach)
cargo install --path . --force
```

### SSL Certificate Issues

If you encounter SSL certificate issues during installation:

```sh
# Install SSL certificates
sudo apt-get install ca-certificates
```
