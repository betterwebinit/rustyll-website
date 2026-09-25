module.exports = {
      content: ["./_includes/**/*.html", "./_layouts/**/*.html", "./pages/**/*.{html,md}", "./_docs/**/*.md", "./_tutorials/**/*.md", "./_posts/*", "./assets/js/*.js"],
      theme: {
        extend: {
          colors: {
            // Legacy colors (for backward compatibility)
            rust: {
              DEFAULT: '#FF9B70',
              dark: '#D76535',
              light: '#FFBA99'
            },
            blackish: '#111111',

            // Modern shadcn/ui style system colors
            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            primary: {
              DEFAULT: "hsl(var(--primary))",
              foreground: "hsl(var(--primary-foreground))",
            },
            secondary: {
              DEFAULT: "hsl(var(--secondary))",
              foreground: "hsl(var(--secondary-foreground))",
            },
            destructive: {
              DEFAULT: "hsl(var(--destructive))",
              foreground: "hsl(var(--destructive-foreground))",
            },
            success: {
              DEFAULT: "hsl(var(--success))",
              foreground: "hsl(var(--success-foreground))",
            },
            warning: {
              DEFAULT: "hsl(var(--warning))",
              foreground: "hsl(var(--warning-foreground))",
            },
            alert: {
              DEFAULT: "hsl(var(--alert))",
              foreground: "hsl(var(--alert-foreground))",
            },
            muted: {
              DEFAULT: "hsl(var(--muted))",
              foreground: "hsl(var(--muted-foreground))",
            },
            accent: {
              DEFAULT: "hsl(var(--accent))",
              foreground: "hsl(var(--accent-foreground))",
            },
            card: {
              DEFAULT: "hsl(var(--card))",
              foreground: "hsl(var(--card-foreground))",
            },
            popover: {
              DEFAULT: "hsl(var(--popover))",
              foreground: "hsl(var(--popover-foreground))",
            },
          },
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
            display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace']
          },
          borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
          },
          animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
            "float": "float 6s ease-in-out infinite",
            "pulse-slow": "pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            "ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
          },
          keyframes: {
            "accordion-down": {
              from: { height: 0 },
              to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
              from: { height: "var(--radix-accordion-content-height)" },
              to: { height: 0 },
            },
            float: {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(-10px)" },
            },
          },
          typography: {
            DEFAULT: {
              css: {
                maxWidth: 'none',
                color: 'hsl(var(--foreground))',
                a: {
                  color: 'hsl(var(--primary))',
                  textDecoration: 'underline',
                  textDecorationColor: 'hsl(var(--primary) / 0.3)',
                  '&:hover': {
                    color: 'hsl(var(--primary) / 0.9)',
                    textDecorationColor: 'hsl(var(--primary) / 0.5)',
                  },
                },
                h1: {
                  color: 'hsl(var(--foreground))',
                  fontWeight: '600',
                },
                h2: {
                  color: 'hsl(var(--foreground))',
                  fontWeight: '600',
                },
                h3: {
                  color: 'hsl(var(--foreground))',
                  fontWeight: '500',
                },
                h4: {
                  color: 'hsl(var(--foreground))',
                  fontWeight: '500',
                },
                code: {
                  color: 'hsl(var(--primary))',
                  backgroundColor: 'hsl(var(--muted) / 0.3)',
                  borderRadius: '0.25rem',
                  padding: '0.125rem 0.375rem',
                },
                'code::before': {
                  content: '""',
                },
                'code::after': {
                  content: '""',
                },
                pre: {
                  backgroundColor: 'hsl(var(--muted) / 0.3)',
                  borderWidth: '1px',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '0.5rem',
                },
                blockquote: {
                  borderLeftColor: 'hsl(var(--primary))',
                  backgroundColor: 'hsl(var(--muted) / 0.2)',
                  borderRadius: '0 0.375rem 0.375rem 0',
                },
                strong: {
                  color: 'hsl(var(--foreground))',
                  fontWeight: '600',
                },
                img: {
                  borderRadius: '0.5rem',
                  borderWidth: '1px',
                  borderColor: 'hsl(var(--border))',
                },
                table: {
                  width: '100%',
                },
                thead: {
                  backgroundColor: 'hsl(var(--muted) / 0.3)',
                },
                th: {
                  color: 'hsl(var(--foreground))',
                },
              }
            }
          },
        }
      },
      plugins: [
        require("@tailwindcss/typography"),
        function ({ addComponents, addUtilities }) {
          // Aspect Ratio
          const aspectRatioUtilities = {
            '.aspect-w-16': {
              aspectRatio: '16/9',
            },
            '.aspect-h-10': {
              aspectRatio: '16/10',
            },
            '.aspect-w-4': {
              aspectRatio: '4/3',
            },
            '.aspect-h-3': {
              aspectRatio: '4/3',
            },
            '.aspect-square': {
              aspectRatio: '1/1',
            },
          };
          addUtilities(aspectRatioUtilities);
        }
      ]
    };
