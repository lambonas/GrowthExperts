import { z } from 'zod';

/**
 * Environment variable validation schema
 * Validates all environment variables at build time
 */
const envSchema = z.object({
  // Site Configuration
  PUBLIC_SITE_URL: z
    .string()
    .url()
    .default('https://growthexperts.com.au')
    .describe('Public site URL for canonical links and meta tags'),

  // Optional: Analytics
  PUBLIC_GOOGLE_ANALYTICS_ID: z
    .string()
    .optional()
    .describe('Google Analytics measurement ID (GA4)'),

  PUBLIC_GOOGLE_TAG_MANAGER_ID: z
    .string()
    .optional()
    .describe('Google Tag Manager container ID'),

  // Optional: Form handling
  PUBLIC_FORM_ENDPOINT: z
    .string()
    .url()
    .optional()
    .describe('Contact form submission endpoint'),

  // Optional: Contact information
  PUBLIC_CONTACT_EMAIL: z
    .string()
    .email()
    .default('info@growthexperts.com.au')
    .describe('Primary contact email address'),

  PUBLIC_CONTACT_PHONE: z
    .string()
    .default('+61 2 1234 5678')
    .describe('Primary contact phone number'),

  // Optional: Social media
  PUBLIC_FACEBOOK_URL: z.string().url().optional().describe('Facebook page URL'),
  PUBLIC_LINKEDIN_URL: z.string().url().optional().describe('LinkedIn company URL'),
  PUBLIC_TWITTER_URL: z.string().url().optional().describe('Twitter/X profile URL'),

  // Build environment
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('production')
    .describe('Node environment'),
});

/**
 * Validated environment variables
 * Use this instead of import.meta.env directly for type safety
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Parse and validate environment variables
 * Throws an error if validation fails
 */
function validateEnv(): Env {
  try {
    return envSchema.parse({
      PUBLIC_SITE_URL: import.meta.env.PUBLIC_SITE_URL,
      PUBLIC_GOOGLE_ANALYTICS_ID: import.meta.env.PUBLIC_GOOGLE_ANALYTICS_ID,
      PUBLIC_GOOGLE_TAG_MANAGER_ID: import.meta.env.PUBLIC_GOOGLE_TAG_MANAGER_ID,
      PUBLIC_FORM_ENDPOINT: import.meta.env.PUBLIC_FORM_ENDPOINT,
      PUBLIC_CONTACT_EMAIL: import.meta.env.PUBLIC_CONTACT_EMAIL,
      PUBLIC_CONTACT_PHONE: import.meta.env.PUBLIC_CONTACT_PHONE,
      PUBLIC_FACEBOOK_URL: import.meta.env.PUBLIC_FACEBOOK_URL,
      PUBLIC_LINKEDIN_URL: import.meta.env.PUBLIC_LINKEDIN_URL,
      PUBLIC_TWITTER_URL: import.meta.env.PUBLIC_TWITTER_URL,
      NODE_ENV: import.meta.env.MODE === 'production' ? 'production' : 'development',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors
        .map((err) => `  - ${err.path.join('.')}: ${err.message}`)
        .join('\n');

      throw new Error(
        `❌ Environment variable validation failed:\n${formattedErrors}\n\n` +
        'Please check your .env file and ensure all required variables are set correctly.\n' +
        'See .env.example for reference.'
      );
    }
    throw error;
  }
}

/**
 * Validated environment variables ready to use
 * Access like: env.PUBLIC_SITE_URL
 */
export const env = validateEnv();
