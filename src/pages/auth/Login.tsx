import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../../utility/supabaseClient";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        //  1. Try login with Supabase
        const { data, error: loginError } = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });

        if (loginError || !data.user) {
            setError("خطأ في تسجيل الدخول. تأكد من البيانات.");
            return;
        }

        const userId = data.user.id;

        //  2. Get role from profiles
        const { data: profile, error: profileError } = await supabaseClient
            .from("profiles")
            .select("role")
            .eq("id", userId)
            .single();

        if (profileError || !profile) {
            setError("لم يتم العثور على بيانات المستخدم. سجّل مرة أخرى.");
            navigate("/register-customer");
            return;
        }

        //  3. Redirect based on role
        if (profile.role === "admin") {
            navigate("/meals");
        } else {
            navigate("/menu");
        }
    };

    return (
        <Container className="py-5" style={{ maxWidth: "500px" }}>
            <Card className="shadow-sm">
                <Card.Body>
                    <h3 className="mb-4 text-center">تسجيل الدخول</h3>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>البريد الإلكتروني</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="password" className="mb-4">
                            <Form.Label>كلمة المرور</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            دخول
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};