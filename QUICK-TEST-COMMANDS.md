# Quick Testing Commands

## Build & Preview
```bash
# Clean build
npm run build

# Preview locally
npm run preview

# Then open http://localhost:4321
```

## Check Generated Image Sizes
```bash
# List all optimized images with sizes
ls -lh dist/_astro/*.webp

# Check specific images
ls -lh dist/_astro/team-hero*.webp
ls -lh dist/_astro/logo*.webp
ls -lh dist/_astro/clientlogo*.webp

# Total dist folder size
du -sh dist/
```

## Lighthouse Performance Testing
```bash
# Install Lighthouse CLI (if not already installed)
npm install -g lighthouse

# Desktop audit
lighthouse http://localhost:4321 \
  --preset=desktop \
  --output=html \
  --output-path=./lighthouse-desktop.html \
  --view

# Mobile audit
lighthouse http://localhost:4321 \
  --preset=mobile \
  --output=html \
  --output-path=./lighthouse-mobile.html \
  --view

# Both audits
lighthouse http://localhost:4321 --preset=desktop --view && \
lighthouse http://localhost:4321 --preset=mobile --view
```

## What to Look For

### Network Tab (DevTools)
- Hero image: Should be <100KB WebP
- Logo: Should be <15KB WebP
- Client logos: Should be <10KB each
- Total page weight: Should be <500KB

### Lighthouse Scores (Target)
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### Core Web Vitals (Target)
- LCP (Largest Contentful Paint): <1.2s
- FID/INP (Interaction): <100ms
- CLS (Cumulative Layout Shift): <0.1

## Verify Responsive Images

### Desktop (1920px)
Browser should load: `team-hero.BseP1xAt_1d5CGP.webp` (89KB)

### Tablet (768px)
Browser should load: `team-hero.BseP1xAt_2dOcmX.webp` (67KB)

### Mobile (375px)
Browser should load: `team-hero.BseP1xAt_Z1XiLez.webp` (25KB)

## Git Commands
```bash
# Check status
git status

# View changes
git diff

# Stage all changes
git add -A

# Commit
git commit -m "feat: optimize images for 92% file size reduction

- Move hero image and logo to src/assets for build-time optimization
- Add responsive image generation with widths and sizes attributes
- Add fetchpriority=high for LCP images
- Reduce quality settings for logos (90→75) and photos (85→80)
- Configure image formats preference (AVIF, WebP)

Results:
- Hero image: 1425KB → 25-89KB (94-98% reduction)
- Logo: 46KB → 11KB (76% reduction)
- Client logos: 284KB → 41KB (86% reduction)
- Total savings: 1,593KB (92% reduction)

Performance improvements:
- LCP: ~1.5s faster (estimated 2.5s → 1.0s)
- Mobile bandwidth: 97% savings with responsive images"

# Push to remote
git push origin main
```

## Production Deployment
```bash
# Deploy (depends on your hosting)
# Vercel:
vercel --prod

# Netlify:
netlify deploy --prod

# Or just push to main if auto-deployed
git push origin main
```

## Monitoring After Deployment

### PageSpeed Insights
```
https://pagespeed.web.dev/analysis?url=https://yourdomain.com
```

### WebPageTest
```
https://www.webpagetest.org/
Location: Sydney, Australia
Connection: Cable
```

### Core Web Vitals (Google Search Console)
```
https://search.google.com/search-console
→ Core Web Vitals report
```

## Expected Before/After

### Before Optimization
- Hero image: 1,425 KiB PNG
- Logo: 46 KiB PNG
- Total critical images: ~1,755 KiB
- LCP: 2.5-3.0s
- Performance Score: 70-80

### After Optimization
- Hero image: 25-89 KiB WebP (responsive)
- Logo: 11 KiB WebP
- Total critical images: ~162 KiB
- LCP: 1.0-1.2s
- Performance Score: 95+

## Troubleshooting

### Build fails with "Missing width and height"
- Check that images are imported from src/assets (not public/)
- Ensure string paths have explicit width/height attributes

### Images look low quality
- Increase quality setting (80 → 85 for photos)
- Check source image is high enough resolution

### Wrong responsive size loads
- Verify `sizes` attribute matches your layout
- Check browser viewport matches expected breakpoints

### Images not optimized
- Ensure images are in src/assets/ not public/
- Check astro.config.mjs has image configuration
- Rebuild with `npm run build`
