# Antonio Coppe Portfolio - Style Guide

## Overview

This style guide documents the design system and visual identity for Antonio Coppe's personal portfolio website. The design emphasizes trust, technical excellence, and personality while maintaining a modern, minimalist aesthetic.

## Brand Colors

### Primary Palette

- **Primary Gold**: `hsl(45, 86%, 65%)` - Main accent color for CTAs and highlights
- **Gold Light**: `hsl(45, 86%, 75%)` - Lighter gold for gradients
- **Gold Dark**: `hsl(45, 86%, 55%)` - Darker gold for hover states

### Theme Colors (Dark Theme)

- **Background**: `hsl(240, 2%, 7%)` - Smoky black
- **Surface**: `hsl(240, 2%, 13%)` - Eerie black primary
- **Surface Secondary**: `hsl(240, 2%, 12%)` - Eerie black secondary
- **Text Primary**: `hsl(0, 0%, 100%)` - White
- **Text Secondary**: `hsl(0, 0%, 98%)` - Off-white
- **Text Tertiary**: `hsl(0, 0%, 84%)` - Light gray
- **Border**: `hsl(0, 0%, 22%)` - Jet

## Typography

### Font Family

- **Primary Font**: Poppins (Google Fonts)
  - Weights: 300, 400, 500, 600

### Font Sizes (Responsive Scale)

- **Heading 1**: 32px (2rem) - Hero titles
- **Heading 2**: 24px (1.5rem) - Section titles
- **Heading 3**: 18px (1.125rem) - Card titles
- **Heading 4**: 16px (1rem) - Subtitles
- **Body Large**: 15px (0.9375rem) - Lead text
- **Body**: 14px (0.875rem) - Main content
- **Body Small**: 13px (0.8125rem) - Metadata
- **Caption**: 11px (0.6875rem) - Small labels

### Typography Hierarchy

```css
.hero-title {
  font-size: var(--fs-1); /* 32px */
  font-weight: var(--fw-600);
  color: var(--white-2);
}

.hero-subtitle {
  font-size: var(--fs-3); /* 18px */
  font-weight: var(--fw-400);
  color: var(--gold-accent);
}

.hero-tagline {
  font-size: var(--fs-4); /* 16px */
  font-weight: var(--fw-500);
  color: var(--white-1);
}
```

## Spacing System

### Grid & Layout

- **Container Padding**: 30px (1.875rem)
- **Section Spacing**: 50px (3.125rem)
- **Component Spacing**: 25px (1.5625rem)
- **Element Spacing**: 15px (0.9375rem)
- **Small Spacing**: 10px (0.625rem)

### Component Spacing

```css
.hero-section {
  padding: 30px;
  gap: 40px;
}

.about-grid {
  gap: 40px;
  padding: 30px;
}

.highlight-card {
  padding: 25px;
}
```

## Component Styles

### Buttons

#### Primary CTA Button

```css
.cta-button.primary {
  background: var(--gold-gradient);
  color: var(--smoky-black);
  border: 1px solid var(--gold-accent);
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: var(--fw-500);
}
```

#### Secondary Button

```css
.cta-button.secondary {
  background: transparent;
  color: var(--white-2);
  border: 1px solid var(--jet);
  padding: 12px 20px;
  border-radius: 12px;
}
```

### Cards

#### Content Card

```css
.content-card {
  background: var(--border-gradient-onyx);
  padding: 15px;
  border-radius: 14px;
  box-shadow: var(--shadow-2);
}
```

#### Highlight Card

```css
.highlight-card {
  background: var(--border-gradient-onyx);
  padding: 25px;
  border-radius: 16px;
  box-shadow: var(--shadow-2);
}
```

### Metrics & Stats

#### Metric Item

```css
.metric-item {
  background: var(--eerie-black-1);
  padding: 15px;
  border-radius: 12px;
  border: 1px solid var(--jet);
}

.metric-number {
  font-size: var(--fs-2);
  font-weight: var(--fw-600);
  color: var(--gold-accent);
}
```

## Shadows & Effects

### Shadow System

- **Shadow 1**: `-4px 8px 24px hsla(0, 0%, 0%, 0.25)` - Subtle lift
- **Shadow 2**: `0 16px 30px hsla(0, 0%, 0%, 0.25)` - Card elevation
- **Shadow 3**: `0 16px 40px hsla(0, 0%, 0%, 0.25)` - Hover states
- **Shadow 4**: `0 25px 50px hsla(0, 0%, 0%, 0.15)` - Modal overlays
- **Shadow 5**: `0 24px 80px hsla(0, 0%, 0%, 0.25)` - Large overlays

## Responsive Breakpoints

### Desktop First Approach

- **Large Desktop**: 1250px+ - Full layout with sidebar
- **Desktop**: 1024px - Grid layouts
- **Tablet**: 768px - Responsive grids
- **Mobile**: 580px - Stacked layout
- **Small Mobile**: 450px - Optimized spacing

### Mobile Optimizations

```css
/* Mobile hero section */
@media (max-width: 580px) {
  .hero-section {
    grid-template-columns: 1fr;
    gap: 30px;
    text-align: center;
  }

  .hero-metrics {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}
```

## Animation & Transitions

### Transition Timing

- **Fast**: `0.25s ease` - Button hovers
- **Normal**: `0.5s ease-in-out` - Layout changes

### Hover Effects

- **Buttons**: Scale up, shadow increase
- **Cards**: Lift effect with shadow
- **Images**: Subtle scale transform

## Iconography

### Icon Sources

- **Ionicons**: Primary icon library
- **Custom Emojis**: For tech stack indicators
- **SVG Icons**: For specialized graphics

### Icon Sizing

- **Large Icons**: 24px - Hero metrics
- **Medium Icons**: 20px - List items
- **Small Icons**: 18px - Button icons
- **Tiny Icons**: 16px - Metadata

## Content Guidelines

### Tone & Voice

- **Professional**: Technical competence, reliability
- **Confident**: Strong, impactful language
- **Personal**: Subtle personality hints (Italian heritage, endurance hiking)

### Content Structure

1. **Hero Section**: Name, title, tagline, metrics, CTAs
2. **About Section**: Lead statement, achievement bullets, tech stack
3. **Highlights**: Key achievements with metrics
4. **Experience**: Timeline with impact metrics
5. **Projects**: Visual portfolio with descriptions

### Metrics & Data

- **Performance**: Use quantifiable improvements (15× faster, 99.9% uptime)
- **Scale**: Include user numbers, request volumes
- **Impact**: Focus on business outcomes and technical achievements

## Implementation Notes

### CSS Architecture

- **CSS Custom Properties**: All colors and spacing as variables
- **Component-Based**: Modular, reusable styles
- **Responsive Design**: Mobile-first approach
- **Dark Theme Default**: Light theme as override

### Performance Considerations

- **Optimized Images**: Compressed, properly sized
- **Lazy Loading**: For portfolio images
- **Minimal JavaScript**: Only for theme switching and interactions

### Accessibility

- **Color Contrast**: WCAG AA compliant
- **Focus States**: Visible focus indicators
- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: Descriptive image descriptions

## Maintenance Guidelines

### Color Updates

- Update CSS custom properties in `:root`
- Ensure contrast ratios remain compliant
- Test across light/dark themes

### Component Additions

- Follow existing naming conventions
- Use established spacing and color variables
- Test responsive behavior
- Ensure accessibility compliance

### Content Updates

- Maintain consistent tone and voice
- Include metrics where possible
- Keep achievement-focused language
- Update style guide when making changes
