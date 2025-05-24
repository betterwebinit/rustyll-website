---
layout: docs
title: Upgrading
permalink: /docs/upgrading/
---

## Migrating from Jekyll to Rustyll

Rustyll is designed to be fully compatible with Jekyll sites. To migrate an existing Jekyll site to Rustyll:

1. Install Rustyll:
   ```bash
   cargo install rustyll
   ```

2. Navigate to your Jekyll site directory

3. Run Rustyll:
   ```bash
   rustyll serve
   ```

That's it! Rustyll will automatically detect your Jekyll site structure and build it with improved performance.

## Upgrading Rustyll

<div class="note">
  <h5>Stay Up to Date</h5>
  <p>We recommend you update Rustyll as often as possible to benefit from
  the latest performance improvements and bug fixes.
  </p>
</div>

To update to the latest version of Rustyll, run:

```bash
cargo install rustyll --force
```

If you're using Rustyll as a dependency in your own project's Cargo.toml, update the version constraint:

```toml
[dependencies]
rustyll = "0.1.0" # replace with the latest version
```

And run:

```bash
cargo update
```

## Migrating between Rustyll versions

When migrating between major Rustyll versions, refer to these guides:

- [From 0.x to 1.x](/docs/upgrading/0-to-1/)

## Performance considerations when upgrading

Rustyll introduces significant performance improvements with each release. To get the most out of your upgrade:

1. Enable parallel processing with multiple threads:
   ```yaml
   # _config.yml
   threads: auto  # uses all available CPU cores
   ```

2. Enable incremental builds for faster development:
   ```bash
   rustyll serve --incremental
   ```

3. Configure caching for optimal build times:
   ```yaml
   # _config.yml
   cache:
     enabled: true
     strategy: aggressive  # options: normal, aggressive, conservative
   ```

These settings can dramatically reduce build times, especially for larger sites with many pages and complex templates.
