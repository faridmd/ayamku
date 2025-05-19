import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { ThemeProvider, createTheme } from "@mui/material";
import React, { useState, createContext, useContext } from "react";

// pages
import Home from "./pages/Home";
import Monitoring from "./pages/Monitoring";
import ManualControl from "./pages/ManualControl";
import Database from "./pages/Database";
import AyamSettings from "./pages/AyamSettings";
import Login from "./pages/Login";

// components
import Frame from "./components/Frame";

// context untuk auth
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// komponen proteksi route
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      palette: {
        red: "#FF0000",
      },
    },
  });

  // cek localStorage saat inisialisasi
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("ayamku_user");
    return saved ? JSON.parse(saved) : null;
  });

  // simpan user ke localStorage jika ada perubahan
  React.useEffect(() => {
    if (user) {
      localStorage.setItem("ayamku_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("ayamku_user");
    }
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <Frame>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <ProtectedRoute>
                          <Home />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/monitoring"
                      element={
                        <ProtectedRoute>
                          <Monitoring />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/controller"
                      element={
                        <ProtectedRoute>
                          <ManualControl />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/database"
                      element={
                        <ProtectedRoute>
                          <Database />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/settings"
                      element={
                        <ProtectedRoute>
                          <AyamSettings />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </Frame>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </ThemeProvider>
  );
};

export default App;
