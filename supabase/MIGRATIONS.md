# Database Migrations Guide

This guide explains how to work with database migrations in the RateUni project.

## Overview

Migrations are SQL files that define changes to the database schema. Each migration has a timestamp and descriptive name.

## For Contributors

### Initial Setup

1. **Create a free Supabase account** at https://supabase.com
2. **Create a new project** in your Supabase dashboard
3. **Run the initial migration**:
   - Go to your Supabase project → SQL Editor
   - Copy the contents of `supabase/migrations/20250101000000_initial_schema.sql`
   - Paste and execute it in the SQL Editor

4. **Optional: Add sample data**:
   - Copy the contents of `supabase/seed/sample_data.sql`
   - Paste and execute it in the SQL Editor

5. **Get your connection credentials**:
   - Go to Settings → API
   - Copy the `Project URL` and `anon/public` key
   - Add them to your `.env.local` file:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
     ```

### Creating a New Migration

When you need to add or modify database tables:

1. **Create a new migration file** in `supabase/migrations/`:
   ```
   supabase/migrations/YYYYMMDDHHMMSS_description.sql
   ```

   Example: `20250115143000_add_likes_to_reviews.sql`

2. **Write your SQL changes**:
   ```sql
   -- Add likes column to reviews table
   ALTER TABLE reviews ADD COLUMN likes INTEGER DEFAULT 0;

   -- Add index for performance
   CREATE INDEX idx_reviews_likes ON reviews(likes);
   ```

3. **Test your migration**:
   - Run it in your local Supabase SQL Editor
   - Test your application to ensure it works
   - Make sure you can also **rollback** if needed

4. **Include rollback instructions** (optional but recommended):
   ```sql
   -- To rollback:
   -- DROP INDEX idx_reviews_likes;
   -- ALTER TABLE reviews DROP COLUMN likes;
   ```

5. **Commit the migration file** with your PR

### Best Practices

- ✅ **One migration per feature/change**
- ✅ **Use descriptive names**: `add_user_avatar.sql` not `update.sql`
- ✅ **Include comments** explaining what and why
- ✅ **Test migrations** on your local database first
- ✅ **Make migrations reversible** when possible
- ✅ **Use IF EXISTS/IF NOT EXISTS** to make migrations idempotent
- ❌ **Never modify existing migration files** - create a new one instead
- ❌ **Don't include data changes** in schema migrations (use seed files)

### Migration Naming Convention

```
YYYYMMDDHHMMSS_description.sql
```

- `YYYYMMDD`: Year, month, day
- `HHMMSS`: Hour, minute, second (use current time or increment)
- `description`: Short description using underscores

Examples:
- `20250115120000_create_notifications_table.sql`
- `20250115120100_add_email_to_users.sql`
- `20250116083000_add_indexes_for_performance.sql`

## For Maintainers

### Reviewing Migration PRs

1. **Check the migration file**:
   - Follows naming convention
   - Includes proper comments
   - Uses safe SQL (IF EXISTS, IF NOT EXISTS)
   - No destructive changes without discussion

2. **Test the migration**:
   - Run it on your staging database first
   - Verify the application still works
   - Check for performance impact

3. **Apply to production**:
   - Go to production Supabase project → SQL Editor
   - Copy and execute the migration
   - Verify the application is working
   - Document any manual steps needed

### Rolling Back a Migration

If a migration causes issues:

1. **Write a rollback migration** that undoes the changes
2. **Test the rollback** on staging
3. **Apply to production** if needed
4. **Document the incident** for future reference

### Migration History

Keep track of which migrations have been applied to each environment:

- **Local**: Each contributor's own database
- **Staging**: Your staging Supabase project
- **Production**: Your production Supabase project

You can add a `migrations_applied.md` file to track this, or use a database table.

## Troubleshooting

### "Table already exists" error
- Migration probably already ran
- Add `IF NOT EXISTS` to your CREATE statements

### "Column already exists" error
- Add `IF NOT EXISTS` or check if column exists first:
  ```sql
  DO $$
  BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                     WHERE table_name='reviews' AND column_name='likes')
      THEN
          ALTER TABLE reviews ADD COLUMN likes INTEGER DEFAULT 0;
      END IF;
  END $$;
  ```

### Migration conflicts
- Two contributors created migrations with same timestamp
- Rename one with a later timestamp
- Ensure both are compatible

## Resources

- [Supabase SQL Editor Docs](https://supabase.com/docs/guides/database/overview)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Database Migration Best Practices](https://www.prisma.io/dataguide/types/relational/migration-strategies)
