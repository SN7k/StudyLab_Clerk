import React, { useState } from 'react';
import { BookOpen, GraduationCap, Users, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { useSignIn } from '@clerk/clerk-react';
import ThemeToggle from './ThemeToggle';
import { parseUniversityEmail } from '../utils/emailParser';

interface AuthScreenProps {
  onLogin: (email: string, googleUser?: any) => void;
  onGoogleLogin: (user: any) => void;
  useClerk?: boolean;
}

export default function AuthScreen({ onLogin, onGoogleLogin, useClerk = true }: AuthScreenProps) {
  const [email, setEmail] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  
  // Only use Clerk hooks if useClerk is true
  const { signIn, isLoaded: isClerkLoaded } = useClerk 
    ? useSignIn() 
    : { signIn: null, isLoaded: true };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);
    setError('');

    // Parse the email
    const parsedData = parseUniversityEmail(email);
    
    if (!parsedData.isValid) {
      setError('Please enter a valid Brainware University email address (e.g., bwubca23734@brainwareuniversity.ac.in)');
      setIsValidating(false);
      return;
    }

    // Simulate validation delay
    setTimeout(() => {
      setIsValidating(false);
      onLogin(email);
    }, 1000);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(''); // Clear error when user types
  };

  const handleGoogleLogin = async () => {
    if (useClerk) {
      if (!isClerkLoaded) {
        setError('Authentication system is not ready yet. Please try again.');
        return;
      }

      try {
        setIsGoogleLoading(true);
        setError('');
        
        // Start the OAuth flow with Google through Clerk
        await signIn?.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: window.location.href,
          redirectUrlComplete: window.location.href,
        });
        
        // Note: With redirect flow, this code below won't execute immediately
        // as the user will be redirected to Google's login page
        // The Clerk will handle the redirect back to your app
        
      } catch (error) {
        console.error('Google login error:', error);
        setError('Failed to login with Google. Please try again.');
        setIsGoogleLoading(false);
      }
    } else {
      // Use mock Google login if not using Clerk
      setIsGoogleLoading(true);
      setError('');
      
      // Simulate Google login delay
      setTimeout(() => {
        setIsGoogleLoading(false);
        onGoogleLogin({});
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="max-w-md w-full">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">StudyLab</h1>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Your academic companion for success</p>
        </div>

        {/* Features preview */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6 border border-gray-200 dark:border-gray-700 transition-all duration-300">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center transition-colors duration-300">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">Study Materials</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Access notes, PDFs, and resources</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center transition-colors duration-300">
                <GraduationCap className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">Exam Prep</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">CT1, CT2, and Final exam suggestions</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center transition-colors duration-300">
                <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">Collaborative</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Share with your batch mates</p>
              </div>
            </div>
          </div>
        </div>

        {!showEmailInput ? (
          <div className="space-y-4">
            {/* Google Login button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading || (useClerk && !isClerkLoaded)}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-6 py-4 flex items-center justify-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGoogleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-gray-600 dark:text-gray-300" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              <span className="text-gray-700 dark:text-gray-200 font-medium transition-colors duration-300">
                {isGoogleLoading ? 'Signing in...' : 'Continue with Google'}
              </span>
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 transition-colors duration-300">
                  or connect with university mail
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowEmailInput(true)}
              className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-4 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
            >
              Use University Email
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                  University Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="bwubca23734@brainwareuniversity.ac.in"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    disabled={isValidating}
                  />
                </div>
                {error && (
                  <div className="flex items-center mt-2 text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {error}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={!email || isValidating}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isValidating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : null}
                <span>{isValidating ? 'Validating...' : 'Continue with University Email'}</span>
              </button>
            </form>

            <button
              onClick={() => setShowEmailInput(false)}
              className="w-full text-gray-500 dark:text-gray-400 text-sm hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300 mt-4"
            >
              ← Back to Google Sign In
            </button>
          </div>
        )}

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4 transition-colors duration-300">
          Use your Brainware University email or Google account to access StudyLab
        </p>
      </div>
    </div>
  );
}