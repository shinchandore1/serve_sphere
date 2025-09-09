# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for the GiveGuide application.

## Prerequisites

1. A Google Cloud Console account
2. A new or existing Google Cloud project

## Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application" as the application type
   - Add authorized redirect URIs:
     - `http://localhost:5173` (for local development)
     - `https://yourdomain.com` (for production)
   - Add authorized JavaScript origins:
     - `http://localhost:5173`
     - `https://yourdomain.com`
5. Copy the Client ID

## Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your Google Client ID to `.env`:
   ```
   VITE_GOOGLE_CLIENT_ID=your_actual_client_id_here
   ```

## Step 3: Test the Authentication

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:5173`

3. Click "Sign In" or "Start Giving" to test Google authentication

## Troubleshooting

### Common Issues

1. **"Google authentication not configured" error**
   - Ensure `VITE_GOOGLE_CLIENT_ID` is set in your `.env` file
   - Restart the development server after adding the environment variable

2. **"Error: 400 redirect_uri_mismatch"**
   - Double-check your authorized redirect URIs in Google Cloud Console
   - Ensure the port matches your development server (usually 5173 for Vite)

3. **"Error: 403 access_denied"**
   - Make sure the Google+ API is enabled for your project
   - Verify your OAuth consent screen is configured

### Environment Variables

- `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- All Vite environment variables must be prefixed with `VITE_`

## Security Notes

- Never commit your `.env` file to version control
- Use different OAuth credentials for development and production
- Regularly rotate your OAuth client secrets in production
- Ensure HTTPS is enabled in production environments
