# StudyLab Frontend

A modern web application for accessing academic resources.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Clerk Authentication:
   - Sign up for a free account at [clerk.dev](https://clerk.dev)
   - Create a new application in the Clerk dashboard
   - Enable Google OAuth in the Social Connections section
   - Create a `.env` file in the frontend directory with your Clerk publishable key:
     ```
     VITE_CLERK_PUBLISHABLE_KEY=pk_test_your-publishable-key
     ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Features

- Google Sign-In with Clerk Authentication
- University email validation
- Dark mode support
- Subject filtering by year and semester
- Study materials organized by subject
- Responsive design for mobile and desktop

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Clerk Authentication
- Vite 