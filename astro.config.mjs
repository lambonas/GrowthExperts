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
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Exclude unnecessary namespaces for better performance
      namespaces: {
        news: false,
        video: false,
      },
      // Note: Page-specific priorities can be set using frontmatter in individual pages
      // Example in page frontmatter:
      // ---
      // sitemap:
      //   priority: 1.0
      //   changefreq: 'daily'
      // ---
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
