---
title: Rustyll on Linux
permalink: /docs/installation/other-linux/
---

Installation on other Linux distributions works similarly to installing on [Ubuntu](../ubuntu/), but with distribution-specific package managers.

## Install Rust and Rustyll

### Option 1: Using rustup (Recommended for all distributions)

The recommended way to install Rust and Rustyll on any Linux distribution is using rustup:

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

After installing rustup, configure your current shell:

```sh
source "$HOME/.cargo/env"
```

Then install Rustyll:

```sh
cargo install rustyll
```

### Option 2: Distribution-specific packages

#### Fedora

```sh
sudo dnf install rust cargo
cargo install rustyll
```

#### RHEL/CentOS/Alma Linux/Rocky Linux

```sh
sudo dnf install rust cargo
cargo install rustyll
```

#### Debian/Ubuntu

```sh
sudo apt install rustc cargo
cargo install rustyll
```

#### Arch Linux

```sh
sudo pacman -S rust
cargo install rustyll
```

#### openSUSE

```sh
sudo zypper install rust cargo
cargo install rustyll
```

#### Gentoo

```sh
sudo emerge dev-lang/rust
cargo install rustyll
```

#### Alpine Linux

```sh
sudo apk add rust cargo
cargo install rustyll
```

#### Clear Linux

```sh
sudo swupd bundle-add rust-basic
cargo install rustyll
```

## Verify Installation

Test your installation by running:

```sh
rustyll -v
```

## Creating a New Site

```sh
rustyll new my-site
cd my-site
rustyll serve
```

## Performance Advantages

Rustyll provides significant performance improvements across all Linux distributions:

- Faster build times (10-20x quicker than Jekyll)
- Lower memory usage
- Efficient multi-core processing
- Single dependency (Rust) vs. Ruby's complex dependency chain
