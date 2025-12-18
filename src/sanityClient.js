import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'x9c1zj30',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: undefined,
});