// src/pages/hr/Dashboard.jsx
import { Outlet } from "react-router-dom";
import HRLayout from "../../components/hr/HRLayout";

const HRDashboard = () => {
  return (
    <HRLayout>
      <Outlet />
    </HRLayout>
  );
};

export default HRDashboard;
