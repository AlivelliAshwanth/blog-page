import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'x9c1zj30',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03', // Try older API version
  token: 'skclw7xGg0GYqcsnlKdUblbW0DhH3IDLatvOF5x4InjAZsWXLIA3119Vg0SCu7UFZW79jMmTBM4fE5v67RrYIRci6wKQXDXrzyf1SFYYX54uUXNTJKxSfGdJFciyxxKsFjjnqGLyEqY76FxTtIWzEwykEaGHfIkfaZchkk5OAbauflSteB2K',
});