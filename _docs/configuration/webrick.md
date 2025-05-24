---
title: Server Options
permalink: "/docs/configuration/server/"
redirect_from: "/docs/configuration/webrick/"
---

You can provide custom headers and other server configuration for your site by adding them to `_config.yml`:

```yaml
# File: _config.yml
server:
  headers:
    My-Header: My-Value
    My-Other-Header: My-Other-Value
  host: 0.0.0.0
  port: 4000
  livereload: true
```

### Defaults

Rustyll provides by default `Content-Type` and `Cache-Control` response
headers: one dynamic to specify the nature of the data being served,
the other to disable caching during development so you can see changes immediately without fighting with browser caching.

### Performance Improvements

Rustyll's development server is significantly faster than Jekyll's WEBrick server:

1. **Multi-threaded request handling** - serves requests in parallel
2. **Efficient file system monitoring** - only rebuilds what changed
3. **Live reload** - notifies the browser to reload using a WebSocket connection
4. **Hot content replacement** - when possible, updates only the changed content without a full page reload

### Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `host` | The hostname or IP address to listen on | `127.0.0.1` |
| `port` | The port to listen on | `4000` |
| `livereload` | Whether to enable live reloading | `false` |
| `livereload_port` | The port for the LiveReload server | `35729` |
| `headers` | Custom HTTP headers to add to responses | `{}` |
| `open_url` | Whether to open the site in a browser | `false` |
| `threads` | Number of threads for request handling | `auto` |
