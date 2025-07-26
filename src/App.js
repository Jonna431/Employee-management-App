import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Login";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Home";
import TaxCalculations from "./pages/TaxCalculations";
import LeaveManagement from "./pages/LeaveManagement";
import Payroll from "./pages/Payroll";
import EmployeeProfile from "./pages/EmployeeProfile";
import EditProfileForm from "./pages/EditProfileForm";
import ApplyLeaveForm from "./pages/ApplyLeaveForm";
import CalendarComponent from "./pages/Dashboard";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import EmployeeAssets from "./pages/employee/EmployeeAssets"; // Updated path
import HRDashboard from "./pages/hr/Dashboard"; // You'll need to create this
import HRAssetManagement from "./pages/hr/AssetManagement";
import HREmployeeManagement from "./pages/hr/EmployeeManagement";
import HRDashboardHome from "./pages/hr/DashboardHome";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import image from "./assets/image5.png";

const App = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        overflow: "hidden",
        backgroundRepeat: "no-repeat",
      }}
    >
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Employee Protected Routes under Layout with Navbar */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/reports" element={<Dashboard />} />
            <Route path="/profile" element={<EmployeeProfile />} />
            <Route path="/edit-profile" element={<EditProfileForm />} />
            <Route path="/dashboard" element={<CalendarComponent />} />
            <Route path="/tax" element={<TaxCalculations />} />
            <Route path="/leaves" element={<LeaveManagement />} />
            <Route path="/leaves/apply-leave" element={<ApplyLeaveForm />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/my-assets" element={<EmployeeAssets />} />
          </Route>

          {/* HR Dashboard Routes - Separate Layout */}
          <Route
            path="/hr"
            element={
              <ProtectedRoute role="hr">
                <HRDashboard /> {/* HR layout with its own navbar */}
              </ProtectedRoute>
            }
          >
            <Route index element={<HRDashboardHome />} />
            <Route path="dashboard" element={<HRDashboardHome />} />
            <Route path="employees" element={<HREmployeeManagement />} />
            <Route path="assets" element={<HRAssetManagement />} />
          </Route>

          {/* Common Pages */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
