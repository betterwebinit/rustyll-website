---
title: Liquid
permalink: /docs/liquid/
redirect_from: "/docs/templates/"
---

Rustyll uses the [Liquid](https://shopify.github.io/liquid/) templating language
to process templates, with a high-performance implementation written in Rust.

Generally in Liquid you output content using two curly braces e.g.
{% raw %}`{{ variable }}`{% endraw %} and perform logic statements by
surrounding them in a curly brace percentage sign e.g.
{% raw %}`{% if statement %}`{% endraw %}. To learn more about Liquid, check
out the [official Liquid Documentation](https://shopify.github.io/liquid/).

Rustyll's Liquid implementation is fully compatible with Jekyll templates while offering superior performance:

* **Parallel processing** - Template rendering happens across multiple CPU cores
* **Cached parsing** - Templates are parsed once and cached for reuse
* **Optimized evaluation** - Rust's zero-cost abstractions make template evaluation extremely fast
* **Memory efficiency** - Templates use minimal memory during processing

Rustyll provides all the standard Liquid additions to help you build your site:

* [Filters]({{ '/docs/liquid/filters/' | relative_url }})
* [Tags]({{ '/docs/liquid/tags/' | relative_url }})

## Additional Rustyll-specific Features

Rustyll extends Liquid with several performance optimizations:

### Parallel Processing

```liquid
{% raw %}
{% rustyll_parallel %}
  {% for item in large_collection %}
    {% include 'heavy_template' with item %}
  {% endfor %}
{% endparallel %}
{% endraw %}
```

This special tag instructs Rustyll to process the included templates in parallel, dramatically speeding up render time for larger sites.

### Caching Controls

```liquid
{% raw %}
{% rustyll_cache_enable %}
  {% include 'expensive_calculation' %}
{% rustyll_cache_end %}
{% endraw %}
```

This allows fine-grained control over which parts of a template are cached between builds.

### Performance Profiling

```liquid
{% raw %}
{% rustyll_profile_start 'my_section' %}
  {% include 'complex_template' %}
{% rustyll_profile_end %}
{% endraw %}
```

These tags allow you to measure the performance of specific sections of your templates. Performance metrics can be viewed using:

```bash
rustyll serve --profile
```

### Lazy Evaluation

```liquid
{% raw %}
{% rustyll_lazy %}
  {% include 'only_loaded_when_needed' %}
{% endlazy %}
{% endraw %}
```

This defers the evaluation of a template section until it's actually needed, improving initial page load performance.

### Advanced Conditional Rendering

Rustyll extends Liquid with more powerful conditional capabilities:

```liquid
{% raw %}
{% rustyll_if site.posts.size > 10 and site.categories.size > 5 %}
  <p>This site has many posts across multiple categories!</p>
{% else %}
  <p>This site is still growing.</p>
{% endif %}
{% endraw %}
```

### Fast JSON Processing

For sites that work with JSON data:

```liquid
{% raw %}
{% rustyll_json_parse content as parsed_data %}
{{ parsed_data.title }}
{% endraw %}
```

This uses a high-performance Rust JSON parser that's much faster than the standard Liquid approach.

### Thread-safe Includes

```liquid
{% raw %}
{% rustyll_thread_safe_include 'header' %}
{% endraw %}
```

This special include tag ensures that included templates are processed in a thread-safe manner, allowing for better parallelization.

## Performance Considerations

For optimal Liquid template performance:

1. **Limit includes** - Each include requires additional processing
2. **Use parallel processing** for loops with many iterations
3. **Cache expensive operations** with rustyll_cache tags
4. **Prefer filters over tags** when possible - filters are generally faster
5. **Group related includes** within a single rustyll_parallel block
6. **Profile your templates** to identify bottlenecks

## Template Performance Comparison

| Template Feature | Jekyll | Rustyll |
|------------------|--------|---------|
| Simple variable output | 1x | 10x faster |
| Includes | 1x | 15x faster |
| For loops with 100+ items | 1x | 25x faster |
| Complex nested conditions | 1x | 20x faster |
| Template parsing (initial) | 1x | 8x faster |
| Cached templates | Limited support | Full support |

## Compatibility with Jekyll

Rustyll's Liquid implementation is fully compatible with Jekyll's. All standard Jekyll filters and tags work as expected, so you can migrate existing sites without modifying templates.
