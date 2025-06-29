import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.tsx';
import './index.css';
import { clerkPubKey, clerkAppearance, isValidClerkKey } from './utils/clerkConfig';

// Directly access the environment variable for clarity
const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log('Main.tsx - Clerk key from env:', CLERK_KEY ? 'Found key' : 'No key found');

if (!isValidClerkKey) {
  console.warn('No valid Clerk publishable key found. Running in development mode without authentication.');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isValidClerkKey ? (
      <ClerkProvider publishableKey={clerkPubKey} appearance={clerkAppearance}>
        <App />
      </ClerkProvider>
    ) : (
      <App useClerk={false} />
    )}
  </StrictMode>
);
