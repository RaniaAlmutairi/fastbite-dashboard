import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../../utility/supabaseClient";

// This component handles redirecting users based on their role
// It runs once when the component mounts and checks authentication and role
export const AuthRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const redirectUser = async () => {
            // Get the authenticated user
            const {
                data: { user },
                error: userError,
            } = await supabaseClient.auth.getUser();

            if (userError || !user) {
                console.log("No user found, redirecting to login.");
                navigate("/login");
                return;
            }

            console.log("Logged in user:", user);

            // Fetch the user role from the 'profiles' table
            const { data: profile, error: profileError } = await supabaseClient
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .single();

            if (profileError || !profile) {
                console.error("Failed to get user profile:", profileError);
                navigate("/login");
                return;
            }

            console.log("User role:", profile.role);

            // Redirect based on role
            if (profile.role === "admin") {
                navigate("/meals");
            } else {
                navigate("/menu");
            }
        };

        redirectUser();
    }, [navigate]);

    return <p className="text-center mt-5">Redirecting...</p>;
};