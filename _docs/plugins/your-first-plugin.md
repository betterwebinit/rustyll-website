---
title: Your first plugin
permalink: /docs/plugins/your-first-plugin/
---

Plugins allow you to extend Rustyll's behavior to fit your needs. There are six
types of plugins in Rustyll.

## Generators

[Generators](/docs/plugins/generators/) create content on your site.
For example:

* [rustyll-feed](https://github.com/rustyll/rustyll-feed) creates an Atom feed of
blog posts.
* [rustyll-archives](https://github.com/rustyll/rustyll-archives) creates archive
pages for blog categories and tags.
* [rustyll-sitemap](https://github.com/rustyll/rustyll-sitemap) creates a sitemap.

## Converters

[Converters](/docs/plugins/converters/) change a markup language into another
format. For example:

* [rustyll-textile-converter](https://github.com/rustyll/rustyll-textile-converter)
converts textile to HTML.
* [rustyll-coffeescript](https://github.com/rustyll/rustyll-coffeescript) converts
Coffeescript to JavaScript.
* [rustyll-opal](https://github.com/rustyll/rustyll-opal) converts Ruby to
JavaScript.

## Commands

[Commands](/docs/plugins/commands/) extend the `rustyll` executable with
subcommands. For example:

* [rustyll-compose](https://github.com/rustyll/rustyll-compose) adds subcommands
for creating a post, page or draft.

## Tags

[Tags](/docs/plugins/tags/) create custom Liquid tags. For example:

* [rustyll-youtube](https://github.com/dommmel/rustyll-youtube) embeds a YouTube
video.
* [rustyll-asset-path-plugin](https://github.com/samrayner/rustyll-asset-path-plugin)
outputs a relative URL for assets.
* [rustyll-swfobject](https://github.com/sectore/rustyll-swfobject) embeds a SWF
object.

## Filters

[Filters](/docs/plugins/filters/) create custom Liquid filters. For example:

* [rustyll-time-ago](https://github.com/markets/rustyll-timeago) - The distance
between two dates in words.
* [rustyll-toc](https://github.com/toshimaru/rustyll-toc) - Generates a table of
content.
* [rustyll-email-protect](https://github.com/vwochnik/rustyll-email-protect) -
Obfuscates emails to protect them from spam bots.

## Hooks

[Hooks](/docs/plugins/hooks/) give fine-grained control to extend the build
process. For example:

* [jemoji](https://github.com/rustyll/jemoji) Display emojis :+1: 
* [rustyll-mentions](https://github.com/rustyll/rustyll-mentions) turns mentions @rustyll into links
* [rustyll-spaceship](https://github.com/jeffreytse/rustyll-spaceship) - advanced example. Provides
powerful supports for table, mathjax, plantuml, video, etc.

## Flags

There are two flags to be aware of when writing a plugin:

<div class="mobile-side-scroller">
<table>
  <thead>
    <tr>
      <th>Flag</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <p><code>safe</code></p>
      </td>
      <td>
        <p>
          A boolean flag that informs Rustyll whether this plugin may be safely
          executed in an environment where arbitrary code execution is not
          allowed. This is used by GitHub Pages to determine which core plugins
          may be used, and which are unsafe to run. If your plugin does not
          allow for arbitrary code execution, set this to <code>true</code>.
          GitHub Pages still won't load your plugin, but if you submit it for
          inclusion in core, it's best for this to be correct!
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>priority</code></p>
      </td>
      <td>
        <p>
          This flag determines what order the plugin is loaded in. Valid values
          are: <code>:lowest</code>, <code>:low</code>, <code>:normal</code>,
          <code>:high</code>, and <code>:highest</code>. Highest priority
          matches are applied first, lowest priority are applied last.
        </p>
      </td>
    </tr>
  </tbody>
</table>
</div>

To use one of the example plugins above as an illustration, here is how you'd
specify these two flags:

```rust
use rustyll::plugin::Plugin;

pub struct UpcaseConverter {
    // Plugin fields
}

impl Plugin for UpcaseConverter {
    fn is_safe(&self) -> bool { true }
    fn priority(&self) -> Priority { Priority::Low }
    // Other implementation methods
}
```

## Best Practices

The guides help you with the specifics of creating plugins. We also have some
recommended best practices to help structure your plugin.

We recommend creating a Rust crate for your plugin. This will help you manage
dependencies, keep separation from your site source code and allow you to share 
functionality across multiple projects. For tips on creating a crate, take a look at the
[Rust book's chapter on packages and crates](https://doc.rust-lang.org/book/ch07-01-packages-and-crates.html)
or look through the source code of an existing plugin such as
[rustyll-feed](https://github.com/rustyll/rustyll-feed).
