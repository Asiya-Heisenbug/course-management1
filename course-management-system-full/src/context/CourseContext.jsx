import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { createCourse, createEnrollment, getCourses, getEnrollments, removeCourse, updateCourse } from "../services/api";

const CourseContext = createContext(null);

export function CourseProvider({ children }) {
  const { user, authLoading } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(false);

  async function fetchCourses() {
    try {
      setLoading(true);
      setError(null);
      const response = await getCourses();
      setCourses(response.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load courses from Supabase. Check that the database setup has been run.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setEnrollments([]);
      setEnrollmentsLoading(false);
      return;
    }

    let active = true;
    setEnrollmentsLoading(true);
    getEnrollments()
      .then((response) => {
        if (active) setEnrollments(response.data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (active) setEnrollmentsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [authLoading, user?.id]);

  async function enrollCourse(courseId) {
    if (!user) throw new Error("Log in to enroll in a course.");
    const response = await createEnrollment(courseId, user.id);
    setEnrollments((current) => [...current, response.data]);
    return response.data;
  }

  async function addCourse(course) {
    const response = await createCourse(course);
    setCourses((current) => [...current, response.data]);
    return response.data;
  }

  async function editCourse(id, course) {
    const response = await updateCourse(id, course);
    setCourses((current) => current.map((item) => String(item.id) === String(id) ? response.data : item));
    return response.data;
  }

  async function deleteCourse(id) {
    await removeCourse(id);
    setCourses((current) => current.filter((item) => String(item.id) !== String(id)));
    setEnrollments((current) => current.filter((item) => String(item.courseId) !== String(id)));
  }

  return (
    <CourseContext.Provider value={{ courses, loading, error, enrollments, enrollmentsLoading, enrollCourse, fetchCourses, addCourse, editCourse, deleteCourse }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  return useContext(CourseContext);
}
