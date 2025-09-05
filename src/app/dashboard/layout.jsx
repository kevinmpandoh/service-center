"use client";

import ProtectedRoute from "@/components/HOC/ProtectedRoute";
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import { useSidebarStore } from "@/stores/sidebar.store";
// import ProtectedRoute from "@/components/HOC/ProtectedRoute";
import React from "react";

export default function AdminLayout({ children }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebarStore();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <ProtectedRoute allowedRoles={["admin", "teknisi", "sparepart"]}>
      <div className="min-h-screen xl:flex">
        {/* Sidebar and Backdrop */}
        <Sidebar />

        {/* Main Content Area */}
        <div
          className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
        >
          {/* Header */}
          <Header />
          {/* Page Content */}
          <main className="mx-auto  min-h-[90vh] bg-[#F1F5F9] md:p-12 flex-1 p-6 overflow-y-auto ">
            {children}
          </main>
        </div>
      </div>
      //{" "}
    </ProtectedRoute>
  );
}
