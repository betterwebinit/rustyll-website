---
title: Themes
permalink: /docs/themes/
---

Rustyll has an extensive theme system that allows you to leverage community-maintained templates and styles to customize your site's presentation. Rustyll themes specify plugins and package up assets, layouts, includes, and stylesheets in a way that can be overridden by your site's content.

## Pick up a theme

You can find and preview themes on different galleries:

- [GitHub.com #rustyll-theme repos](https://github.com/topics/rustyll-theme)
- [jamstackthemes.dev](https://jamstackthemes.dev/ssg/rustyll/)
- [rustyllthemes.org](http://rustyllthemes.org/)
- [rustyllthemes.io](https://rustyllthemes.io/)

See also: [resources](/resources/).

## Understanding crate-based themes

When you [create a new Rustyll site](/docs/) (by running the `rustyll new <PATH>` command), Rustyll installs a site that uses a crate-based theme called [Minima](https://github.com/rustyll/minima).

With crate-based themes, some of the site's directories (such as the `assets`, `_data`, `_layouts`, `_includes`, and `_sass` directories) are stored in the theme's crate, hidden from your immediate view. Yet all of the necessary directories will be read and processed during Rustyll's build process.

In the case of Minima, you see only the following files in your Rustyll site directory:

```
.
├── Cargo.toml
├── Cargo.lock
├── _config.yml
├── _posts
│   └── 2023-01-04-welcome-to-rustyll.markdown
├── about.markdown
└── index.markdown
```

The `Cargo.toml` and `Cargo.lock` files are used by Cargo to keep track of the required crates and crate versions you need to build your Rustyll site.

Crate-based themes make it easier for theme developers to make updates available to anyone who has the theme crate. When there's an update, theme developers push the update to crates.io.

If you have the theme crate, you can (if you desire) run `cargo update` to update all crates in your project. Or you can run `cargo update rustyll-theme-minima` to just update the theme crate. Any new files or updates the theme developer has made (such as to stylesheets or includes) will be pulled into your project automatically.

The goal of crate-based themes is to allow you to get all the benefits of a robust, continually updated theme without having all the theme's files getting in your way and over-complicating what might be your primary focus: creating content.

## Performance Benefits of Crate-Based Themes

Rustyll's crate-based themes offer significant performance advantages:

1. **Compiled Assets**: Theme assets can be pre-compiled for faster loading
2. **Parallel Processing**: Rustyll processes theme files in parallel with your content
3. **Optimized Caching**: Theme files are cached effectively to reduce build times
4. **Dependency Management**: Cargo automatically manages theme dependencies

For large sites, these optimizations can reduce build times by up to 90% compared to traditional Jekyll themes.

## Theme Performance Configuration

You can optimize theme performance in your `_config.yml`:

```yaml
theme_optimization:
  parallel: true            # Process theme files in parallel
  cache: aggressive         # Aggressively cache theme files
  precompile_assets: true   # Precompile theme assets during build
```

## Overriding theme defaults

Rustyll themes set default data, layouts, includes, and stylesheets. However, you can override any of the theme defaults with your own site content.

To replace layouts or includes in your theme, make a copy in your `_layouts` or `_includes` directory of the specific file you wish to modify, or create the file from scratch giving it the same name as the file you wish to override.

For example, if your selected theme has a `page` layout, you can override the theme's layout by creating your own `page` layout in the `_layouts` directory (that is, `_layouts/page.html`).

To locate a theme's files on your computer:

1. Run `cargo install cargo-theme-info` and then run `cargo theme-info rustyll-theme-minima` for Rustyll's default theme.

   This returns the location of the crate-based theme files. For example, the Minima theme's files might be located in `~/.cargo/registry/src/github.com-1ecc6299db9ec823/rustyll-theme-minima-0.1.0` on Linux systems.

2. Open the theme's directory in your file explorer:

   ```sh
   # On MacOS
   open $(cargo theme-info rustyll-theme-minima)

   # On Windows
   explorer $(cargo theme-info rustyll-theme-minima)

   # On Linux
   xdg-open $(cargo theme-info rustyll-theme-minima)
   ```

With a clear understanding of the theme's files, you can now override any theme file by creating a similarly named file in your Rustyll site directory.

Let's say, for a second example, you want to override Minima's footer. In your Rustyll site, create an `_includes` folder and add a file in it called `footer.html`. Rustyll will now use your site's `footer.html` file instead of the `footer.html` file from the Minima theme crate.

To modify any stylesheet you must take the extra step of also copying the main sass file (`_sass/minima.scss` in the Minima theme) into the `_sass` directory in your site's source.

Rustyll will look first to your site's content before looking to the theme's defaults for any requested file in the following folders:

- `/assets`
- `/_data`
- `/_layouts`
- `/_includes`
- `/_sass`

Note that making copies of theme files will prevent you from receiving any theme updates on those files. An alternative, to continue getting theme updates on all stylesheets, is to use higher specificity CSS selectors in your own additional, originally named CSS files.

{: .note .info}
Refer to your selected theme's documentation and source repository for more information on which files you can override.

### Themes with `_data` directory
{: #themes-with-data-directory }

Rustyll takes into account the `_data` directory of themes. This allows data to be distributed across themes. 

A typical example is text used within design elements.

Imagine a theme provides the include file `testimonials.html`. This design element creates a new section on the page, and puts a h3 heading over the list of testimonials.

A theme developer will probably formulate the heading in English and put it directly into the HTML source code.

Consumers of the theme can copy the included file into their project and replace the heading there.

With the consideration of the `_data` directory there is another solution for this standard task.

Instead of entering the text directly into the design template, the designer adds a reference to a text catalog (e.g. `site.data.i18n.testimonials.header`) and create a file `_data/i18n/testimonials.yml` in the data directory of the theme.

In this file the header is put under the key `header` and Rustyll takes care of the rest.

For theme developers, this, at first sight, is of course a bigger effort than before.

However, for the consumers of the theme, the customization is greatly simplified.

Imagine the theme is used by a customer from Germany. In order for her to get the translated header for the testimonials design element in, she just has to create a data file in her project directory with the key `site.data.i18n.testimonials.header`, put the German translation or a header of her choice on top of it and the design element is already customized.

She no longer has to copy the included file into her project directory, customize it there and, what weighs heaviest, waiver all updates of the theme, simply because the theme developer offered her the possibility to make changes to text modules centrally via text files.

{: .note .warning}
Data files provide a high degree of flexibility. The place where theme developers put text modules may differ from that of the consumer of the theme which can cause unforeseen troubles!

Related to above example the overriding key `site.data.i18n.testimonials.header` from the theme's `_data/i18n/testimonials.yml` file on the consumer site can be located in three different locations:

- `_data/i18n.yml` with key `testimonials.header`
- `_data/i18n/testimonials.yml` with key `header` (which mirrors the layout of the given example)
- `_data/i18n/testimonials/header.yml` without any key, the headline can go straight into the file

Theme developers should have this ambiguity in mind, when supporting consumers that feel lost in setting their text modules for the design elements the theme provides.

{: .note .info}
When using the data feature ask yourself, is the key that you introduce something that changes the behaviour of the theme when present or not, or is it just data that's displayed anyway. If it's changing the behaviour of the theme it should go into `site.config` otherwise it's fine to be provided via `site.data`.

Bundling data that modifies the behavior of a theme is considered an **anti-pattern** whose use is strongly discouraged. It is solely up to the author of the theme to ensure that every provided data can be easily overridden by the consumer of the theme if they desire to.

## Converting crate-based themes to regular themes

Suppose you want to get rid of the crate-based theme and convert it to a regular theme, where all files are present in your Rustyll site directory, with nothing stored in the theme crate.

To do this, copy the files from the theme crate's directory into your Rustyll site directory. (For example, copy them to `/myblog` if you created your Rustyll site at `/myblog`. See the previous section for details.)

Then you must tell Rustyll about the plugins that were referenced by the theme. You can find these plugins in the theme's Cargo.toml file as runtime dependencies. If you were converting the Minima theme, for example, you might see:

```toml
[dependencies]
rustyll-theme-minima = "0.1.0"
```

You should include these references in the `Cargo.toml` in one of two ways.

You could list them individually in both `Cargo.toml` and `_config.yml`.

```toml
# ./Cargo.toml

[dependencies]
rustyll-theme-minima = "0.1.0"
```

```yaml
# ./_config.yml

plugins:
  - rustyll-theme-minima
```

Or you could list them explicitly as Rustyll plugins in your Cargo.toml, and not update `_config.yml`, like this:

```toml
# ./Cargo.toml

[dependencies]
rustyll-theme-minima = "0.1.0"
```

Either way, don't forget to `cargo update`.

If you're publishing on GitHub Pages you should update only your `_config.yml` as GitHub Pages doesn't load plugins via Cargo.

Finally, remove references to the theme crate in `Cargo.toml` and configuration. For example, to remove `rustyll-theme-minima`:

- Open `Cargo.toml` and remove `rustyll-theme-minima = "0.1.0"`.
- Open `_config.yml` and remove `theme: rustyll-theme-minima`.

Now `cargo update` will no longer get updates for the theme crate.

## Installing a crate-based theme {#installing-a-theme}

The `rustyll new <PATH>` command isn't the only way to create a new Rustyll site with a crate-based theme. You can also find crate-based themes online and incorporate them into your Rustyll project.

For example, search for [rustyll theme on crates.io](https://crates.io/search?q=rustyll-theme) to find other crate-based themes. (Note that not all themes are using `rustyll-theme` as a convention in the theme name.)

To install a crate-based theme:

1. Add the theme crate to your site's `Cargo.toml`:

   ```toml
   # ./Cargo.toml
   
   [dependencies]
   # This is an example, declare the theme crate you want to use here
   rustyll-theme-minima = "0.1.0"
   ```

2. Add the theme crate to your site's `_config.yml`:

   ```yaml
   # ./_config.yml

   theme: rustyll-theme-minima
   ```

3. Run `cargo update` to download and install the theme crate.

## Theme Migration from Jekyll

Migrating a Jekyll theme to Rustyll is straightforward in most cases:

1. Create a new crate with a name like `rustyll-theme-yourtheme`
2. Copy all Jekyll theme files into the crate
3. Add a `src/lib.rs` that implements the Rustyll theme API
4. Publish the crate to crates.io

Rustyll will automatically handle most Jekyll theme features, and its parallel processing will make the theme perform much faster than in Jekyll.

## Creating your own theme

To create a new Rustyll theme:

```bash
rustyll new-theme THEME_NAME
```

This will create a new theme scaffold in the `THEME_NAME` directory. The scaffold includes everything you need to develop and package a crate-based theme.

Rustyll themes include special performance optimizations when built as crates, enabling features like:

- Parallel asset processing
- Precompiled templates
- Asset fingerprinting and optimization
- Memory-efficient resource handling

For more details, see the [Theme Development Guide]({{ '/docs/themes/development/' | relative_url }}).
