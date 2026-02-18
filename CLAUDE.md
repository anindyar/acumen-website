# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Acumen Labs marketing website - a static site built with vanilla HTML, CSS, and JavaScript. No build tools, frameworks, or package managers.

## Development

Open any HTML file directly in a browser, or serve with any HTTP server:
```bash
python3 -m http.server 8000
# or
npx serve .
```

## Architecture

```
├── index.html, services.html, about.html, blog.html, contact.html  # Main pages
├── css/
│   ├── style.css          # Main stylesheet (CSS custom properties system, ~2400 lines)
│   └── blog-post.css      # Blog article styling (~330 lines)
├── js/
│   └── main.js            # All client-side interactivity (~445 lines)
├── blog/                  # Individual blog post HTML files
└── images/                # Image assets
```

## CSS System

All design tokens are CSS custom properties defined in `:root` in `style.css`:

- **Colors:** `--color-primary` (aquamarine `#06b6d4`), `--color-accent` (orange `#fb923c`), dark bg variants (`--bg-primary: #252530`, `--bg-secondary`, `--bg-tertiary`)
- **Spacing:** Scale `--spacing-xs` through `--spacing-3xl`
- **Typography:** Inter (sans-serif), JetBrains Mono (monospace)
- **Cards:** `.service-card`, `.blog-card`, `.audience-card` share hover patterns: `translateY(-2px)`, border glow, animated top border gradient
- **Grids:** `.services-grid` (3-col), `.stats-grid` (4-col), `.audience-grid` (3-col), `.blog-grid` (3-col) — all collapse to fewer columns at `1024px` and `768px`

## JavaScript Modules (main.js)

- **Code rain background:** 6 animated columns of syntax-highlighted AI/ML code snippets; uses `.keyword`, `.function`, `.variable`, `.string`, etc. classes for highlighting
- **Scene-based scroll animations:** IntersectionObserver adds `.scene-active` to sections; CSS transitions handle the visual effects
- **Element entrance animations:** Separate observer adds `.visible` to individual cards/headers for staggered fade-in
- **Parallax:** `requestAnimationFrame`-based subtle translateY on the SVG diagram
- **AI diagram tooltips:** Reads `<title>` from SVG `.node` elements, shows floating tooltip on hover
- **Mobile nav toggle, navbar scroll shadow, smooth scroll anchors, contact form validation, active nav detection**

## Scroll Animation Classes (style.css)

Apply these to elements to animate them when scrolled into view:
- `.scroll-fade` — fade up from `translateY(30px)`
- `.scroll-fade-children` — staggered fade-up on child elements (nth-child delays)
- `.scroll-slide-left` / `.scroll-slide-right` — slide in from sides
- `.scroll-scale` — scale from `0.95`

## Adding Content

**New page:** Copy structure from an existing page. Every page has: `<nav class="navbar">` with hamburger toggle, main content sections with `.container`, and `<footer class="footer">`.

**New blog post:** Copy a post from `blog/`. Structure:
1. `<header class="article-header">` — `.article-meta` (category/date/read time), title, subtitle, `.article-author`
2. `<article class="article-content">` with `.container.container-narrow` (760px max-width) — supports `.lead` intro, `<h2>`/`<h3>`, `<pre><code>`, `.callout` boxes (variants: `.callout-info`, `.callout-success`, `.callout-primary`), tables
3. `<div class="article-footer">` — tags + LinkedIn share link
4. `<section class="related-posts">` — 2-col `.blog-grid` of related posts

## Conventions

- HTML: Semantic elements, BEM-inspired class names
- CSS: All colors/spacing via CSS variables; never hardcode values that exist as variables
- JS: Vanilla ES6+, event-driven, uses IntersectionObserver and `requestAnimationFrame`
- Responsive breakpoints: `1024px` (tablet) and `768px` (mobile)
- `prefers-reduced-motion` respected in CSS animations
