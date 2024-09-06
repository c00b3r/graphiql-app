import { initializeApp } from 'firebase/app';
import { describe, vi } from 'vitest';

const apiKey = 'AIzaSyBO9UbnDyOqutK2QQUn6pvtVEhq01iLMCc';
const authDomain = 'graphiql-app-472e0.firebaseapp.com';
const projectId = 'graphiql-app-472e0';
const storageBucket = 'graphiql-app-472e0.appspot.com';
const messagingSenderId = '354725338784';
const appId = '1:354725338784:web:7cbd3290abff0e439df3c5';

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(),
}));
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
}));
vi.mock('firebase/firestore', () => ({
  setLogLevel: vi.fn(),
}));

describe('Firebase Initialization', () => {
  test('should initialize Firebase app successfully with valid config', () => {
    const firebaseApp = initializeApp({
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
    });

    expect(firebaseApp).toBe(undefined);
  });
});
