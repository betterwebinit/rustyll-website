---
title: Rustyll on Windows
permalink: /docs/installation/windows/
redirect_from:
  - /docs/windows/
---

Windows is a fully supported platform for Rustyll. Since Rustyll is built with Rust, it offers a much simpler installation process than Jekyll and significantly better performance on Windows systems.

## Installing Rust and Rustyll

### Installation via rustup (Recommended)

The easiest way to install Rust and Rustyll is by using [rustup](https://rustup.rs/), the Rust toolchain installer.

1. Download and run the rustup installer from [rustup.rs](https://rustup.rs/).
   
   You can also open PowerShell and run:
   ```powershell
   winget install Rustlang.Rustup
   ```
   
   Or use the direct installer command:
   ```powershell
   Invoke-WebRequest https://win.rustup.rs/x86_64 -OutFile rustup-init.exe
   .\rustup-init.exe
   ```

2. Follow the on-screen instructions. The default installation options are recommended for most users.

3. After installation completes, open a new command prompt or PowerShell window so that the changes to the PATH environment variable take effect.

4. Install Rustyll:
   ```powershell
   cargo install rustyll
   ```

5. Verify Rustyll was installed correctly:
   ```powershell
   rustyll -v
   ```

That's it! You're ready to use Rustyll on Windows.

### Installation via Windows Subsystem for Linux (WSL)

If you prefer using a Linux environment on Windows, you can install Rustyll using WSL:

1. Install WSL by following the [Microsoft documentation](https://docs.microsoft.com/en-us/windows/wsl/install).

2. Open a WSL terminal and install Rust:
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

3. Accept the defaults and follow the instructions.

4. Install Rustyll:
   ```bash
   cargo install rustyll
   ```

5. Verify the installation:
   ```bash
   rustyll -v
   ```

## Performance on Windows

Rustyll performs exceptionally well on Windows compared to Jekyll:

| Task | Jekyll (Ruby) | Rustyll (Rust) | Improvement |
|------|---------------|----------------|-------------|
| Installation | Complex, many dependencies | Simple, single command | Much simpler |
| Build time | Slow (10-60s) | Fast (0.5-3s) | 10-20x faster |
| Live reloading | Unreliable | Reliable | Much better |
| Parallel processing | Limited | Full support | Significantly better |
| Memory usage | High | Low | 3-5x less |

## Creating a New Site

To create a new Rustyll site:

```powershell
rustyll new my-awesome-site
cd my-awesome-site
rustyll serve
```

Your new site will be available at `http://localhost:4000`.

## Optimizing for Windows

Rustyll includes several optimizations specific to Windows:

### Fast Path Access

Rustyll has been optimized for Windows path handling, which can be much slower in Ruby. This results in significant performance gains, especially for sites with many files.

### Native Concurrency

Rustyll takes full advantage of Windows thread scheduling for parallel processing. Configure in your `_config.yml`:

```yaml
threads: auto  # Uses all available CPU cores
```

### UTF-8 Handling

Rustyll handles UTF-8 encoding correctly on Windows by default. If you use UTF-8 encoding, make sure that no `BOM` header characters exist in your files or very, very bad things will happen to Rustyll.

### Time Zone Support

Rustyll includes built-in timezone support on Windows without requiring additional gems. Simply specify your timezone in `_config.yml`:

```yaml
timezone: America/New_York
```

## Windows-specific Features

### Fast Watch Mode

Rustyll's `--watch` mode is optimized for Windows file systems, using native APIs for file change detection:

```powershell
rustyll serve --watch --livereload
```

### WSL Integration

If you're using both native Windows and WSL, Rustyll can work across both environments. Files can be edited in Windows and served from WSL, or vice versa.

### Path Compatibility

Rustyll automatically handles Windows path separators (`\`) and converts them to web-compatible forward slashes (`/`) in URLs.

## Troubleshooting

### Resolving Permission Issues

If you encounter permission issues when installing Rustyll:

1. Ensure you're running the terminal as an administrator
2. Try installing for your user account only:
   ```powershell
   cargo install --user rustyll
   ```

### Antivirus Interference

Some antivirus software may slow down Rustyll by scanning files during watch mode. Consider adding your project directory to the antivirus exclusion list.

### Performance Issues

If you experience slower than expected performance:

1. Enable parallel processing with `--threads auto`
2. Use incremental builds with `--incremental`
3. Configure aggressive caching in `_config.yml`:
   ```yaml
   cache:
     enabled: true
     strategy: aggressive
   ```
