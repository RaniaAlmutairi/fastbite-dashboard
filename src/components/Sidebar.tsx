import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabaseClient } from "../utility/supabaseClient";

// Sidebar component used for navigation in the admin dashboard
export const Sidebar: React.FC = () => {
    const navigate = useNavigate();

    // Handles user logout and redirects to login page
    const handleLogout = async () => {
        await supabaseClient.auth.signOut();
        navigate("/login");
    };

    return (
        <div
            className="bg-dark text-white p-3 vh-100 d-flex flex-column"
            style={{ width: "220px" }}
        >
            {/* App brand/title */}
            <h4 className="mb-4">🍔 FastBite</h4>

            {/* Navigation links */}
            <ul className="nav flex-column">
                <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/">
                        Dashboard
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/meals">
                        Meals
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/meals/create">
                        Add Meal
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/orders">
                        Orders
                    </Link>
                </li>
            </ul>

            {/* Logout button placed at the bottom */}
            <div className="mt-auto">
                <button
                    className="btn btn-outline-light w-100 mt-3"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};
