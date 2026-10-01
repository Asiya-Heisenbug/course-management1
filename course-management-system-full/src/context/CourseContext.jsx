import { createContext, useContext, useEffect, useState } from "react";
import { createCourse, getCourses, removeCourse, updateCourse } from "../services/api";

const CourseContext = createContext(null);

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchCourses() {
    try {
      setLoading(true);
      setError(null);
      const response = await getCourses();
      setCourses(response.data);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the mock API. Start JSON Server on port 5000.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

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
  }

  return (
    <CourseContext.Provider value={{ courses, loading, error, fetchCourses, addCourse, editCourse, deleteCourse }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  return useContext(CourseContext);
}
