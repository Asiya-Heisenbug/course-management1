import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";

const AuthContext = createContext(null);

function toAppUser(authUser) {
  const metadata = authUser.user_metadata || {};
  const appMetadata = authUser.app_metadata || {};

  return {
    id: authUser.id,
    name: metadata.name || authUser.email?.split("@")[0] || "Student",
    username: metadata.username || "",
    email: authUser.email || "",
    phone: metadata.phone || "",
    role: appMetadata.role === "admin" ? "Admin" : "Student",
    program: metadata.program || "B.Sc. Computer Science",
    year: metadata.year || "First Year"
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? toAppUser(session.user) : null);
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function login(email, password) {
    setAuthLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });
      if (error) throw error;

      const appUser = toAppUser(data.user);
      setUser(appUser);
      return appUser;
    } finally {
      setAuthLoading(false);
    }
  }

  async function register(values) {
    setAuthLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email.trim(),
        password: values.password,
        options: {
          emailRedirectTo: `${window.location.origin}${import.meta.env.BASE_URL}`,
          data: {
            name: values.name.trim(),
            username: values.username.trim(),
            phone: values.phone.trim(),
            program: values.program || "B.Sc. Computer Science",
            year: values.year || "First Year"
          }
        }
      });
      if (error) throw error;

      if (data.session) setUser(toAppUser(data.user));
      return { confirmationRequired: !data.session };
    } finally {
      setAuthLoading(false);
    }
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
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
