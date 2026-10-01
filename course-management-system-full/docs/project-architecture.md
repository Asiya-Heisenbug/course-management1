# Project Architecture

```text
Browser
      |
      v
React Router
      |
      +--> Public Pages: Home, Login, Register
      |
      +--> Protected Pages: Dashboard, Courses, Add Course, Edit Course
                                          |
                                          v
                        React Context
                        AuthContext / CourseContext
                               |             |
                               v             v
             Supabase Auth   Supabase Postgres
```

## State

### AuthContext
Uses Supabase Auth for registration, email/password login, logout, and persisted sessions.

### CourseContext
Stores courses, loading state, and errors. Supabase Postgres is used to fetch and modify course records.

## Database

The `courses` table and row-level security policies are created by `supabase/setup.sql`.
