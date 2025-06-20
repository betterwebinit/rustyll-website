---
title: Environments
permalink: "/docs/configuration/environments/"
---
In the `build` (or `serve`) arguments, you can specify a Jekyll environment
and value. The build will then apply this value in any conditional statements
in your content.

For example, suppose you set this conditional statement in your code:

{% raw %}
```liquid
{% if jekyll.environment == "production" %}
   {% include disqus.html %}
{% endif %}
```
{% endraw %}

When you build your Jekyll site, the content inside the `if` statement won't be
run unless you also specify a `production` environment in the build command,
like this:

```sh
RUSTYLL_ENV=production jekyll build
```

Specifying an environment value allows you to make certain content available
only within specific environments.

The default value for `RUSTYLL_ENV` is `development`. Therefore if you omit
`RUSTYLL_ENV` from the build arguments, the default value will be
`RUSTYLL_ENV=development`. Any content inside
{% raw %}`{% if jekyll.environment == "development" %}`{% endraw %} tags will
automatically appear in the build.

Your environment values can be anything you want (not just `development` or
`production`). Some elements you might want to hide in development
environments include Disqus comment forms or Google Analytics. Conversely,
you might want to expose an "Edit me in GitHub" button in a development
environment but not include it in production environments.

By specifying the option in the build command, you avoid having to change
values in your configuration files when moving from one environment to another.

{: .note}
To switch part of your config settings depending on the environment, use the
<a href="{{ '/docs/configuration/options/#build-command-options' | relative_url }}">build command option</a>,
for example <code>--config _config.yml,_config_development.yml</code>. Settings
in later files override settings in earlier files.
