---
title: Sass/SCSS Options
permalink: "/docs/configuration/sass/"
---

Rustyll comes with built-in Sass/SCSS processing capabilities. By default, Rustyll will look for Sass partials in the `_sass` directory relative to your site's `source` directory.

You can configure the Sass processing by adding options to your Rustyll config under the `sass` attribute:

```yaml
sass:
  sass_dir: _sass       # Default Sass partials directory
  style: compressed     # Output style (nested, expanded, compact, compressed)
  sourcemap: never      # Sourcemap generation (always, never, development)
  load_paths:           # Additional load paths for imports
    - node_modules/bootstrap/scss
  precision: 6          # Decimal precision for floating point values
```

{:.note .info}
Rustyll 1.0 and above natively supports Sass/SCSS processing without requiring additional plugins, providing better performance than Ruby-based processors.

<div class="note info">
  <p>
    Note that directory paths specified in the <code>sass</code> configuration
    are resolved relative to your site's <code>source</code>, not relative to the location of the <code>_config.yml</code> file.
  </p>
</div>

## Style Options

The `style` option controls the output format of the generated CSS:

- `nested`: Indented format that reflects the nesting of the Sass source
- `expanded`: Standard CSS style with each property on its own line
- `compact`: Each rule takes up only one line
- `compressed`: Removes all unnecessary whitespace (default for production)

## Sourcemaps

Sourcemaps help with debugging by mapping the compiled CSS back to the original Sass source. The `sourcemap` option can be:

- `always`: Always generate sourcemaps
- `never`: Never generate sourcemaps
- `development`: Only generate sourcemaps in development mode

## Example Configuration

Here's a more complete example of Sass configuration:

```yaml
sass:
  sass_dir: _sass
  style: compressed
  sourcemap: development
  load_paths:
    - node_modules/bootstrap/scss
    - node_modules/@fortawesome/fontawesome-free/scss
  precision: 8
  implementation: dart-sass  # Use Dart Sass implementation (default)
```

## Using Sass in your site

To use Sass in your site, create a `.scss` or `.sass` file in your site's source directory (usually in a `css` folder), starting with empty front matter:

```scss
---
---

// Import partials from the _sass folder
@import "variables";
@import "mixins";
@import "base";

// Your styles
.container {
  max-width: 1200px;
  margin: 0 auto;
}
```

Rustyll will process this file and output a compiled CSS file at the same path in your site's destination directory.
