import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'x9c1zj30',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  token: process.env.REACT_APP_SANITY_TOKEN || undefined,
});