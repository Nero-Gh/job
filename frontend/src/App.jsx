import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import UserProtectedRoute from "./components/UserProtectedRoute";
import { ProSidebarProvider } from "react-pro-sidebar";
import Layout from "./pages/global/Layout";
import UserJobHistory from "./pages/User/UserJobHistory";
import UserInfoDashboard from "./pages/User/UserInfoDashboard";
import DashUsers from "./pages/Admin/DashUsers";
import DashJobs from "./pages/Admin/DashJobs";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProtectRoute from "./components/AdminProtectedRoute";

const UserDashboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC = Layout(UserJobHistory);
const UserInfoDashboardHOC = Layout(UserInfoDashboard);
const AdminDashboardHOC = Layout(AdminDashboard);
const DashUsersHOC = Layout(DashUsers);
const DashJobsHOC = Layout(DashJobs);

function App() {
  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProSidebarProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search/location/:location" element={<Home />} />
              <Route path="/search/:keyword" element={<Home />} />
              <Route path="/login" element={<Login />} />

              <Route
                path="/admin/dashboard"
                element={
                  <AdminProtectRoute>
                    <AdminDashboardHOC />
                  </AdminProtectRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <AdminProtectRoute>
                    <DashUsersHOC />
                  </AdminProtectRoute>
                }
              />
              <Route
                path="/admin/jobs"
                element={
                  <AdminProtectRoute>
                    <DashJobsHOC />
                  </AdminProtectRoute>
                }
              />
              <Route
                path="/user/dashboard"
                element={
                  <UserProtectedRoute>
                    <UserDashboardHOC />
                  </UserProtectedRoute>
                }
              />
              <Route
                path="/user/jobs"
                element={
                  <UserProtectedRoute>
                    <UserJobsHistoryHOC />
                  </UserProtectedRoute>
                }
              />
              <Route
                path="/user/info"
                element={
                  <UserProtectedRoute>
                    <UserInfoDashboardHOC />
                  </UserProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ProSidebarProvider>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
