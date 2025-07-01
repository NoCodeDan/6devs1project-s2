/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Material Design 3 Color Tokens
        primary: {
          0: "var(--md-primary-0)",
          10: "var(--md-primary-10)",
          20: "var(--md-primary-20)",
          30: "var(--md-primary-30)",
          40: "var(--md-primary-40)",
          50: "var(--md-primary-50)",
          60: "var(--md-primary-60)",
          70: "var(--md-primary-70)",
          80: "var(--md-primary-80)",
          90: "var(--md-primary-90)",
          95: "var(--md-primary-95)",
          98: "var(--md-primary-98)",
          99: "var(--md-primary-99)",
          100: "var(--md-primary-100)",
          DEFAULT: "var(--md-sys-color-primary)",
          container: "var(--md-sys-color-primary-container)",
        },
        secondary: {
          0: "var(--md-secondary-0)",
          10: "var(--md-secondary-10)",
          20: "var(--md-secondary-20)",
          30: "var(--md-secondary-30)",
          40: "var(--md-secondary-40)",
          50: "var(--md-secondary-50)",
          60: "var(--md-secondary-60)",
          70: "var(--md-secondary-70)",
          80: "var(--md-secondary-80)",
          90: "var(--md-secondary-90)",
          95: "var(--md-secondary-95)",
          98: "var(--md-secondary-98)",
          99: "var(--md-secondary-99)",
          100: "var(--md-secondary-100)",
          DEFAULT: "var(--md-sys-color-secondary)",
          container: "var(--md-sys-color-secondary-container)",
        },
        tertiary: {
          0: "var(--md-tertiary-0)",
          10: "var(--md-tertiary-10)",
          20: "var(--md-tertiary-20)",
          30: "var(--md-tertiary-30)",
          40: "var(--md-tertiary-40)",
          50: "var(--md-tertiary-50)",
          60: "var(--md-tertiary-60)",
          70: "var(--md-tertiary-70)",
          80: "var(--md-tertiary-80)",
          90: "var(--md-tertiary-90)",
          95: "var(--md-tertiary-95)",
          98: "var(--md-tertiary-98)",
          99: "var(--md-tertiary-99)",
          100: "var(--md-tertiary-100)",
          DEFAULT: "var(--md-sys-color-tertiary)",
          container: "var(--md-sys-color-tertiary-container)",
        },
        error: {
          0: "var(--md-error-0)",
          10: "var(--md-error-10)",
          20: "var(--md-error-20)",
          30: "var(--md-error-30)",
          40: "var(--md-error-40)",
          50: "var(--md-error-50)",
          60: "var(--md-error-60)",
          70: "var(--md-error-70)",
          80: "var(--md-error-80)",
          90: "var(--md-error-90)",
          95: "var(--md-error-95)",
          98: "var(--md-error-98)",
          99: "var(--md-error-99)",
          100: "var(--md-error-100)",
          DEFAULT: "var(--md-sys-color-error)",
          container: "var(--md-sys-color-error-container)",
        },
        surface: {
          DEFAULT: "var(--md-sys-color-surface)",
          variant: "var(--md-sys-color-surface-variant)",
          container: {
            lowest: "var(--md-sys-color-surface-container-lowest)",
            low: "var(--md-sys-color-surface-container-low)",
            DEFAULT: "var(--md-sys-color-surface-container)",
            high: "var(--md-sys-color-surface-container-high)",
            highest: "var(--md-sys-color-surface-container-highest)",
          },
          0: "var(--md-sys-elevation-surface0)",
          1: "var(--md-sys-elevation-surface1)",
          2: "var(--md-sys-elevation-surface2)",
          3: "var(--md-sys-elevation-surface3)",
          4: "var(--md-sys-elevation-surface4)",
          6: "var(--md-sys-elevation-surface6)",
          8: "var(--md-sys-elevation-surface8)",
          12: "var(--md-sys-elevation-surface12)",
          16: "var(--md-sys-elevation-surface16)",
          24: "var(--md-sys-elevation-surface24)",
        },
        background: "var(--md-sys-color-background)",
        outline: {
          DEFAULT: "var(--md-sys-color-outline)",
          variant: "var(--md-sys-color-outline-variant)",
        },
        inverse: {
          surface: "var(--md-sys-color-inverse-surface)",
          primary: "var(--md-sys-color-inverse-primary)",
        },
        // On colors
        "on-primary": "var(--md-sys-color-on-primary)",
        "on-primary-container": "var(--md-sys-color-on-primary-container)",
        "on-secondary": "var(--md-sys-color-on-secondary)",
        "on-secondary-container": "var(--md-sys-color-on-secondary-container)",
        "on-tertiary": "var(--md-sys-color-on-tertiary)",
        "on-tertiary-container": "var(--md-sys-color-on-tertiary-container)",
        "on-error": "var(--md-sys-color-on-error)",
        "on-error-container": "var(--md-sys-color-on-error-container)",
        "on-surface": "var(--md-sys-color-on-surface)",
        "on-surface-variant": "var(--md-sys-color-on-surface-variant)",
        "on-background": "var(--md-sys-color-on-background)",
        "on-inverse-surface": "var(--md-sys-color-inverse-on-surface)",
      },
      fontFamily: {
        sans: [
          "Poppins",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      fontSize: {
        // Material Design 3 Typography Scale
        "display-large": [
          "var(--md-sys-typescale-display-large-font-size)",
          {
            lineHeight: "var(--md-sys-typescale-display-large-line-height)",
            fontWeight: "var(--md-sys-typescale-display-large-font-weight)",
            letterSpacing:
              "var(--md-sys-typescale-display-large-letter-spacing)",
          },
        ],
        "display-medium": [
          "var(--md-sys-typescale-display-medium-font-size)",
          {
            lineHeight: "var(--md-sys-typescale-display-medium-line-height)",
            fontWeight: "var(--md-sys-typescale-display-medium-font-weight)",
            letterSpacing:
              "var(--md-sys-typescale-display-medium-letter-spacing)",
          },
        ],
        "display-small": [
          "var(--md-sys-typescale-display-small-font-size)",
          {
            lineHeight: "var(--md-sys-typescale-display-small-line-height)",
            fontWeight: "var(--md-sys-typescale-display-small-font-weight)",
            letterSpacing:
              "var(--md-sys-typescale-display-small-letter-spacing)",
          },
        ],
        "headline-large": [
          "var(--md-sys-typescale-headline-large-font-size)",
          {
            lineHeight: "var(--md-sys-typescale-headline-large-line-height)",
            fontWeight: "var(--md-sys-typescale-headline-large-font-weight)",
            letterSpacing:
              "var(--md-sys-typescale-headline-large-letter-spacing)",
          },
        ],
        "headline-medium": [
          "var(--md-sys-typescale-headline-medium-font-size)",
          {
            lineHeight: "var(--md-sys-typescale-headline-medium-line-height)",
            fontWeight: "var(--md-sys-typescale-headline-medium-font-weight)",
            letterSpacing:
              "var(--md-sys-typescale-headline-medium-letter-spacing)",
          },
        ],
        "headline-small": [
          "var(--md-sys-typescale-headline-small-font-size)",
          {
            lineHeight: "var(--md-sys-typescale-headline-small-line-height)",
            fontWeight: "var(--md-sys-typescale-headline-small-font-weight)",
            letterSpacing:
              "var(--md-sys-typescale-headline-small-letter-spacing)",
          },
        ],
        "title-large": [
          "var(--md-sys-typescale-title-large-font-size)",
          {
            lineHeight: "var(--md-sys-typescale-title-large-line-height)",
            fontWeight: "var(--md-sys-typescale-title-large-font-weight)",
            letterSpacing: "var(--md-sys-typescale-title-large-letter-spacing)",
          },
        ],
        "title-medium": [
          "var(--md-sys-typescale-title-medium-font-size)",
          {
            lineHeight: "var(--md-sys-typescale-title-medium-line-height)",
            fontWeight: "var(--md-sys-typescale-title-medium-font-weight)",
            letterSpacing:
              "var(--md-sys-typescale-title-medium-letter-spacing)",
          },
        ],
        "title-small": [
          "var(--md-sys-typescale-title-small-font-size)",
          {
            lineHeight: "var(--md-sys-typescale-title-small-line-height)",
            fontWeight: "var(--md-sys-typescale-title-small-font-weight)",
            letterSpacing: "var(--md-sys-typescale-title-small-letter-spacing)",
          },
        ],
        "body-large": [
          "var(--md-sys-typescale-body-large-font-size)",
          {
            lineHeight: "var(--md-sys-typescale-body-large-line-height)",
            fontWeight: "var(--md-sys-typescale-body-large-font-weight)",
            letterSpacing: "var(--md-sys-typescale-body-large-letter-spacing)",
          },
        ],
        "body-medium": [
          "var(--md-sys-typescale-body-medium-font-size)",
          {
            lineHeight: "var(--md-sys-typescale-body-medium-line-height)",
            fontWeight: "var(--md-sys-typescale-body-medium-font-weight)",
            letterSpacing: "var(--md-sys-typescale-body-medium-letter-spacing)",
          },
        ],
        "body-small": [
          "var(--md-sys-typescale-body-small-font-size)",
          {
            lineHeight: "var(--md-sys-typescale-body-small-line-height)",
            fontWeight: "var(--md-sys-typescale-body-small-font-weight)",
            letterSpacing: "var(--md-sys-typescale-body-small-letter-spacing)",
          },
        ],
        "label-large": [
          "var(--md-sys-typescale-label-large-font-size)",
          {
            lineHeight: "var(--md-sys-typescale-label-large-line-height)",
            fontWeight: "var(--md-sys-typescale-label-large-font-weight)",
            letterSpacing: "var(--md-sys-typescale-label-large-letter-spacing)",
          },
        ],
        "label-medium": [
          "var(--md-sys-typescale-label-medium-font-size)",
          {
            lineHeight: "var(--md-sys-typescale-label-medium-line-height)",
            fontWeight: "var(--md-sys-typescale-label-medium-font-weight)",
            letterSpacing:
              "var(--md-sys-typescale-label-medium-letter-spacing)",
          },
        ],
        "label-small": [
          "var(--md-sys-typescale-label-small-font-size)",
          {
            lineHeight: "var(--md-sys-typescale-label-small-line-height)",
            fontWeight: "var(--md-sys-typescale-label-small-font-weight)",
            letterSpacing: "var(--md-sys-typescale-label-small-letter-spacing)",
          },
        ],
      },
      boxShadow: {
        // Material Design 3 Elevation Shadows
        "elevation-1": "var(--md-sys-elevation-shadow-1)",
        "elevation-2": "var(--md-sys-elevation-shadow-2)",
        "elevation-3": "var(--md-sys-elevation-shadow-3)",
        "elevation-4": "var(--md-sys-elevation-shadow-4)",
        "elevation-6": "var(--md-sys-elevation-shadow-6)",
        "elevation-8": "var(--md-sys-elevation-shadow-8)",
        "elevation-12": "var(--md-sys-elevation-shadow-12)",
        "elevation-16": "var(--md-sys-elevation-shadow-16)",
        "elevation-24": "var(--md-sys-elevation-shadow-24)",
      },
      borderRadius: {
        // Material Design 3 corner radius tokens
        none: "0",
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "28px",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
