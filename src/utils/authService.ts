export interface AuthUser {
  id: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
}

// Mock Google sign-in function
export const signInWithGoogle = async (): Promise<AuthUser> => {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return a mock user
  return {
    id: 'google-user-123',
    name: 'Google User',
    email: 'googleuser@example.com',
    photoURL: 'https://i.pravatar.cc/150?img=2'
  };
};

// Mock sign-out function
export const signOut = async (): Promise<void> => {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Nothing to do in the mock implementation
  return;
}; 