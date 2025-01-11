import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '420px'
      },
      borderWidth: {
        1.5: '1.5px'
      },
      colors: {
        darkgrey: '#30343F',
        'export-border': '#14213080',
        active: '#FEEDCF',
        black: '#000000',
        'cream-light': '#EEF0F2',
        white: '#FFFFFF',
        blue: '#116AFC',
        'blue-light': '#8FB9FE',
        'dark-blue': '#142130',
        cream: '#A2999E',
        'cream-text': '#434D59',
        orange: '#FCA311',
        'orange-50': '#FCA31166',
        'orange-dark': '#C67600',
        error: '#E72945',
        success: '#5CC14C',
        costumYellow: '#FFF6E7',
        succesful: 'rgba(92, 193, 76, 0.2)',
        pending: 'rgba(252, 163, 17, 0.2)',
        declined: 'rgba(231, 41, 69, 0.2)',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))'
        }
      },
      fontFamily: {
        title: ['DM Serif Display', 'serif'],
        description: ['DM Sans', 'sans-serif']
      },
      fontSize: {
        'custom-lg': '28px',
        'custom-sm': '14px'
      },
      lineHeight: {
        custom: '38.39px',
        'custom-sm': '18.23px'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  keyframes: {
    'fade-in': {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' }
    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.active-state': {
          backgroundColor: '#FEEDCF',
          color: '#434D59',
          transition: 'all 0.3s ease'
        },
        '.white-bg-button': {
          color: '#434D59',
          padding: '10px',
          transition: 'all 0.3s ease',
          borderRadius: '0.5rem',
          '&:hover': {
            borderColor: '#FCA311',
            backgroundColor: '#FEEDCF',
            color: '#FCA311'
          }
        },
        '.active-icon': {
          borderRadius: '100%',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: '#FEEDCF'
          }
        },
        '.active-text': {
          transition: 'all 0.3s ease',
          '&:hover': {
            color: '#FCA311'
          }
        },
        '.active-button': {
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: '#C67600',
            color: '#fff'
          }
        },

        '.flex-center': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
        '.hover-zoom': {
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.1)'
          }
        },
        '.truncate': {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        },
        '.text-shadow': {
          'text-shadow': '2px 2px 2px rgba(0, 0, 0, 0.3)'
        },
        '.icon-shadow': {
          filter: 'drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.3))'
        },
        '.disabled': {
          '@apply disabled:bg-slate-200 disabled:cursor-not-allowed  disabled:pointer-events-none disabled:hover:bg-slate-200 disabled:opacity-50  duration-300':
            {}
        }
      });
    }),
    // eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
    require('tailwindcss-animate')
  ]
};
