// Clerk configuration
const rawKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log('Raw env variable:', typeof rawKey, rawKey ? 'exists' : 'undefined');

// Ensure we have a string
export const clerkPubKey = rawKey || '';

// Debug: Log the key (first few characters only for security)
console.log('Clerk key found:', clerkPubKey ? `${clerkPubKey.substring(0, 8)}...` : 'none');

// Check if the key is valid (starts with pk_ and is not empty)
export const isValidClerkKey = Boolean(
  clerkPubKey && 
  clerkPubKey.startsWith('pk_') && 
  clerkPubKey !== 'pk_test_YOUR_CLERK_PUBLISHABLE_KEY'
);

console.log('Is Clerk key valid:', isValidClerkKey);

// You can add more Clerk configuration here as needed
export const clerkAppearance = {
  elements: {
    formButtonPrimary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl',
    card: 'bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700',
    headerTitle: 'text-3xl font-bold text-gray-900 dark:text-white',
    headerSubtitle: 'text-gray-600 dark:text-gray-300',
    socialButtonsBlockButton: 'border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700',
    formFieldInput: 'rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
    footerActionLink: 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300'
  }
}; 