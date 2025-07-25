import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Home";
import TaxCalculations from "./pages/TaxCalculations";
import LeaveManagement from "./pages/LeaveManagement";
import Payroll from "./pages/Payroll";
import EmployeeProfile from "./pages/EmployeeProfile";

import ApplyLeaveForm from "./pages/ApplyLeaveForm";
import CalendarComponent from "./pages/Dashboard";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import image from "./assets/image5.png";
import HRDashboard from "./pages/hr/Dashboard";
import HRDashboardHome from "./pages/hr/DashboardHome";
import HREmployeeManagement from "./pages/hr/EmployeeManagement";
import HRAssetManagement from "./pages/hr/AssetManagement";
import EmployeeAssets from "./pages/employee/EmployeeAssets";
import Layout from "./components/Layout";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import EmpSettings from "./pages/EmpSetttings";
import ChangePasswordForm from "./pages/employee/ChangePasswordForm";
import Notifications from "./pages/employee/Notifications";
import Help from "./pages/employee/Help";

import "./App.css";
import EditProfileForm from "./pages/EditProfileForm";

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

          {/* Employee Protected Routes under Layout with Navbar */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/reports" element={<Dashboard />} />

            <Route path="/settings" element={<EmpSettings />}>
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<EmployeeProfile />} />
              <Route
                path="profile/edit-profile"
                element={<EditProfileForm />}
              />
              <Route path="change-password" element={<ChangePasswordForm />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="help" element={<Help />} />
            </Route>

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
