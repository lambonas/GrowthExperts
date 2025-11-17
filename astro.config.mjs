// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://growthexperts.com.au', // Update this with your actual domain
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
    // Code splitting configuration for better caching and performance
    split: true,
    // Separate vendor chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separate React and vendor libraries
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('motion')) {
              return 'vendor-motion';
            }
            if (id.includes('@fontsource')) {
              return 'vendor-fonts';
            }
            // Other node_modules go to vendor chunk
            return 'vendor';
          }
        },
      },
    },
  },
  // Enhanced image optimization configuration
  image: {
    // Use Sharp for optimal image processing
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
    // Supported formats in order of preference (browser picks first supported)
    formats: ['avif', 'webp'],
    // Optimized quality settings for different image types
    // These can be overridden per-image with quality prop
    quality: {
      avif: 75,  // AVIF at 75 quality produces excellent results with small file sizes
      webp: 80,  // WebP at 80 provides great balance of quality and compression
      jpeg: 80,  // JPEG fallback quality
      jpg: 80,   // JPG fallback quality
      png: 80,   // PNG compression level
    },
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      // Strategic sitemap configuration for optimal SEO
      serialize(item) {
        // Set strategic priorities based on page importance
        // Homepage gets highest priority
        if (item.url.endsWith('growthexperts.com.au/')) {
          item.priority = 1.0;
        }
        // Primary service pages (SEO, PPC, Web Design, Content, Social)
        else if (
          item.url.includes('/seo-services/') ||
          item.url.includes('/ppc-management/') ||
          item.url.includes('/web-design/') ||
          item.url.includes('/content-marketing/') ||
          item.url.includes('/social-media-marketing/')
        ) {
          item.priority = 0.9;
        }
        // Secondary important pages (About, Contact, Services overview)
        else if (
          item.url.includes('/about/') ||
          item.url.includes('/contact/') ||
          item.url.includes('/services/')
        ) {
          item.priority = 0.8;
        }
        // Resource pages (Blog, Case Studies, Resources)
        else if (
          item.url.includes('/blog/') ||
          item.url.includes('/case-studies/') ||
          item.url.includes('/resources/')
        ) {
          item.priority = 0.7;
        }
        // Sub-service pages and location pages
        else if (
          item.url.includes('/locations/') ||
          item.url.includes('/industries/')
        ) {
          item.priority = 0.6;
        }
        // Legal/Policy pages
        else if (
          item.url.includes('/privacy/') ||
          item.url.includes('/terms/') ||
          item.url.includes('/cookie-policy/')
        ) {
          item.priority = 0.4;
        }
        // All other pages
        else {
          item.priority = 0.3;
        }

        // Set all pages to daily changefreq as requested
        item.changefreq = 'daily';

        // Set lastmod to current date
        item.lastmod = new Date();

        return item;
      },
      // Filter function to exclude specific pages
      filter: (page) => {
        // Exclude the proposal page from sitemap
        return !page.includes('/proposal/');
      },
    }),
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'github-dark',
      },
      optimize: true,
    }),
  ],
});
