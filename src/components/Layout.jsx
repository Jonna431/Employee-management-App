// src/components/Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main style={{ marginTop: "40px", padding: "15px" }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;