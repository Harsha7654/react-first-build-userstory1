import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Home from "./components/pages/Home";
import PageNotFound from "./components/pages/404";
import SignIn from "./components/pages/SignIn";
import ContactUs from "./components/pages/ContactUs";
import Chapters from "./components/pages/Chapters";
import FauxLogin from "./components/pages/FauxLogin";
import Account from "./components/pages/Account";
import Logout from "./components/pages/Logout";
import "./App.css";
import { AuthProvider } from "./components/auth/useAuth";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MyDashboard from "./components/pages/MyDashboard";

function App() {
  //const { loggedinUser } = useAuth();

  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
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
              path="/signin"
              element={
                <ProtectedRoute>
                  <SignIn />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <ContactUs />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/login" element={<FauxLogin />} />
            <Route
              path="/subjects"
              element={
                <ProtectedRoute>
                  <MyDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chapters"
              element={
                <ProtectedRoute>
                  <Chapters />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="/logout"
              element={
                <ProtectedRoute>
                  <Logout />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
