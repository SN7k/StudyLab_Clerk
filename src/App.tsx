import React, { useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { User } from './types';
import { ThemeProvider } from './contexts/ThemeContext';
import AuthScreen from './components/AuthScreen';
import OnboardingModal from './components/OnboardingModal';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ClerkRedirectHandler from './components/ClerkRedirectHandler';

interface AppProps {
  useClerk?: boolean;
}

function App({ useClerk = true }: AppProps) {
  // Only use Clerk hooks if useClerk is true
  const { isLoaded: isClerkLoaded, isSignedIn, user: clerkUser } = useClerk ? useUser() : { isLoaded: true, isSignedIn: false, user: null };
  const { signOut } = useClerk ? useAuth() : { signOut: async () => {} };
  
  const [user, setUser] = useState<User | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Handle Clerk authentication
  useEffect(() => {
    if (useClerk && isClerkLoaded && isSignedIn && clerkUser) {
      // Create a user from Clerk user data
      const newUser: User = {
        id: clerkUser.id,
        name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'User',
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
        program: '',
        batchYear: '',
        photoURL: clerkUser.imageUrl
      };
      
      setUser(newUser);
      setUserEmail(newUser.email);
      setShowOnboarding(true);
    }
  }, [useClerk, isClerkLoaded, isSignedIn, clerkUser]);

  const handleLogin = (email: string) => {
    // Store the email for onboarding
    setUserEmail(email);
    
    // Mock user creation - in production, this would come from your auth service
    const mockUser: User = {
      id: '1',
      name: 'Alex Johnson',
      email: email,
      program: '',
      batchYear: ''
    };
    setUser(mockUser);
    setShowOnboarding(true);
  };

  const handleGoogleLogin = (googleUser: any) => {
    if (!useClerk) {
      // If not using Clerk, create a mock Google user
      const mockGoogleUser: User = {
        id: 'google-123',
        name: 'Google User',
        email: 'user@gmail.com',
        program: '',
        batchYear: '',
        photoURL: 'https://lh3.googleusercontent.com/a/default-user'
      };
      setUser(mockGoogleUser);
      setUserEmail(mockGoogleUser.email);
      setShowOnboarding(true);
    } else {
      // This is handled by the Clerk useEffect above
      console.log('Google login handled by Clerk');
    }
  };

  const handleOnboardingComplete = (program: string, year: string) => {
    if (user) {
      setUser({
        ...user,
        program: program.toUpperCase(),
        batchYear: year
      });
    }
    setShowOnboarding(false);
  };

  const handleLogout = async () => {
    try {
      // Sign out from Clerk if using it
      if (useClerk && isSignedIn) {
        await signOut();
      }
      
      // Clear user state
      setUser(null);
      setShowOnboarding(false);
      setUserEmail('');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Show loading state while Clerk is initializing
  if (useClerk && !isClerkLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      {/* Add ClerkRedirectHandler only if using Clerk */}
      {useClerk && <ClerkRedirectHandler useClerk={useClerk} />}
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {!user ? (
          <AuthScreen onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} useClerk={useClerk} />
        ) : (
          <>
            <Header user={user} onLogout={handleLogout} />
            <Dashboard user={user} />
            
            {showOnboarding && (
              <OnboardingModal 
                onComplete={handleOnboardingComplete}
                userEmail={userEmail}
              />
            )}
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;