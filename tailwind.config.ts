import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    // ─── CONTAINER ─────────────────────────────────────────────────────────────
    // Matches attio.com:
    //   default  → w-full, padding 24px, centered
    //   768px+   → max-w-[39rem]  (624px)
    //   992px+   → max-w-[90rem]  (1440px)
    container: {
      center:  true,
      padding: '1.5rem',      // calc(0.25rem * 6) = 24px
      screens: {
        sm:    '100%',        // 640px → stay full-width
        md:    '39rem',       // 768px → max 624px
        lg:    '90rem',       // 992px → max 1440px
        xl:    '90rem',
        '2xl': '90rem',
      },
    },
    extend: {

      // ─── FUENTES ───────────────────────────────────────────
      fontFamily: {
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter-display)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-jetbrains-mono)', 'monospace'],
        serif:   ['var(--font-tiempos-text)', 'Georgia', 'serif'],
      },

      // ─── TIPOGRAFÍA ────────────────────────────────────────
      fontSize: {
        'xs':         ['0.75rem',  { lineHeight: '1.125rem', letterSpacing: '0',        fontWeight: '500' }],
        'sm':         ['0.875rem', { lineHeight: '1.25rem',  letterSpacing: '-0.005em', fontWeight: '500' }],
        'base':       ['1rem',     { lineHeight: '1.375rem', letterSpacing: '-0.01em',  fontWeight: '500' }],
        'lg':         ['1.125rem', { lineHeight: '1.5rem',   letterSpacing: '-0.01em',  fontWeight: '500' }],
        'xl':         ['1.25rem',  { lineHeight: '1.625rem', letterSpacing: '-0.01em',  fontWeight: '500' }],
        '2xl':        ['1.5rem',   { lineHeight: '1.875rem', letterSpacing: '-0.01em',  fontWeight: '500' }],
        'heading-xs': ['1.75rem',  { lineHeight: '2.125rem', letterSpacing: '-0.01em',  fontWeight: '600' }],
        'heading-sm': ['2rem',     { lineHeight: '2.375rem', letterSpacing: '-0.01em',  fontWeight: '600' }],
        'heading-md': ['2.5rem',   { lineHeight: '2.75rem',  letterSpacing: '-0.01em',  fontWeight: '600' }],
        'heading-lg': ['3.5rem',   { lineHeight: '3.75rem',  letterSpacing: '-0.015em', fontWeight: '600' }],
        'heading-xl': ['4rem',     { lineHeight: '4rem',     letterSpacing: '-0.02em',  fontWeight: '600' }],
      },

      // ─── FONT WEIGHTS ──────────────────────────────────────
      fontWeight: {
        normal:   '400',
        medium:   '500',
        semibold: '600',
      },

      // ─── COLORES ───────────────────────────────────────────
      colors: {
        // shadcn/ui CSS variable–based palette (maps to globals.css :root vars)
        border: 'hsl(var(--border))',
        input:  'hsl(var(--input))',
        ring:   'hsl(var(--ring))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(vara(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        tertiary: {
          DEFAULT:    'hsl(var(--foreground-tertiary))',  // text-tertiary
          foreground: 'hsl(var(--foreground-tertiary))',  // text-tertiary-foreground
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT:    'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        // ─── PALETA DE PRIMITIVOS (extraídos de attio.com) ───
        black: {
          0:   '#000000',        // black-0  — negro puro (Attio dark:bg-black-0)
          50:  '#101113',
          100: '#1c1d1f',
          200: '#202124',
          300: '#232529',
          400: '#2e3238',
          500: '#383e47',
          600: '#505967',
          700: '#6f7988',
          800: '#8f99a8',
          900: '#a4adba',
        },
        white: {
          0:   '#ffffff',        // white-0 — blanco puro (par de black-0)
          100: '#ffffff',
          200: '#fafafb',
          300: '#f3f4f6',
          400: '#edeff3',
          500: '#e4e7ec',
          600: '#dee2e7',
          700: '#d3d8df',
          800: '#cad0d9',
          900: '#b5bdc9',
        },
        blue: {
          300: '#b3ccfe',    // light blue — focus ring
          400: '#709ff5',
          500: '#266df0',
          600: '#245bc2',
        },
        green: {
          500: '#0fc27b',
          600: '#0db472',
        },
        red: {
          500: '#ff5b59',
          600: '#f65351',
        },
        yellow: {
          500: '#f5b900',
          600: '#dba601',
        },

        // ─── COLORES SEMÁNTICOS (tema claro = default) ───────
        background:             '#ffffff',        // white-100
        'background-secondary': '#fafafb',        // white-200
        'surface-subtle':       '#f3f4f6',        // white-300
        surface:                '#edeff3',        // white-400
        'muted-bg':             '#edeff3',        // white-400
        'muted-strong-bg':      '#d3d8df',        // white-700

        'stroke-weak':          '#edeff3',        // white-400
        'stroke-subtle':        '#e4e7ec',        // white-500
        'stroke-default':       '#d3d8df',        // white-700
        'stroke-strong':        '#cad0d9',        // white-800
        'stroke-accent':        '#709ff5',        // blue-400

        // bg-primary-background — var(--internal-color-primary-background) = white-100
        'primary-background':   '#ffffff',
        // bg-secondary-background — alias de background-secondary (orden de palabras de attio)
        'secondary-background': '#fafafb',        // = white-200

        // Aliases con el orden de palabras de attio.com (ej. text-subtle-stroke)
        'weak-stroke':          '#edeff3',        // = stroke-weak   / white-400
        'subtle-stroke':        '#e4e7ec',        // = stroke-subtle / white-500
        'default-stroke':       '#d3d8df',        // = stroke-default / white-700
        'strong-stroke':        '#cad0d9',        // = stroke-strong / white-800

        'fg-primary':           '#1c1d1f',        // black-100
        'fg-secondary':         '#232529',        // black-300
        'fg-tertiary':          '#505967',        // black-600
        'fg-accent':            '#6f7988',        // black-700
        'fg-caption':           '#a4adba',        // black-900
        'fg-disabled':          '#d3d8df',        // white-700
        'fg-link':              '#266df0',        // blue-500
        'fg-link-strong':       '#245bc2',        // blue-600

        // ─── COLORES SEMÁNTICOS (tema oscuro) ────────────────
        dark: {
          background:             '#101113',      // black-50
          'background-secondary': '#1c1d1f',      // black-100
          'surface-subtle':       '#232529',      // black-300
          surface:                '#2e3238',      // black-400
          'muted-bg':             '#232529',      // black-300
          'muted-strong-bg':      '#2e3238',      // black-400

          'stroke-weak':          '#232529',      // black-300
          'stroke-subtle':        '#2e3238',      // black-400
          'stroke-default':       '#6f7988',      // black-700
          'stroke-strong':        '#8f99a8',      // black-800
          'stroke-accent':        '#709ff5',      // blue-400

          'fg-primary':           '#ffffff',      // white-100
          'fg-secondary':         '#edeff3',      // white-400
          'fg-tertiary':          '#b5bdc9',      // white-900
          'fg-accent':            '#8f99a8',      // black-800
          'fg-caption':           '#505967',      // black-600
          'fg-disabled':          '#6f7988',      // black-700
          'fg-link':              '#266df0',      // blue-500
          'fg-link-strong':       '#709ff5',      // blue-400 (más brillante en oscuro)
        },
      },

      // ─── CUSTOM SPACING ────────────────────────────────────
      spacing: {
        '3.25': '0.8125rem', // px-3.25 — attio button horizontal padding
        '4.5':  '1.125rem',  // size-4.5 — small icon badge (enrollment header)
        '6.5':  '1.625rem',  // h-6.5 — connector line height (sequences hero)
        '7.5':  '1.875rem',  // left-7.5 / inset-x-7.5 — attio content panel compact padding
        '11.5': '2.875rem',  // h-11.5 — button height mobile (attio lg breakpoint)
        '13':   '3.25rem',   // h-13 — prompt card min-height (52px)
        '15':   '3.75rem',   // h-15 / w-15 etc. — used by attio spacers
        '18':   '4.5rem',    // mt-18 / mb-18 — attio hero margin (72px); Tailwind default skips 16→20
        '25':   '6.25rem',   // h-25
        '30':   '7.5rem',    // h-30  / gap-y-30
        '35':   '8.75rem',   // pt-35 — workflows hero xl padding
        '38':   '9.5rem',    // gap-y-38 — workflows hero lg gap
        '70':   '17.5rem',   // max-w-70 / w-70 — card inner visual max-width
        '74':   '18.5rem',   // max-w-74 — card 3 inner visual max-width
        '160':  '40rem',     // h-160 — large panel height (ask chat demo)
      },

      // ─── RING WIDTH ─────────────────────────────────────────────
      ringWidth: {
        '3': '3px',          // ring-3 — attio panel ring decoration
      },

      // ─── SCALE ──────────────────────────────────────────────────
      scale: {
        '116': '1.16',       // scale-116 — permissions SVG slight zoom
      },

      // ─── CUSTOM GRIDS ───────────────────────────────────────
      gridTemplateColumns: {
        '8':  'repeat(8, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '24': 'repeat(24, minmax(0, 1fr))',
      },

      // ─── LINE HEIGHT ────────────────────────────────────────
      lineHeight: {
        '6.5': '1.625rem',  // leading-6.5 — blog body line height (attio)
      },

      // ─── BORDER RADIUS ─────────────────────────────────────
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      // ─── BOX SHADOWS ───────────────────────────────────────
      // Attio multi-layer shadows — CSS vars defined in globals.css :root
      boxShadow: {
        'attio-4': 'var(--shadow-attio-layer-1),var(--shadow-attio-layer-2),var(--shadow-attio-layer-3),var(--shadow-attio-layer-4)',
        'attio-5': 'var(--shadow-attio-layer-1),var(--shadow-attio-layer-2),var(--shadow-attio-layer-3),var(--shadow-attio-layer-4),var(--shadow-attio-layer-5)',
        'attio-6': 'var(--shadow-attio-layer-1),var(--shadow-attio-layer-2),var(--shadow-attio-layer-3),var(--shadow-attio-layer-4),var(--shadow-attio-layer-5),var(--shadow-attio-layer-6)',
        // Elevation 1 — lightest product shadow (used on list-row cards in visuals)
        'attio-product-e1': 'var(--shadow-attio-layer-1),var(--shadow-attio-layer-2)',
      },

      // ─── BACKDROP BLUR ─────────────────────────────────────
      backdropBlur: {
        'xs': '2px',  // backdrop-blur-xs — subtle blur for light card overlays
      },

      // ─── ANCHOS MÁXIMOS ────────────────────────────────────
      maxWidth: {
        'xs':  '20rem',
        'sm':  '24rem',
        'md':  '28rem',
        'lg':  '32rem',
        'xl':  '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
      },

      // ─── BREAKPOINTS ───────────────────────────────────────
      screens: {
        'xs': '375px', // standard phone (iPhone SE / base width)
        'lg': '992px',
        'xl': '1200px', // attio switches to 5-col grid at 1200px (Tailwind default is 1280px)
      },

      // ─── TRANSICIONES ──────────────────────────────────────
      transitionDuration: {
        DEFAULT: '150ms',
        '50':  '50ms',
        '400': '400ms',
        '600': '600ms',
      },
      transitionTimingFunction: {
        DEFAULT:         'cubic-bezier(0.4, 0, 0.2, 1)',
        'in':            'cubic-bezier(0.3, 0, 1, 1)',
        'out':           'cubic-bezier(0, 0, 0, 1)',
        'in-out':        'cubic-bezier(0.2, 0, 0, 1)',
        'in-cubic':      'cubic-bezier(0.32, 0, 0.67, 0)',
        'out-cubic':     'cubic-bezier(0.33, 1, 0.68, 1)',
        'in-out-cubic':  'cubic-bezier(0.65, 0, 0.35, 1)',
        'emphasized':    'cubic-bezier(0.2, 0, 0, 1)',
        'in-out-quad':   'cubic-bezier(0.45, 0.05, 0.55, 0.95)',
      },

      // ─── ANIMACIONES ───────────────────────────────────────
      keyframes: {
        slideDown: {
          from: { height: '0' },
          to:   { height: 'var(--radix-collapsible-content-height)' },
        },
        slideUp: {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to:   { height: '0' },
        },
        'dialog-scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        'dialog-scale-out': {
          from: { opacity: '1', transform: 'scale(1)' },
          to:   { opacity: '0', transform: 'scale(0.95)' },
        },
        'scroll-up': {
          from: { transform: 'translateY(0)' },
          to:   { transform: 'translateY(-50%)' },
        },
        // Meeting pill expanding rings — asymmetric pulse (matches Attio scaleX/Y targets)
        'ring-pulse-inner': {
          '0%':       { transform: 'scaleX(1) scaleY(1)',           opacity: '1' },
          '70%, 100%': { transform: 'scaleX(1.053) scaleY(1.212)', opacity: '0' },
        },
        'ring-pulse-outer': {
          '0%':       { transform: 'scaleX(1) scaleY(1)',           opacity: '0.7' },
          '70%, 100%': { transform: 'scaleX(1.046) scaleY(1.148)', opacity: '0' },
        },
        'border-beam': {
          '100%': { 'offset-distance': '100%' },
        },
      },
      animation: {
        'slide-down':       'slideDown 0.3s cubic-bezier(0.65, 0, 0.35, 1)',
        'slide-up':         'slideUp 0.3s cubic-bezier(0.65, 0, 0.35, 1)',
        'dialog-in':        'dialog-scale-in 0.15s cubic-bezier(0.2, 0, 0, 1)',
        'dialog-out':       'dialog-scale-out 0.15s cubic-bezier(0.2, 0, 0, 1)',
        'scroll-up':        'scroll-up 18s linear infinite',
        'ring-pulse-inner': 'ring-pulse-inner 2.4s cubic-bezier(0, 0, 0.2, 1) infinite',
        'ring-pulse-outer': 'ring-pulse-outer 2.4s cubic-bezier(0, 0, 0.2, 1) 0.4s infinite',
        'border-beam':      'border-beam calc(var(--duration)*1s) infinite linear',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    // Custom variant: hacker-mode:<utility> applies when <html data-hacker> is set.
    // Usage: className="bg-white hacker-mode:bg-green-900 hacker-mode:text-green-400"
    ({ addVariant }: { addVariant: (name: string, selector: string) => void }) => {
      addVariant('hacker-mode', ':root[data-hacker] &')
    },
  ],
}

export default config
