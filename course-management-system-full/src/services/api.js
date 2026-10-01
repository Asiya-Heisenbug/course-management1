import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000"
});

export const getUsers = () => api.get("/users");
export const getUser = (id) => api.get(`/users/${id}`);
export const createUser = (user) => api.post("/users", user);

export const getCourses = () => api.get("/courses");
export const createCourse = (course) => api.post("/courses", course);
export const updateCourse = (id, course) => api.put(`/courses/${id}`, course);
export const removeCourse = (id) => api.delete(`/courses/${id}`);

export const getEnrollments = () => api.get("/enrollments");
export const getNotifications = () => api.get("/notifications");

export default api;
