---
title: Rustyll on macOS
permalink: /docs/installation/macos/
---

## Supported macOS versions

Rustyll supports all macOS versions from 10.15 (Catalina) and newer.

## Install Rust and Rustyll

There are two primary ways to install Rustyll on macOS:

### Option 1: Install with Homebrew (Recommended)

[Homebrew](https://brew.sh/) makes it easy to install development tools on a Mac:

```sh
# First, install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Then install Rustyll
brew install rustyll
```

This will install Rust, Cargo (Rust's package manager), and Rustyll in one step.

### Option 2: Install with rustup

For more control over your Rust installation:

1. Install Rust using rustup:

   ```sh
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. Follow the on-screen instructions (the default installation is recommended).

3. Configure your shell:

   ```sh
   source "$HOME/.cargo/env"
   ```

4. Install Rustyll:

   ```sh
   cargo install rustyll
   ```

## Verify Installation

```sh
rustyll -v
```

## Creating a New Site

```sh
rustyll new my-site
cd my-site
rustyll serve
```

Your new site will be available at `http://localhost:4000`.

## Performance on Apple Silicon

Rustyll is fully optimized for Apple Silicon (M1/M2/M3) Macs, offering exceptional performance advantages:

| Task | Jekyll (Ruby) | Rustyll (Rust) | Improvement |
|------|---------------|----------------|-------------|
| Installation | Complex, multiple steps | Simple, one command | Much simpler |
| Build time | Slow | Very fast | 10-20x faster |
| Memory usage | High | Low | 3-5x less |
| CPU usage | High | Low | Much more efficient |
| Battery impact | Significant | Minimal | Better for laptop use |

## Parallel Processing

Rustyll automatically detects the number of CPU cores on your Mac and uses them for parallel processing. You can control this with:

```sh
# Use all available cores
rustyll build --threads auto

# Specify a number of cores
rustyll build --threads 4
```

## Troubleshooting

### Permission Issues

If you encounter permission issues with cargo:

```sh
# Install for the current user only
cargo install --user rustyll
```

### Homebrew Installation Issues

If Homebrew installation fails, try:

```sh
brew update
brew doctor
# Follow any recommendations then try again
```
