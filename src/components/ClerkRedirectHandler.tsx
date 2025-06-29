import { useEffect } from 'react';
import { useSignIn } from '@clerk/clerk-react';

interface ClerkRedirectHandlerProps {
  useClerk?: boolean;
}

export default function ClerkRedirectHandler({ useClerk = true }: ClerkRedirectHandlerProps) {
  // Only use Clerk hooks if useClerk is true
  const { signIn, isLoaded } = useClerk 
    ? useSignIn() 
    : { signIn: null, isLoaded: true };

  useEffect(() => {
    // This component handles the redirect after OAuth sign-in
    if (useClerk && isLoaded && signIn) {
      // Check if we have a redirect result in the URL
      const params = new URLSearchParams(window.location.search);
      if (params.get('__clerk_status') === 'active') {
        console.log('Detected Clerk OAuth redirect');
        // The redirect will be automatically handled by Clerk's ClerkProvider
        // We just need to make sure the component is rendered when the redirect happens
      }
    }
  }, [useClerk, isLoaded, signIn]);

  // This component doesn't render anything visible
  return null;
} 