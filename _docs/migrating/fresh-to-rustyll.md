---
title: Migrating from Fresh
permalink: /docs/migrating/fresh-to-rustyll/
---

Migrating from Deno-based Fresh to Rustyll? This guide will help you transition from Fresh's real-time rendering approach to Rustyll's high-performance static site generation while preserving your content and components.

## Installation

First, install Rustyll using Cargo (Rust's package manager):

```sh
# Install Rust if you haven't already
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Rustyll
cargo install rustyll
```

## Automatic Migration

Rustyll provides a built-in migration tool for Fresh sites:

```sh
rustyll migrate --from fresh --source ./my-fresh-site --destination ./my-rustyll-site
```

This command will:
1. Convert Fresh's TypeScript/JSX components to static HTML with Liquid templates
2. Transform Fresh routes to Rustyll pages
3. Convert islands to static HTML with optional JavaScript enhancement
4. Generate a migration report

## Conceptual Differences

| Fresh | Rustyll |
|-------|---------|
| Deno runtime | Rust-based static site generator |
| Server-side rendering | Build-time generation |
| Islands architecture | Static HTML with optional JS |
| TypeScript/JSX | Liquid templates and Markdown |
| File-system routing | File-based pages with front matter |

## Directory Structure Conversion

| Fresh | Rustyll | Notes |
|-------|---------|-------|
| `routes/` | Root directory | Routes become pages |
| `islands/` | `_includes/` and `assets/js/` | Interactive components |
| `components/` | `_includes/` | Reusable components |
| `static/` | `assets/` | Static files |
| `main.ts` | `_config.yml` | Configuration |
| `fresh.gen.ts` | N/A | Not needed in Rustyll |
| `deno.json` | N/A | Not needed in Rustyll |

## Route Conversion

Fresh routes convert to Rustyll pages:

```tsx
// Fresh (routes/about.tsx)
import { Head } from "$fresh/runtime.ts";
import Navigation from "../components/Navigation.tsx";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About | My Website</title>
        <meta name="description" content="About my website" />
      </Head>
      <div class="page">
        <Navigation active="about" />
        <main>
          <h1>About</h1>
          <p>This is the about page.</p>
        </main>
      </div>
    </>
  );
}
```

Converts to:

```markdown
<!-- Rustyll (about.md) -->
---
layout: default
title: About | My Website
description: About my website
---

<div class="page">
  {% raw %}`{% include navigation.html active="about" %}`{% endraw %}
  <main>
    <h1>About</h1>
    <p>This is the about page.</p>
  </main>
</div>
```

## Component Conversion

Fresh components convert to Rustyll includes:

```tsx
// Fresh (components/Navigation.tsx)
interface NavigationProps {
  active: string;
}

export default function Navigation({ active }: NavigationProps) {
  return (
    <nav class="navigation">
      <a href="/" class={active === "home" ? "active" : ""}>Home</a>
      <a href="/about" class={active === "about" ? "active" : ""}>About</a>
      <a href="/blog" class={active === "blog" ? "active" : ""}>Blog</a>
    </nav>
  );
}
```

Converts to:

```html
<!-- Rustyll (_includes/navigation.html) -->
<nav class="navigation">
  <a href="/" class="{% raw %}{% if include.active == 'home' %}active{% endif %}{% endraw %}">Home</a>
  <a href="/about" class="{% raw %}{% if include.active == 'about' %}active{% endif %}{% endraw %}">About</a>
  <a href="/blog" class="{% raw %}{% if include.active == 'blog' %}active{% endif %}{% endraw %}">Blog</a>
</nav>
```

## Island Conversion

Fresh islands (interactive components) convert to static HTML with optional JavaScript:

```tsx
// Fresh (islands/Counter.tsx)
import { useState } from "preact/hooks";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div class="counter">
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

Converts to:

```html
<!-- Rustyll (_includes/counter.html) -->
<div class="counter" data-component="counter">
  <p>Count: <span data-counter-value>0</span></p>
  <button data-counter-increment>Increment</button>
</div>
```

With an accompanying JavaScript file:

```javascript
// Rustyll (assets/js/counter.js)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-component="counter"]').forEach(counter => {
    const valueEl = counter.querySelector('[data-counter-value]');
    const button = counter.querySelector('[data-counter-increment]');
    let count = 0;
    
    button.addEventListener('click', () => {
      count += 1;
      valueEl.textContent = count;
    });
  });
});
```

## Data Fetching

Fresh's server functions convert to static data in Rustyll:

```tsx
// Fresh (routes/api/data.ts)
export const handler = async (_req: Request): Promise<Response> => {
  const data = await fetchSomeData();
  return new Response(JSON.stringify(data));
};

// Fresh (routes/dashboard.tsx)
import { useEffect, useState } from "preact/hooks";

export default function Dashboard() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch("/api/data").then(res => res.json()).then(setData);
  }, []);
  
  return (
    <div>
      {data ? <pre>{{ site.data.api_data | jsonify }}</pre> : <p>Loading...</p>}
    </div>
  );
}
```

Converts to:

```yaml
# Rustyll (_data/api_data.yml)
- name: Item 1
  value: 100
- name: Item 2
  value: 200
```

```html
<!-- Rustyll (dashboard.html) -->
---
layout: default
title: Dashboard
---

<div>
  <pre>{{ site.data.api_data | jsonify }}</pre>
</div>
```

## Dynamic Routes

Fresh's dynamic routes convert to collections in Rustyll:

```tsx
// Fresh (routes/blog/[slug].tsx)
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const { slug } = ctx.params;
    const post = await getPost(slug);
    return ctx.render({ post });
  },
};

export default function BlogPost({ data }: PageProps) {
  const { post } = data;
  return (
    <div>
      <h1>{{ post.title }}</h1>
      <div>{% raw %}{{ content }}{% endraw %}</div>
    </div>
  );
}
```

Converts to:

```yaml
# Rustyll (_config.yml)
collections:
  posts:
    output: true
    permalink: /blog/:slug/
```

```markdown
<!-- Rustyll (_posts/2023-01-15-example-post.md) -->
---
layout: post
title: Example Post
---

This is an example blog post content.
```

```html
<!-- Rustyll (_layouts/post.html) -->
---
layout: default
---

<div>
  <h1>{{ page.title }}</h1>
  <div>{{ content }}</div>
</div>
```