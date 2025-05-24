# Rustyll docs site

This directory contains the code for the Rustyll docs site, [rustyll.org](https://rustyll.org/).

## Contributing

For information about contributing, see the [Contributing page](https://rustyll.org/docs/contributing/).

## Running locally

You can preview your contributions before opening a pull request by running from within the directory:

1. `cd docs`
2. `rustyll serve --watch`

It's just a Rustyll site, after all! :rocket:

## Performance

Rustyll is blazing fast compared to Jekyll:

- Builds are 10-100x faster
- Parallel processing with all available CPU cores
- Incremental builds for quick iterations
- Aggressive caching for even better performance

## Updating Font Awesome

1. Go to <https://icomoon.io/app/>
2. Choose Import Icons and load `icomoon-selection.json`
3. Choose Generate Font → Download
4. Copy the font files and adapt the CSS to the paths we use in Rustyll
