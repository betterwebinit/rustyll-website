---
title: Directory Structure
permalink: /docs/structure/
---
A basic Rustyll site usually looks something like this:

```
.
├── _config.yml
├── _data
│   └── members.yml
├── _drafts
│   ├── begin-with-the-crazy-ideas.md
│   └── on-simplicity-in-technology.md
├── _includes
│   ├── footer.html
│   └── header.html
├── _layouts
│   ├── default.html
│   └── post.html
├── _posts
│   ├── 2007-10-29-why-every-programmer-should-play-nethack.md
│   └── 2009-04-26-barcamp-boston-4-roundup.md
├── _sass
│   ├── _base.scss
│   └── _layout.scss
├── _site
├── .rustyll-cache
│   └── Rustyll
│       └── Cache
│           └── [...]
├── .rustyll-metadata
├── Cargo.toml  # for crate-based themes and plugins
└── index.html # can also be an 'index.md' with valid front matter
```

<div class="note">
  <h5>Directory structure of Rustyll sites using crate-based themes</h5>
  <p>
    A new Rustyll project bootstrapped with <code>rustyll new</code> uses <a href="/docs/themes/">crate-based themes</a> to define the look of the site. This results in a lighter default directory structure: <code>_layouts</code>, <code>_includes</code> and <code>_sass</code> are stored in the theme-crate, by default.
  </p>
  <br />
  <p>
     <a href="https://github.com/rustyll/minima">minima</a> is the current default theme, and <code>cargo theme-info rustyll-theme-minima</code> will show you where minima theme's files are stored on your computer.
  </p>
</div>

An overview of what each of these does:

<div class="mobile-side-scroller">
<table>
  <thead>
    <tr>
      <th>File / Directory</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <p><code>_config.yml</code></p>
      </td>
      <td>
        <p>
          Stores <a href="/docs/configuration/">configuration</a> data. Many of
          these options can be specified from the command line executable but
          it's easier to specify them here so you don't have to remember them.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>_drafts</code></p>
      </td>
      <td>
        <p>
          Drafts are unpublished posts. The format of these files is without a
          date: <code>title.MARKUP</code>. Learn how to <a href="/docs/posts/#drafts">
          work with drafts</a>.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>_includes</code></p>
      </td>
      <td>
        <p>
          These are the partials that can be mixed and matched by your layouts
          and posts to facilitate reuse. The liquid tag
          <code>{% raw %}{% include file.ext %}{% endraw %}</code>
          can be used to include the partial in
          <code>_includes/file.ext</code>.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>_layouts</code></p>
      </td>
      <td>
        <p>
          These are the templates that wrap posts. Layouts are chosen on a
          post-by-post basis in the
          <a href="/docs/front-matter/">front matter</a>,
          which is described in the next section. The liquid tag
          <code>{% raw %}{{ content }}{% endraw %}</code>
          is used to inject content into the web page.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>_posts</code></p>
      </td>
      <td>
        <p>
          Your dynamic content, so to speak. The naming convention of these
          files is important, and must follow the format:
          <code>YEAR-MONTH-DAY-title.MARKUP</code>.
          The <a href="/docs/permalinks/">permalinks</a> can be customized for
          each post, but the date and markup language are determined solely by
          the file name.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>_data</code></p>
      </td>
      <td>
        <p>
          Well-formatted site data should be placed here. The Rustyll engine
          will autoload all data files (using either the <code>.yml</code>,
          <code>.yaml</code>, <code>.json</code>, <code>.csv</code> or
          <code>.toml</code> formats and extensions) in this directory,
          and they will be accessible via `site.data`. If there's a file
          <code>members.yml</code> under the directory, then you can access
          contents of the file through <code>site.data.members</code>.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>_sass</code></p>
      </td>
      <td>
        <p>
          These are sass partials that can be imported into your <code>main.scss</code>
          which will then be processed into a single stylesheet
          <code>main.css</code> that defines the styles to be used by your site.
          Learn <a href="{{ '/docs/assets/' | relative_url }}">how to work with assets</a>. 
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>_site</code></p>
      </td>
      <td>
        <p>
          This is where the generated site will be placed (by default) once
          Rustyll is done transforming it. It's probably a good idea to add this
          to your <code>.gitignore</code> file.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>.rustyll-cache</code></p>
      </td>
      <td>
        <p>
          Keeps a copy of the generated pages and markup (e.g.: markdown) for
          faster serving. Created when using e.g.: <code>rustyll serve</code>.
          Can be configured with
          <a href="/docs/configuration/options/">configuration options</a>.
          Rustyll's cache is optimized for speed and can dramatically improve build 
          times for larger sites. This directory will not be included in the 
          generated site. It's probably a good idea to add this to your 
          <code>.gitignore</code> file.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>.rustyll-metadata</code></p>
      </td>
      <td>
        <p>
          This helps Rustyll keep track of which files have not been modified
          since the site was last built, and which files will need to be
          regenerated on the next build. Only created when using
          <a href="/docs/configuration/incremental-regeneration/">
          incremental regeneration</a> (e.g.: with <code>rustyll serve -I</code> or 
          <code>rustyll serve --incremental</code>).
          This file will not be included in the generated site. It's probably
          a good idea to add this to your <code>.gitignore</code> file.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>Cargo.toml</code></p>
      </td>
      <td>
        <p>
          This file lists the Rust crates your site depends on, including Rustyll
          themes and plugins. It's automatically created when you start a new site 
          with <code>rustyll new</code>. Cargo uses this file to manage your site's
          dependencies.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>index.html</code> or <code>index.md</code></p>
      </td>
      <td>
        <p>
          Provided that the file has a <a href="/docs/front-matter/">front matter</a> section, it
          will be transformed by Rustyll. The same will happen for any <code>.html</code>,
          <code>.markdown</code>, <code>.md</code>, or <code>.textile</code> file in your site's
          root directory or directories not listed above.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>assets</code></p>
      </td>
      <td>
        <p>
          A directory for storing site assets like images, stylesheets, and JavaScript.
          These will be copied directly to the output directory during build.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Other Files/Folders</p>
      </td>
      <td>
        <p>
          Every other directory and file except for those listed above—such as
          <code>css</code> and <code>images</code> folders,
          <code>favicon.ico</code> files, and so forth—will be copied verbatim
          to the generated site. There are plenty of <a href="/docs/sites/">sites
          already using Rustyll</a> if you're curious to see how they're laid out.
        </p>
      </td>
    </tr>
  </tbody>
</table>
</div>

## Parallel Processing Architecture

Rustyll is designed to process your site in parallel, taking advantage of all available CPU cores. This architecture means:

1. Files are read and processed concurrently
2. Templates are rendered in parallel when possible
3. Assets can be generated simultaneously

This is a major difference from Jekyll's sequential processing model and explains Rustyll's significantly faster build times.

## Performance Tips

To optimize your site's build performance:

- Consider using incremental builds with `rustyll serve --incremental`
- Enable aggressive caching in your config:

  ```yaml
  # _config.yml
  cache:
    enabled: true 
    strategy: aggressive
  ```

- For large sites, increase the number of threads:

  ```yaml
  # _config.yml
  threads: 8  # or "auto" to use all available cores
  ```
