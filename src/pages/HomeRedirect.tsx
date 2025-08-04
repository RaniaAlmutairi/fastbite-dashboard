import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../utility/supabaseClient";

export const HomeRedirect = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoleAndRedirect = async () => {
            const {
                data: { user },
            } = await supabaseClient.auth.getUser();

            if (!user) {
                navigate("/login");
                return;
            }

            const { data, error } = await supabaseClient
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .single();

            if (error || !data) {
                navigate("/login");
                return;
            }

            const role = data.role;

            if (role === "admin") {
                navigate("/meals");
            } else {
                navigate("/menu");
            }
        };

        fetchRoleAndRedirect();
    }, [navigate]);

    return <p style={{ textAlign: "center", marginTop: "100px" }}> جاري التوجيه...</p>;
};
