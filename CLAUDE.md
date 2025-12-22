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
│   ├── style.css          # Main stylesheet (CSS custom properties system)
│   └── blog-post.css      # Blog article styling
├── js/
│   └── main.js            # All client-side interactivity
├── blog/                  # Individual blog post HTML files
└── images/                # Image assets
```

## CSS System

The site uses an extensive CSS custom properties system defined in `:root` within `style.css`:

- **Colors:** `--color-primary` (aquamarine #06b6d4), `--color-accent` (orange #fb923c), plus semantic variants
- **Spacing:** Scale from `--spacing-xs` to `--spacing-3xl`
- **Typography:** Inter (sans-serif) and JetBrains Mono (monospace)
- **Components:** `.service-card`, `.blog-card`, `.audience-card` follow consistent card patterns
- **Grids:** `.services-grid` (3-col), `.stats-grid` (4-col), `.audience-grid` (3-col), `.blog-grid`

## JavaScript Modules (main.js)

- Mobile nav toggle with hamburger animation
- Navbar shadow on scroll
- IntersectionObserver for fade-in animations on cards
- Smooth scroll for anchor links
- Typewriter effect for rotating quotes
- Contact form handling

## Adding Content

**New page:** Copy structure from existing page - includes navbar with mobile toggle, container sections, consistent footer.

**New blog post:** Copy existing post from `blog/` directory. Structure: article metadata (category, date, read time) → title/subtitle → author info → article content in `<article class="article-content">`.

## Conventions

- HTML: Semantic elements, BEM-inspired class names
- CSS: Modify colors/spacing via CSS variables in `:root`
- JS: Vanilla ES6+, event-driven, uses IntersectionObserver API
- Assumes modern browser support (CSS Grid, IntersectionObserver)
