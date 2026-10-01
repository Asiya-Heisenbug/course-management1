# Project Architecture

```text
Browser
  |
  v
React Router
  |
  +--> Public Pages
  |      Home
  |      Login
  |      Register
  |
  +--> Protected Pages
         Dashboard
         Courses
         Add Course
         Edit Course
              |
              v
        React Context
        AuthContext / CourseContext
              |
              v
          Axios API
              |
              v
        JSON Server :5000
              |
              v
           db.json
```

## State

### AuthContext
Stores the current logged-in student and exposes:
- login
- register
- logout
- authLoading

The user is persisted using browser localStorage.

### CourseContext
Stores:
- courses
- loading
- error

And exposes:
- fetchCourses
- addCourse
- editCourse
- deleteCourse

## API resources

- `/users`
- `/courses`
- `/enrollments`
- `/notifications`
