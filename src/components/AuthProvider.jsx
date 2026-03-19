import React, { useEffect, useState } from "react";
import { auth, db } from "./Firebase";
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { AuthContext } from "./useAuth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u || null);
      if (u) {
        const userDoc = doc(db, "users", u.uid);
        const snap = await getDoc(userDoc);
        if (!snap.exists()) {
          await setDoc(userDoc, {
            email: u.email || "",
            role: "user",
            createdAt: serverTimestamp(),
          });
          setRole("user");
        } else {
          const userRole = snap.data()?.role || "user";
          setRole(userRole);
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  const value = { user, role, loading, login, signup, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
