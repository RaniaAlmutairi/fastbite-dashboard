import React, { useState } from "react";
import {
    Form,
    Button,
    Container,
    Alert,
    Card,
    Spinner,
    Navbar,
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { supabaseClient } from "../../utility/supabaseClient";

export const CheckoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const cart = location.state?.cart ?? [];

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { error } = await supabaseClient.from("orders").insert({
            name: formData.name,
            address: formData.address,
            phone: formData.phone,
            items: cart,
        });

        if (error) {
            setError("An error occurred while submitting the order. Please try again.");
            setLoading(false);
            return;
        }

        setSubmitted(true);
        setTimeout(() => {
            navigate("/customer/thanks", {
                state: {
                    order: {
                        ...formData,
                        items: cart,
                    },
                },
            });
        }, 1500);
    };

    if (submitted) {
        return (
            <Container className="py-5 text-center">
                <Alert variant="success">
                     Order submitted successfully! ..
                </Alert>
            </Container>
        );
    }

    return (
        <>
            {/* Navbar */}
            <Navbar bg="dark" variant="dark" className="px-4 shadow">
                <Navbar.Brand>🍽️ FastBite</Navbar.Brand>
            </Navbar>

            <Container className="py-5" style={{ maxWidth: "600px" }}>
                <Card className="shadow-sm border-0">
                    <Card.Body>
                        <h3 className="mb-4 text-center fw-bold">Checkout</h3>

                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="name" className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                />
                            </Form.Group>

                            <Form.Group controlId="address" className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    required
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter delivery address"
                                />
                            </Form.Group>

                            <Form.Group controlId="phone" className="mb-4">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="e.g. 05XXXXXXXX"
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                className="w-100 fw-bold"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />{" "}
                                        Submitting...
                                    </>
                                ) : (
                                    "Confirm Order"
                                )}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};