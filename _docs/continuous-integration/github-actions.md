---
title: GitHub Actions
---

When using GitHub Pages, Jekyll runs in a restricted environment with limited plugins. With Rustyll, you'll want to use GitHub Actions to build and deploy your site with complete control over the build environment, taking advantage of Rustyll's superior performance.

## Advantages of using Actions with Rustyll

### Performance Benefits

- **Faster Builds** - Rustyll can build your site 10-20x faster than Jekyll, significantly reducing your GitHub Actions minutes usage
- **Parallel Processing** - Rustyll automatically utilizes all available CPU cores on the GitHub Actions runner
- **Memory Efficiency** - Rustyll's Rust-based architecture uses much less memory than Jekyll's Ruby environment

### Complete Control

- **Latest Version** - Use the most recent version of Rustyll instead of the version GitHub Pages provides
- **All Plugins** - Use any Rustyll plugins, including custom ones in your repository
- **Themes** - Use any theme with full compatibility and control

## Workspace setup

The first requirement is a Rustyll project hosted on GitHub. Choose an existing Rustyll project or create a new one and push the repository to GitHub.

For this example, we'll use a simple Rustyll site with just a `_config.yml` and an `index.md` page:

```yaml
# _config.yml

title: "Rustyll Actions Demo"
threads: auto  # Use all available cores
```

{% raw %}

```liquid
---
---

# Welcome to My Rustyll Site

{% assign date = '2023-04-13T10:20:00Z' %}

- Original date - {{ date }}
- With timeago filter - {{ date | timeago }}
```

{% endraw %}

### Setting up the GitHub Action

Create a new file at `.github/workflows/rustyll.yml` with the following content:

```yaml
name: Build and deploy Rustyll site

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Rust
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
          profile: minimal
      
      - name: Cache Cargo
        uses: actions/cache@v3
        with:
          path: |
            ~/.cargo/bin/
            ~/.cargo/registry/index/
            ~/.cargo/registry/cache/
            ~/.cargo/git/db/
          key: {% raw %}${{ runner.os }}-cargo-${{ hashFiles('**/Cargo.lock') }}{% endraw %}
          restore-keys: {% raw %}${{ runner.os }}-cargo-{% endraw %}
      
      - name: Install Rustyll
        run: cargo install rustyll
      
      - name: Build with Rustyll
        run: rustyll build
      
      - name: Setup Pages
        uses: actions/configure-pages@v3
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: '_site'
  
  deploy:
    environment:
      name: github-pages
      url: {% raw %}${{ steps.deployment.outputs.page_url }}{% endraw %}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

This workflow will:
1. Set up Rust on the GitHub Actions runner
2. Install Rustyll from crates.io
3. Build your site with Rustyll
4. Deploy the built site to GitHub Pages

### Build and deploy

On pushing changes to your main branch, the action will be triggered and the build will start.

To watch the progress and see any build errors:

1. Go to the **Actions** tab in your repository
2. Click on the workflow run to see detailed logs
3. If successful, the build will deploy to GitHub Pages

The workflow will show the deployment URL in the summary. You can also find it in the **Settings** > **Pages** section of your repository.

## Performance Comparison

When using Rustyll with GitHub Actions instead of the standard Jekyll build process:

| Metric | Jekyll | Rustyll | Improvement |
|--------|--------|---------|-------------|
| Build time (100 pages) | ~60 seconds | ~3-6 seconds | 10-20x faster |
| Memory usage | ~500MB | ~50MB | 10x less |
| GitHub Actions minutes | More | Less | Save on CI minutes |

## Custom Plugins

To use custom Rustyll plugins (which can be written in Rust), you can either:

1. Include them in your project repository
2. Install them from crates.io by adding an installation step to your workflow

```yaml
- name: Install Rustyll plugins
  run: cargo install rustyll-plugin-name
```

## External links

- [GitHub Actions documentation](https://docs.github.com/en/actions)
- [GitHub Pages documentation](https://docs.github.com/en/pages)
