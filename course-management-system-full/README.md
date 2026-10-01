# Course Command — Full Stack Course Management System

## 1. Problem Statement

Students need one place to access their learning information, discover available courses, track enrolment/progress and receive course-related notifications. Administrators also need a manageable course catalogue.

Course Command demonstrates this workflow as a responsive full-stack web application using a React frontend and a JSON Server mock backend.

## 2. Target Users

### Students
- Register and create a student profile.
- Login with email or username.
- View personal information.
- Browse available courses.
- View enrolment and progress status.
- Read notifications.

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
- Persistent login state with localStorage
- Protected dashboard/course routes
- Student dashboard
- Course catalogue
- Course enrolment/progress display
- Notifications
- Course CRUD
- GET / POST / PUT / DELETE mock API operations
- Loading and error states
- Responsive desktop/tablet/mobile layout
- Reusable React components
- Context API state management
- Axios API layer
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
- Axios
- JSON Server
- Vite
- Browser localStorage

## 5. Folder Structure

```text
course-management-system-full/
├── docs/
├── mock-api/
│   └── db.json
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
│   │   └── api.js
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

## 6. Run the project

Requirements: Node.js and npm.

```powershell
npm install
```

Terminal 1:

```powershell
npm run api
```

Terminal 2:

```powershell
npm run dev
```

Or:

```powershell
npm run dev:all
```

Open:

```text
http://localhost:5173/
```

Mock API:

```text
http://localhost:5000/courses
http://localhost:5000/users
http://localhost:5000/enrollments
http://localhost:5000/notifications
```

## Demo login

```text
Username: asiya
Password: Password123
```

## CRUD

```text
GET    /courses
POST   /courses
PUT    /courses/:id
DELETE /courses/:id
```

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
API, validation, authentication and course logic are separated into reusable ES modules. Auth state uses React Context and localStorage.

### Skill 6
Pages are React components and routes are managed by React Router. Navbar, Footer, CourseCard, CourseForm and ProtectedRoute are reusable.

### Skill 7
JSON Server provides mock data. Axios handles HTTP requests. Context API manages course/auth state. Dashboard data is fetched dynamically from users, courses, enrolments and notifications.

## Important note

This is an educational mock backend, not a production authentication system. Passwords are intentionally stored in JSON Server only because the assignment asks for a mock API. A real application would use a secure backend and hashed passwords.
