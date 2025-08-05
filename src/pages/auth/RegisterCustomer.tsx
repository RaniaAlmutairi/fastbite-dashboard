import React, { useState } from "react";
import {
    Container,
    Card,
    Form,
    Button,
    Alert,
    Spinner,
    Navbar,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../../utility/supabaseClient";
import { Helmet } from "react-helmet";

<Helmet>
  <title>FastBite | Register</title>
  <meta name="description" content="Sign up for a FastBite account and start ordering your favorite meals." />
</Helmet>

export const RegisterCustomer = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data, error: signUpError } = await supabaseClient.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (signUpError) {
                console.error("Signup error:", signUpError.message);
                setError(`Signup failed: ${signUpError.message}`);
                setLoading(false);
                return;
            }

            const user = data?.user || data?.session?.user;

            if (!user) {
                setError("Please confirm your email to complete registration.");
                setLoading(false);
                return;
            }

                const { error: profileError, status } = await supabaseClient
  .from("profiles")
  .insert([
      {
          id: user.id,
          email: formData.email, 
          name: formData.name,
          phone: formData.phone,
          role: "customer",
      },
  ]);


if (profileError || status >= 400) {
    console.error(" Profile insert error:", profileError);
    setError("Registration succeeded but failed to save profile.");
    setLoading(false);
    return;
}
            navigate("/menu");
        } catch (err) {
            console.error("Unexpected error:", err);
            setError("Unexpected error occurred.");
        }

        setLoading(false);
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" className="px-4 shadow">
                <Navbar.Brand>🍽️ FastBite</Navbar.Brand>
            </Navbar>

            <Container className="py-5" style={{ maxWidth: "600px" }}>
                <Card className="shadow-sm">
                    <Card.Body>
                        <h3 className="mb-4">Customer Registration</h3>

                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="phone">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                className="w-100"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Spinner animation="border" size="sm" /> Creating account...
                                    </>
                                ) : (
                                    "Register"
                                )}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};
