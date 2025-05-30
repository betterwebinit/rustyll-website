---
title: Variables
permalink: /docs/variables/
---

Rustyll traverses your site looking for files to process. Any files with
[front matter](/docs/front-matter/) are subject to processing. For each of these
files, Rustyll makes a variety of data available via [Liquid](/docs/liquid/).
The following is a reference of the available data.

## Global Variables

{% include docs_variables_table.html scope=site.data.rustyll_variables.global %}

## Site Variables

{% include docs_variables_table.html scope=site.data.rustyll_variables.site %}

## Page Variables

{% include docs_variables_table.html scope=site.data.rustyll_variables.page %}

<div class="note">
  <h5>ProTip™: Use Custom Front Matter</h5>
  <p>
    Any custom front matter that you specify will be available under
    <code>page</code>. For example, if you specify <code>custom_css: true</code>
    in a page's front matter, that value will be available as <code>page.custom_css</code>.
  </p>
  <p>
    If you specify front matter in a layout, access that via <code>layout</code>.
    For example, if you specify <code>class: full_page</code> in a layout's front matter,
    that value will be available as <code>layout.class</code> in the layout and its parents.
  </p>
</div>

## Rustyll Variables

{% include docs_variables_table.html scope=site.data.rustyll_variables.jekyll %}

## Rustyll Performance Variables

Rustyll adds several performance-related variables that can be used in your templates:

<div class="mobile-side-scroller">
<table>
  <thead>
    <tr>
      <th>Variable</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><p><code>site.build_time_ms</code></p></td>
      <td><p>The total time taken to build the site in milliseconds</p></td>
    </tr>
    <tr>
      <td><p><code>page.build_time_ms</code></p></td>
      <td><p>The time taken to build this specific page in milliseconds</p></td>
    </tr>
    <tr>
      <td><p><code>site.parallel_pages</code></p></td>
      <td><p>The number of pages built in parallel</p></td>
    </tr>
    <tr>
      <td><p><code>site.threads</code></p></td>
      <td><p>The number of threads used to build the site</p></td>
    </tr>
  </tbody>
</table>
</div>

## Theme Variables

{% include docs_variables_table.html scope=site.data.rustyll_variables.theme %}

## Paginator

{% include docs_variables_table.html scope=site.data.rustyll_variables.paginator %}

<div class="note info">
  <h5>Paginator variable availability</h5>
  <p>
    These are only available in index files, however they can be located in a subdirectory,
    such as <code>/blog/index.html</code>.
  </p>
</div>

## Caching Variables

Rustyll offers caching variables that can help optimize your templates:

<div class="mobile-side-scroller">
<table>
  <thead>
    <tr>
      <th>Variable</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><p><code>site.cached</code></p></td>
      <td><p>Boolean indicating if the current build is using cached data</p></td>
    </tr>
    <tr>
      <td><p><code>page.cached</code></p></td>
      <td><p>Boolean indicating if the current page was loaded from cache</p></td>
    </tr>
    <tr>
      <td><p><code>site.cache_strategy</code></p></td>
      <td><p>The current cache strategy being used (normal, aggressive, conservative)</p></td>
    </tr>
  </tbody>
</table>
</div>
