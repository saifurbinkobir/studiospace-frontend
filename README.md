# StudioSpace

Live site: [https://studio-space-liard.vercel.app/](https://studio-space-liard.vercel.app/)

StudioSpace is a peer-to-peer creative space marketplace for filmmakers, photographers, podcasters, musicians, and other creators. Users can discover studios, review details, check availability, and reserve suitable creative spaces.

## Features

- Browse creative studios with images, descriptions, pricing, location, and category information.
- Search and filter studios to find suitable spaces for different creative activities.
- View detailed studio pages with booking and review functionality.
- Register and log in using email/password authentication or Google authentication.
- Add, edit, and manage personal studio listings.
- Manage bookings through a personalized dashboard.
- Switch between light and dark themes across the complete application.
- Responsive design optimized for mobile, tablet, and desktop devices.
- Secure session management using Better Auth and JWT-based authentication.
- Dynamic charts and dashboard summaries for studio and booking management.

## Technology Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- shadcn-style UI components
- Better Auth
- MongoDB
- JavaScript
- Lucide React and React Icons
- Recharts
- Vercel

## Local Setup

1. Clone the repository:

   ```bash
   git clone <your-client-repository-url>
   cd studiospace-frontend

2. Install the dependencies:

   npm install
3. Create a .env file in the project root and add the required environment variables:

   STUDIO_SPACE_BACKEND_URL=your_backend_url
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_auth_secret
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
4. Start the development server:

   npm run dev
5. Open http://localhost:3000 in your browser.

## Examiner Test Credentials

- Email: john@smith.com
- Password: John1234

## Available Scripts

npm run dev     # Start the development server
npm run build   # Build the application for production
npm run start   # Start the production server
npm run lint    # Run ESLint