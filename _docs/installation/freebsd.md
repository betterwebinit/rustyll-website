---
title: Rustyll on FreeBSD
permalink: /docs/installation/freebsd/
---

## Install Rust and Rustyll

Installing Rustyll on FreeBSD is straightforward since it's built with Rust:

### 1. Install Rust

```sh
sudo pkg install rust
```

Or use rustup for the most up-to-date Rust installation:

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### 2. Set up Cargo

If you installed Rust via rustup, source the environment variables to use Cargo:

```sh
source $HOME/.cargo/env
```

### 3. Install Rustyll

Install Rustyll using Cargo:

```sh
cargo install rustyll
```

### 4. Verify installation

Verify that Rustyll was installed correctly:

```sh
rustyll -v
```

That's it! You're ready to start using Rustyll on FreeBSD.

## Creating a New Site

```sh
rustyll new my-site
cd my-site
rustyll serve
```

Your site will be available at `http://localhost:4000`.

## Performance Benefits

Rustyll provides significant performance improvements over Jekyll on FreeBSD:

- Much faster build times
- Lower memory usage
- Native parallel processing
- No Ruby dependency chain to manage
