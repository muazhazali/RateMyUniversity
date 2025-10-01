# Contributing to RateUni

Thank you for your interest in contributing to RateMyUni! We welcome contributions from the community.

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm, yarn, pnpm, or bun
- Git

### Setup

1. Fork the repository
2. Clone your fork:

   ```bash
   git clone https://github.com/YOUR_USERNAME/rateuni.git
   cd rateuni
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up your database:

   **Create a free Supabase account and project:**

   - Go to https://supabase.com and create a free account
   - Create a new project (any name/region is fine)
   - Wait for the project to be provisioned (~2 minutes)

   **Run the database migrations:**

   - Go to your Supabase project dashboard → SQL Editor
   - Copy the contents of `supabase/migrations/20250101000000_initial_schema.sql`
   - Paste and execute it in the SQL Editor
   - (Optional) Run `supabase/seed/sample_data.sql` for test data

   **Enable Google Authentication:**

   - Go to Authentication → Providers in your Supabase dashboard
   - Enable Google provider (toggle it on)
   - **No need to add OAuth credentials** - Supabase provides test credentials for local development!

   **Get your Supabase credentials:**

   - Go to Settings → API in your Supabase dashboard
   - Copy the `Project URL` and `anon public` key

5. Create a `.env.local` file with your Supabase credentials:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

   See `.env.example` for all required variables.

6. Run the development server:

   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) to view the app

## Database Migrations

When your contribution requires database changes (new tables, columns, etc.):

1. **Create a new migration file** in `supabase/migrations/`:
   ```
   supabase/migrations/YYYYMMDDHHMMSS_description.sql
   ```

2. **Write your SQL changes** with proper comments

3. **Test the migration** on your local Supabase project

4. **Include the migration file** in your Pull Request

See [supabase/MIGRATIONS.md](supabase/MIGRATIONS.md) for detailed migration guidelines.

## Development Workflow

1. **Create a new branch** for your feature or bugfix:

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bugfix-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes** thoroughly

4. **Run linting**:

   ```bash
   npm run lint
   ```

5. **Commit your changes** with a clear, descriptive commit message:

   ```bash
   git commit -m "Add: description of your changes"
   ```

6. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request** from your fork to the main repository

## Coding Standards

- Use TypeScript for all new code
- Follow the existing code style and structure
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused
- Use Tailwind CSS for styling (follow the existing pattern)
- Ensure your code works with Next.js 15 and React 19

## Component Structure

- Place reusable components in the `/components` directory
- Place page-specific components within their respective app routes
- Use server components by default, client components only when needed
- Follow the existing file naming conventions

## Commit Message Guidelines

Use clear and descriptive commit messages:

- `Add: new feature or functionality`
- `Fix: bug fix`
- `Update: improvements to existing features`
- `Refactor: code restructuring without changing functionality`
- `Docs: documentation changes`
- `Style: formatting, missing semi-colons, etc.`
- `Test: adding or updating tests`

## Pull Request Process

1. Ensure your PR description clearly describes the problem and solution
2. Link any related issues
3. Update documentation if needed
4. Make sure all tests pass and linting succeeds
5. Request review from maintainers
6. Address any feedback from code reviews

## Reporting Bugs

Use the bug report issue template and include:

- Clear description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (browser, OS, etc.)

## Requesting Features

Use the feature request issue template and include:

- Clear description of the feature
- Use case and benefits
- Any implementation ideas (optional)

## Questions?

Feel free to open an issue for any questions about contributing!

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
