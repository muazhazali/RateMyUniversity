# Authentication Setup Guide

RateUni uses **Supabase Authentication** for user login and management. This guide explains how contributors can set up authentication in their local development environment.

## For Contributors (Local Development)

### Quick Setup

1. **Create your Supabase project** (if you haven't already)
   - Go to https://supabase.com
   - Create a new project
   - Wait for provisioning (~2 minutes)

2. **Enable Google OAuth**:
   - Go to **Authentication → Providers** in your Supabase dashboard
   - Find **Google** and toggle it on
   - **That's it!** Supabase provides test OAuth credentials automatically for development

3. **No external OAuth setup needed!**
   - Unlike production, you don't need to create Google Cloud credentials
   - Supabase handles everything for local testing

### How It Works

When you enable Google OAuth in Supabase:
- Supabase provides test OAuth credentials
- These work for local development
- Users can sign in with their Google account
- User data is stored in `auth.users` (managed by Supabase)
- Your custom user data goes in the `user` table

### Testing Authentication

1. **Start your dev server**:
   ```bash
   npm run dev
   ```

2. **Go to the login page**:
   ```
   http://localhost:3000/login
   ```

3. **Click "Login with Google"**:
   - You'll be redirected to Google
   - Sign in with any Google account
   - You'll be redirected back to your app
   - User is now authenticated!

4. **Check your Supabase dashboard**:
   - Go to **Authentication → Users**
   - You'll see your test user listed

### User Data Flow

```
Google Sign-In
     ↓
Supabase Auth (creates auth.users record)
     ↓
Your app (optionally creates "user" table record for custom data)
     ↓
User is authenticated
```

### Custom User Data

The `user` table in your database is for storing additional user info:

```sql
CREATE TABLE "user" (
    id UUID PRIMARY KEY REFERENCES auth.users(id),  -- Links to Supabase auth
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    verified BOOLEAN DEFAULT false,  -- .edu email verification
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

When a user signs in, you can:
1. Check if they exist in your `user` table
2. If not, create a record with their basic info
3. Store custom data like verified student status

### Verified Student Badge

Users with `.edu` email addresses can get a "Verified Student" badge:

1. User signs in with Google
2. Check if email ends with `.edu`
3. Set `verified = true` in the `user` table
4. Display badge on their reviews

## For Production (Maintainers Only)

### Setting Up Production OAuth

For production, you need real Google OAuth credentials:

1. **Create Google Cloud Project**:
   - Go to https://console.cloud.google.com
   - Create a new project
   - Enable Google+ API

2. **Create OAuth Credentials**:
   - Go to Credentials → Create Credentials → OAuth 2.0 Client ID
   - Application type: Web application
   - Authorized redirect URIs:
     ```
     https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
     ```

3. **Add to Supabase**:
   - Go to Authentication → Providers → Google
   - Enter your Client ID and Client Secret
   - Save

4. **Keep credentials secure**:
   - Never commit OAuth secrets to the repo
   - Store in Supabase dashboard only

## Troubleshooting

### "OAuth error" when logging in
- Make sure Google provider is enabled in Supabase dashboard
- Check that your redirect URL is correct (`/auth/callback`)
- Clear browser cookies and try again

### Users not appearing in database
- Check that the `user` table migration ran successfully
- Verify the foreign key reference to `auth.users` exists
- Look for errors in Supabase logs

### "Email already registered" error
- Supabase tracks users by email across all auth providers
- User might have signed up with email before trying Google
- This is expected behavior

### Can't sign in on localhost
- Make sure you're using `http://localhost:3000` (not `127.0.0.1`)
- Check that redirect URL in your app matches Supabase settings
- Ensure cookies are enabled in your browser

## Security Best Practices

### For Contributors
- Use test accounts for development (not your personal email)
- Don't share your local Supabase credentials
- Clear test data regularly

### For Maintainers
- Never commit OAuth secrets to the repository
- Use separate Supabase projects for staging/production
- Enable Row Level Security (RLS) policies
- Regularly audit authentication logs

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Google OAuth Setup Guide](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
