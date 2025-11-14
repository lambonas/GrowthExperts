import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content Collections Configuration
 *
 * All collections are defined but currently empty.
 * Add content files to the respective directories when needed:
 * - src/content/blog/       - Blog posts and articles
 * - src/content/case-studies/ - Client success stories
 * - src/content/services/   - Service pages content
 * - src/content/testimonials/ - Client testimonials
 * - src/content/team/       - Team member profiles
 * - src/content/faqs/       - Frequently asked questions
 */

// Blog Posts Collection
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      author: z.string().default('Digital Growth Experts'),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      category: z.enum([
        'SEO',
        'Local SEO',
        'Technical SEO',
        'Content Marketing',
        'Case Studies',
        'Industry News',
        'Tips & Guides',
      ]),
      tags: z.array(z.string()),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      canonicalUrl: z.string().url().optional(),
    }),
});

// Case Studies Collection
const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string(),
      industry: z.string(),
      services: z.array(z.string()),
      description: z.string(),
      image: image(),
      imageAlt: z.string(),
      logo: image().optional(),
      publishDate: z.coerce.date(),
      featured: z.boolean().default(false),
      // Results metrics
      trafficIncrease: z.number().optional(),
      rankingImprovement: z.number().optional(),
      conversionIncrease: z.number().optional(),
      revenueIncrease: z.number().optional(),
      timeframe: z.string(), // "6 months", "1 year", etc.
      // SEO
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    }),
});

// Services Collection
const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortTitle: z.string().optional(),
      description: z.string(),
      icon: z.string(),
      category: z.enum(['service', 'industry', 'location']),
      slug: z.string(),
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
      price: z
        .object({
          starting: z.number(),
          currency: z.string().default('USD'),
        })
        .optional(),
      features: z.array(z.string()),
      benefits: z.array(z.string()),
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      schemaType: z.enum(['Service', 'LocalBusiness', 'ProfessionalService']),
    }),
});

// Testimonials Collection
const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/testimonials' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      company: z.string(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      rating: z.number().min(1).max(5),
      quote: z.string(),
      featured: z.boolean().default(false),
      service: z.string().optional(),
      videoUrl: z.string().url().optional(),
    }),
});

// Team Members Collection
const team = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/team' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      bio: z.string(),
      image: image(),
      imageAlt: z.string(),
      email: z.string().email().optional(),
      linkedin: z.string().url().optional(),
      twitter: z.string().url().optional(),
      order: z.number(),
    }),
});

// FAQ Collection
const faqs = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/faqs' }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string(),
    order: z.number(),
  }),
});

export const collections = {
  blog,
  caseStudies,
  services,
  testimonials,
  team,
  faqs,
};
