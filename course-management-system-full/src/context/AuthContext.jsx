import { createContext, useContext, useEffect, useState } from "react";
import { getUsers, createUser } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("course-command-user")) || null;
    } catch {
      return null;
    }
  });
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    if (user) localStorage.setItem("course-command-user", JSON.stringify(user));
    else localStorage.removeItem("course-command-user");
  }, [user]);

  async function login(identifier, password) {
    setAuthLoading(true);
    try {
      const response = await getUsers();
      const found = response.data.find(
        (item) =>
          (item.email.toLowerCase() === identifier.trim().toLowerCase() ||
            item.username.toLowerCase() === identifier.trim().toLowerCase()) &&
          item.password === password
      );

      if (!found) throw new Error("Invalid email/username or password.");

      const safeUser = { ...found };
      delete safeUser.password;
      setUser(safeUser);
      return safeUser;
    } finally {
      setAuthLoading(false);
    }
  }

  async function register(values) {
    setAuthLoading(true);
    try {
      const response = await getUsers();
      const duplicate = response.data.some(
        (item) =>
          item.email.toLowerCase() === values.email.trim().toLowerCase() ||
          item.username.toLowerCase() === values.username.trim().toLowerCase()
      );
      if (duplicate) throw new Error("Email or username already exists.");

      const responseUser = await createUser({
        name: values.name.trim(),
        username: values.username.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        password: values.password,
        role: "Student",
        program: values.program || "B.Sc. Computer Science",
        year: values.year || "First Year"
      });

      const safeUser = { ...responseUser.data };
      delete safeUser.password;
      setUser(safeUser);
      return safeUser;
    } finally {
      setAuthLoading(false);
    }
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, authLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
