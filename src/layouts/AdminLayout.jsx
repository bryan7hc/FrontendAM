// src/admin/AdminLayout.jsx
import React from "react";
import Sidebar from "../admin/componentsAdmin/Sidebar";

import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
