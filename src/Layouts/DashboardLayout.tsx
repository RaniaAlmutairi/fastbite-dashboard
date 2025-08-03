import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Outlet } from "react-router-dom";

// DashboardLayout defines the overall layout of the admin interface
// It includes a persistent sidebar and a dynamic content area (Outlet)
export const DashboardLayout: React.FC = () => {
    return (
        <div className="d-flex">
            {/* Sidebar for navigation */}
            <Sidebar />

            {/* Main content area where routed components will be displayed */}
            <main
                className="flex-grow-1 p-4"
                style={{ backgroundColor: "#f8f9fa" }}
            >
                <Outlet />
            </main>
        </div>
    );
};
