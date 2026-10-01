# Course Command — Full Stack Course Management System

## 1. Problem Statement

Students need one place to access their learning information, discover available courses, track enrolment/progress and receive course-related notifications. Administrators also need a manageable course catalogue.

Course Command is a responsive React application using Supabase Auth for accounts and Supabase Postgres for the course catalogue.

## 2. Target Users

### Students
- Register and create a student profile.
- Login with email and password.
- View personal information.
- Browse available courses.
- Maintain a profile and persistent authenticated session.

### Course administrators
- View course records.
- Add courses.
- Edit course records.
- Delete courses.
- See API loading/error states.

## 3. Major Features

- Home page and application introduction
- Student registration
- Login/logout
- Client-side validation
- Persistent login state managed by Supabase Auth
- Protected dashboard/course routes
- Student dashboard
- Course catalogue
- Student course enrollment and progress tracking
- Supabase-backed course CRUD
- Loading and error states
- Responsive desktop/tablet/mobile layout
- Reusable React components
- Context API state management
- Supabase API layer
- Modular validation and service functions

## 4. Technology Stack

- HTML5 semantic structure
- CSS3
- Flexbox and CSS Grid
- Responsive media queries
- JavaScript ES6+
- React
- React Router
- Context API
- Supabase JavaScript client
- Supabase Auth and Postgres
- Vite

## 5. Folder Structure

```text
course-management-system-full/
├── docs/
├── supabase/
│   └── setup.sql
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── CourseCard.jsx
│   │   └── CourseForm.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CourseContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Courses.jsx
│   │   ├── AddCourse.jsx
│   │   └── EditCourse.jsx
│   ├── services/
│   │   ├── api.js
│   │   └── supabase.js
│   ├── utils/
│   │   └── validation.js
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## 6. Supabase setup

1. Create a Supabase project and enable Email under **Authentication → Sign In / Providers**.
2. In **Authentication → URL Configuration**, set the Site URL and allowed redirect URLs to `https://asiya-heisenbug.github.io/course-management1/` and `http://localhost:5173/` for local testing.
3. Open **SQL Editor**, paste `supabase/setup.sql`, and run it. This creates the courses and enrollments tables, configures row-level security, and inserts the starter courses. Rerun this whole script after updates; it is safe to rerun.
4. To make your account a course admin, first register and confirm it, then run this in **SQL Editor** with your signup email:

	```sql
	update auth.users
	set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
	where email = 'you@example.com';
	```

	Log out and back in to refresh the admin role in your session. Regular students can enroll without this step.

The frontend uses the Supabase project URL and publishable key in `src/services/supabase.js`. The publishable key is designed for browser use; database access is controlled by the policies in `setup.sql`. Never put a secret or service-role key in frontend code. Course edits are restricted to users whose trusted Supabase **app metadata** has `role` set to `admin`.

## 7. Run locally

```powershell
npm install
npm run dev
```

Open `http://localhost:5173/`. The app connects to the same Supabase project as the deployed site.

GitHub Actions builds and deploys pushes to `master` to GitHub Pages.

## Assignment coverage

### Skill 1
Project documentation, problem statement, target users, features, stack and structure are documented here.

### Skill 2
Home, Login, Register and Dashboard are implemented as navigable pages. React JSX uses semantic layout elements.

### Skill 3
The application uses external CSS, Grid/Flexbox, responsive media queries, cards, forms, buttons, panels and mobile adaptations.

### Skill 4
Login and registration validation covers required fields, email, phone, password length and password confirmation. Navigation changes according to login state.

### Skill 5
API, validation, authentication and course logic are separated into reusable ES modules. Supabase Auth persists the user's session.

### Skill 6
Pages are React components and routes are managed by React Router. Navbar, Footer, CourseCard, CourseForm and ProtectedRoute are reusable.

### Skill 7
Supabase Auth manages registration and login. Supabase Postgres stores the course catalogue. Context API manages auth and course state.

## Important note

Notifications are not connected yet. Students can enroll in courses and track their enrollment progress. Course creation and editing require the Supabase admin role.
