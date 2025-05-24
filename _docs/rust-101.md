---
title: Rust 101 for Rustyll Users
permalink: /docs/rust-101/
---

## Introduction to Rust

Rustyll is built with [Rust](https://www.rust-lang.org/), a modern systems programming language that offers exceptional performance without sacrificing safety. This page provides a quick introduction to Rust for those interested in contributing to Rustyll or understanding how it works under the hood.

## Why Rust for Rustyll?

Rust offers several advantages that make it perfect for a static site generator:

1. **Performance**: Rust is blazingly fast, often matching or exceeding C/C++ performance
2. **Memory safety**: Rust's ownership system prevents memory leaks and data races without a garbage collector
3. **Concurrency**: Rust makes parallel programming safer and more accessible
4. **Cargo ecosystem**: Rust's package manager makes distribution and dependency management simple
5. **Cross-platform**: Rustyll works on Windows, macOS, and Linux with the same codebase

These advantages translate to Rustyll being 10-100x faster than Jekyll for most sites.

## Getting Started with Rust

If you want to contribute to Rustyll or better understand its codebase, you'll need to learn some Rust basics:

### Installing Rust

Install Rust using [rustup](https://rustup.rs/), the Rust toolchain installer:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

On Windows, download and run rustup-init.exe from the [Rust website](https://www.rust-lang.org/tools/install).

### Key Rust Concepts for Rustyll

Understanding these Rust concepts will help you navigate the Rustyll codebase:

#### Ownership and Borrowing

Rust's most distinctive feature is its ownership system:

```rust
fn main() {
    // String is owned by s1
    let s1 = String::from("hello");
    
    // Ownership moves to s2
    let s2 = s1;
    
    // This would fail - s1 no longer owns the string
    // println!("{}", s1);
    
    // Borrowing with references
    let s3 = String::from("world");
    let len = calculate_length(&s3);
    println!("The length of '{}' is {}.", s3, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

#### Traits

Traits are Rust's version of interfaces:

```rust
trait Plugin {
    fn name(&self) -> &str;
    fn process(&self, content: &str) -> String;
}

struct MarkdownPlugin;

impl Plugin for MarkdownPlugin {
    fn name(&self) -> &str {
        "markdown"
    }
    
    fn process(&self, content: &str) -> String {
        // Convert markdown to HTML
        format!("<p>{}</p>", content)
    }
}
```

#### Error Handling

Rust uses Result and Option types for error handling:

```rust
fn read_config(path: &str) -> Result<Config, std::io::Error> {
    let content = std::fs::read_to_string(path)?;
    // Parse config...
    Ok(Config::default())
}

fn main() {
    match read_config("_config.yml") {
        Ok(config) => println!("Config loaded"),
        Err(e) => eprintln!("Failed to load config: {}", e),
    }
    
    // Or using the ? operator in functions that return Result
    fn build_site() -> Result<(), std::io::Error> {
        let config = read_config("_config.yml")?;
        // Continue with site build...
        Ok(())
    }
}
```

#### Concurrency with Rayon

Rustyll uses Rayon for parallel processing:

```rust
use rayon::prelude::*;

fn process_posts(posts: Vec<Post>) -> Vec<ProcessedPost> {
    posts.par_iter() // Parallel iterator
         .map(|post| process_post(post))
         .collect()
}
```

## Building Rustyll from Source

To build Rustyll from source:

```bash
# Clone the repository
git clone https://github.com/rustyll/rustyll.git
cd rustyll

# Build in development mode
cargo build

# Build with optimizations for production
cargo build --release

# Run tests
cargo test
```

## Contributing to Rustyll

Contributions to Rustyll are welcome! Here's how to get started:

1. Fork the repository on GitHub
2. Create a new branch for your feature or bugfix
3. Make your changes
4. Add tests for your changes
5. Run the test suite with `cargo test`
6. Commit your changes
7. Push to your fork
8. Submit a pull request

For more details, see the [Contributing Guide]({{ '/docs/contributing/' | relative_url }}).

## Resources for Learning Rust

Here are some excellent resources for learning Rust:

- [The Rust Book](https://doc.rust-lang.org/book/) - The official Rust programming guide
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/) - Learn Rust with annotated examples
- [Rustlings](https://github.com/rust-lang/rustlings/) - Small exercises to get you used to reading and writing Rust code
- [Exercism's Rust Track](https://exercism.io/tracks/rust) - Practice exercises with mentor feedback

## Rust vs Ruby (Jekyll)

For those familiar with Jekyll's Ruby codebase, here's a comparison of common patterns:

| Concept | Ruby (Jekyll) | Rust (Rustyll) |
|---------|---------------|----------------|
| Classes | `class Page` | `struct Page` and `impl Page` |
| Mixins | `include Convertible` | `impl Convertible for Page` |
| Iteration | `pages.each { \|p\| ... }` | `for page in pages { ... }` |
| Error handling | `begin/rescue` | `Result<T, E>` and `?` |
| Concurrency | Threads (GIL limited) | Rayon (thread pool) |
| Memory mgmt | Garbage collection | Ownership system |

## Understanding Rustyll's Architecture

Rustyll's architecture leverages Rust's strengths:

1. **Core types**: `Site`, `Page`, `Post`, `Layout`, etc.
2. **Traits**: `Renderable`, `Convertible`, `Plugin`, etc.
3. **Parallel processing**: Using Rayon for concurrent operations
4. **Error handling**: Robust error reporting and recovery
5. **Plugin system**: Extensible via Rust crates

This architecture enables Rustyll's exceptional performance while maintaining Jekyll compatibility. 