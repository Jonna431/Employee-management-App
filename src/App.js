import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TaxCalculations from "./pages/TaxCalculations";
import LeaveManagement from "./pages/LeaveManagement";
import Payroll from "./pages/Payroll";
import EmployeeProfile from "./pages/EmployeeProfile";
import EditProfileForm from "./pages/EditProfileForm";
import ApplyLeaveForm from "./pages/ApplyLeaveForm";
import CalendarComponent from "./pages/Holidays";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout"; // ✅ Import layout

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes under Layout with Navbar */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Dashboard />} />
          <Route path="/profile" element={<EmployeeProfile />} />
          <Route path="/edit-profile" element={<EditProfileForm />} />
          <Route path="/holidays" element={<CalendarComponent />} />
          <Route path="/tax" element={<TaxCalculations />} />
          <Route path="/leaves" element={<LeaveManagement />} />
          <Route path="/apply-leave" element={<ApplyLeaveForm />} />
          <Route path="/payroll" element={<Payroll />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
