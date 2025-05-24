---
title: Tags
permalink: /docs/plugins/tags/
---

If you'd like to include custom liquid tags in your site, you can do so by
hooking into the tagging system. Built-in examples added by Rustyll include the
`highlight` and `include` tags. Below is an example of a custom liquid tag that
will output the time the page was rendered:

```rust
use rustyll::plugin::{Plugin, PluginTag};
use liquid_core::{Runtime, Value, Object, Result};

pub struct RenderTimeTag;

impl PluginTag for RenderTimeTag {
    fn tag_name(&self) -> &str {
        "render_time"
    }

    fn parse(&self, parser: &mut liquid::Parser) -> Result<Box<dyn Fn(&Runtime) -> Result<Value>>> {
        let text = parser.parse_markup()?.into_text();
        Ok(Box::new(move |_runtime| {
            let now = chrono::Local::now();
            Ok(Value::scalar(format!("{} {}", text, now)))
        }))
    }
}

// Register the tag with Rustyll
impl Plugin for RenderTimeTag {
    fn register(&self, registry: &mut liquid::ParserBuilder) {
        registry.register_tag(self.tag_name(), Box::new(self.clone()));
    }
}
```

At a minimum, liquid tags must implement:

<div class="mobile-side-scroller">
<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <p><code>tag_name</code></p>
      </td>
      <td>
        <p>Returns the name of the tag.</p>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>parse</code></p>
      </td>
      <td>
        <p>Parses the tag and outputs a function that renders the content.</p>
      </td>
    </tr>
  </tbody>
</table>
</div>

You must also register the custom tag with Rustyll's plugin system:

```rust
// In your plugin's main.rs or lib.rs
pub fn register_plugins() -> Vec<Box<dyn Plugin>> {
    vec![Box::new(RenderTimeTag)]
}
```

In the example above, we can place the following tag anywhere in one of our
pages:

{% raw %}
```liquid
<p>{% render_time page rendered at: %}</p>
```
{% endraw %}

And we would get something like this on the page:

```html
<p>page rendered at: Tue June 22 23:38:47 –0500 2010</p>
```

## Tag Blocks

The `render_time` tag seen above can also be rewritten as a tag block:

```rust
use rustyll::plugin::{Plugin, BlockTag};
use liquid_core::{Runtime, Value, Object, Result};

pub struct RenderTimeTagBlock;

impl BlockTag for RenderTimeTagBlock {
    fn tag_name(&self) -> &str {
        "render_time"
    }

    fn parse(&self, parser: &mut liquid::Parser) -> Result<Box<dyn Fn(&Runtime) -> Result<Value>>> {
        let inner_template = parser.parse_until(&["endrender_time"])?;
        parser.expect_tag("endrender_time")?;
        
        Ok(Box::new(move |runtime| {
            let inner_content = inner_template.render(runtime)?;
            let now = chrono::Local::now();
            Ok(Value::scalar(format!("<p>{} {}</p>", inner_content, now)))
        }))
    }
}

// Register the block tag with Rustyll
impl Plugin for RenderTimeTagBlock {
    fn register(&self, registry: &mut liquid::ParserBuilder) {
        registry.register_block(self.tag_name(), Box::new(self.clone()));
    }
}
```

We can now use the tag block anywhere:

{% raw %}
```liquid
{% render_time %}
page rendered at:
{% endrender_time %}
```
{% endraw %}

And we would still get the same output as above on the page:

```html
<p>page rendered at: Tue June 22 23:38:47 –0500 2010</p>
```

{: .note .info}
In the above example, the tag block and the tag are both registered with
the name <code>render_time</code>, but to register a tag and a tag block using
the same name in the same project is not recommended as this may lead to
conflicts.
