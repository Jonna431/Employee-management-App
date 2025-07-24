import React from "react";
import ProtectedRoute from "./ProtectedRoute";

const HRRoute = ({ children }) => {
  return <ProtectedRoute role="hr">{children}</ProtectedRoute>;
};

export default HRRoute;
