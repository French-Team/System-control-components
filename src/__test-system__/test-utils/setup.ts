import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Nettoie après chaque test
afterEach(() => {
  cleanup();
});
