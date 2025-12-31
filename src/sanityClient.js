import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'x9c1zj30',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  token: process.env.REACT_APP_SANITY_TOKEN || 'skclw7xGg0GYqcsnlKdUblbW0DhH3IDLatvOF5x4InjAZsWXLIA3119Vg0SCu7UFZW79jMmTBM4fE5v67RrYIRci6wKQXDXrzyf1SFYYX54uUXNTJKxSfGdJFciyxxKsFjjnqGLyEqY76FxTtIWzEwykEaGHfIkfaZchkk5OAbauflSteB2K',
});